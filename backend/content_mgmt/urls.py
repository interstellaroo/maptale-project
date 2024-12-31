from .views import *
from django.urls import path

urlpatterns = [
    path('', BaseItemView.as_view()),
    path('node', NodeView.as_view()),
    path('node/<uuid:pk>', NodeDetailView.as_view()),
    path('note', NoteView.as_view()),
    path('note/<uuid:pk>', NoteDetailView.as_view()),
    path('map', MapView.as_view()),
    path('map/<uuid:pk>', MapDetailView.as_view()),
]
