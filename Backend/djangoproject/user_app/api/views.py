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
