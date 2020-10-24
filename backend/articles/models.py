from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length = 120)
    content = models.TextField()

    def __str__(self):
        return self.title

class NoteGroup(models.Model):
    group_name = models.CharField(max_length=120)

    def __str__(self):
        return self.group_name

class TextNote(models.Model):
    note_group = models.ForeignKey(NoteGroup, null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length = 120)
    archived = models.BooleanField(default=False)
    date_created = models.DateField(auto_now=True)
    content = models.TextField()

    def __str__(self):
        return (str(self.date_created) +'_'+ self.title)

# class NoteGroup(models.model):
#     name = models.CharField(max_length =120)
#

# class ListNote(models.Model):
#     grouping = models.ForeignKey(NoteGroup)
#     title = models.CharField(max_length = 120)
#     content = models.TextField()
#     archived = models.BooleanField(default=False)
#     date_created = 'models.datefield'
#
#     def __str__(self):
#         return self.title
