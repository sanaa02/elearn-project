from rest_framework import serializers
from ressources_app.models import Ressource, QuizQuestion, QuizOption, Ressource, Homework


class RessourceSerializer(serializers.ModelSerializer):
    module_id = serializers.IntegerField()  
    file = serializers.FileField(required=False, allow_null=True)  # Make file field optional

    class Meta:
        model = Ressource
        fields = ['id', 'title', 'description', 'resource_type', 'file', 'module_id']

class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ['id','question_id','text', 'is_correct']

class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizOptionSerializer(many=True, read_only=True)

    class Meta:
        model = QuizQuestion
        fields = ['id', 'ressource', 'question', 'score', 'options']    

class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ['id', 'title', 'file', 'resource', 'student']
        read_only_fields = ['student']
