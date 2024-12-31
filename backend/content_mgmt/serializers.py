from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer
from .models import BaseItem, Note, Map, Node

class BaseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseItem
        fields = [
            'id',
            'name',
            'node'
        ]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'id',
            'name',
            'text',
            'node'
        ]

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = [
            'id',
            'name',
            'image',
            'node'
        ]

class BaseItemPolimorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        BaseItem: BaseItemSerializer,
        Note: NoteSerializer,
        Map: MapSerializer,
    }

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

class NodeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = [
            'id',
            'name',
            'project',
            'parent',
            'created_at'
        ]