from django.db import models
from user_app.models import MyUser
from professor_app.models import Professor
from module_app.models import Module
# Create your models here.

#to-be imported from module app 
# class Subject(models.Model): 
#     name = models.CharField(max_length=100)
#     def __str__(self):
#         return self.name

#change passsword once login for the first time

#to-be changed on delete
class Forum(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE)

    updated = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return f"Forum ID: {self.id}, Updated: {self.module}"

class Post(models.Model):
    forum = models.ForeignKey(Forum, related_name='posts', on_delete=models.CASCADE)
    creator = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    post = models.ForeignKey(Post, related_name='replies', on_delete=models.CASCADE)
    creator = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply by {self.creator} on {self.post}"