from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FlightViewSet

router = DefaultRouter()
router.register(r'schedule', FlightViewSet, basename='schedule')

urlpatterns = [
    path('', include(router.urls)),
]