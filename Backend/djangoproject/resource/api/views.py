from rest_framework import generics, permissions
from resource.models import Resource, QuizQuestion, QuizOption
from .serializers import ResourceSerializer, QuizQuestionSerializer, QuizOptionSerializer
from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework.exceptions import ValidationError

class ResourceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return self.queryset.filter(module_id=module_id)

    def perform_create(self, serializer):
        module_id = self.kwargs['module_id']
        serializer.save(module_id=module_id)

class ResourceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return self.queryset.filter(module_id=module_id)

class QuizQuestionListCreateAPIView(generics.ListCreateAPIView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return self.queryset.filter(resource__module_id=module_id)

    def perform_create(self, serializer):
        resource_id = self.request.data.get('resource_id')
        if resource_id:
            resource = get_object_or_404(Resource, id=resource_id)
            serializer.save(resource=resource)
        else:
            serializer.save()

class QuizQuestionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

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

class QuizOptionListCreateAPIView(generics.ListCreateAPIView):
    queryset = QuizOption.objects.all()
    serializer_class = QuizOptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        quiz_question_id = self.kwargs.get('quiz_question_id')
        return self.queryset.filter(question_id=quiz_question_id)

    def perform_create(self, serializer):
        quiz_question_id = self.kwargs.get('quiz_question_id')
        if quiz_question_id:
            quiz_question = get_object_or_404(QuizQuestion, id=quiz_question_id)
            if quiz_question.options.count() >= QuizOption.MAX_OPTIONS_PER_QUESTION:
                raise ValidationError("A question cannot have more than {} options.".format(QuizOption.MAX_OPTIONS_PER_QUESTION))
            serializer.save(question=quiz_question)
        else:
            raise ValidationError("Quiz question ID is missing.")

class QuizOptionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = QuizOption.objects.all()
    serializer_class = QuizOptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        quiz_question_id = self.kwargs.get('quiz_question_id')
        quiz_option_id = self.kwargs.get('pk')
        if quiz_question_id is None or quiz_option_id is None:
            raise Http404("Both quiz_question_id and quiz_option_id are required.")
        
        queryset = self.get_queryset()
        obj = queryset.filter(question_id=quiz_question_id, id=quiz_option_id).first()
        if obj is None:
            raise Http404("Quiz option not found.")

        self.check_object_permissions(self.request, obj)
        return obj
