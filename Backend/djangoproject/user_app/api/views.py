import io, csv, pandas as pd
from rest_framework.exceptions import ParseError
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers, viewsets
from user_app.api.serializers import UserTokenObtainPairSerializer, UserSerializer, RegistrationSerializer, FileUploadSerializer
from user_app.models import MyUser, File
from rest_framework.decorators import action
from django.core.files.storage import FileSystemStorage
from django.core.exceptions import PermissionDenied
from django.contrib.auth.hashers import make_password
# Create your views here.

class UploadFileView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        
        try:
            reader = pd.read_csv(file)
            user_list = []
            
            for index, row in reader.iterrows():
                email = row['email']
                password = str(row['password']) 
                
                # Assuming MyUser model has 'email' and 'password' fields
                user_list.append(MyUser(email=email, password=make_password(password)))
            
            MyUser.objects.bulk_create(user_list)
            
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
# fs = FileSystemStorage(location='tmp/')

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     A ViewSet for viewing and editing Users.
#     """
#     queryset = MyUser.objects.all()
#     serializer_class = UserSerializer

#     def upload_data(self, request):
#         """Upload data from CSV"""
#         file = request.FILES.get("file")

#         if not file:
#             return Response("No file provided", status=status.HTTP_400_BAD_REQUEST)

#         content = file.read()  # These are bytes
#         file_content = ContentFile(content)
#         file_name = fs.save("_tmp.csv", file_content)
#         tmp_file = fs.path(file_name)

#         with open(tmp_file, errors="ignore") as csv_file:
#             reader = csv.reader(csv_file)
#             next(reader)  # Skip header row

#             user_list = []
#             for id_, row in enumerate(reader):
#                 email, password = row[:2]  # Assuming email and password are first two columns
#                 user_list.append(MyUser(email=email, password=password))

#             MyUser.objects.bulk_create(user_list)

#         return Response("Successfully uploaded the data", status=status.HTTP_201_CREATED)


# class UserUploadFromCSV(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         try:
#            file_obj = request.data['file']
#            decoded_file = file_obj.read().decode('utf-8').splitlines()
#            reader = csv.DictReader(decoded_file)
#            for row in reader:
#              serializer = UserSerializer(data=row)
#              if serializer.is_valid():
#                 serializer.save()
#              else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#            return Response("Users created successfully", status=status.HTTP_201_CREATED)
#         except KeyError:
#                 raise ParseError("The 'file' field is missing from the request data.")

class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer
   
class RegistrationView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    def perform_update(self, serializer):
        # Check if the user has permission to modify another user's information
        if self.request.user.is_staff or self.request.user == self.get_object():
            serializer.save()
        else:
            # Raise a permission denied exception if the user doesn't have permission
            raise PermissionDenied("You do not have permission to modify this user's information.")
    
@api_view (['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
    ]
    return Response(routes)
    
    
    
@api_view (['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = "Congratulations {request.user}, your API just responded to GET request"
        return Response({'response': data}, status = status.HTTP_200_OK)
    
    elif request.method == 'POST':
        text = "Hello babe"
        data = "Congratulations your API just responded to POST request with text: ${text}"
        return Response({'response': data}, status = status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)