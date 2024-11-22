from django.db import models
from ckeditor.fields import RichTextField

class StoryBanner(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='story_banners/')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class InfoBanner(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='info_banners/', null=True, blank=True)
    content = RichTextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
