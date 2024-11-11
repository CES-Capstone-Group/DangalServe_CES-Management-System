from django.shortcuts import render

from django.db.models import Avg, Count
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ImpactEvaluation
from .serializer import ImpactEvaluationSerializer

# List and Create View
class ImpactEvaluationListCreateView(generics.ListCreateAPIView):
    queryset = ImpactEvaluation.objects.all()
    serializer_class = ImpactEvaluationSerializer

# Retrieve, Update, and Delete View
class ImpactEvaluationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImpactEvaluation.objects.all()
    serializer_class = ImpactEvaluationSerializer

# View for Evaluating Impact
class ImpactEvaluationSummaryView(APIView):
    def get(self, request):
        data = ImpactEvaluation.objects.all()

        # Calculate averages for each question
        Q1_average = data.aggregate(Avg('Q1'))['Q1__avg']
        Q2_average = data.aggregate(Avg('Q2'))['Q2__avg']
        Q3_average = data.aggregate(Avg('Q3'))['Q3__avg']
        Q4_average = data.aggregate(Avg('Q4'))['Q4__avg']
        Q5_average = data.aggregate(Avg('Q5'))['Q5__avg']
        Q6_average = data.aggregate(Avg('Q6'))['Q6__avg']
        Q7_average = data.aggregate(Avg('Q7'))['Q7__avg']
        Q8_average = data.aggregate(Avg('Q8'))['Q8__avg']
        Q9_average = data.aggregate(Avg('Q9'))['Q9__avg']
        Q10_average = data.aggregate(Avg('Q10'))['Q10__avg']
        Q11_average = data.aggregate(Avg('Q11'))['Q11__avg']
        

        return Response({
            "Q1_average": Q1_average,
            "Q2_average": Q2_average,
            "Q3_average": Q3_average,
            "Q4_average": Q4_average,
            "Q5_average": Q5_average,
            "Q6_average": Q6_average,
            "Q7_average": Q7_average,
            "Q8_average": Q8_average,
            "Q9_average": Q9_average,
            "Q10_average": Q10_average,
            "Q11_average": Q11_average,            
        })