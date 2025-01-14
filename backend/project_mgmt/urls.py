from .views import ProjectView, ProjectDetailView
from django.urls import path

### URL patterns for the project_mgmt app~~

urlpatterns = [
    path('', ProjectView.as_view()),
    path('<uuid:pk>', ProjectDetailView.as_view()),
]
