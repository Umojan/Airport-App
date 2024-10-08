# shops/views.py
from django.shortcuts import render, get_object_or_404
from .models import Shop


def shop_list(request):
    shops = Shop.objects.all()
    return render(request, 'shops/shop_list.html', {'shops': shops})


def shop_detail(request, shop_id):
    shop = get_object_or_404(Shop, pk=shop_id)
    return render(request, 'shops/shop_detail.html', {'shop': shop})
