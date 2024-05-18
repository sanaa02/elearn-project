# module/serializers.py
from rest_framework import serializers
from module_app.models import Module
from professor_app.models import Professor

# class YearSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Year
#         fields = ['id', 'name']

class ModuleUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class ProfessorEmailField(serializers.RelatedField):
    def to_representation(self, value):
        return value.user.email

    def to_internal_value(self, data):
        try:
            professor = Professor.objects.get(user__email=data)
            return professor
        except Professor.DoesNotExist:
            raise serializers.ValidationError("Professor with this email does not exist.")


class ModuleSerializer(serializers.ModelSerializer):
    professor = ProfessorEmailField(queryset=Professor.objects.all(), required=False)
    class Meta:
        model = Module
        fields = '__all__'
        
        
    # def create(self, validated_data):
    #     professor_email = self.initial_data.get('professor')
    #     if professor_email:
    #         try:
    #             professor = Professor.objects.get(user__email=professor_email)
    #             validated_data['professor'] = professor
    #         except Professor.DoesNotExist:
    #             raise serializers.ValidationError("Professor with this email does not exist.")
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     professor_email = self.initial_data.get('professor')
    #     if professor_email:
    #         try:
    #             professor = Professor.objects.get(user__email=professor_email)
    #             validated_data['professor'] = professor
    #         except Professor.DoesNotExist:
    #             raise serializers.ValidationError("Professor with this email does not exist.")
    #     return super().update(instance, validated_data)    
