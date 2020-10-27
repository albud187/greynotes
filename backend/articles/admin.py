from django.contrib import admin
# Register your models here.
from .models import TextNote, NoteGroup, ListNote, ListNoteEntry

admin.site.register(TextNote)
admin.site.register(NoteGroup)

admin.site.register(ListNote)
admin.site.register(ListNoteEntry)
