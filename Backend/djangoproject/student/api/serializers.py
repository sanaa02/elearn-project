from rest_framework import serializers
from resource.models import Resource, Homework, QuizQuestion, QuizOption

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'resource_type', 'file', 'module']

class QuizQuestionSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()

    class Meta:
        model = QuizQuestion
        fields = ['id', 'question', 'score', 'resource', 'options']

    def get_options(self, obj):
        options = QuizOption.objects.filter(question=obj)
        return QuizOptionSerializer(options, many=True).data

class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ['id', 'text', 'is_correct']  # is_correct should not be exposed in actual student-facing API

class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = ['id', 'title', 'file', 'resource', 'student']
        read_only_fields = ['student']
