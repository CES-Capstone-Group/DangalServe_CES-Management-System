from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import EvaluationType, Section, Question, RatingOpt, MultipleChoiceOpt, EvaluationForm, FormSection, FormQuestion
from .serializer import BasicSectionSerializer, BasicQuestionSerializer, EvaluationTypeDetailSerializer, EvaluationTypeSerializer, SectionSerializer, QuestionSerializer, RatingOptSerializer, MultipleChoiceOptSerializer,EvaluationFormSerializer, FormSectionSerializer, FormQuestionSerializer, ResponseSerializer, AnswerSerializer
from django.db.models import Q,Prefetch,OuterRef, Subquery, F
from django.shortcuts import get_object_or_404
from api.models import ActivitySchedule, Barangay


# List all evaluation types
@api_view(['GET'])
def evaluation_type_list(request):
    evaluation_types = EvaluationType.objects.all()
    serializer = EvaluationTypeSerializer(evaluation_types, many=True)
    return Response(serializer.data)

# Create a new evaluation type
@api_view(['POST'])
def evaluation_type_create(request):
    serializer = EvaluationTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, update, or delete an evaluation type by ID
@api_view(['GET', 'PUT', 'DELETE'])
def eval_types_detail(request, pk):
    try:
        evaluation_type = EvaluationType.objects.get(pk=pk)
    except EvaluationType.DoesNotExist:
        return Response({"error": "Evaluation Type not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EvaluationTypeSerializer(evaluation_type)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EvaluationTypeSerializer(evaluation_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        evaluation_type.delete()
        return Response({"message": "Evaluation Type deleted successfully"}, status=status.HTTP_204_NO_CONTENT)




# List all sections
@api_view(['GET'])
def section_list(request):
    sections = Section.objects.all()
    serializer = SectionSerializer(sections, many=True)
    return Response(serializer.data)

# This view is only for creating sections without options
@api_view(['POST'])
def section_create(request):
    serializer = BasicSectionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve, update, or delete a section by ID
@api_view(['GET', 'PUT', 'DELETE'])
def section_detail(request, pk):
    try:
        section = Section.objects.get(pk=pk)
    except Section.DoesNotExist:
        return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BasicSectionSerializer(section)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BasicSectionSerializer(section, data=request.data,  partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        section.delete()
        return Response({"message": "Section deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# List all questions
@api_view(['GET'])
def question_list(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

# Create a new question
@api_view(['POST'])
def question_create(request):
     # Log the incoming data to verify the payload
    print("Incoming data:", request.data)  # This will print in your console or log
    serializer = BasicQuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, update, or delete a question by ID
@api_view(['GET', 'PUT', 'DELETE'])
def question_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data,  partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        question.delete()
        return Response({"message": "Question deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# List all rating options
@api_view(['GET'])
def ratingopt_list(request):
    rating_options = RatingOpt.objects.all()
    serializer = RatingOptSerializer(rating_options, many=True)
    return Response(serializer.data)

# Retrieve all rating options for a specific section by section_id
@api_view(['GET'])
def ratingopt_by_section(request, section_id):
    try:
        rating_options = RatingOpt.objects.filter(section_id=section_id)
        serializer = RatingOptSerializer(rating_options, many=True)
        return Response(serializer.data)
    except RatingOpt.DoesNotExist:
        return Response({"error": "No rating options found for the given section ID"}, status=status.HTTP_404_NOT_FOUND)


# Create a new rating option
@api_view(['POST'])
def ratingopt_create(request):
    serializer = RatingOptSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, update, or delete a rating option by ID
@api_view(['GET', 'PUT', 'DELETE'])
def ratingopt_detail(request, pk):
    try:
        rating_option = RatingOpt.objects.get(pk=pk)
    except RatingOpt.DoesNotExist:
        return Response({"error": "Rating Option not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RatingOptSerializer(rating_option)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = RatingOptSerializer(rating_option, data=request.data,  partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        rating_option.delete()
        return Response({"message": "Rating Option deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# LIST ALL MULTIPLE CHOICE OPTIONS
@api_view(['GET'])
def multiplechoiceopt_list(request):
    multiple_choice_options = MultipleChoiceOpt.objects.all()
    serializer = MultipleChoiceOptSerializer(multiple_choice_options, many=True)
    return Response(serializer.data)

# CREATE A NEW MULTIPLE CHOICE OPTION
@api_view(['POST'])
def multiplechoiceopt_create(request):
    serializer = MultipleChoiceOptSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# RETRIEVE, UPDATE, OR DELETE A MULTIPLE CHOICE OPTION BY ID
@api_view(['GET', 'PUT', 'DELETE'])
def multiplechoiceopt_detail(request, pk):
    try:
        multiple_choice_option = MultipleChoiceOpt.objects.get(pk=pk)
    except MultipleChoiceOpt.DoesNotExist:
        return Response({"error": "Multiple Choice Option not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MultipleChoiceOptSerializer(multiple_choice_option)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MultipleChoiceOptSerializer(multiple_choice_option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        multiple_choice_option.delete()
        return Response({"message": "Multiple Choice Option deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def evaluation_type_detail(request, evaluation_type_id):
    evaluation_type = get_object_or_404(
        EvaluationType.objects.prefetch_related(
            Prefetch('sections__questions'),
            Prefetch('sections__section_options', queryset=RatingOpt.objects.all()),
            Prefetch('sections__questions__question_options', queryset=MultipleChoiceOpt.objects.all())
        ),
        pk=evaluation_type_id
    )
    serializer = EvaluationTypeDetailSerializer(evaluation_type)
    return Response(serializer.data)


@api_view(['GET'])
def get_evaluation_type_fixed_detail(request, evaluation_type_id):
    # Fetch the evaluation type with sections that meet the criteria
    evaluation_type = get_object_or_404(
        EvaluationType.objects.prefetch_related(
            Prefetch(
                'sections',
                queryset=Section.objects.filter(
                    Q(questions__is_fixed=True) | Q(section_type='info', is_fixed=True)  # Include sections with fixed questions or fixed info sections
                ).distinct().prefetch_related(
                    Prefetch(
                        'questions',
                        queryset=Question.objects.filter(is_fixed=True).prefetch_related(
                            Prefetch('question_options', queryset=MultipleChoiceOpt.objects.all())
                        )
                    ),
                    Prefetch('section_options', queryset=RatingOpt.objects.all())
                )
            )
        ),
        pk=evaluation_type_id
    )

    serializer = EvaluationTypeDetailSerializer(evaluation_type)
    return Response(serializer.data)


# EvaluationForm Views
@api_view(['GET'])
def evaluation_form_list(request):
    forms = EvaluationForm.objects.all()
    serializer = EvaluationFormSerializer(forms, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def evaluation_form_create(request):
    serializer = EvaluationFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def evaluation_form_detail(request, pk):
    try:
        form = EvaluationForm.objects.get(pk=pk)
    except EvaluationForm.DoesNotExist:
        return Response({'error': 'Evaluation Form not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EvaluationFormSerializer(form)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EvaluationFormSerializer(form, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        form.delete()
        return Response({'message': 'Evaluation Form deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def get_created_evaluation_forms(request):
   # Subquery to fetch activity details (activity_venue and brgy_name)
    activity_schedule_subquery = ActivitySchedule.objects.filter(
        id=OuterRef('activity_schedule_id')
    ).annotate(
        brgy_name=F('brgy__brgy_name')  # Access the brgy_name from the related Barangay model
    ).values('activity_venue', 'brgy_name')

    # Subquery to fetch evaluation type name from EvaluationType
    evaluation_type_subquery = EvaluationType.objects.filter(
        evaluation_type_id=OuterRef('evaluation_type')
    ).values('name')

    # Main query to fetch EvaluationForm details and annotate activity and barangay information
    evaluation_forms = EvaluationForm.objects.annotate(
        activity_venue=Subquery(activity_schedule_subquery.values('activity_venue')[:1]),
        brgy_name=Subquery(activity_schedule_subquery.values('brgy_name')[:1]),  # Annotate barangay name
        evaluation_type_name=Subquery(evaluation_type_subquery[:1])  # Annotate evaluation type name
    ).values(
        'form_id', 'title', 'status', 'created_at', 'activity_venue', 'brgy_name', 'evaluation_type_name'
    )

    # Return the response
    return Response({'evaluation_forms': list(evaluation_forms)})

@api_view(['GET'])
def get_active_evaluation_forms(request):
    # Subquery to fetch activity details (activity_objectives)
    activity_schedule_subquery = ActivitySchedule.objects.filter(
        id=OuterRef('activity_schedule_id')
    ).values('activity_objectives')

    # Subquery to fetch evaluation type name from EvaluationType
    evaluation_type_subquery = EvaluationType.objects.filter(
        evaluation_type_id=OuterRef('evaluation_type')
    ).values('name')

    # Main query to fetch EvaluationForm details and filter by active status
    evaluation_forms = EvaluationForm.objects.filter(
        status="active"  # Filter only forms with active status
    ).annotate(
        activity_objectives=Subquery(activity_schedule_subquery.values('activity_objectives')[:1]),  # Annotate activity objectives
        evaluation_type_name=Subquery(evaluation_type_subquery[:1])  # Annotate evaluation type name
    ).values(
        'form_id', 'title', 'status', 'created_at', 'activity_objectives', 'evaluation_type_name'
    )

    # Return the response
    return Response({'evaluation_forms': list(evaluation_forms)})

# EvaluationForm Views
@api_view(['GET'])
def display_specific_evaluation_form(request, form_id):
    """
    Fetch a specific evaluation form with its details, including sections and questions.
    """
    try:
        # Fetch the EvaluationForm details
        evaluation_form = EvaluationForm.objects.filter(form_id=form_id).annotate(
            activity_objectives=Subquery(
                ActivitySchedule.objects.filter(
                    id=OuterRef('activity_schedule_id')
                ).values('activity_objectives')[:1]
            ),
            evaluation_type_name=Subquery(
                EvaluationType.objects.filter(
                    evaluation_type_id=OuterRef('evaluation_type')
                ).values('name')[:1]
            )
        ).values(
            'form_id',
            'title',
            'status',
            'created_at',
            'updated_at',
            'activity_objectives',
            'evaluation_type_name'
        ).first()

        if not evaluation_form:
            return Response({"error": "Evaluation form not found."}, status=404)

        # Fetch all FormSections for the given form_id
        form_sections = FormSection.objects.filter(form_id=form_id).select_related('section')

        # Prepare section data
        sections_data = []
        for form_section in form_sections:
            section = form_section.section

            # Fetch questions associated with this section
            questions = Question.objects.filter(section=section)

            # Prepare question data
            questions_data = []
            for question in questions:
                question_data = {
                    "question_id": question.question_id,
                    "question_text": question.text,
                    "question_type": section.question_type,
                    "options": []
                }

                # Fetch options for rating questions
                if section.question_type == "rating":
                    options = RatingOpt.objects.filter(section=section).order_by("option_order")
                    question_data["options"] = [
                        {"id": opt.option_id, "value": opt.value, "label": opt.label} for opt in options
                    ]

                # Fetch options for multiple-choice questions
                elif section.question_type == "multiple_choice":
                    options = MultipleChoiceOpt.objects.filter(question=question).order_by("option_order")
                    question_data["options"] = [
                        {"id": opt.option_id, "value": opt.value, "label": opt.label} for opt in options
                    ]

                questions_data.append(question_data)

            # Add section data
            sections_data.append({
                "section_id": section.section_id,
                "section_title": section.title,
                "section_type": section.section_type,
                "questions": questions_data
            })

        # Combine the data
        response_data = {
            "evaluation_form": evaluation_form,
            "sections": sections_data
        }

        return Response(response_data, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=400)



# FormSection Views
@api_view(['GET'])
def form_section_list(request):
    sections = FormSection.objects.all()
    serializer = FormSectionSerializer(sections, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def form_section_create(request):
    serializer = FormSectionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def form_section_detail(request, pk):
    try:
        section = FormSection.objects.get(pk=pk)
    except FormSection.DoesNotExist:
        return Response({'error': 'Form Section not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FormSectionSerializer(section)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FormSectionSerializer(section, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        section.delete()
        return Response({'message': 'Form Section deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# FormQuestion Views
@api_view(['GET'])
def form_question_list(request):
    questions = FormQuestion.objects.all()
    serializer = FormQuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def form_question_create(request):
    serializer = FormQuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def form_question_detail(request, pk):
    try:
        question = FormQuestion.objects.get(pk=pk)
    except FormQuestion.DoesNotExist:
        return Response({'error': 'Form Question not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FormQuestionSerializer(question)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FormQuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        question.delete()
        return Response({'message': 'Form Question deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# Response Views
@api_view(['GET'])
def response_list(request):
    responses = EvaluationResponse.objects.all()
    serializer = ResponseSerializer(responses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def response_create(request):
    serializer = ResponseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def response_detail(request, pk):
    try:
        response = EvaluationResponse.objects.get(pk=pk)
    except EvaluationResponse.DoesNotExist:
        return Response({'error': 'Response not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ResponseSerializer(response)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ResponseSerializer(response, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        response.delete()
        return Response({'message': 'Response deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# Answer Views
@api_view(['GET'])
def answer_list(request):
    answers = Answer.objects.all()
    serializer = AnswerSerializer(answers, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def answer_create(request):
    serializer = AnswerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def answer_detail(request, pk):
    try:
        answer = Answer.objects.get(pk=pk)
    except Answer.DoesNotExist:
        return Response({'error': 'Answer not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        answer.delete()
        return Response({'message': 'Answer deleted successfully'}, status=status.HTTP_204_NO_CONTENT)