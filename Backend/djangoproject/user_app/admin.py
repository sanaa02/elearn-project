from django.contrib import admin
from user_app.models import MyUser, Profile, File
from django.contrib.auth.hashers import make_password


class FileAdmin(admin.ModelAdmin):
    list_display = ["email"]

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email']


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user']

class CustomUserAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        if form.initial.get('password') != form.cleaned_data.get('password'):
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)

admin.site.register(MyUser, CustomUserAdmin)
admin.site.register( Profile,ProfileAdmin)
admin.site.register(File, FileAdmin)