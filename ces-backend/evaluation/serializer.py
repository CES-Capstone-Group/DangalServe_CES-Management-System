from rest_framework import serializers
from .models import EvaluationType, Section, Question, EvaluationForm, FormSection, FormQuestion, RatingOpt, MultipleChoiceOpt

class EvaluationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationType
        fields = '__all__'  # Includes all fields from the EvaluationType model

# Section Serializer
class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'  # Include all fields

# Question Serializer
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'  # Include all fields

# SectionOption Serializer
class RatingOptSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingOpt
        fields = '__all__'  # Include all fields

# QuestionOption Serializer
class MultipleChoiceOptSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceOpt
        fields = '__all__'  # Include all fields

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
