from django.contrib import admin
from .models import (
    Project,
    TaskStatus,
    Task
)
# Register your models here.

admin.site.register(Project)
admin.site.register(TaskStatus)
admin.site.register(Task)
