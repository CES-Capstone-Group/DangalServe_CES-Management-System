from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Achievement
from .serializer import AchievementSerializer
from .models import Announcement
from .serializer import AnnouncementSerializer

# ACHIEVEMENT VIEWS
@api_view(['GET'])
def get_achievement(request):
   
        achievements = Achievement.objects.all()
        serializedData = AchievementSerializer(achievements, many=True).data
        return Response(serializedData)

@api_view(['POST'])
def create_achievement(request):
    serializedData = AchievementSerializer(data=request.data)
    if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view([ 'PUT', 'DELETE'])
def achievement_detail(request, pk):
   
    try:
        achievement = Achievement.objects.get(pk=pk)
    except Achievement.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        achievement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    elif request.method == 'PUT':
        serializedData = AchievementSerializer(achievement, data=request.data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)


# ANNOUNCEMENT VIEWS
@api_view(['GET'])
def get_announcement(request):
   
        announcements = Announcement.objects.all()
        serializedData = AnnouncementSerializer(announcements, many=True).data
        return Response(serializedData)

@api_view(['POST'])
def create_announcement(request):
    serializedData = AnnouncementSerializer(data=request.data)
    if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view([ 'PUT', 'DELETE'])
def announcement_detail(request, pk):
   
    try:
        announcement = Announcement.objects.get(pk=pk)
    except Announcement.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        announcement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    elif request.method == 'PUT':
        serializedData = AnnouncementSerializer(announcement, data=request.data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)