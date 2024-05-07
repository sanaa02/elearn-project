from rest_framework import serializers
from resource.models import Homework

class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ['title', 'file', 'resource', 'student']
        read_only_fields = ['student']  # Ensuring student is set to the logged-in user

