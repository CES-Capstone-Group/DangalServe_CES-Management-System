from rest_framework import serializers
from .models import KpiTable, Kpi
from api.models import Department

class KpiSerializer(serializers.ModelSerializer):
    kpi_table = serializers.PrimaryKeyRelatedField(queryset=KpiTable.objects.all())  # Ensure this field is present

    class Meta:
        model = Kpi
        fields = ['id', 'kpi_table', 'kpi_name', 'target', 'quarterly_data']


class KpiTableSerializer(serializers.ModelSerializer):
    kpis = KpiSerializer(many=True, read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())

    class Meta:
        model = KpiTable
        fields = ['id', 'department', 'title', 'kpis']
        
    def get_department(self, obj):
        from api.serializer import DepartmentSerializer
        serializer_context = self.context.get('include_tables', False)
        department_serializer = DepartmentSerializer(
            obj.department,
            context={'include_tables': serializer_context}
        )
        return department_serializer.data