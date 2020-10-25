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
        fields = ('slug', 'group_name')

class TextNoteSerializer(serializers.ModelSerializer):
    note_group = NoteGroupSerializer()
    class Meta:
        model = TextNote
        fields =('id', 'title', 'content', 'note_group','date_created')

class MemeTextSerializer(serializers.Serializer):
    textToMeme = serializers.CharField()
