from rest_framework import serializers
from .models import EvaluationType, Section, Question, EvaluationForm, FormSection, FormQuestion

class EvaluationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationType
        fields = '__all__'  # Includes all fields from the EvaluationType model

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'  # Includes all fields from the Section model

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'  # Includes all fields from the Question model

class EvaluationFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationForm
        fields = '__all__'  # Includes all fields from the EvaluationForm model

class FormSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSection
        fields = '__all__'  # Includes all fields from the FormSection model

class FormQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormQuestion
        fields = '__all__'  # Includes all fields from the FormQuestion model
