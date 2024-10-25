from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Achievement, Announcement, Account, ActivitySchedule, Barangay, Course, Department, Document, ResearchAgenda, BarangayApproval
from .serializer import AchievementSerializer, AnnouncementSerializer, ActivityScheduleSerializer, BarangaySerializer, CourseSerializer, DepartmentSerializer, DocumentSerializer,  TblAccountsSerializer, ResearchAgendaSerializer
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
            token = TokenObtainPairView.objects.get(refresh_key=refresh_token)

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
                'department': token.user.department,
            }, status=status.HTTP_200_OK)

        except TokenObtainPairView.DoesNotExist:
            return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_400_BAD_REQUEST)

# Account Views

def reissue_token(account):
    refresh = RefreshToken.for_user(account)

    # Include additional claims in the access token
    access_token = refresh.access_token
    access_token['accountType'] = account.accountType
    access_token['name'] = account.name
    access_token['department'] = account.department
    access_token['position'] = account.position

    return {
        'access_token': str(access_token),
        'refresh_token': str(refresh)
    }
    
@api_view(['GET'])
def get_all_user(request):
    try:
        users = Account.objects.all()
        serializer = TblAccountsSerializer(users, many=True)
        # print(serializer.data)
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
        # Fetch the account using the user_id
        account = Account.objects.get(user_id=user_id)
    except Account.DoesNotExist:
        return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)

    # Get the department and course names from the request data
    department_id = request.data.get('department')
    course_id = request.data.get('course')
    barangay_id = request.data.get('barangay')

    # Check and resolve the department_name to dept_id
    if department_id:
        department = Department.objects.filter(dept_id=department_id).first()
        if department:
            request.data['department'] = department.dept_id
        else:
            return Response({"error": f"Department '{department_id}' not found"}, status=status.HTTP_400_BAD_REQUEST)

    # Check and resolve the course_name to course_id
    if course_id:
        course = Course.objects.filter(course_id=course_id).first()
        if course:
            request.data['course'] = course.course_id
        else:
            return Response({"error": f"Course '{course_id}' not found"}, status=status.HTTP_400_BAD_REQUEST)
        
    if barangay_id:
        barangay = Barangay.objects.filter(id=barangay_id).first()
        
        if barangay:
            request.data['barangay'] = barangay.id
            # print("barangay query ", barangay.id)
        else:
            return Response({"error": f"Barangay '{id}' not found"}, status=status.HTTP_400_BAD_REQUEST)

    # Serialize and validate the data
    serializer = TblAccountsSerializer(account, data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the updated data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth.hashers import check_password, make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Update user profile
@api_view(['PATCH'])
def update_user_profile(request, user_id):
    try:
        account = Account.objects.get(user_id=user_id)  # Retrieve the Account instance
    except Account.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Update the profile fields from the request data
    data = request.data
    account.name = data.get('username', account.name)
    account.department = data.get('department', account.department)
    account.position = data.get('position', account.position)

    # Save the updated Account instance
    account.save()

    # Reissue new tokens after updating the profile
    new_tokens = reissue_token(account)

    return Response({
        "message": "Profile updated successfully!",
        "access_token": new_tokens['access_token'],  # Return the new access token
        "refresh_token": new_tokens['refresh_token'],  # Return the new refresh token
    }, status=status.HTTP_200_OK)


# Change user password
@api_view(['POST'])
def change_user_password(request, user_id):
    try:
        account = Account.objects.get(user_id=user_id)  # Retrieve the Account instance
    except Account.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    current_password = request.data.get('currentPassword')
    new_password = request.data.get('newPassword')

    # Verify that the current password is correct
    if not check_password(current_password, account.password):
        return Response({"error": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

    # Hash the new password and save it
    account.password = make_password(new_password)
    account.save()

    return Response({"message": "Password changed successfully!"}, status=status.HTTP_200_OK)

#BRGY VIEWS
# GET view for listing all Barangays
@api_view(['GET'])
def get_all_barangays(request):
    barangays = Barangay.objects.all()
    serializedData = BarangaySerializer(barangays, many=True, context={'request': request})
    return Response(serializedData.data)


# GET view for retrieving a specific Barangay by ID
@api_view(['GET'])
def get_barangay_detail(request, pk):
    try:
        barangay = Barangay.objects.get(pk=pk)
    except Barangay.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedData = BarangaySerializer(barangay, context={'request': request})
    return Response(serializedData.data)

# POST view for creating a new Barangay
@api_view(['POST'])
def create_barangay(request):
    serializedData = BarangaySerializer(data=request.data, context={'request': request})
    if serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data, status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def update_delete_barangay(request, pk):
    try:
        barangay = Barangay.objects.get(pk=pk)
    except Barangay.DoesNotExist:
        return Response({"error": "Barangay not found"}, status=status.HTTP_404_NOT_FOUND)

    if  request.method == 'PUT':
        # If 'PUT', replace the existing file if a new one is uploaded
        serializedData = BarangaySerializer(barangay, data=request.data, context={'request': request})
        if serializedData.is_valid():
            if 'moa' in request.data and barangay.moa:
                # Delete the old MOA file if a new one is uploaded
                barangay.moa.delete(save=False)
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if barangay.moa:
            # Delete the file associated with the MOA before deleting the instance
            barangay.moa.delete(save=False)
        barangay.delete()
        return Response({"message": "Barangay deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# DEPARTMENT VIEWS
# GET: Retrieve all departments
@api_view(['GET'])
def get_departments(request):
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)

# POST: Create a new department
@api_view(['POST'])
def create_department(request):
    serializer = DepartmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# GET, PUT, DELETE: Retrieve, update, or delete a single department by ID
@api_view(['GET', 'PUT', 'DELETE'])
def update_delete_department(request, pk):
    try:
        department = Department.objects.get(pk=pk)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = DepartmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# COURSE VIEWS
# GET: Retrieve all courses
@api_view(['GET'])
def get_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_courses_by_department(request, dept_id):
    try:
        courses = Course.objects.filter(dept__dept_id=dept_id)  # Filter courses by department ID
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

# POST: Create a new course
@api_view(['POST'])
def create_course(request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# GET, PUT, DELETE: Retrieve, update, or delete a single course by course_id
@api_view(['GET', 'PUT', 'DELETE'])
def course_detail(request, course_id):
    try:
        course = Course.objects.get(course_id=course_id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
    
# POST view for creating a new ActivitySchedule
@api_view(['POST'])
def create_activity_schedule(request):
    serializedData = ActivityScheduleSerializer(data=request.data, context={'request': request})
    if serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data, status=status.HTTP_201_CREATED)
    return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

# GET view for retrieving all ActivitySchedules
@api_view(['GET'])
def get_all_activity_schedules(request):
    activity_schedules = ActivitySchedule.objects.all()
    serializedData = ActivityScheduleSerializer(activity_schedules, many=True, context={'request': request})
    return Response(serializedData.data)

# GET view for retrieving a specific ActivitySchedule by ID
@api_view(['GET'])
def get_activity_schedule_detail(request, pk):
    try:
        activity_schedule = ActivitySchedule.objects.get(pk=pk)
    except ActivitySchedule.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializedData = ActivityScheduleSerializer(activity_schedule, context={'request': request})
    return Response(serializedData.data)



# GET: Retrieve all documents
@api_view(['GET'])
def get_all_documents(request):
    documents = Document.objects.all()
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)

# POST: Create a new document
@api_view(['POST'])
def upload_document(request):
    serializer = DocumentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE: Delete a specific document
@api_view(['DELETE'])
def delete_document(request, pk):
    try:
        document = Document.objects.get(pk=pk)
    except Document.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    document.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



from rest_framework import generics
from .models import Proposal, ProposalVersion
from .serializer import ProposalSerializer, ProposalVersionSerializer
from rest_framework.permissions import IsAuthenticated

class ProposalListCreateView(generics.ListCreateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        status = self.request.query_params.get('status')
        user = self.request.user
        department = self.request.user.department
        # Check if the user is an admin
        if user.accountType == 'Admin':
            # Admins can see all proposals, but filter out fully approved ones
            if status:
                if status == 'Pending':
                    # Exclude fully approved proposals (e.g., Approved by Barangay)
                    return Proposal.objects.exclude(status='Approved by Barangay').filter(status__in=['Pending', 'Approved by Director', 'Approved by VPRE', 'Approved by President', 'Partly Approved by Barangay'])
                return Proposal.objects.filter(status=status)
            return Proposal.objects.exclude(status='Approved by Barangay')  # Exclude fully approved proposals
        elif user.accountType == 'Proponent':
            if status:
                if status == 'Pending':
                    return Proposal.objects.exclude(status='Approved by Barangay').filter(user_id=user.user_id, status__in=['Pending', 'Approved by Director', 'Approved by VPRE', 'Approved by President', 'Partly Approved by Barangay'])
                if status == 'Rejected':
                    return Proposal.objects.filter(user_id=user, status='Rejected')
                if status == 'Approved by Barangay':
                    return Proposal.objects.filter(user_id=user.user_id, status='Approved by Barangay')
            return Proposal.objects.filter(user_id=user)
        else:
            # Non-admin users can only see their own proposals, optionally filter by status
            if status:
                return Proposal.objects.extra(
                    where=["FIND_IN_SET(%s, REPLACE(partner_community, ', ', ',')) > 0"],
                    params=[department]
                ).filter(status=status)
            
            return Proposal.objects.extra(
                where=["FIND_IN_SET(%s, REPLACE(partner_community, ', ', ',')) > 0"],
                params=[department]
            )        
    def post(self, request, *args, **kwargs):
        # print(request.data)
        return super().post(request, *args, **kwargs)    
class ProposalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Check if the user is an admin
        if self.request.user.accountType == 'Admin':
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
            elif new_status == 'Approved by VPRE':
                proposal.VPRESignDate = timezone.now().date()
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

        # Handle signatories if provided
        if 'signatories' in request.data:
            signatories_data = request.data.get('signatories', [])
            for signatory in signatories_data:
                Signatory.objects.update_or_create(
                    proposal=proposal,
                    name=signatory.get('name'),
                    position=signatory.get('position'),
                    section=signatory.get('section')
                )

        serializer = self.get_serializer(proposal)
        return Response(serializer.data)
    
class BarangayApprovedProposalsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        department = user.department  # Assuming department represents barangay

        if not department:
            return Response({"error": "No barangay found for the user"}, status=400)

        # Get all proposals that include this barangay and are approved by barangay
        approved_proposals = Proposal.objects.filter(
            status='Approved by Barangay',
            partner_community__contains=department  # Assuming partner_community is a comma-separated string
        )
        
        serializer = ProposalSerializer(approved_proposals, many=True)
        return Response(serializer.data, status=200)
    
class ProposalResubmissionView(generics.UpdateAPIView):
    """
    View to resubmit a rejected proposal and create a new version.
    """
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        proposal_id = kwargs.get('proposal_id')
        try:
            proposal = Proposal.objects.get(proposal_id=proposal_id)

            # Only allow resubmission if the proposal was rejected
            if proposal.status != 'Rejected':
                return Response({"error": "Only rejected proposals can be resubmitted."}, status=status.HTTP_400_BAD_REQUEST)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=status.HTTP_404_NOT_FOUND)

        # Find the latest version number
        latest_version = proposal.versions.order_by('-version_number').first()
        new_version_number = latest_version.current_version_id + 1 if latest_version else 1

        # Create the new version in the ProposalVersion table
        ProposalVersion.objects.create(
            proposal=proposal,
            version_number=new_version_number,
            title=request.data.get('title', proposal.title),
            project_description=request.data.get('project_description', proposal.project_description),
            engagement_date=request.data.get('engagement_date', proposal.engagement_date),
            disengagement_date=request.data.get('disengagement_date', proposal.disengagement_date),
            department=request.data.get('department', proposal.department),
            lead_proponent=request.data.get('lead_proponent', proposal.lead_proponent),
            contact_details=request.data.get('contact_details', proposal.contact_details),
            target_date=request.data.get('target_date', proposal.target_date),
            location=request.data.get('location', proposal.location),
            partner_community=request.data.get('partner_community', proposal.partner_community),
            school=request.data.get('school', proposal.school) in ['true', 'True', True],
            barangay=request.data.get('barangay', proposal.barangay) in ['true', 'True', True],
            government_org=request.data.get('government_org', proposal.government_org),
            non_government_org=request.data.get('non_government_org', proposal.non_government_org),
            identified_needs_text=request.data.get('identified_needs_text', proposal.identified_needs_text),
            general_objectives=request.data.get('general_objectives', proposal.general_objectives),
            specific_objectives=request.data.get('specific_objectives', proposal.specific_objectives),
            success_indicators=request.data.get('success_indicators', proposal.success_indicators),
            cooperating_agencies=request.data.get('cooperating_agencies', proposal.cooperating_agencies),
            monitoring_mechanics=request.data.get('monitoring_mechanics', proposal.monitoring_mechanics),
            evaluation_mechanics=request.data.get('evaluation_mechanics', proposal.evaluation_mechanics),
            timetable=request.data.get('timetable', proposal.timetable),
            risk_assessment=request.data.get('risk_assessment', proposal.risk_assessment),
            action_plans=request.data.get('action_plans', proposal.action_plans),
            sustainability_approaches=request.data.get('sustainability_approaches', proposal.sustainability_approaches),
            budget_requirement_text=request.data.get('budget_requirement_text', proposal.budget_requirement_text),
            budget_requirement_file=request.data.get('budget_requirement_file', proposal.budget_requirement_file),
            version_status='Resubmitted-Pending'
        )

        # Update the main Proposal object with the new data and reset status to Pending
        proposal.title = request.data.get('title', proposal.title)
        proposal.project_description = request.data.get('project_description', proposal.project_description)
        proposal.target_date = request.data.get('target_date', proposal.target_date)
        proposal.status = 'Pending'
        proposal.current_version_id = new_version_number
        proposal.save()

        return Response({"message": f"Proposal resubmitted as version {new_version_number}"}, status=status.HTTP_200_OK)

    
class ProposalVersionListView(APIView):
    """
    View to list all versions of a specific proposal.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, proposal_id):
        try:
            proposal = Proposal.objects.get(proposal_id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=404)

        # Get all versions of the proposal
        versions = ProposalVersion.objects.filter(proposal=proposal).order_by('version_number')
        serializer = ProposalVersionSerializer(versions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProposalVersionDetailView(APIView):
    """
    View to retrieve a specific version of a proposal.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, proposal_id, version_number):
        try:
            proposal = Proposal.objects.get(proposal_id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=404)

        try:
            version = ProposalVersion.objects.get(proposal=proposal, version_number=version_number)
        except ProposalVersion.DoesNotExist:
            return Response({"error": "Version not found"}, status=404)

        serializer = ProposalVersionSerializer(version)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BarangayApprovalView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, proposal_id):
        user = request.user
        barangay = user.department  # Assuming the barangay is stored in the department field

        try:
            proposal = Proposal.objects.get(proposal_id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=404)

        partner_communities = proposal.partner_community_list()

        if barangay not in partner_communities:
            return Response({"error": "You are not authorized to approve this proposal."}, status=403)

        barangay_approval, created = BarangayApproval.objects.get_or_create(proposal=proposal, barangay_name=barangay)

        status = request.data.get('status')
        if status in ['Approved', 'Rejected']:
            barangay_approval.status = status
            barangay_approval.sign_date = timezone.now().date()
            barangay_approval.save()

            # After saving the approval, update the overall proposal status
            proposal.update_overall_status()

            return Response({"message": "Approval status updated successfully"}, status=200)
        
        return Response({"error": "Invalid status"}, status=400)
    
    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from .models import Proposal
from .utils import generate_proposal_doc, convert_docx_to_pdf # Assuming the function is in a utils.py file
import os

class DownloadProposalDoc(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, proposal_id):
        try:
            proposal = Proposal.objects.get(proposal_id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=404)
        
        # Step 1: Generate the .docx file using the existing function
        doc_path = generate_proposal_doc(proposal)
        
        # Step 2: Convert the .docx file to .pdf
        pdf_path = convert_docx_to_pdf(doc_path)
        
        # Step 3: Serve the PDF file with the correct extension
        if os.path.exists(pdf_path):
            with open(pdf_path, 'rb') as pdf_file:
                # Log for debugging purposes
                # print(f"Serving file: {pdf_path}")
                
                # Read and serve the PDF file
                response = HttpResponse(pdf_file.read(), content_type='application/pdf')
                
                # Force the filename to be a PDF, even if the docx was used for generation
                response['Content-Disposition'] = f'attachment; filename="proposal_{proposal_id}.pdf"'
                
                # Log the Content-Disposition for debugging purposes
                # print(f"Content-Disposition: {response['Content-Disposition']}")
                
                # No cache
                response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
                response['Pragma'] = 'no-cache'
                response['Expires'] = '0'
                
                return response
        else:
            return Response({"error": "Document generation failed"}, status=500)



