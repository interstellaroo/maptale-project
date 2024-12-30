from .views import BaseItemDetailView, BaseItemView, NodeDetailView
from django.urls import path

urlpatterns = [
    path('', BaseItemView.as_view()),
    path('<uuid:pk>', BaseItemDetailView.as_view()),
    path('node/<uuid:pk>', NodeDetailView.as_view()),
]
