from rest_framework import serializers

from articles.models import (
    NoteGroup,
    TextNote,
    ListNote,
    ListNoteEntry)

class NoteGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteGroup
        fields = '__all__'

class TextNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextNote
        fields =('id', 'author', 'title', 'content', 'note_group','note_group_name','archived','date_created')

class ListNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListNote
        fields =('id','author','note_group','title','archived','date_created' )

class ListNoteEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model=ListNoteEntry
        fields = '__all__'

#function related
class MemeTextSerializer(serializers.Serializer):
    textToMeme = serializers.CharField()

class GroupNameSerializer(serializers.Serializer):
    groupname = serializers.CharField()

class ListNotetitleSerializer(serializers.Serializer):
    listnotetitle= serializers.CharField()

class ListNoteIndexSerializer(serializers.Serializer):
    listnoteindex=serializers.CharField()
# class ListNote(models.Model):
#     note_group = models.ForeignKey(NoteGroup, null=True, blank=True, on_delete=models.SET_NULL)
#     title = models.CharField(max_length = 120)
#     archived = models.BooleanField(default=False)
#     date_created = models.DateField(auto_now=True)
#
#     def __str__(self):
#         return (str(self.date_created) +'_list_'+ self.title)
#
# class ListNoteEntry(models.Model):
#     parent_list = models.ForeignKey(ListNote, on_delete=models.CASCADE)
#     entry_text = models.TextField(null=True)
#     completed = models.BooleanField(default=False)
#
#     def __str__(self):
#         return(str(self.parent_list)+'-' +str(self.id))
#
#     @property
#     def ListNote_name(self):
#         return(self.parent_list.title)
