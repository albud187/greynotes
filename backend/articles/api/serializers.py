from rest_framework import serializers

from articles.models import (
    User,
    NoteGroup,
    TextNote,
    ListNote,
    ListNoteEntry)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = '__all__'
        
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
        fields =('id','author','note_group','note_group_name','title','archived','date_created', )

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
