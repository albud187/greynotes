from django.urls import path, include
from . import views


urlpatterns = [
    path('sandbox/',views.SandboxView.as_view(),name='sandbox'),

]
