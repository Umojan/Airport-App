from django.urls import path
from . import views

urlpatterns = [
    path('flights/', views.flight_board, name='flight_board'),  # URL для страницы с рейсами
]