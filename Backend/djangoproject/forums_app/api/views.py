import json
from rest_framework import generics
from forums_app.models import Forum, Post, Reply
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ForumSerializer, PostSerializer, ReplySerializer
from rest_framework.pagination import PageNumberPagination
from user_app.models import MyUser

class ForumListCreate(generics.ListCreateAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer
    
    def get(self, request, *args, **kwargs):
        forum = Forum.objects.all().order_by('-updated')
        serializer = ForumSerializer(forum, many=True)
        return Response(serializer.data)
    
    # def post(self)

class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
#class GetForum(APIView):
    #def  get(request):
    # set pagination
        #paginator = PageNumberPagination()
        #paginator.page_size = 15
        #forum = Forum.objects.all().order_by('-updated')
        #result_page = paginator.paginate_queryset(threads, request)
        #serializer = ThreadSerializer(result_page, many=True)

        #return paginator.get_paginated_response(serializer.data)
    
    
class CreatePostView(APIView):
    def post(self, request):
        # get the data 
        data = request.data
        
        # handle unauthenticated user or invalid user
        try:
            userID =  data['creator']['user']['user_id']
        except TypeError:
            return Response(
                    {"res": "Unauthenticated user"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
        
        content = data['content']
        threadID = data['thread']
        
        if not all([content, threadID]):
            return Response(
                    {"res": "Invalid data"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # update reply count of the associated thread
        try:
            forum = Forum.objects.get(pk=threadID)
        except Forum.DoesNotExist:
            return Response(
                    {"res": "Invalid thread"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
              
        forum.replyCount += 1
        forum.save()
        
        # create new post object
        new_post = Post(
            content=content,
            creator=MyUser.objects.get(pk=userID),
            forum=forum
        )
        new_post.save()
        
        serializer = PostSerializer(new_post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CreateReplyView(APIView):
    def post(self, request):
        data = request.data
        post_id = data.get('post_id')
        creator_id = data.get('creator_id')
        content = data.get('content')

        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            return Response({"res": "Invalid post"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            creator = MyUser.objects.get(pk=creator_id)
        except MyUser.DoesNotExist:
            return Response({"res": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)

        reply = Reply.objects.create(post=post, creator=creator, content=content)
        serializer = ReplySerializer(reply)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
