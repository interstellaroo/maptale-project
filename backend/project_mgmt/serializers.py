from rest_framework import serializers
from .models import Node, Project
from content_mgmt.serializers import BaseItemPolimorphicSerializer

class NodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = [
            'id',
            'name',
            'items',
            'children'
        ]

    def get_children(self, obj):
        return NodeSerializer(obj.children.all(), many=True).data

    def get_items(self, obj):
        return BaseItemPolimorphicSerializer(obj.items.all(), many=True).data
    
class ProjectSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'children']

    def get_children(self, obj):
        root_children = obj.children.filter(parent=None)
        return NodeSerializer(root_children, many=True).data