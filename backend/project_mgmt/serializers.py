from rest_framework import serializers
from .models import Project
from content_mgmt.serializers import NodeSerializer

### Project Serializers
###

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