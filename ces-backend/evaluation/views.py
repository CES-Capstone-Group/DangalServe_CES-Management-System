from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import EvaluationType
from .serializer import EvaluationTypeSerializer

# List all evaluation types
@api_view(['GET'])
def evaluation_type_list(request):
    evaluation_types = EvaluationType.objects.all()
    serializer = EvaluationTypeSerializer(evaluation_types, many=True)
    return Response(serializer.data)

# Create a new evaluation type
@api_view(['POST'])
def evaluation_type_create(request):
    serializer = EvaluationTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, update, or delete an evaluation type by ID
@api_view(['GET', 'PUT', 'DELETE'])
def evaluation_type_detail(request, pk):
    try:
        evaluation_type = EvaluationType.objects.get(pk=pk)
    except EvaluationType.DoesNotExist:
        return Response({"error": "Evaluation Type not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EvaluationTypeSerializer(evaluation_type)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EvaluationTypeSerializer(evaluation_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        evaluation_type.delete()
        return Response({"message": "Evaluation Type deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
