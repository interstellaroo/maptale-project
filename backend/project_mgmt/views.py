from django.shortcuts import render
from rest_framework import generics
from .models import Node, Project
from .serializers import ProjectSerializer


class ProjectView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
