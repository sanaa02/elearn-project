from rest_framework import serializers
from ressources_app.models import Resource, QuizQuestion


class ResourceSerializer(serializers.ModelSerializer):
    module_id = serializers.IntegerField()  
    file = serializers.FileField(required=False, allow_null=True)  # Make file field optional

    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'resource_type', 'file', 'module_id']

class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ['id','question_id','text', 'is_correct']

class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizOptionSerializer(many=True, read_only=True)

    class Meta:
        model = QuizQuestion
        fields = ['id', 'resource', 'question', 'score', 'options']    
