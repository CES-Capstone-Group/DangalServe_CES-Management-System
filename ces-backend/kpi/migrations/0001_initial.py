# Generated by Django 5.0.7 on 2024-11-21 18:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='KpiTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Unknows KPI Title', max_length=255)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.department')),
            ],
        ),
        migrations.CreateModel(
            name='Kpi',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kpi_name', models.CharField(default='Unknown KPI Name', max_length=255)),
                ('target', models.CharField(default='Unknown Target', max_length=255)),
                ('quarterly_data', models.JSONField(default=dict)),
                ('kpi_table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='kpis', to='kpi.kpitable')),
            ],
        ),
    ]
