# Generated by Django 4.2.11 on 2024-05-13 22:53

from django.db import migrations, models
import module_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('module_app', '0007_remove_module_year_delete_year'),
    ]

    operations = [
        migrations.CreateModel(
            name='Year',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(choices=[('year1', 'Year 1'), ('year2', 'Year 2'), ('year3', 'Year 3'), ('year4', 'Year 4'), ('year5', 'Year 5')], max_length=10, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='module',
            name='year',
            field=models.CharField(default=None, max_length=10, verbose_name=module_app.models.Year),
            preserve_default=False,
        ),
    ]
