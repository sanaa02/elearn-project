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
from professor_app.models import Professor
from module_app.models import Module
from .serializers import ProfessorSerializer
from user_app.models import MyUser
from user_app.api.serializers import UserSerializer, FileUploadSerializer, ProfessorUploadSerializer

class ProfessorModuleList(APIView):
    def get(self, request, professor_id):
        try:
            professor = Professor.objects.get(id=professor_id)
            serializer = ProfessorSerializer(professor)
            professor_details = serializer.data.get('professor_details')
            if professor_details:
                modules = professor_details.get('modules', [])
                return Response(modules)
            else:
                return Response({"error": "No modules found for this professor"}, status=status.HTTP_404_NOT_FOUND)
        except Professor.DoesNotExist:
            return Response({"error": "Professor not found"}, status=status.HTTP_404_NOT_FOUND)
        
        
class UploadProfessorView(generics.CreateAPIView):
    serializer_class = ProfessorUploadSerializer
    
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        print("request.data:", request.data)
        try:
            reader = pd.read_csv(file)
            response_data = []
            
            for index, row in reader.iterrows():  # Iterate over rows using iterrows() method
                email = row['email']
                print("row", row)
                # Generate a random password for the professor
                password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
                
                # Create a new MyUser instance
                user = MyUser.objects.create_user(email=email, password=password, is_professor=True)
                
                # Create a new professor instance associated with the user
                professor = Professor(user=user)
                professor.save()
                
                # Append professor's email and generated password to response data
                response_data.append({'email': email, 'password': password})
            
            # Create CSV response with professors' emails and passwords
            response = self.create_csv_response(response_data)
            return response
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def create_csv_response(self, data):
        # Create CSV response with professors' emails and passwords
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="professor_passwords.csv"'

        writer = csv.writer(response)
        writer.writerow(['email', 'password'])
    
        for item in data:
            writer.writerow([item['email'], item['password']])
        
        return response
    
class ProfessorAvailable(APIView):
     def get(self, request):
        # Filter MyUser objects based on is_professor field
        professors_without_modules = Professor.objects.filter(modules__isnull=True)
        serializer = ProfessorSerializer(professors_without_modules, many=True)
        # users = MyUser.objects.filter(is_professor=True)
        # serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class ProfessorList(APIView):
     def get(self, request):
        # Filter MyUser objects based on is_professor field
        users = MyUser.objects.filter(is_professor=True)
        serializer = UserSerializer(users, many=True)
        # professors = ProfessorSerializer( many=True)
        # return Response(professors.data)
        return Response(serializer.data)
    
     def post(self, request):
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        
        hashed_password = make_password(password)
        
        request.data['password'] = hashed_password
        
        module_id = request.data.get('module_id')
        
        module = get_object_or_404(Module, id=module_id)
        
        
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Set is_professor to True before saving
            serializer.validated_data['is_professor'] = True
            serializer.save()
            
            response_data = serializer.data
            response_data['password'] = password
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #  def post(self, request):
    #    print("Request data:", request.data)  # This will always print

    # # Check if the request data contains the 'is_professor' field
    #    if 'is_professor' in request.data:
    #       is_professor = request.data['is_professor']
    #       print("Request data contains is_professor")  # Might not print if 'is_professor' is absent

    #       if is_professor:  # Check if 'is_professor' is True
    #            print("Request data contains is_professor (True)")  # Might not print if 'is_professor' is False
    #           # Create a new Professor instance
    #            serializer = ProfessorSerializer(data=request.data)
    #            if serializer.is_valid():
    #                print("Serializer is valid")
    #                serializer.save()
    #                return Response(serializer.data, status=status.HTTP_201_CREATED)  # Early return if successful
    #            else:
    #                print("Serializer errors:", serializer.errors)
    #                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Early return if errors

    #       else:  # 'is_professor' is False or absent
    #         return Response({"detail": "User is not a professor."}, status=status.HTTP_400_BAD_REQUEST)  # Early return

    #    else:  # 'is_professor' field not found
    #       return Response({"detail": "is_professor field is required."}, status=status.HTTP_400_BAD_REQUEST)  # Early return

    # Code here would never be reached due to earlier returns

class ProfessorDetail(APIView):
    def get_object(self, pk):
        return get_object_or_404(Professor, pk=pk)
    
    def get(self, request, pk):
        professor = self.get_object(pk)
        serializer = ProfessorSerializer(professor)
        return Response(serializer.data)
    
    # def put(self, request, pk):
    #     professor = self.get_object(pk)
    #     if 'is_professor' in request.data:
    #         is_professor = request.data['is_professor']
    #         # Handle updating is_professor field if necessary
    #         # For example, you might want to prevent changing is_professor status
    #         # Or perform some additional logic based on the change
    #         if is_professor != professor.user.is_professor:
    #             return Response({"detail": "Updating is_professor field not allowed."}, status=status.HTTP_400_BAD_REQUEST)
        
    #     serializer = ProfessorSerializer(professor, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        professor = self.get_object(pk)
        serializer = UserSerializer(professor, data=request.data)
        if serializer.is_valid():
            # Ensure is_professor is not modified during update
            if 'is_professor' in serializer.validated_data:
                del serializer.validated_data['is_professor']
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        professor = self.get_object(pk)
        professor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
