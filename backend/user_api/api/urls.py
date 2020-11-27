from rest_framework.routers import DefaultRouter
from django.urls import path

from user_api.api.views import (
UserViewSet,
TokenViewSet
)

#
# router.register('Tokens', TokenViewSet, basename='Tokens')
# router.register('Users', UserViewSet, basename='Users')
#
# urlpatterns = router.urls

from .views import UserViewSet

router = DefaultRouter()
router.register('Tokens', TokenViewSet, basename='Tokens')
router.register('Users', UserViewSet, basename='Users')


function_views = []
urlpatterns = router.urls
