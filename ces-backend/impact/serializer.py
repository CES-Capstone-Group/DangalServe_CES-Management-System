from rest_framework import serializers
from .models import ImpactEvaluation

class ImpactEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactEvaluation
        fields = '__all__'