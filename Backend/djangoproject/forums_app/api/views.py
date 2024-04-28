from rest_framework import generics
from forums_app.models import Forum, Post
from .serializers import ForumSerializer, PostSerializer

class ForumListCreate(generics.ListCreateAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

