from rest_framework.routers import DefaultRouter
from django.urls import path

from djreact.user_auth_api.views import TokenViewSet
from .views import UserViewSet

router = DefaultRouter()
router.register('Tokens', TokenViewSet, basename='Tokens')
router.register('Users', UserViewSet, basename='Users')

urlpatterns = router.urls
