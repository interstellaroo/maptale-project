from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer, ProjectDetailSerializer

# Project views ---
class ProjectView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
