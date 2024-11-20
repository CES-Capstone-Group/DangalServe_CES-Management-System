from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework import generics
from .models import KpiTable, Kpi
from .serializer import KpiTableSerializer, KpiSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response

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
    
class PasswordVerificationAndKpiUpdateView(APIView):
    """
    API endpoint to verify a user's password and optionally update KPI data.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        username = request.user.username  # Assuming the user is authenticated
        password = request.data.get("password")
        kpi_updates = request.data.get("kpi_updates")  # Data for updating KPI, if provided

        if not password:
            return Response({"error": "Password is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Incorrect password."}, status=status.HTTP_401_UNAUTHORIZED)

        # If no KPI updates are provided, return success after password verification
        if not kpi_updates:
            return Response({"message": "Password verified."}, status=status.HTTP_200_OK)

        # Update KPI data
        try:
            for update in kpi_updates:
                kpi_id = update.get("id")
                quarterly_data = update.get("quarterly_data")

                if not kpi_id or not quarterly_data:
                    continue

                kpi = Kpi.objects.get(id=kpi_id)
                kpi.quarterly_data = quarterly_data
                kpi.save()

            return Response({"message": "KPI data updated successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)