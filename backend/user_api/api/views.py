import json
from rest_framework import viewsets
import random
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, views

from django.core.serializers import serialize as SERIALIZE