from django.shortcuts import render
from .models import Flight

def flight_board(request):
    flights = Flight.objects.all()
    return render(request, 'schedule/flight_board.html', {'flights': flights})
