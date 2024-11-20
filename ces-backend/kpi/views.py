from django.shortcuts import render
from rest_framework import generics
from .models import KpiTable, Kpi
from .serializer import KpiTableSerializer, KpiSerializer

class KpiTableListCreateView(generics.ListCreateAPIView):
    queryset = KpiTable.objects.all()
    serializer_class = KpiTableSerializer

    def get_serializer_context(self):
        # Add 'include_tables' to the context if needed for department details
        context = super().get_serializer_context()
        context['include_tables'] = self.request.query_params.get('include_tables') == 'true'
        return context

    def get(self, request, *args, **kwargs):
        dept_id = request.query_params.get('dept_id')
        if dept_id:
            self.queryset = self.queryset.filter(department__dept_id=dept_id)
        return super().get(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        data = request.data
        return super().post(request, *args, **kwargs)

# View to retrieve, update, and delete a KPI Table
class KpiTableDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = KpiTable.objects.all()
    serializer_class = KpiTableSerializer

# View to list and create KPIs
class KpiListCreateView(generics.ListCreateAPIView):
    queryset = Kpi.objects.all()
    serializer_class = KpiSerializer

    def get(self, request, *args, **kwargs):
        # Example: Extract query parameters if needed
        table_id = request.query_params.get('table_id')
        if table_id:
            # Use this `table_id` to filter KPIs associated with a specific table
            self.queryset = self.queryset.filter(kpi_table__id=table_id)
        return super().get(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        # Extract any additional information from the request if needed
        data = request.data
        # Example: Custom logic can be added here if necessary
        return super().post(request, *args, **kwargs)

# View to retrieve, update, and delete a KPI
class KpiDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Kpi.objects.all()
    serializer_class = KpiSerializer
