from django.urls import path
from .views import (
    KpiTableListCreateView,
    KpiTableDetailView,
    KpiListCreateView,
    KpiDetailView,
)

app_name = 'kpi'

urlpatterns = [
    path('', KpiTableListCreateView.as_view(), name='kpi-table-list-create'),
    path('<int:pk>/', KpiTableDetailView.as_view(), name='kpi-table-detail'),
    path('kpis/', KpiListCreateView.as_view(), name='kpi-list-create'),
    path('kpis/<int:pk>/', KpiDetailView.as_view(), name='kpi-detail'),
]
