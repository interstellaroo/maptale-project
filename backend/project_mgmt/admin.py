from django.contrib import admin
from .models import Project

    
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'created_at')
    search_fields = ('name', 'description')

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('children')