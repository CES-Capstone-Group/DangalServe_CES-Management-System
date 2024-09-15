# Generated by Django 5.0.7 on 2024-09-14 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('accountID', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('accountType', models.CharField(max_length=255)),
                ('department', models.CharField(blank=True, max_length=255, null=True)),
                ('position', models.CharField(max_length=255, null=True)),
                ('activationDate', models.DateField()),
                ('deactivationDate', models.DateField(blank=True, null=True)),
                ('status', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('details', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='announcements/')),
            ],
        ),
        migrations.CreateModel(
            name='ResearchAgenda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='research_agenda_images/')),
            ],
        ),
    ]