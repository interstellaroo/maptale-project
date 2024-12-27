from .views import ProjectView
from django.urls import path, include

urlpatterns = [
    path('project/', ProjectView.as_view()),
]
