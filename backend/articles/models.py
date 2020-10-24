from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length = 120)
    content = models.TextField()

    def __str__(self):
        return self.title

# class NoteGroup(models.model):
#     name = models.CharField(max_length =120)
#
# class TextNote(models.Model):
#     grouping = models.ForeignKey(NoteGroup)
#     title = models.CharField(max_length = 120)
#     content = models.TextField()
#     archived = models.BooleanField(default=False)
#     date_created = 'models.datefield'
#
#     def __str__(self):
#         return self.title
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
