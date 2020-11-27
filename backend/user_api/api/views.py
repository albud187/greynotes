from rest_framework import viewsets

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .serializers import (
    UserSerializer,
    TokenSerializer
    )

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
#
# class UserViewSet(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # def get_queryset(self):
    #     if self.request.user.is_superuser:
    #         return User.objects.all()
    #     else:
    #         return User.objects.filter(username=self.request.user)

class TokenViewSet(viewsets.ModelViewSet):
    serializer_class = TokenSerializer
    queryset = Token.objects.all()

    # def get_queryset(self):
    #     if self.request.user.is_superuser:
    #         return Token.objects.all()
    #     else:
    #         return Token.objects.filter(user=self.request.user)
