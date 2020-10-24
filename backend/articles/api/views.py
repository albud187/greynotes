from articles.models import (
    Article,
    NoteGroup,
    TextNote,
    ListNote,
    ListNoteEntry)

from .serializers import (
    ArticleSerializer,
    NoteGroupSerializer,
    TextNoteSerializer,
    MemeTextSerializer)

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


from rest_framework.response import Response
from rest_framework import serializers, views

def mememify_text(input_text):
    output_text = ("ThIs TeXt is MemEd " +2*input_text)
    return(output_text)
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
