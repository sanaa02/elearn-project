# Generated by Django 5.0.4 on 2024-04-24 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('module_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='coef',
            field=models.CharField(default=1, max_length=1),
            preserve_default=False,
        ),
    ]
