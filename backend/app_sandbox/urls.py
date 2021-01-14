from django.urls import path, include
from . import views


urlpatterns = [
    path('',views.SandboxView.as_view(),name='sandbox'),
    path('run_function/',views.RunFunctionView.as_view(), name='run_function')

]
