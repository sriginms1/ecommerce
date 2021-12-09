
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):
    name = SerializerMethodField()
    _id = SerializerMethodField()
    is_admin = SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'is_admin']

    def get_name(self, obj):
        return obj.first_name or obj.email

    def get__id(self, obj):
        return obj.id

    def get_is_admin(self, obj):
        return obj.is_staff


class UserSerailizerWithToken(UserSerializer):
    token = SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'is_admin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)