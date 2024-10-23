# Generated by Django 5.0.7 on 2024-10-16 00:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivitySchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_title', models.CharField(max_length=255)),
                ('target_date', models.DateField()),
                ('target_time', models.TimeField(blank=True, null=True)),
                ('file', models.FileField(blank=True, max_length=25, null=True, upload_to='activity_files/')),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.proposal')),
            ],
        ),
    ]
