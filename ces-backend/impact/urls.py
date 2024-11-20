from django.urls import path
from .views import ( 
    ImpactEvaluationListCreateView,
    ImpactEvaluationDetailView,
    ImpactEvaluationSummaryView,
    )
app_name = 'impact'

urlpatterns = [
    path('', ImpactEvaluationListCreateView.as_view(), name='impact-eval-list-create'),
    path('<int:pk>/', ImpactEvaluationDetailView.as_view(), name='impact-eval-detail'),
    path('summary/', ImpactEvaluationSummaryView.as_view(), name='impact-eval-summary'),
]