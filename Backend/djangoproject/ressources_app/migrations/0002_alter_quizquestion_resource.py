# Generated by Django 5.0.4 on 2024-05-21 12:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ressources_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quizquestion',
            name='resource',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_questions', to='ressources_app.ressource'),
        ),
    ]
