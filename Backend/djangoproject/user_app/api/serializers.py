import random
import string
from user_app.models import MyUser, File
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password 

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
class SaveFileSerializer(serializers.Serializer):
    class Meta:
        model = File
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'email', 'password']
        
        def create_user(self, validated_data):
          password = validated_data.pop('password')
          hashed_password = make_password(password)
          return MyUser.objects.create(password=hashed_password, **validated_data)
        
class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token


class RegistrationSerializer(serializers.ModelSerializer):
    #  password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    #  password2 = serializers.CharField(write_only=True, required=True)
     role = serializers.CharField(write_only=True, required=True)
    
    
     class Meta:
        model = MyUser
        fields = ['email', 'role']

    #  def validate(self, attrs):
    #      if attrs['password'] != attrs['password2']:
    #          raise serializers.ValidationError(
    #              {"password": "Password fields didn't match."})

    #      return attrs
     def create(self, validated_data):
        #  user = MyUser.objects.create(
        #      email=validated_data['email'],
        # )
         email = validated_data['email']
         role = validated_data['role']
         
         if MyUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email address already used."})

         # Generate a random password
         password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
         
         user = MyUser.objects.create_user(email=email, password=password)
         
        
        #  user.set_password(validated_data['password'])
        
        #  user.save()
        
         return user
            
        
