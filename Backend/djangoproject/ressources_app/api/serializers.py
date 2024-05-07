from rest_framework import serializers
from ressources_app.models import Resource, QuizQuestion


class ResourceSerializer(serializers.ModelSerializer):
    module_id = serializers.IntegerField()  
    file = serializers.FileField(required=False, allow_null=True)  # Make file field optional

    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'resource_type', 'file', 'module_id']

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = '__all__'        
