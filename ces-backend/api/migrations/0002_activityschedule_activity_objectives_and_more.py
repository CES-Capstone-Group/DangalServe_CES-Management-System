# Generated by Django 5.0.7 on 2024-11-19 01:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='activityschedule',
            name='activity_objectives',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='activityschedule',
            name='activity_venue',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='activityschedule',
            name='brgy',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='api.barangay'),
        ),
    ]