# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse
from rest_framework.views import APIView

from .products import products

# Create your views here.
class ProductList(APIView):

    def get(self, request, format=None):
        return JsonResponse(products, safe=False)
