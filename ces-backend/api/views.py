from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Achievement, Announcement, Account, ResearchAgenda
from .serializer import AchievementSerializer, AnnouncementSerializer, TblAccountsSerializer, ResearchAgendaSerializer
from rest_framework import status as rest_status
from django.contrib.auth import authenticate
# from .models import CustomAuthToken
from rest_framework import viewsets
from django.utils import timezone

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RefreshTokenView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh_token')

        try:
            # Find the token using the refresh token
            token = CustomAuthToken.objects.get(refresh_key=refresh_token)

            # Check if the refresh token is still valid
            if not token.is_refresh_token_valid():
                return Response({'error': 'Refresh token has expired.'}, status=status.HTTP_401_UNAUTHORIZED)

            # Generate a new access token
            token.refresh_access_token()

            return Response({
                'access_token': token.key,
                'refresh_token': token.refresh_key,
                'user_id': token.user.user_id,
                'username': token.user.username,
                'accountType': token.user.accountType,
            }, status=status.HTTP_200_OK)

        except CustomAuthToken.DoesNotExist:
            return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_400_BAD_REQUEST)

# View for login using custom authentication with Account model
# class LoginApiView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         # Authenticate the user
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             if user.status.lower() != 'active':
#                 return Response({'error': 'Account is inactive.'}, status=rest_status.HTTP_403_FORBIDDEN)

#             # Create or retrieve an authentication token
#             token, created = CustomAuthToken.objects.get_or_create(user=user)

#             return Response({
#                 'access_token': token.key,
#                 'refresh_token': token.refresh_key,
#                 'user_id': user.user_id,
#                 'username': user.username,
#                 'accountType': user.accountType,
#             }, status=status.HTTP_200_OK)
#         return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)


# Account Views
@api_view(['GET'])
def get_all_user(request):
    try:
        users = Account.objects.all()
        serializer = TblAccountsSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_user(request):
    data = request.data
    serializer = TblAccountsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def user_info_action(request, user_id):
    try:
        account = Account.objects.get(user_id=user_id)  # Ensure 'user_id' matches your model's PK field
    except Account.DoesNotExist:
        return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = TblAccountsSerializer(account, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# RESEARCH AGENDA VIEWS
@api_view(['GET'])
def get_research_agendas(request):
    research_agendas = ResearchAgenda.objects.all()
    # Include the request context to correctly serialize image URLs
    serializedData = ResearchAgendaSerializer(research_agendas, many=True, context={'request': request})
    return Response(serializedData.data)  # Access .data to get the serialized content


@api_view(['POST'])
def create_research_agenda(request):
    serializedData = ResearchAgendaSerializer(data=request.data, context={'request': request})
    if serializedData.is_valid():  # Validate the data
        serializedData.save()  # Save the valid data
        return Response(serializedData.data, status=status.HTTP_201_CREATED)  # Return the newly created data
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)  # Return errors if data is invalid

@api_view(['PUT', 'DELETE'])
def research_agenda_detail(request, pk):
    try:
        research_agenda = ResearchAgenda.objects.get(pk=pk)
    except ResearchAgenda.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        research_agenda.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    elif request.method == 'PUT':
        serializedData = ResearchAgendaSerializer(research_agenda, data=request.data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)


class ResearchAgendaViewSet(viewsets.ModelViewSet):
    queryset = ResearchAgenda.objects.all()
    serializer_class = ResearchAgendaSerializer

    def get_serializer_context(self):
        # Adding the request object to the serializer context
        context = super(ResearchAgendaViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context


# ACHIEVEMENT VIEWS
@api_view(['GET'])
def get_achievement(request):
    achievements = Achievement.objects.all()
    serializedData = AchievementSerializer(achievements, many=True, context={'request': request})
    return Response(serializedData.data)

@api_view(['POST'])
def create_achievement(request):
    serializedData = AchievementSerializer(data=request.data, context={'request': request})
    if serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data, status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def achievement_detail(request, pk):
    try:
        achievement = Achievement.objects.get(pk=pk)
    except Achievement.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        achievement.image.delete(save=False)  # Delete the image file from storage
        achievement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializedData = AchievementSerializer(achievement, data=request.data, context={'request': request})
        if serializedData.is_valid():
            # Delete the old image if a new one is uploaded
            if 'image' in request.data and achievement.image:
                achievement.image.delete(save=False)
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)



# ANNOUNCEMENT VIEWS
@api_view(['GET'])
def get_announcement(request):
    announcements = Announcement.objects.all()
    serializedData = AnnouncementSerializer(announcements, many=True, context={'request': request})
    return Response(serializedData.data)

@api_view(['POST'])
def create_announcement(request):
    serializedData = AnnouncementSerializer(data=request.data, context={'request': request})
    if serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data, status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def announcement_detail(request, pk):
    try:
        announcement = Announcement.objects.get(pk=pk)
    except Announcement.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        announcement.image.delete(save=False)  # Delete the image file from storage
        announcement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializedData = AnnouncementSerializer(announcement, data=request.data, context={'request': request})
        if serializedData.is_valid():
            # Delete the old image if a new one is uploaded
            if 'image' in request.data and announcement.image:
                announcement.image.delete(save=False)
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
    
from rest_framework import generics
from .models import Proposal
from .serializer import ProposalSerializer
from rest_framework.permissions import IsAuthenticated

class ProposalListCreateView(generics.ListCreateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        status = self.request.query_params.get('status')
        user = self.request.user

        # Check if the user is an admin
        if user.accountType == 'Admin':
            # Admins can see all proposals, optionally filter by status
            if status:
                return Proposal.objects.filter(status=status)
            return Proposal.objects.all()
        else:
            # Non-admin users can only see their own proposals, optionally filter by status
            if status:
                return Proposal.objects.filter(user_id=user, status=status)
            return Proposal.objects.filter(user_id=user.id)
        
class ProposalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Check if the user is an admin
        if self.request.user.accountType == 'Admin':  # Or 'is_staff' if you're using the Django built-in staff status
            # Admin can access all proposals
            return Proposal.objects.all()
        else:
            # Non-admin users can only access their own proposals
            return Proposal.objects.filter(user_id=self.request.user)
        
    def patch(self, request, *args, **kwargs):
        proposal = self.get_object()
        
        # Check if the user has permission to approve the proposal
        if request.user.accountType == 'Admin':
            new_status = request.data.get('status', proposal.status)       
            # Automatically set the sign date based on the status
            if new_status == 'Approved by Director':
                
                proposal.directorSignDate = timezone.now().date()
                proposal.status = new_status
                proposal.save()
            elif new_status == 'Approved by VPRE':
                proposal.VPRESignDate = timezone.now().date()
                proposal.status = new_status
                proposal.save()
            elif new_status == 'Approved by President':
                proposal.PRESignDate = timezone.now().date()
                proposal.status = new_status
                proposal.save()
            

        elif request.user == proposal.user:
            proposal.title = request.data.get('title', proposal.title)
            proposal.project_description = request.data.get('project_description', proposal.project_description)
            proposal.save()

        else:
            return Response({"detail": "You do not have permission to perform this action."}, status=403)

        serializer = self.get_serializer(proposal)
        return Response(serializer.data)

    
    # def patch(self, request, *args, **kwargs):
    #     proposal = self.get_object()
    #     # Check if the user is an admin
    #     if request.user.accountType == 'Admin':
    #         # Admins can approve any proposal
    #         proposal.status = request.data.get('status', proposal.status)
    #         proposal.save()
    #     elif request.user == proposal.user:
    #         # Allow the owner of the proposal to make updates (if needed)
    #         proposal.status = request.data.get('status', proposal.status)
    #         proposal.save()
    #     else:
    #         # If the user is neither admin nor the owner, deny access
    #         return Response({"detail": "You do not have permission to perform this action."}, status=403)
        
    #     serializer = self.get_serializer(proposal)
    #     return Response(serializer.data)
