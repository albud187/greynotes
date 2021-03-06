from django.shortcuts import render, redirect
from django.views.generic import View

# Create your views here.
import pandas as pd
from django.http import HttpResponse
from django.contrib import messages
import numpy as np


class SandboxView(View):
    template_name = 'sandbox_base.html'
    def get(self, request):
        return render(request,'app_sandbox/sandbox_base.html')

class RunFunctionView(View):
    template_name = 'run_function.html'
    def get(self, request):
        return render(request,'app_sandbox/run_function.html')

def placeholder_function(request):
    try:
        input_1=request.GET['input_1']
        input_2=request.GET['input_2']
        output = input_1+input_2
        return render(request, 'run_function.html',{'function_output':output})
    except:
        pass
