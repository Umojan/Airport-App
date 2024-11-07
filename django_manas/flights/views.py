from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Flight
from .serializers import FlightSerializer
from .filters import FlightFilter

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = FlightFilter  # Use the custom FlightFilter
    ordering_fields = ['time']  # Enables ordering by time