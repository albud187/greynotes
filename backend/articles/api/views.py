from articles.models import Article, NoteGroup, TextNote
from .serializers import ArticleSerializer, NoteGroupSerializer, TextNoteSerializer

from rest_framework import viewsets

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()

class NoteGroupViewSet(viewsets.ModelViewSet):
    serializer_class = NoteGroupSerializer
    queryset = NoteGroup.objects.all()

class TextNoteViewSet(viewsets.ModelViewSet):
    serializer_class = TextNoteSerializer
    queryset = TextNote.objects.all()

def meme_text(text):
    output_text = text + text + str(len(text))
    return(output_text)
    
message = "test_message"
def meme_text_output(request):
    # if request.GET.get('textToMeme'):
    #     message = meme_text(request.GET['textToMeme'])
    #
    return JsonResponse({'meme_text_output':message})

# from rest_framework.generics import (
#     ListAPIView,
#     RetrieveAPIView,
#     CreateAPIView,
#     DestroyAPIView,
#     UpdateAPIView
# )
#
#
#
# class ArticleListView(ListAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
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
