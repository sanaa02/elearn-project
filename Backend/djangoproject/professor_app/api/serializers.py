from rest_framework import serializers
from professor_app.models import Professor

class ProfessorSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    #is_professor = serializers.BooleanField(default=False)
    #file = serializers.FileField()
    class Meta:
        model = Professor
        fields = '__all__'

