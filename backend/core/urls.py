from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

api_urls = [
    path('project/', include('project_mgmt.urls')),
    path('item/', include('content_mgmt.urls'))
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('silk/', include('silk.urls', namespace='silk')),
    path('api/', include(api_urls)),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
