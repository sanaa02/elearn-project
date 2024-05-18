from django.urls import path
from .views import ForumListCreate, PostListCreate

urlpatterns = [
    path('forums/', ForumListCreate.as_view(), name='forum-list-create'),
    path('posts/', PostListCreate.as_view(), name='post-list-create'),
]