from articles.api.views import ArticleViewSet, NoteGroupViewSet, TextNoteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('NoteGroups', NoteGroupViewSet, basename='NoteGroups')
router.register('TextNotes', TextNoteViewSet, basename='TextNotes')

urlpatterns = router.urls
#
# from django.urls import path, include
#
# from .views import (
#     ArticleListView,
#     ArticleDetailView,
#     ArticleCreateView,
#     ArticleUpdateView,
#     ArticleDeleteView
# )
#
# urlpatterns = [
#     path('', ArticleListView.as_view()),
#     path('create/', ArticleCreateView.as_view()),
#     path('<pk>', ArticleDetailView.as_view()),
#     path('<pk>/update/', ArticleUpdateView.as_view()),
#     path('<pk>/delete/', ArticleDeleteView.as_view())
# ]
