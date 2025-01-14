from rest_framework import generics
from .serializers import BaseItemPolimorphicSerializer, NodeDetailSerializer, NoteSerializer, MapSerializer, PinSerializer
from .models import BaseItem, Node, Note, Map, Pin


### Views for the content_mgmt app~~

# BaseItem views ---
class BaseItemView(generics.ListCreateAPIView):
    queryset = BaseItem.objects.all()
    serializer_class = BaseItemPolimorphicSerializer

# Node views ---
class NodeView(generics.ListCreateAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeDetailSerializer

class NodeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeDetailSerializer

# Note views ---
class NoteView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

# Map views ---
class MapView(generics.ListCreateAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

class MapDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

# Pin views ---
class PinView(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer

class PinDetailedView(generics.RetrieveDestroyAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer