from articles.models import (
    NoteGroup,
    TextNote,
    ListNote,
    ListNoteEntry)

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
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, views

from django.core.serializers import serialize as SERIALIZE

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)

class NoteGroupViewSet(viewsets.ModelViewSet):
    serializer_class = NoteGroupSerializer
    queryset = NoteGroup.objects.all()

class TextNoteViewSet(viewsets.ModelViewSet):
    serializer_class = TextNoteSerializer
    queryset = TextNote.objects.all()

class ListNoteViewSet(viewsets.ModelViewSet):
    serializer_class= ListNoteSerializer
    queryset = ListNote.objects.all()

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
#https://stackoverflow.com/questions/27786308/django-and-rest-api-to-serve-calculation-based-requests
class MemeTextView(views.APIView):

    def get(self, request):
        # Validate the incoming input (provided through query parameters)
        serializer = MemeTextSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        # Get the model input
        data = serializer.validated_data
        textToMeme = data["textToMeme"]

        # Perform the complex calculations
        memed_text = mememify_text(textToMeme)

        # Return it in your custom format
        return Response({
            "complex_result": memed_text,
        })

def filterTextNote(grouping):
    groupname = NoteGroup.objects.filter(group_name=grouping)[0]
    target_query = TextNote.objects.filter(note_group=groupname)
    # target_query_json = []
    # for item in target_query:
    #     target_query_json.append(SERIALIZE('json',[item]))
    return(target_query)

class QueryTextNotesView(ListAPIView):
    serializer_class = TextNoteSerializer

    def get_queryset(self):
        grouping = self.request.GET['groupname']
        if grouping:
            print(grouping)
            target_queryset = filterTextNote(grouping)

        else:
            target_queryset = TextNote.objects.all()
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

# class ArticleListView(ListAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#


#
#
#
# class ArticleListView(ListAPIView):

#
# class ArticleDetailView(RetrieveAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#
# class ArticleCreateView(CreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#
# class ArticleDeleteView(DestroyAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#
# class ArticleUpdateView(UpdateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
