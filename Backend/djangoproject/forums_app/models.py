from django.db import models
from user_app.models import MyUser
from professor_app.models import Professor
# Create your models here.

#to-be imported from module app 
class Subject(models.Model): 
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name


#to-be changed on delete
class Forum(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.subject.name + " - " + self.professor.user.email

class Post(models.Model):
    forum = models.ForeignKey(Forum, related_name='posts', on_delete=models.CASCADE)
    creator = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

