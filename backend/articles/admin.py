from django.contrib import admin
from .models import Article
# Register your models here.
from .models import TextNote, NoteGroup, ListNote, ListNoteEntry

admin.site.register(Article)
admin.site.register(TextNote)
admin.site.register(NoteGroup)

admin.site.register(ListNote)
admin.site.register(ListNoteEntry)
