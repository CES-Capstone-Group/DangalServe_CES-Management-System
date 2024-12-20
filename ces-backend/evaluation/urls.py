from django.urls import path
from . import views

urlpatterns = [


    # Path for Evaluation Type Management
    path('evaluation-types/', views.evaluation_type_list, name='evaluation_type_list'),
    path('evaluation-types/create/', views.evaluation_type_create, name='evaluation_type_create'),
    path('evaluation-types/<int:pk>/', views.eval_types_detail, name='eval_types_detail'),


    # Path for Evaluation Section Management
    path('sections/', views.section_list, name='section_list'),
    path('sections/create/', views.section_create, name='section_create'),
    path('sections/<int:pk>/', views.section_detail, name='section_detail'),

     # Question URLs
    path('questions/', views.question_list, name='question_list'),
    path('questions/create/', views.question_create, name='question_create'),
    path('questions/<int:pk>/', views.question_detail, name='question_detail'),

    # Rating Option URLs
    path('rating-options/', views.ratingopt_list, name='ratingopt_list'),
    path('rating-options/create/', views.ratingopt_create, name='ratingopt_create'),
    path('rating-options/<int:pk>/', views.ratingopt_detail, name='ratingopt_detail'),
    path('rating-options/section/<int:section_id>/', views.ratingopt_by_section, name='ratingopt_by_section'),
    
    # Multiple Choice Option URLs
    path('multiple-choice-options/', views.multiplechoiceopt_list, name='multiplechoiceopt_list'),
    path('multiple-choice-options/create/', views.multiplechoiceopt_create, name='multiplechoiceopt_create'),
    path('multiple-choice-options/<int:pk>/', views.multiplechoiceopt_detail, name='multiplechoiceopt_detail'),

     # EvaluationForm URLs
    path('evaluation-forms/', views.evaluation_form_list, name='evaluation-form-list'),  # GET
    path('evaluation-forms/create/', views.evaluation_form_create, name='evaluation-form-create'),  # POST
    path('evaluation-forms/<int:pk>/', views.evaluation_form_detail, name='evaluation-form-detail'),  # GET, PUT, DELETE
    path('view-all/evaluation-forms/', views.get_created_evaluation_forms, name='get_created_evaluation_forms'),
    path('view-active/evaluation-forms/', views.get_active_evaluation_forms, name='get_active_evaluation_forms'),
    path('display-specific-eval-form/<int:form_id>/', views.display_specific_evaluation_form, name='display_specific_evaluation_form'),
    

    # FormSection URLs
    path('form-sections/', views.form_section_list, name='form-section-list'),  # GET
    path('form-sections/create/', views.form_section_create, name='form-section-create'),  # POST
    path('form-sections/<int:pk>/', views.form_section_detail, name='form-section-detail'),  # GET, PUT, DELETE

    # FormQuestion URLs
    path('form-questions/', views.form_question_list, name='form-question-list'),  # GET
    path('form-questions/create/', views.form_question_create, name='form-question-create'),  # POST
    path('form-questions/<int:pk>/', views.form_question_detail, name='form-question-detail'),  # GET, PUT, DELETE

    # Response URLs
    path('responses/', views.response_list, name='response_list'),
    path('responses/create/', views.response_create, name='response_create'),
    path('responses/<int:pk>/', views.response_detail, name='response_detail'),

    # Answer URLs
    path('answers/', views.answer_list, name='answer_list'),
    path('answers/create/', views.answer_create, name='answer_create'),
    path('answers/<int:pk>/', views.answer_detail, name='answer_detail'),


    
    #path join evaluation type and evaluation section
    path('evaluation-types/<int:evaluation_type_id>/details/', views.evaluation_type_detail, name='evaluation_type_detail'),
    path('evaluation-types/<int:evaluation_type_id>/fixed-detail/', views.get_evaluation_type_fixed_detail, name='get_evaluation_type_fixed_detail'),

    # Form Details View
    path('eval-summary/header/<int:form_id>/', views.get_header_details, name='get_header_details'),  # GET

    # Responses and Answers View
    path('responses/<int:form_id>/answers/', views.get_form_responses, name='get_form_responses'),  # GET

    path('forms/available/', views.get_available_forms, name='get_available_forms'),
]
