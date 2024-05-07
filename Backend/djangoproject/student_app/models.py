from django.db import models
from user_app.models import MyUser
# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    def __str__(self):
        return self.user


