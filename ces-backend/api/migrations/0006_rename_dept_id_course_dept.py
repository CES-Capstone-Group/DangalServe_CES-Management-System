# Generated by Django 5.0.7 on 2024-10-23 07:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_dept_course_dept_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='dept_id',
            new_name='dept',
        ),
    ]
