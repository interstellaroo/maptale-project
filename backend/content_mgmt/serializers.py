from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer
from .models import BaseItem, Note, Map

class BaseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseItem
        fields = [
            'id',
            'name',
        ]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'id',
            'name',
        ]

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = [
            'id',
            'name',
        ]

class BaseItemPolimorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        BaseItem: BaseItemSerializer,
        Note: NoteSerializer,
        Map: MapSerializer,
    }