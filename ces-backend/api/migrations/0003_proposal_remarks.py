# Generated by Django 5.0.7 on 2024-11-19 03:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_account_failed_login_attempts_account_lockout_until'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposal',
            name='remarks',
            field=models.TextField(blank=True, help_text='Remarks for rejected proposals', null=True),
        ),
    ]