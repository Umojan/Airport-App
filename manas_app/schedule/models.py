from django.db import models

class Flight(models.Model):
    flight = models.CharField(max_length=10)
    destination = models.CharField(max_length=100)
    planned_date = models.DateField()
    planned_time = models.TimeField()
    status = models.CharField(max_length=20)
    img = models.URLField()  # Для изображения, если оно у вас есть

    def __str__(self):
        return self.flight
