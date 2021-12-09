
from rest_framework import generics

from base.models import Product
from base.serializers.product_serializers import ProductSerializer


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # def get(self, request, pk, format=None):
    #     # product = next(prod for prod in products if prod['_id'] == pk)
    #     try:
    #         product = Product.objects.get(_id = pk)
    #         serializer = ProductSerializer(product)
    #     except Product.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

    #     return Response(serializer.data, status=status.HTTP_200_OK)