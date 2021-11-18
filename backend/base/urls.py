
from django.urls import path
from django.contrib import admin

from .views import ProductList, ProductView


urlpatterns = [
    path(r'products/', ProductList.as_view(), name='productList'),
    path(r'product/<str:pk>/', ProductView.as_view(), name='productView')
]
