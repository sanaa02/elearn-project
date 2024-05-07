from django.db import models
from module_app.models import Module

class QuizQuestion(models.Model):
    resource = models.ForeignKey('Resource', on_delete=models.CASCADE)
    question = models.TextField()
    option_1 = models.CharField(max_length=100, blank=True)
    option_2 = models.CharField(max_length=100, blank=True)
    option_3 = models.CharField(max_length=100, blank=True)
    option_4 = models.CharField(max_length=100, blank=True)
    correct_option = models.IntegerField(choices=((1, 'Option 1'), (2, 'Option 2'), (3, 'Option 3'), (4, 'Option 4')), blank=True, null=True)

class Resource(models.Model):
    COURSE = 'C'
    TUTORIAL = 'TD'
    PRACTICAL_WORK = 'TP'
    ASSIGNMENT = 'A'
    QUIZ = 'Q'

    RESOURCE_TYPES = [
        (COURSE, 'Course'),
        (TUTORIAL, 'Tutorial'),
        (PRACTICAL_WORK, 'Practical Work'),
        (ASSIGNMENT, 'Assignment'),
         (QUIZ, 'Quiz'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    resource_type = models.CharField(max_length=2, choices=RESOURCE_TYPES)
    file = models.FileField(upload_to='resources/', blank=True, null=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
