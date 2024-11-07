from rest_framework import viewsets
from .models import Flight
from .serializers import FlightSerializer

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        is_arrival = self.request.query_params.get('is_arrival')
        if is_arrival is not None:
            queryset = queryset.filter(is_arrival=is_arrival == 'true')
        return queryset
