from kanban.api.views import (
    ProjectViewSet,
    ProjectTas
)
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()

function_views=[

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
