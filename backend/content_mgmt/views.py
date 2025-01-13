from rest_framework import generics
from .serializers import BaseItemPolimorphicSerializer, NodeDetailSerializer, NoteSerializer, MapSerializer, PinSerializer
from .models import BaseItem, Node, Note, Map, Pin

# Base Item
class BaseItemView(generics.ListCreateAPIView):
    queryset = BaseItem.objects.all()
    serializer_class = BaseItemPolimorphicSerializer

# Nodes
class NodeView(generics.ListCreateAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeDetailSerializer

class NodeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeDetailSerializer

# Notes
class NoteView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

# Maps
class MapView(generics.ListCreateAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

class MapDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

# Pins
class PinView(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer

class PinDetailedView(generics.RetrieveDestroyAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer