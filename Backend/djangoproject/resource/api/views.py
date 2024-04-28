from rest_framework import generics, permissions
from resource.models import Resource, QuizQuestion
from .serializers import ResourceSerializer, QuizQuestionSerializer
from django.shortcuts import get_object_or_404
from django.http import Http404

class ResourceListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ResourceSerializer
    
    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return Resource.objects.filter(module_id=module_id)

    def perform_create(self, serializer):
        # Associate the resource with the module
        module_id = self.kwargs['module_id']
        serializer.save(module_id=module_id)

class ResourceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ResourceSerializer
  

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return Resource.objects.filter(module_id=module_id)

class QuizQuestionListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = QuizQuestionSerializer

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return QuizQuestion.objects.filter(resource__module_id=module_id)

    def perform_create(self, serializer):
        resource_id = self.request.data.get('resource_id')
        if resource_id:
            resource = get_object_or_404(Resource, id=resource_id)
            serializer.save(resource=resource)
        else:
            serializer.save()



class QuizQuestionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuizQuestionSerializer
    queryset = QuizQuestion.objects.all()  # Add this line

    def get_object(self):
        module_id = self.kwargs.get('module_id')
        quiz_question_id = self.kwargs.get('pk')
        if module_id is None or quiz_question_id is None:
            raise Http404("Both module_id and quiz_question_id are required.")
        
        queryset = self.get_queryset()
        obj = queryset.filter(resource__module_id=module_id, id=quiz_question_id).first()
        if obj is None:
            raise Http404("Quiz question not found.")

        self.check_object_permissions(self.request, obj)
        return obj
