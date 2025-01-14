from django.contrib import admin
from .models import BaseItem, Note, Map, Node, Pin
from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelAdmin
from mptt.admin import MPTTModelAdmin

### Admin classes for the content_mgmt app~~

# NodeAdmin ---
@admin.register(Node)
class NodeAdmin(MPTTModelAdmin):
    list_display = ('name', 'parent', 'created_at')
    search_fields = ('name',)

# BaseItemAdmin ---
@admin.register(BaseItem)
class BaseItemAdmin(PolymorphicParentModelAdmin):
    base_model = BaseItem
    child_models = (Note, Map)

    list_display = ('name', 'node', 'created_at')

# NoteAdmin ---
@admin.register(Note)
class NoteAdmin(PolymorphicChildModelAdmin):

    base_model = Note
    list_display = ('name', 'node', 'text', 'created_at')

# MapAdmin ---
@admin.register(Map)
class MapAdmin(PolymorphicChildModelAdmin):
    base_model = Map
    list_display = ('name', 'node', 'image', 'created_at')

# PinAdmin ---
@admin.register(Pin)
class PinAdmin(admin.ModelAdmin):
    base_model = Pin
    list_display = ('id', 'map', 'note' , 'x', 'y')
