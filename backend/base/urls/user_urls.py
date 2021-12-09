
from django.urls import path
from django.contrib import admin

from base.views import user_view as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path(r'', views.UserList.as_view(), name='user_list'),
    path(r'login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'profile/', views.UserProfileView.as_view(), name='user_profile'),
    path(r'register', views.RegisterUser.as_view(), name='register_user'),
    path(r'token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
