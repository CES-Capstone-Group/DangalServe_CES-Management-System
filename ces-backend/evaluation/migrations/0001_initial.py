# Generated by Django 5.0.7 on 2024-11-21 18:03

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('question_id', models.AutoField(primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=255)),
                ('is_fixed', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='RatingOpt',
            fields=[
                ('option_id', models.AutoField(primary_key=True, serialize=False)),
                ('value', models.IntegerField()),
                ('label', models.CharField(max_length=50)),
                ('option_order', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EvaluationType',
            fields=[
                ('evaluation_type_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_evaluation_types', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_evaluation_types', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EvaluationForm',
            fields=[
                ('form_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('activity_schedule_id', models.IntegerField(blank=True, null=True)),
                ('proposal_id', models.IntegerField(blank=True, null=True)),
                ('status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive')], default='inactive', max_length=10)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_forms', to=settings.AUTH_USER_MODEL)),
                ('evaluation_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='forms', to='evaluation.evaluationtype')),
            ],
        ),
        migrations.CreateModel(
            name='FormSection',
            fields=[
                ('form_section_id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='form_sections', to='evaluation.evaluationform')),
            ],
        ),
        migrations.CreateModel(
            name='MultipleChoiceOpt',
            fields=[
                ('option_id', models.AutoField(primary_key=True, serialize=False)),
                ('value', models.IntegerField()),
                ('label', models.CharField(max_length=50)),
                ('option_order', models.IntegerField(blank=True, null=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_options', to='evaluation.question')),
            ],
        ),
        migrations.CreateModel(
            name='FormQuestion',
            fields=[
                ('form_question_id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('form_section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='form_questions', to='evaluation.formsection')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='form_questions', to='evaluation.question')),
            ],
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('response_id', models.AutoField(primary_key=True, serialize=False)),
                ('submitted_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='evaluation.evaluationform')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('answer_id', models.AutoField(primary_key=True, serialize=False)),
                ('text_answer', models.TextField(blank=True, null=True)),
                ('question_option', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='answers', to='evaluation.multiplechoiceopt')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='evaluation.question')),
                ('section_option', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='answers', to='evaluation.ratingopt')),
                ('response', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='evaluation.response')),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('section_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('section_type', models.CharField(choices=[('question', 'Question'), ('info', 'Info')], default='question', max_length=10)),
                ('question_type', models.CharField(blank=True, choices=[('rating', 'Rating'), ('multiple_choice', 'Multiple Choice'), ('open_ended', 'Open Ended')], max_length=20, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('is_fixed', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('evaluation_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='evaluation.evaluationtype')),
            ],
        ),
        migrations.AddField(
            model_name='ratingopt',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='section_options', to='evaluation.section'),
        ),
        migrations.AddField(
            model_name='question',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='evaluation.section'),
        ),
        migrations.AddField(
            model_name='formsection',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='form_sections', to='evaluation.section'),
        ),
    ]
