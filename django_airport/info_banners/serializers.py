from rest_framework import serializers
from .models import StoryBanner, InfoBanner

class StoryBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryBanner
        fields = ['id', 'name', 'image', 'is_active']

class InfoBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoBanner
        fields = ['id', 'title', 'description', 'content', 'image', 'is_active']
