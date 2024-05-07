# Generated by Django 4.2.11 on 2024-05-06 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('module_app', '0003_remove_module_contenu_remove_module_enseignant_and_more'),
        ('professor_app', '0002_professor_modules'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='professor',
            name='modules',
        ),
        migrations.AddField(
            model_name='professor',
            name='modules_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='module_app.module'),
        ),
    ]
