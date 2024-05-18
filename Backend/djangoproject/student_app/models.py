from django.conf import settings
from django.db import models
# from forums_app import views
# from user_app import permissions
from user_app.models import MyUser
from module_app.models import Year
from ressources_app.models import Ressource, QuizQuestion, QuizOption
from ressources_app.api.serializers import RessourceSerializer
from rest_framework.response import Response
# Create your models here.


class Student(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    year = models.ForeignKey(Year, on_delete=models.CASCADE)
    def __str__(self):
        return self.user
    


# class Homework(models.Model):
#     title = models.CharField(max_length=100)
#     file = models.FileField(upload_to='homework/')
#     resource = models.ForeignKey(Ressource, on_delete=models.CASCADE, related_name='student_homeworks') 
#     student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='homeworks')

#     def __str__(self):
#         return self.title
    
# class QuizResponse(models.Model):
#     student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_responses')
#     question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
#     selected_option = models.ForeignKey(QuizOption, on_delete=models.CASCADE)

#     def __str__(self):
#         return f"{self.student.username} - {self.question.question}"

# class ResourceListView(views.APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         student = request.user.profile
#         enrolled_modules = student.courses.all()
#         resources = Ressource.objects.filter(module__in=enrolled_modules).prefetch_related('module')
#         serializer = RessourceSerializer(resources, many=True)
#         return Response(serializer.data)

# class ResourceDownloadView(views.APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request, resource_id):
#         resource = Ressource.objects.filter(id=resource_id).first()
#         if not resource:
#             return Response({"message": "Resource not found."}, status=status.HTTP_404_NOT_FOUND)

#         student = request.user.profile
#         if resource.module not in student.courses.all():
#             return Response({"message": "Not authorized to access this resource."}, status=status.HTTP_403_FORBIDDEN)

#         try:
#             with resource.file.open() as file_handle:
#                 response = FileResponse(file_handle, content_type='application/octet-stream')
#                 response['Content-Length'] = resource.file.size
#                 response['Content-Disposition'] = f'attachment; filename="{resource.file.name}"'
#                 return response
#         except IOError:
#             return Response({"message": "File could not be opened."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

