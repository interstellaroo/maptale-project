from rest_framework import generics
from .serializers import BaseItemPolimorphicSerializer, NodeDetailSerializer
from .models import BaseItem, Node

class BaseItemView(generics.ListCreateAPIView):
    queryset = BaseItem.objects.all()
    serializer_class = BaseItemPolimorphicSerializer

class BaseItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BaseItem.objects.all()
    serializer_class = BaseItemPolimorphicSerializer

class NodeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeDetailSerializer