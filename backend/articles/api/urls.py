from articles.api.views import (
    NoteGroupViewSet,
    TextNoteViewSet,
    MemeTextView,
    QueryTextNotesView,
    ListNoteViewSet,
    ListNoteEntryViewSet,
    ListNoteEntrysListViewSet,
    QueryListNotesView,
    SortTextNoteByUserView,
    SortListNoteByUserView,
    SortNoteGroupByUserView
)

from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register('NoteGroups', NoteGroupViewSet, basename='NoteGroups')
router.register('TextNotes', TextNoteViewSet, basename='TextNotes')
router.register('ListNotes', ListNoteViewSet, basename='ListNotes')
router.register('ListNoteEntrysAll', ListNoteEntryViewSet, basename='ListNoteEntrys')
router.register('ListNoteEntrysList', ListNoteEntrysListViewSet, basename='ListNoteEntrysList')

function_views=[
    path('meme_text', MemeTextView.as_view(), name='meme_text'),
    path('query_text_notes', QueryTextNotesView.as_view(), name='query_text_notes'),
    path('query_list_notes', QueryListNotesView.as_view(), name='query_list_notes'),
    path('text_notes_by_user/', SortTextNoteByUserView.as_view(), name='text_notes_by_user'),
    path('list_notes_by_user/', SortListNoteByUserView.as_view(), name='list_notes_by_user'),
    path('notegroups_by_user', SortNoteGroupByUserView.as_view(), name='notegroups_by_user')
]

urlpatterns = router.urls + function_views
