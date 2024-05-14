# Generated by Django 4.2.11 on 2024-05-13 22:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('student_app', '0003_alter_student_year'),
    ]

    operations = [
        migrations.CreateModel(
            name='Year',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(choices=[('year1', 'Year 1'), ('year2', 'Year 2'), ('year3', 'Year 3'), ('year4', 'Year 4'), ('year5', 'Year 5')], max_length=10, unique=True)),
            ],
        ),
        migrations.AlterField(
            model_name='student',
            name='year',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student_app.year'),
        ),
    ]
