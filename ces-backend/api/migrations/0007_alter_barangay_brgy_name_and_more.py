# Generated by Django 5.0.7 on 2024-11-09 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_barangay_brgy_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='barangay',
            name='brgy_name',
            field=models.CharField(default='Unknown Barangay', max_length=100),
        ),
        migrations.AlterField(
            model_name='barangayapproval',
            name='barangay_name',
            field=models.CharField(default='Unknown Barangay', max_length=255),
        ),
        migrations.AlterField(
            model_name='brgyofficialaccount',
            name='name',
            field=models.CharField(default='Unknown Barangay', max_length=255),
        ),
        migrations.AlterField(
            model_name='externalparticipantevaluator',
            name='barangay',
            field=models.CharField(default='Unknown Barangay', max_length=255),
        ),
    ]
