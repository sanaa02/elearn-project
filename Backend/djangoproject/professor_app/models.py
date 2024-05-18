from django.db import models
from user_app.models import MyUser
# from module_app.models import Module
# Create your models here.

class Professor(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    #modules = models.ForeignKey(Module, on_delete=models.CASCADE)
    #modules_id = models.ForeignKey(Module, on_delete=models.CASCADE, null=True) 
    def __str__(self):
        return str(self.user)



