from django.urls import path, include
from . import views
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/',views.RegistrationView.as_view(),name='register'),
    path('activate/<uidb64>/<token>/',views.ActivateAccountView.as_view(),name='activate' ),
    path('request-reset-email/',views.RequestResetEmailView.as_view(),name='request-reset-email' ),
    path('set-new-password/<uidb64>/<token>/',views.SetNewPasswordView.as_view(),name='set-new-password' ),

]
