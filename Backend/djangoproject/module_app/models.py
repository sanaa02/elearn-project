# module/models.py
from django.db import models
# from professor_app.models import Professor

class Module(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    # enseignant = models.CharField(max_length=100, null = True)
    # horaire = models.CharField(max_length=100)
    # contenu = models.TextField()
    coef = models.CharField(max_length=1)

    def __str__(self):
        return self.nom
