
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser


from base.serializers.user_serializers import UserSerailizerWithToken
from base.serializers.user_serializers import UserSerializer


from base.serializers import user_serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attr):
        data = super().validate(attr)
        serializer = user_serializers.UserSerailizerWithToken(self.user)

        for k, v in serializer.data.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserList(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = user_serializers.UserSerializer(request.user, many=False)
        return Response(serializer.data)


class RegisterUser(APIView):
    allowed_methods = ['POST']

    def get(self, request):
        data = request.data
        try:
            user, created = User.objects.get_or_create(
                username = data['email'],
                email = data['email'],
                defaults={
                    'first_name' : data['name'],
                    'password' : make_password(data['password'])
                }
            )
        except:
            message = {'detail': 'Something went wrong'}
            return(message, status.HTTP_400_BAD_REQUEST)
        else:
            if not created:
                message = {'detail': 'User with this email already exists'}
                return Response(message, status.HTTP_400_BAD_REQUEST)

        serializer = UserSerailizerWithToken(user, many=False)
        return Response(serializer.data)