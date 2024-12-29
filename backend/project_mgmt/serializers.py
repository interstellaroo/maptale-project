from rest_framework import serializers
from .models import Node, Project
from content_mgmt.serializers import BaseItemPolimorphicSerializer

class NodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = [
            'id',
            'name',
            'children'
        ]

    def get_children(self, obj):
        child_nodes = NodeSerializer(obj.children.all(), many=True).data
        item_nodes = BaseItemPolimorphicSerializer(obj.items.all(), many=True).data
        return child_nodes + item_nodes
    
class ProjectDetailSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'children']

    def get_children(self, obj):
        root_children = obj.children.filter(parent=None)
        return NodeSerializer(root_children, many=True).data


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id',
            'name',
            'description'
        ]