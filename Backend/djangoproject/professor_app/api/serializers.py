from rest_framework import serializers
from professor_app.models import Professor
from module_app.api.serializers import ModuleSerializer
class ProfessorSerializer(serializers.ModelSerializer):
    #email = serializers.EmailField()
    modules = ModuleSerializer(many=True, read_only=True)
    #is_professor = serializers.BooleanField(default=False)
    #file = serializers.FileField()
    class Meta:
        model = Professor
        fields = [ 'user', 'modules']

