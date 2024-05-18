from rest_framework import generics, permissions
# from resource.models import Resource, Homework, QuizQuestion
# from .serializers import ResourceSerializer, HomeworkSerializer, QuizQuestionSerializer
import random
import string
import csv
import io, csv, pandas as pd
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password 
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from student_app.models import Student
# from module_app.models import Module, Year
from .serializers import StudentSerializer
from user_app.models import MyUser
from user_app.api.serializers import UserSerializer, FileUploadSerializer

# class ResourceListView(generics.ListAPIView):
#     queryset = Resource.objects.all()
#     serializer_class = ResourceSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class ResourceDetailView(generics.RetrieveAPIView):
#     queryset = Resource.objects.all()
#     serializer_class = ResourceSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class QuizQuestionView(generics.RetrieveAPIView):
#     queryset = QuizQuestion.objects.all()
#     serializer_class = QuizQuestionSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class HomeworkCreateView(generics.CreateAPIView):
#     queryset = Homework.objects.all()
#     serializer_class = HomeworkSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(student=self.request.user)  # Automatically save the logged-in user as the student


class UploadStudentView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        
        print("request.data:", request.data)
        print("request.FILES:", request.FILES)
        
        file = request.FILES.get('file')
        year = request.data.get('year') 
        
        print("request.data:", request.data)
        print("request.FILES:", request.FILES)
        
        if not file or not year:
            print("Missing file or year")
            return Response({"error": "File or year is missing"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Log for debugging
        print(f"Received year: {year}")
        print(f"Received file: {file}")

        
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        # serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        
        try:
            reader = pd.read_csv(file)
            response_data = []
            
            print("CSV file columns:", reader.columns)
            
            for index, row in reader.iterrows():  # Iterate over rows using iterrows() method
                print(f"Processing row {index}: {row}")
                email = row['email']
                name = row['name']
                matricule = row['matricule']
                
                # Generate a random password for the professor
                password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
                
                # Create a new MyUser instance
                user = MyUser.objects.create_user(email=email, password=password, is_student=True, matricule=matricule, name=name)
                
                # Create a new student instance associated with the user
                student = Student(user=user, year=year)
                student.save()
                
                # Append professor's email and generated password to response data
                response_data.append({'email': email, 'password': password})
            
            # Create CSV response with professors' emails and passwords
            response = self.create_csv_response(response_data, year)
            return response
        
        except Exception as e:
            print("Exception occurred during CSV processing:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def create_csv_response(self, data, year):

        filename = f"student_passwords_{year}.csv"
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.writer(response)
        writer.writerow(['email', 'password'])
    
        for item in data:
            writer.writerow([item['email'], item['password']])
        
        return response

class StudentList(APIView):
     def get(self, request):

        users = Student.objects.filter()
        serializer = StudentSerializer(users, many=True)
        return Response(serializer.data)
    
    #  def post(self, request):
    #     password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        
    #     hashed_password = make_password(password)
        
    #     request.data['password'] = hashed_password
        
    #     module_id = request.data.get('module_id')
        
    #     module = get_object_or_404(Module, id=module_id)
        
        
        
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
   
    #         serializer.validated_data['is_professor'] = True
    #         serializer.save()
            
    #         response_data = serializer.data
    #         response_data['password'] = password
            
    #         return Response(response_data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
class StudentListYear(APIView):
    def get(self, request, year):
        
            students = MyUser.objects.filter(is_student=True, year=year)

            if not students.exists():
               return Response({'message': 'No students found for the specified year.'}, status=status.HTTP_204_NO_CONTENT)

            serializer = UserSerializer(students, many=True)
            return Response(serializer.data)