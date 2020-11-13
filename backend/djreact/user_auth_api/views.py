import json
from rest_framework import viewsets
import random
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, views

from django.core.serializers import serialize as SERIALIZE

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serialzers import TokenSerializer

class TokenViewSet(viewsets.ModelViewset):
    serializer_class = TokenSerializer
    queryset = Token.objects.all()
