from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.template.defaultfilters import slugify
from datetime import datetime

# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=100)
    def save(self, *args, **kwargs):
            original_slug = slugify(self.group_name)
            queryset = Project.objects.all().filter(slug__iexact=original_slug).count()

            count = 1
            slug = original_slug
            while(queryset):
                slug = original_slug + '-' + str(count)
                count += 1
                queryset = Project.objects.all().filter(slug__iexact=slug).count()

            self.slug = slug

            # if self.featured:
            #     try:
            #         temp = Project.objects.get(featured=True)
            #         if self != temp:
            #             temp.featured = False
            #             temp.save()
            #     except Project.DoesNotExist:
            #         pass
            super(Project, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

class TaskStatus(models.Model):
    status = models.CharField(max_length=100)

class Task(models.Model):
    Parent_Project = models.ForeignKey(Project, null=True, blank=True, on_delete=models.SET_NULL)
    Task_status = models.ForeignKey(TaskStatus, on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)
    description = models.TextField()
