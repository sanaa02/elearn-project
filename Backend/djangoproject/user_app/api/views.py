
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from user_app.api.serializers import UserTokenObtainPairSerializer 
# Create your views here.


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer
   
# class RegistrationView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = RegistrationSerializer
    
    
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