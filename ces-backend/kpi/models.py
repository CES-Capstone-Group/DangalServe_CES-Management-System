from django.db import models
from api.models import Department

class KpiTable(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="Unknows KPI Title")

    def __str__(self):
        return self.title

# KPI Model
class Kpi(models.Model):
    kpi_table = models.ForeignKey(KpiTable, on_delete=models.CASCADE, related_name='kpis')
    kpi_name = models.CharField(max_length=255, default="Unknown KPI Name")
    target = models.CharField(max_length=255, default="Unknown Target")
    quarterly_data = models.JSONField(default=dict)  # JSON field to store quarterly data

    def __str__(self):
        return self.kpi_name