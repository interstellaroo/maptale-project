from django.contrib import admin
from .models import BaseItem, Note, Map
from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelAdmin

@admin.register(BaseItem)
class BaseItemAdmin(PolymorphicParentModelAdmin):
    base_model = BaseItem
    child_models = (Note, Map)


@admin.register(Note)
class NoteAdmin(PolymorphicChildModelAdmin):

    base_model = Note
    list_display = ('name', 'node', 'text')


@admin.register(Map)
class MapAdmin(PolymorphicChildModelAdmin):
    base_model = Map
    list_display = ('name', 'node', 'image')
