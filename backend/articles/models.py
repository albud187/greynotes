from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.template.defaultfilters import slugify
from datetime import datetime
# Create your models here.

class NoteGroup(models.Model):
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)

    slug = models.SlugField(blank=True, null=True)

    group_name = models.CharField(max_length=120)

    def save(self, *args, **kwargs):
            original_slug = slugify(self.group_name)
            queryset = NoteGroup.objects.all().filter(slug__iexact=original_slug).count()

            count = 1
            slug = original_slug
            while(queryset):
                slug = original_slug + '-' + str(count)
                count += 1
                queryset = NoteGroup.objects.all().filter(slug__iexact=slug).count()

            self.slug = slug

            # if self.featured:
            #     try:
            #         temp = NoteGroup.objects.get(featured=True)
            #         if self != temp:
            #             temp.featured = False
            #             temp.save()
            #     except NoteGroup.DoesNotExist:
            #         pass
            super(NoteGroup, self).save(*args, **kwargs)

    def __str__(self):
        return self.group_name

    @property
    def note_group_name(self):
        return(self.group_name)


class TextNote(models.Model):
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    note_group = models.ForeignKey(NoteGroup, null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length = 120)
    archived = models.BooleanField(default=False)
    date_created = models.DateField(auto_now=True)
    content = models.TextField()

    def __str__(self):
        return (str(self.date_created) +'_text_'+ self.title)

    @property
    def note_group_name(self):
        return(self.note_group.group_name)

class ListNote(models.Model):
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    note_group = models.ForeignKey(NoteGroup, null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length = 120)
    archived = models.BooleanField(default=False)
    date_created = models.DateField(auto_now=True)

    def __str__(self):
        return (str(self.date_created) +'_list_'+ self.title)

    @property
    def note_group_name(self):
        return(self.note_group.group_name)

class ListNoteEntry(models.Model):
    parent_list = models.ForeignKey(ListNote, on_delete=models.CASCADE)
    entry_text = models.TextField(null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return(str(self.parent_list)+'-' +str(self.id))

    @property
    def ListNote_name(self):
        return(self.parent_list.title)
