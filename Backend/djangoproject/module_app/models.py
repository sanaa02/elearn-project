# module/models.py
from django.db import models
#from student_app.models import Year
from professor_app.models import Professor


# class Year(models.Model):
#     YEAR_CHOICES = [
#         ('year1', 'Year 1'),
#         ('year2', 'Year 2'),
#         ('year3', 'Year 3'),
#         ('year4', 'Year 4'),
#         ('year5', 'Year 5'),
#     ]
    
#     year = models.CharField(max_length=10, choices=YEAR_CHOICES, unique=True)

#     def __str__(self):
#         return self.get_year_display()


class Module(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    # enseignant = models.CharField(max_length=100, null = True)
    # horaire = models.CharField(max_length=100)
    # contenu = models.TextField()
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='modules')
    coef = models.CharField(max_length=1)
    SEMESTER_CHOICES = [
        ('semestre 1', 'semestre 1'),
        ('semestre 2','semestre 2'), 
    ]
    semester = models.CharField(max_length=11, choices=SEMESTER_CHOICES)
    YEAR_CHOICES = [
        ('1CPI', '1CPI'),
        ('2CPI','2CPI'),
        ('1CS','1CS'),
        ('2CS','2CS'),
        ('3CS','3CS'),
        # Add more choices as needed
    ]
    year = models.CharField(max_length=4, choices=YEAR_CHOICES) 
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='modules', null=True, blank=True)

    def __str__(self):
        return self.nom

