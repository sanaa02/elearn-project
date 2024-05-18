# Generated by Django 4.2.11 on 2024-05-18 17:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('professor_app', '0005_remove_professor_modules_id'),
        ('module_app', '0008_year_module_year'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='professor',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='professor_app.professor'),
            preserve_default=False,
        ),
    ]
