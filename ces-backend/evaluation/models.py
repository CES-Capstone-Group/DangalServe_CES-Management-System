from django.db import models
from django.utils import timezone
from api.models import ActivitySchedule, Barangay

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


# Sections model
class Section(models.Model):
    SECTION_TYPE_CHOICES = [
        ('question', 'Question'),
        ('info', 'Info'),
    ]
    QUESTION_TYPE_CHOICES = [
        ('rating', 'Rating'),
        ('multiple_choice', 'Multiple Choice'),
        ('open_ended', 'Open Ended'),
    ]

    section_id = models.AutoField(primary_key=True)
    evaluation_type = models.ForeignKey(EvaluationType, on_delete=models.CASCADE, related_name='sections')
    title = models.CharField(max_length=255)
    section_type = models.CharField(max_length=10, choices=SECTION_TYPE_CHOICES, default='question')
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    is_fixed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Questions model
class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=255)
    is_fixed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

# SectionOptions model for shared rating options within a section
class RatingOpt(models.Model):
    option_id = models.AutoField(primary_key=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='section_options')
    value = models.IntegerField()
    label = models.CharField(max_length=50)
    option_order = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.label} (Value: {self.value})"

# QuestionOptions model for unique options within each question in a multiple-choice section
class MultipleChoiceOpt(models.Model):
    option_id = models.AutoField(primary_key=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='question_options')
    value = models.IntegerField()
    label = models.CharField(max_length=50)
    option_order = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.label} (Value: {self.value})"

class EvaluationForm(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),  # Form is ready for answering
        ('inactive', 'Inactive'),  # Form is not ready for answering
    ]

    form_id = models.AutoField(primary_key=True)
    evaluation_type = models.ForeignKey('EvaluationType', on_delete=models.CASCADE, related_name='forms')
    title = models.CharField(max_length=255)
    activity_schedule_id = models.IntegerField(null=True, blank=True)  # Links to ActivitySchedule
    proposal_id = models.IntegerField(null=True, blank=True)  # Links to Proposal
    created_by = models.ForeignKey('api.Account', on_delete=models.SET_NULL, null=True, related_name='created_forms')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='inactive')  # Added status field
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"


class FormSection(models.Model):
    form_section_id = models.AutoField(primary_key=True)
    form = models.ForeignKey(EvaluationForm, on_delete=models.CASCADE, related_name='form_sections')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='form_sections')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Form: {self.form.title} - Section: {self.section.title} (Order: {self.section_order})"

class FormQuestion(models.Model):
    form_question_id = models.AutoField(primary_key=True)
    form_section = models.ForeignKey(FormSection, on_delete=models.CASCADE, related_name='form_questions')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='form_questions')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Form Section: {self.form_section} - Question: {self.question.text} (Order: {self.question_order})"