from .views import ProjectView, ProjectDetailView
from django.urls import path

urlpatterns = [
    path('', ProjectView.as_view()),
    path('<uuid:pk>', ProjectDetailView.as_view()),
]
