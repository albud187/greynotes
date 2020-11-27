from articles.models import (
    NoteGroup,
    TextNote,
    ListNote,
    ListNoteEntry,
    User)

from .serializers import (
    NoteGroupSerializer,
    TextNoteSerializer,
    MemeTextSerializer,
    GroupNameSerializer,
    ListNoteSerializer,
    ListNoteEntrySerializer,
    ListNotetitleSerializer,)

import json
from rest_framework import viewsets
import random
from rest_framework import serializers, views
from rest_framework.authtoken.models import Token

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

class NoteGroupViewSet(viewsets.ModelViewSet):
    serializer_class = NoteGroupSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return NoteGroup.objects.all()
        else:
            return NoteGroup.objects.filter(author=self.request.user)

class TextNoteViewSet(viewsets.ModelViewSet):
    serializer_class = TextNoteSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return TextNote.objects.all()
        else:
            return TextNote.objects.filter(author=self.request.user)


class ListNoteViewSet(viewsets.ModelViewSet):
    serializer_class= ListNoteSerializer
    queryset = ListNote.objects.all()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return ListNote.objects.all()
        else:
            return ListNote.objects.filter(author=self.request.user)

class ListNoteEntryViewSet(viewsets.ModelViewSet):
    serializer_class = ListNoteEntrySerializer
    queryset = ListNoteEntry.objects.all()


def mememify_text(input_text):
    meme_text_dict = {'E':'3', 'A':'4', 'I':'1','V':'\/','W':'\/\/','T':'7', 'S':'5'}
    meme_text_dict_list = list(meme_text_dict.keys())
    new_str=''
    for char in input_text:
        random_number = random.randint(1,2)
        if random_number ==1:
            char=char.lower()
        if random_number==2:
            char=char.upper()
        if char in meme_text_dict_list:
            random_number_two = random.randint(1,2)
            if random_number_two ==1:
                char = meme_text_dict[char]
            if random_number_two ==2:
                char = char
        new_str = new_str+char
    return(new_str)
class MemeTextView(views.APIView):

    def get(self, request):
        serializer = MemeTextSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        textToMeme = data["textToMeme"]

        memed_text = mememify_text(textToMeme)

        return Response({
            "complex_result": memed_text,
        })

def filterTextNote(grouping,userid):
    groupname = NoteGroup.objects.filter(group_name=grouping)[0]
    target_query = TextNote.objects.filter(note_group=groupname)
    target_query = target_query.filter(author=userid)
    return(target_query)

class QueryTextNotesView(ListAPIView):
    serializer_class = TextNoteSerializer

    def get_queryset(self):
        grouping = self.request.GET['groupname']
        userid=self.request.GET['userid']
        if grouping:
            target_queryset = filterTextNote(grouping,userid)

        else:
            target_queryset = TextNote.objects.filter(author=userid)
        return(target_queryset)

def filterListNoteEntry(parentlist):
    parentlist=ListNote.objects.filter(id=parentlist)[0]
    target_query=ListNoteEntry.objects.filter(parent_list=parentlist)
    return(target_query)

class ListNoteEntrysListViewSet(viewsets.ModelViewSet):
    serializer_class=ListNoteEntrySerializer

    def get_queryset(self):
        parentlist = self.request.GET['parentlist']
        if parentlist:
            print(parentlist)
            target_queryset = filterListNoteEntry(parentlist)
        return(target_queryset)

def filterListNote(grouping,userid):
    groupname = NoteGroup.objects.filter(group_name=grouping)[0]
    target_query = ListNote.objects.filter(note_group=groupname)
    target_query = target_query.filter(author=userid)

    return(target_query)

class QueryListNotesView(ListAPIView):
    serializer_class = ListNoteSerializer

    def get_queryset(self):
        grouping = self.request.GET['groupname']
        userid=self.request.GET['userid']
        if grouping:
            target_queryset = filterListNote(grouping,userid)

        else:
            target_queryset = ListNote.objects.filter(author=userid)
        return(target_queryset)


def filterTextNoteUser(userid):
    target_query = TextNote.objects.filter(author=userid)

    return(target_query)

class SortTextNoteByUserView(ListAPIView):
    serializer_class = TextNoteSerializer

    def get_queryset(self):
        token = self.request.GET['token']
        userid= Token.objects.filter(key=token)[0].user.id
        if userid:
            target_queryset = reversed(filterTextNoteUser(userid))
        return(target_queryset)

def filterListNoteUser(userid):
    target_query = ListNote.objects.filter(author=userid)

    return(target_query)

class SortListNoteByUserView(ListAPIView):
    serializer_class = ListNoteSerializer

    def get_queryset(self):
        token = self.request.GET['token']
        userid= Token.objects.filter(key=token)[0].user.id
        if userid:
            target_queryset = reversed(filterListNoteUser(userid))
        return(target_queryset)

def filterNoteGroupUser(userid):
    target_query = NoteGroup.objects.filter(author=userid)
    return(target_query)

class SortNoteGroupByUserView(ListAPIView):
    serializer_class = NoteGroupSerializer

    def get_queryset(self):
        token = self.request.GET['token']
        userid= Token.objects.filter(key=token)[0].user.id
        target_queryset =filterNoteGroupUser(userid)
        return(target_queryset)
