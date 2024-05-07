# module/serializers.py
from rest_framework import serializers
from module_app.models import Module

class ModuleUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'
