# Generated by Django 5.0.7 on 2024-09-22 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_delete_customauthtoken'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposal',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending', max_length=20),
        ),
    ]
