from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from django.http import HttpResponse
from django.views.generic import TemplateView

# Define a simple home view
def home_view(request):
    return HttpResponse("Welcome to the Homepage!")



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('impact/', include('impact.urls')),
    path('evaluation/', include('evaluation.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),  # Serve the frontend
]

# Serve media files during development (only if DEBUG=True)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)