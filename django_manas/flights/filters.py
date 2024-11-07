from django_filters import rest_framework as filters
from .models import Flight

class FlightFilter(filters.FilterSet):
    start_time = filters.DateTimeFilter(field_name="time", lookup_expr='gte')
    end_time = filters.DateTimeFilter(field_name="time", lookup_expr='lte')
    is_arrival = filters.BooleanFilter(field_name="is_arrival")

    class Meta:
        model = Flight
        fields = ['is_arrival', 'start_time', 'end_time']