from kanban.api.views import (
    ArticleViewSet,
    NoteGroupViewSet,
    TextNoteViewSet,
    MemeTextView
)
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('NoteGroups', NoteGroupViewSet, basename='NoteGroups')
router.register('TextNotes', TextNoteViewSet, basename='TextNotes')

function_views=[
    path('meme_text', MemeTextView.as_view(), name='meme_text')
]
urlpatterns = router.urls + function_views

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
