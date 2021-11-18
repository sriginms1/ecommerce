
from django.urls import path
from django.contrib import admin

from .views import ProductList, Product


urlpatterns = [
    path(r'products/', ProductList.as_view(), name='productList'),
    path(r'product/<str:pk>/', Product.as_view(), name='product')
]
