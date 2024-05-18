from django.contrib import admin
from .models import Professor
# Register your models here.

admin.site.register(Professor)
# @admin.register(Professor)
class ProfessorAdmin(admin.ModelAdmin):
    list_display = ('user', 'matricule')