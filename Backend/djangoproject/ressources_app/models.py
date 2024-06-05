from django.db import models
from django.forms import ValidationError
from module_app.models import Module
from django.conf import settings

class Ressource(models.Model):
    COURSE = 'C'
    TUTORIAL = 'TD'
    PRACTICAL_WORK = 'TP'
    HOMEWORK = 'H'
    QUIZ = 'Q'

    RESOURCE_TYPES = [
        (COURSE, 'Course'),
        (TUTORIAL, 'Tutorial'),
        (PRACTICAL_WORK, 'Practical Work'),
        (HOMEWORK, 'Homework'),
        (QUIZ, 'Quiz'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    resource_type = models.CharField(max_length=2, choices=RESOURCE_TYPES)
    file = models.FileField(upload_to='resources/', blank=True, null=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def total_score(self):
        return self.quiz_questions.aggregate(total_score=models.Sum('score'))['total_score'] or 0


class QuizQuestion(models.Model):
    resource = models.ForeignKey(Ressource, on_delete=models.CASCADE, related_name='quiz_questions')
    question = models.TextField()
    score = models.DecimalField(max_digits=5, decimal_places=2, help_text="The score or percentage this question is worth.")

    def __str__(self):
        return self.question


class QuizOption(models.Model):
    MAX_OPTIONS_PER_QUESTION = 4
    question = models.ForeignKey(QuizQuestion, related_name='options', on_delete=models.CASCADE)
    text = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

    def clean(self):
        # Check if the number of options for the question exceeds the maximum limit
        if self.question.options.count() >= self.MAX_OPTIONS_PER_QUESTION:
            raise ValidationError(
                ('A question cannot have more than %(max_options)d options.') % {'max_options': self.MAX_OPTIONS_PER_QUESTION}
            )


class QuizResponse(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_responses')
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(QuizOption, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.student.username} - {self.question.question}"


class Homework(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='homework/')
    ressource = models.ForeignKey(Ressource, on_delete=models.CASCADE, related_name='resource_homeworks')
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='homeworks')

    def __str__(self):
        return self.title
