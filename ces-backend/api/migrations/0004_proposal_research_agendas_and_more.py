# Generated by Django 5.0.7 on 2024-11-08 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_account_accounttype_alter_account_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposal',
            name='research_agendas',
            field=models.ManyToManyField(blank=True, related_name='proposals', to='api.researchagenda'),
        ),
        migrations.AddField(
            model_name='proposalversion',
            name='research_agendas',
            field=models.ManyToManyField(blank=True, related_name='proposal_versions', to='api.researchagenda'),
        ),
    ]
