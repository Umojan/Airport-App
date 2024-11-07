from django.contrib import admin
from .models import StoryBanner, InfoBanner

@admin.register(StoryBanner)
class StoryBannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'image', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)

@admin.register(InfoBanner)
class InfoBannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'image', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title',)