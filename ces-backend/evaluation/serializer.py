from rest_framework import serializers
from .models import EvaluationType, Section, Question, EvaluationForm, FormSection, FormQuestion, RatingOpt, MultipleChoiceOpt, Response, Answer

class EvaluationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationType
        fields = '__all__'  # Includes all fields from the EvaluationType model

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

class BasicQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'  # Include all fields

# Question Serializer
class QuestionSerializer(serializers.ModelSerializer):
    multiple_choice_options = MultipleChoiceOptSerializer(many=True, source='question_options', read_only=True)
    rating_options = RatingOptSerializer(many=True, source='section.section_options', read_only=True)

    class Meta:
        model = Question
        fields = ['question_id', 'text', 'is_fixed', 'multiple_choice_options', 'rating_options']


class BasicSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'  # Include all fields

# Section Serializer
class SectionSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ['section_id', 'title', 'section_type', 'question_type', 'content', 'is_fixed', 'questions', 'evaluation_type']

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

# EvaluationType Serializer with nested Section
class EvaluationTypeDetailSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = EvaluationType
        fields = ['evaluation_type_id', 'name', 'description', 'sections']


class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'