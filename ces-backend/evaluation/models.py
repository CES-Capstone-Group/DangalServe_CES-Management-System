from django.db import models
from django.utils import timezone

class EvaluationType(models.Model):
    evaluation_type_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='created_evaluation_types')
    created_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='updated_evaluation_types')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    evaluation_type = models.ForeignKey(EvaluationType, on_delete=models.CASCADE, related_name='sections')
    title = models.CharField(max_length=255)
    is_fixed = models.BooleanField(default=False)
    created_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='created_sections')
    created_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='updated_sections')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    QUESTION_TYPE_CHOICES = [
        ('rating', 'Rating'),
        ('text', 'Text'),
        ('yes_no', 'Yes/No'),
        ('multiple_choice', 'Multiple Choice'),
        ('checkbox', 'Checkbox'),
        ('dropdown', 'Dropdown'),
        ('file_upload', 'File Upload'),
        ('date', 'Date'),
        ('number', 'Number'),
        ('email', 'Email'),
    ]

    question_id = models.AutoField(primary_key=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=255)
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES)
    is_fixed = models.BooleanField(default=False)
    created_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='created_questions')
    created_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='updated_questions')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text

class EvaluationForm(models.Model):
    form_id = models.AutoField(primary_key=True)
    evaluation_type = models.ForeignKey(EvaluationType, on_delete=models.CASCADE, related_name='forms')
    title = models.CharField(max_length=255)
    created_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='created_forms')
    created_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='updated_forms')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class FormSection(models.Model):
    form_section_id = models.AutoField(primary_key=True)
    form = models.ForeignKey(EvaluationForm, on_delete=models.CASCADE, related_name='form_sections')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='form_sections')
    section_order = models.IntegerField()
    created_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='created_form_sections')
    created_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='updated_form_sections')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Form: {self.form.title} - Section: {self.section.title} (Order: {self.section_order})"

class FormQuestion(models.Model):
    form_question_id = models.AutoField(primary_key=True)
    form_section = models.ForeignKey(FormSection, on_delete=models.CASCADE, related_name='form_questions')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='form_questions')
    question_order = models.IntegerField()
    created_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='created_form_questions')
    created_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='updated_form_questions')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Form Section: {self.form_section} - Question: {self.question.text} (Order: {self.question_order})"
