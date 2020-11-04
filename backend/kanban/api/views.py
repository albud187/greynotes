from kanban.models import (
    Project,
    TaskStatus,
    Task
)

from .serializers import (
    ProjectSerializer,
    TaskStatusSerializer,
    TaskSerializer,
    ProjectNameSerializer,
    TaskStatusNameSerialzer)

from rest_framework import viewsets
import random
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view

from django.core.serializers import serialize as SERIALIZE

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

class TaskStatusViewSet(viewsets.ModelViewSet):
    serializer_class = TaskStatusSerializer
    queryset = TaskStatus.objects.all()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

def FilterTask(tasking_status, input_project):
    task_by_status = Task.objects.filter(Task_Status=tasking_status)
    output_query = task_by_status.filter(Parent_Project = input_project)
    return(output_query)

class ProjectAndStatusTaskQuery(ListAPIView):
    serialzer_class = TaskSerializer

    def get_queryset(self):
        tasking_status = self.request.GET['taskingstatus']
        input_project = self.request.GET['inputproject']

        if tasking_status:
            target_queryset = FilterTask(tasking_status, input_project)
        return(target_queryset)
