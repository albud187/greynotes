from rest_framework import serializers

from articles.models import (
    Article,
    NoteGroup,
    TextNote,
    ListNote,
    ListNoteEntry)

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id','title', 'content')

class NoteGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteGroup
        fields = '__all__'

class TextNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextNote
        fields =('id', 'title', 'content', 'note_group','note_group_name','date_created')

class MemeTextSerializer(serializers.Serializer):
    textToMeme = serializers.CharField()

class GroupNameSerializer(serializers.Serializer):
    groupname = serializers.CharField()
