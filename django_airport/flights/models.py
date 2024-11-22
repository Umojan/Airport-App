from django.db import models

class Flight(models.Model):
    is_arrival = models.BooleanField()
    airline = models.CharField(max_length=50)
    flight_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    time = models.DateTimeField()
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.flight_code} - {self.airline} - {'Arrival' if self.is_arrival else 'Departure'}"

    class Meta:
        db_table = 'flights_schedule'
