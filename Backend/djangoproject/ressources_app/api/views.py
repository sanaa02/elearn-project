from rest_framework import generics, permissions
from rest_framework.exceptions import NotFound
from ressources_app.models import Ressource, QuizQuestion, QuizOption, Homework
from .serializers import RessourceSerializer, QuizQuestionSerializer, QuizOptionSerializer, HomeworkSerializer
from django.shortcuts import get_object_or_404
from django.http import FileResponse, Http404
from rest_framework.exceptions import ValidationError
from user_app.models import Profile
# from rest_framework.views import views
from rest_framework.views import APIView
from user_app.permissions import IsStudent, IsProfessor,IsAdmin
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
<<<<<<< HEAD

=======
from rest_framework.authentication import TokenAuthentication
>>>>>>> ferielmch
class RessourceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Ressource.objects.all()
    serializer_class = RessourceSerializer
    permission_classes = [permissions.IsAuthenticated]
<<<<<<< HEAD

=======
    authentication_classes = [TokenAuthentication]
>>>>>>> ferielmch
    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return self.queryset.filter(module_id=module_id)

    def perform_create(self, serializer):
        module_id = self.kwargs['module_id']
        serializer.save(module_id=module_id)

class RessourceListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            student = request.user.profile
        except Profile.DoesNotExist:
            raise NotFound("Profile does not exist for this user")
        
        
        enrolled_modules = student.courses.all()
        resources = Ressource.objects.filter(module__in=enrolled_modules).prefetch_related('module')
        serializer = RessourceSerializer(resources, many=True)
        return Response(serializer.data)


class RessourceDetailView(generics.RetrieveAPIView):
    queryset = Ressource.objects.all()
    serializer_class = RessourceSerializer
    permission_classes = [permissions.IsAuthenticated]


class RessourceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ressource.objects.all()
    serializer_class = RessourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return self.queryset.filter(module_id=module_id)

class ResourceDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, resource_id):
        resource = Ressource.objects.filter(id=resource_id).first()
        if not resource:
            return Response({"message": "Resource not found."}, status=status.HTTP_404_NOT_FOUND)

        student = request.user.profile
        if resource.module not in student.courses.all():
            return Response({"message": "Not authorized to access this resource."}, status=status.HTTP_403_FORBIDDEN)

        try:
            with resource.file.open() as file_handle:
                response = FileResponse(file_handle, content_type='application/octet-stream')
                response['Content-Length'] = resource.file.size
                response['Content-Disposition'] = f'attachment; filename="{resource.file.name}"'
                return response
        except IOError:
            return Response({"message": "File could not be opened."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class QuizQuestionListCreateAPIView(generics.ListCreateAPIView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        module_id = self.kwargs['module_id']
        return self.queryset.filter(resource__module_id=module_id)

    def perform_create(self, serializer):
        ressource_id = self.request.data.get('resource_id')
        if ressource_id:
            ressource = get_object_or_404(Ressource, id=ressource_id)
            serializer.save(ressource=ressource)
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

class QuizQuestionView(generics.RetrieveAPIView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]


class HomeworkCreateView(generics.CreateAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
<<<<<<< HEAD
        serializer.save(student=self.request.user)  # Automatically save the logged-in user as the student
=======
        serializer.save(student=self.request.user) 


class ProfessorHomeworkConsultView(generics.ListAPIView):
    serializer_class = HomeworkSerializer
    permission_classes = [IsProfessor] 

    def get_queryset(self):
        user = self.request.user
        professor_profile = user.profile
        return Homework.objects.filter(ressource__module__professor=professor_profile)
>>>>>>> ferielmch
