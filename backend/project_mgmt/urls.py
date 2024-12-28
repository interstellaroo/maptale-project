from .views import ProjectView, ProjectDetailView
from django.urls import path

urlpatterns = [
    path('project/', ProjectView.as_view()),
    path('project/<uuid:pk>', ProjectDetailView.as_view()),
]
