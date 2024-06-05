# # <<<<<<< HEAD
# # import string
# # import random
# # from django.http import HttpResponse, JsonResponse
# # import io, csv, pandas as pd
# # =======
# import random
# import string
# from django.http import HttpResponse, JsonResponse
# import pandas as pd
# # >>>>>>> ferielmch
# from rest_framework.exceptions import ParseError
# from rest_framework.views import APIView
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework import generics, permissions, status
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework_simplejwt.views import TokenObtainPairView
# from django.core.files.storage import FileSystemStorage
# from django.core.exceptions import PermissionDenied
# from django.contrib.auth.hashers import make_password
# from django.utils.crypto import get_random_string
# from django.contrib.auth.password_validation import validate_password
# # <<<<<<< HEAD
# from student_app.models import Student
# from professor_app.models import Professor
# # Create your views here.
  
  
# class UploadFileView(generics.CreateAPIView):
#     serializer_class = FileUploadSerializer
# # =======
# from user_app.models import MyUser, File
# from user_app.api.serializers import UserTokenObtainPairSerializer, UserSerializer, RegistrationSerializer, FileUploadSerializer
# from student_app.models import Student
# from professor_app.models import Professor
# import csv
# class UploadFileView(generics.CreateAPIView):
#     serializer_class = FileUploadSerializer
#     parser_classes = [MultiPartParser, FormParser]
# >>>>>>> ferielmch

#     def post(self, request, *args, **kwargs):
#         file = request.FILES.get('file')

#         try:
#             reader = pd.read_csv(file)
#             user_list = []
#             response_data = []

#             for index, row in reader.iterrows():
#                 email = row['email']
#                 password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
#                 hashed_password = make_password(password)
#                 role = row.get('role', '').lower()

#                 if role == 'professor':
#                     user = MyUser(email=email, password=hashed_password, is_professor=True)
#                 elif role == 'student':
#                     user = MyUser(email=email, password=hashed_password, is_student=True)
#                 else:
# <<<<<<< HEAD
#                     # Skip rows with invalid role values
# =======
# >>>>>>> ferielmch
#                     continue

#                 user.save()
#                 user_list.append(user)
#                 response_data.append({'email': email, 'password': password, 'role': role})

#             response = self.create_csv_response(response_data)
#             return response

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#     def create_csv_response(self, data):
#         response = HttpResponse(content_type='text/csv')
#         response['Content-Disposition'] = 'attachment; filename="user_passwords.csv"'

#         writer = csv.writer(response)
#         writer.writerow(['email', 'password', 'role'])

#         for item in data:
#             writer.writerow([item['email'], item['password'], item['role']])

#         return response

# <<<<<<< HEAD
  
 
# class UserTokenObtainPairView(TokenObtainPairView):
#     serializer_class = UserTokenObtainPairSerializer
   
# =======

# class UserTokenObtainPairView(TokenObtainPairView):
#     serializer_class = UserTokenObtainPairSerializer


# >>>>>>> ferielmch
# class RegistrationView(generics.CreateAPIView):
#     queryset = MyUser.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = RegistrationSerializer
# <<<<<<< HEAD
#     def perform_update(self, serializer):
#         # Check if the user has permission to modify another user's information
#         if self.request.user.is_staff or self.request.user == self.get_object():
#             serializer.save()
#         else:
#             # Raise a permission denied exception if the user doesn't have permission
#             raise PermissionDenied("You do not have permission to modify this user's information.")
        
#     # def create(self, request, *args, **kwargs):
#     #     serializer = self.get_serializer(data=request.data)
#     #     serializer.is_valid(raise_exception=True)
#     #     user = serializer.save()
        
#     #     # return the generated password in the response
#     #     response_data = {
#     #         "email": user.email,
#     #         "role": user.role,
#     #         "password": user.password  # Note: This password is hashed in the database
#     #     }

#     #     return Response(response_data, status=status.HTTP_201_CREATED)    
#     def create(self, request, *args, **kwargs):
#         print(request.data)
# =======

#     def perform_update(self, serializer):
#         if self.request.user.is_staff or self.request.user == self.get_object():
#             serializer.save()
#         else:
#             raise PermissionDenied("You do not have permission to modify this user's information.")

#     def create(self, request, *args, **kwargs):
# >>>>>>> ferielmch
#         role = request.data.get('role')
#         matricule = request.data.get('matricule')
#         name = request.data.get('name')
#         year = request.data.get('year')
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
# <<<<<<< HEAD
        
#         password_length = 12 
#         password = get_random_string(length=password_length)
#         validate_password(password)
#         hashed_password = make_password(password)
        
        
#         user = serializer.save(password=hashed_password, matricule=matricule, name=name)
#         if role == 'student': 
#             student = Student(user=user, year=year)
#             student.save()
            
#         if role == 'professor': 
#             professor = Professor(user=user)
#             professor.save()
            
#         response_data = {
#             "email": user.email,
#             "role": role,
#             "password": password #  hashed in db
#         }
        
#         return Response(response_data, status=status.HTTP_201_CREATED)
    


# @api_view (['GET'])
# def list_users(request):
#     # Query all users and retrieve their IDs
#     users = MyUser.objects.all().values('id', 'email', 'is_professor', 'is_student')  # You can include other fields as needed

#     # Serialize the query results into JSON format
#     serialized_users = list(users)

#     # Return the serialized data as a JSON response
#     return Response(serialized_users)

    
# @api_view (['GET'])
# # =======

#         password_length = 12
#         password = get_random_string(length=password_length)
#         validate_password(password)
#         hashed_password = make_password(password)

#         user = serializer.save(password=hashed_password, matricule=matricule, name=name)
#         if role == 'student':
#             student = Student(user=user, year=year)
#             student.save()
#         elif role == 'professor':
#             professor = Professor(user=user)
#             professor.save()

#         response_data = {
#             "email": user.email,
#             "role": role,
#             "password": password
#         }

#         return Response(response_data, status=status.HTTP_201_CREATED)


# @api_view(['GET'])
# def list_users(request):
#     users = MyUser.objects.all().values('id', 'email', 'is_professor', 'is_student')
#     serialized_users = list(users)
#     return Response(serialized_users)


# @api_view(['GET'])
# # >>>>>>> ferielmch
# def getRoutes(request):
#     routes = [
#         '/api/token/',
#         '/api/register/',
#         '/api/token/refresh/',
#         '/upload-file/',
#         '/list-users/',
#         '/test/',
# # <<<<<<< HEAD
#     ]
#     return Response(routes)
    

# @api_view (['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def testEndPoint(request):
#     if request.method == 'GET':
#         data = "Congratulations {request.user}, your API just responded to GET request"
#         return Response({'response': data}, status = status.HTTP_200_OK)
    
#     elif request.method == 'POST':
#         text = "Hello babe"
#         data = "Congratulations your API just responded to POST request with text: ${text}"
#         return Response({'response': data}, status = status.HTTP_200_OK)
#     return Response({}, status.HTTP_400_BAD_REQUEST)


 
  
# # class UploadFileView(generics.CreateAPIView):
# #     serializer_class = FileUploadSerializer
    
# #     def post(self, request, *args, **kwargs):
# #         file = request.FILES.get('file')
        
# #         # serializer = self.get_serializer(data=request.data)
# #         # serializer.is_valid(raise_exception=True)
# #         # file = serializer.validated_data['file']
        
# #         try:
# #             reader = pd.read_csv(file)
# #             user_list = []
# #             response_data = []
            
# #             for index, row in reader.iterrows():
# #                 email = row['email']
# #                 # password = str(row['password']) 
# #                 password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
# #                 hashed_password = make_password(password)
# #                 # MyUser model has 'email' fields
# #                 user_list.append(MyUser(email=email, password=hashed_password))
                
# #                 response_data.append({'email': email, 'password': password})
            
# #             MyUser.objects.bulk_create(user_list)
# #             response = self.create_csv_response(response_data)
# #             # return Response({"status": "success"}, status=status.HTTP_201_CREATED)
# #             return response
        
# #         except Exception as e:
# #             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


# #     def create_csv_response(request, data):
# #     # Create CSV response with users' emails and passwords
# #         response = HttpResponse(content_type='text/csv')
# #         response['Content-Disposition'] = 'attachment; filename="user_passwords.csv"'

# #         writer = csv.writer(response)
# #         writer.writerow(['email', 'password'])
    
# #         for item in data:
# #            writer.writerow([item['email'], item['password']])
        
      
# #         return response


# # fs = FileSystemStorage(location='tmp/')

# # class UserViewSet(viewsets.ModelViewSet):
# #     """
# #     A ViewSet for viewing and editing Users.
# #     """
# #     queryset = MyUser.objects.all()
# #     serializer_class = UserSerializer

# #     def upload_data(self, request):
# #         """Upload data from CSV"""
# #         file = request.FILES.get("file")

# #         if not file:
# #             return Response("No file provided", status=status.HTTP_400_BAD_REQUEST)

# #         content = file.read()  # These are bytes
# #         file_content = ContentFile(content)
# #         file_name = fs.save("_tmp.csv", file_content)
# #         tmp_file = fs.path(file_name)

# #         with open(tmp_file, errors="ignore") as csv_file:
# #             reader = csv.reader(csv_file)
# #             next(reader)  # Skip header row

# #             user_list = []
# #             for id_, row in enumerate(reader):
# #                 email, password = row[:2]  # Assuming email and password are first two columns
# #                 user_list.append(MyUser(email=email, password=password))

# #             MyUser.objects.bulk_create(user_list)

# #         return Response("Successfully uploaded the data", status=status.HTTP_201_CREATED)


# # class UserUploadFromCSV(APIView):
# #     parser_classes = (MultiPartParser, FormParser)

# #     def post(self, request):
# #         try:
# #            file_obj = request.data['file']
# #            decoded_file = file_obj.read().decode('utf-8').splitlines()
# #            reader = csv.DictReader(decoded_file)
# #            for row in reader:
# #              serializer = UserSerializer(data=row)
# #              if serializer.is_valid():
# #                 serializer.save()
# #              else:
# #                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# #            return Response("Users created successfully", status=status.HTTP_201_CREATED)
# #         except KeyError:
# #                 raise ParseError("The 'file' field is missing from the request data.")
# # =======
#         '/upload-file/',
#         '/list-users/',
#         '/test/',
#     ]
#     return Response(routes)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def testEndPoint(request):
#     if request.method == 'GET':
#         data = f"Congratulations {request.user}, your API just responded to GET request"
#         return Response({'response': data}, status=status.HTTP_200_OK)

#     elif request.method == 'POST':
#         text = request.data.get('text', '')
#         data = f"Congratulations your API just responded to POST request with text: {text}"
#         return Response({'response': data}, status=status.HTTP_200_OK)

#     return Response({}, status=status.HTTP_400_BAD_REQUEST)
# # >>>>>>> ferielmch

import random
import string
from django.http import HttpResponse, JsonResponse
import pandas as pd
from rest_framework.exceptions import ParseError
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.files.storage import FileSystemStorage
from django.core.exceptions import PermissionDenied
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from django.contrib.auth.password_validation import validate_password
from user_app.models import MyUser, File
from user_app.api.serializers import UserTokenObtainPairSerializer, UserSerializer, RegistrationSerializer, FileUploadSerializer
from student_app.models import Student
from professor_app.models import Professor
import csv
class UploadFileView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        try:
            reader = pd.read_csv(file)
            user_list = []
            response_data = []

            for index, row in reader.iterrows():
                email = row['email']
                password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
                hashed_password = make_password(password)
                role = row.get('role', '').lower()

                if role == 'professor':
                    user = MyUser(email=email, password=hashed_password, is_professor=True)
                elif role == 'student':
                    user = MyUser(email=email, password=hashed_password, is_student=True)
                else:
                    continue

                user.save()
                user_list.append(user)
                response_data.append({'email': email, 'password': password, 'role': role})

            response = self.create_csv_response(response_data)
            return response

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def create_csv_response(self, data):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="user_passwords.csv"'

        writer = csv.writer(response)
        writer.writerow(['email', 'password', 'role'])

        for item in data:
            writer.writerow([item['email'], item['password'], item['role']])

        return response


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


class RegistrationView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def perform_update(self, serializer):
        if self.request.user.is_staff or self.request.user == self.get_object():
            serializer.save()
        else:
            raise PermissionDenied("You do not have permission to modify this user's information.")

    def create(self, request, *args, **kwargs):
        role = request.data.get('role')
        matricule = request.data.get('matricule')
        name = request.data.get('name')
        year = request.data.get('year')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password_length = 12
        password = get_random_string(length=password_length)
        validate_password(password)
        hashed_password = make_password(password)

        user = serializer.save(password=hashed_password, matricule=matricule, name=name)
        if role == 'student':
            student = Student(user=user, year=year)
            student.save()
        elif role == 'professor':
            professor = Professor(user=user)
            professor.save()

        response_data = {
            "email": user.email,
            "role": role,
            "password": password
        }

        return Response(response_data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def list_users(request):
    users = MyUser.objects.all().values('id', 'email', 'is_professor', 'is_student')
    serialized_users = list(users)
    return Response(serialized_users)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/upload-file/',
        '/list-users/',
        '/test/',
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulations {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        text = request.data.get('text', '')
        data = f"Congratulations your API just responded to POST request with text: {text}"
        return Response({'response': data}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)
