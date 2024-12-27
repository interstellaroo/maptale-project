from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models import Node, Project

    
@admin.register(Node)
class NodeAdmin(MPTTModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('name', 'description')

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('children')