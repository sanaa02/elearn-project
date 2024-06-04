import random
import string
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

from user_app.models import MyUser, File
from professor_app.api.serializers import ProfessorSerializer


class ProfessorUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    year = serializers.ChoiceField(choices=[
        ('1CPI', '1CPI'),
        ('2CPI', '2CPI'),
        ('1CS', '1CS'),
        ('2CS', '2CS'),
        ('3CS', '3CS'),
    ])


class SaveFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    professor_details = ProfessorSerializer(source='professor', read_only=True)

    class Meta:
        model = MyUser
        fields = ['id', 'email', 'name', 'matricule', 'professor_details']

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
    name = serializers.CharField(required=True)
    role = serializers.CharField(write_only=True, required=True)
    matricule = serializers.CharField(required=True)
    year = serializers.CharField(required=False)

    class Meta:
        model = MyUser
        fields = ['email', 'role', 'matricule', 'year', 'name']

    def create(self, validated_data):
        email = validated_data['email']
        role = validated_data['role']
        matricule = validated_data['matricule']
        name = validated_data.get('name')
        year = validated_data.get('year')

        if MyUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email address already used."})

        password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        is_superuser = is_professor = is_student = False

        if role == 'admin':
            is_superuser = True
        elif role == 'professor':
            is_professor = True
        elif role == 'student':
            is_student = True

        user = MyUser.objects.create_user(
            email=email,
            password=password,
            is_superuser=is_superuser,
            is_professor=is_professor,
            is_student=is_student,
            matricule=matricule,
            name=name
        )

        if is_student:
            if year is None:
                raise serializers.ValidationError({"year": "Year is required for student role."})
            user.year = year
            user.save()

        return user
