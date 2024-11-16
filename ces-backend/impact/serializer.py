from rest_framework import serializers
from .models import ImpactEvaluation

class ImpactEvaluationSerializer(serializers.ModelSerializer):
    activity_title = serializers.ReadOnlyField(source='activity_schedule.activity_title')
    activity_date = serializers.ReadOnlyField(source='activity_schedule.target_date')

    class Meta:
        model = ImpactEvaluation
        fields = [
            'id', 'activity_schedule', 'division_name', 'venue', 'objectives',
            'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11',
            'Q12_recommendations', 'activity_title', 'activity_date'
        ]