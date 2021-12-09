
from django.urls import path

from base.views import product_views as views

urlpatterns = [
    path(r'', views.ProductList.as_view(), name='productList'),
    path(r'<str:pk>/', views.ProductDetail.as_view(), name='productView')
]
