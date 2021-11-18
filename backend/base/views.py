
from django.http import JsonResponse
from rest_framework.views import APIView

from .products import products

# Create your views here.
class ProductList(APIView):
    def get(self, request, format=None):
        return JsonResponse(products, safe=False)


class Product(APIView):
    def get(self, request, pk, format=None):
        product = next(prod for prod in products if prod['_id'] == pk)
        return JsonResponse(product or [], safe=False)