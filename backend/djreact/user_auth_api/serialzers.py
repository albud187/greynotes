from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class TokenSerializer(serialzers.ModelSerializer):
    class Meta:
        model = Token
        fields = '__all__'
