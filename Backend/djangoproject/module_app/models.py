# module/models.py
from django.db import models
#from student_app.models import Year
# from professor_app.models import Professor


class Year(models.Model):
    YEAR_CHOICES = [
        ('year1', 'Year 1'),
        ('year2', 'Year 2'),
        ('year3', 'Year 3'),
        ('year4', 'Year 4'),
        ('year5', 'Year 5'),
    ]
    
    year = models.CharField(max_length=10, choices=YEAR_CHOICES, unique=True)

    def __str__(self):
        return self.get_year_display()


class Module(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    # enseignant = models.CharField(max_length=100, null = True)
    # horaire = models.CharField(max_length=100)
    # contenu = models.TextField()
    #professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='modules')
    coef = models.CharField(max_length=1)
    year = models.CharField(Year,max_length=10)

    def __str__(self):
        return self.nom

