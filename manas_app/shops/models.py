# shops/models.py
from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg


class Shop(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='shop_images/')
    description = models.TextField()
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def average_rating(self):
        average = self.reviews.aggregate(Avg('rating'))['rating__avg']
        return average if average is not None else "Нет оценок"


class Review(models.Model):
    shop = models.ForeignKey(Shop, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comment = models.TextField()

    def __str__(self):
        return f'Review by {self.user.username} for {self.shop.name}'
