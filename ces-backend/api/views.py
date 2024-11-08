from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from datetime import datetime
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Achievement, Announcement, ActivitySchedule, Barangay, Course, Department, Document, ResearchAgenda, BarangayApproval
from .models import (
    Account,
    EvaluatorAccount,
    StudentEvaluator,
    FacultyEvaluator,
    AlumniEvaluator,
    ExternalParticipantEvaluator,
    BrgyOfficialAccount,
    ProponentAccount,
    AdminAccount,
)
from .serializer import AchievementSerializer, AnnouncementSerializer, ActivityScheduleSerializer, BarangaySerializer, CourseSerializer, DepartmentSerializer, DocumentSerializer,  TblAccountsSerializer, ResearchAgendaSerializer
from rest_framework import status as rest_status
from django.contrib.auth import authenticate
# from .models import CustomAuthToken
from rest_framework import viewsets
from django.utils import timezone

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer
from django.shortcuts import get_object_or_404
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Refresh Token View
class RefreshTokenView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh_token')

        try:
            # Reissue tokens
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()  # Blacklist the old token if necessary
            new_access_token = refresh.access_token

            user = Account.objects.get(user_id=refresh['user_id'])
            return Response({
                'access_token': str(new_access_token),
                'refresh_token': str(refresh),
                'user_id': user.user_id,
                'username': user.username,
                'accountType': user.accountType,
                'department': getattr(user.proponentaccount, 'department', None),
            }, status=status.HTTP_200_OK)

        except Exception:
            return Response({'error': 'Invalid or expired refresh token.'}, status=status.HTTP_400_BAD_REQUEST)

# Helper Function to Reissue Tokens
def reissue_token(account):
    refresh = RefreshToken.for_user(account)
    access_token = refresh.access_token

    # Include additional claims
    access_token['accountType'] = account.accountType
    # access_token['name'] = account.name
    access_token['position'] = account.position

    if account.accountType == 'Admin' and hasattr(account, 'adminaccount'):
        access_token['name'] = account.adminaccount.name
    elif account.accountType == 'Brgy. Official' and hasattr(account, 'brgyofficialaccount'):
        access_token['name'] = account.brgyofficialaccount.name
    elif account.accountType == 'Proponent' and hasattr(account, 'proponentaccount'):
        access_token['name'] = account.proponentaccount.name
        # Include department information for Proponent accounts
        refresh['department'] = account.proponentaccount.department.dept_id if account.proponentaccount.department else None
    elif account.accountType == 'Evaluator' and hasattr(account, 'evaluatoraccount'):
        access_token['name'] = account.evaluatoraccount.name
    else:
        access_token['name'] = "Unknown"
        
    return {
        'access_token': str(access_token),
        'refresh_token': str(refresh)
    }

# Get All Users
@api_view(['GET'])
def get_all_user(request):
    try:
        users = Account.objects.all()
        formatted_users = []

        for user in users:
            user_data = {
                "user_id": user.user_id,
                "username": user.username,
                "accountType": user.accountType,
                "position": user.position,
                "status": user.status,
                "activationDate": user.activationDate,
                "deactivationDate": user.deactivationDate,
                "department_name": None,
                "course_name": None,
                "barangay_name": None,
                "last_login": user.last_login,
                "name": None  # Initialize name to None
            }

            # Get name from related account type
            if user.accountType == 'Admin':
                admin_account = getattr(user, 'adminaccount', None)
                user_data["name"] = admin_account.name if admin_account else None
            elif user.accountType == 'Proponent':
                proponent_account = getattr(user, 'proponentaccount', None)
                user_data["name"] = proponent_account.name if proponent_account else None
                user_data["department_name"] = proponent_account.department.dept_name if proponent_account and proponent_account.department else None
                user_data["course_name"] = proponent_account.course.course_name if proponent_account and proponent_account.course else None
            elif user.accountType == 'Brgy. Official':
                brgy_account = getattr(user, 'brgyofficialaccount', None)
                user_data["name"] = brgy_account.name if brgy_account else None
                user_data["barangay_name"] = brgy_account.barangay.brgy_name if brgy_account and brgy_account.barangay else None
            elif user.accountType == 'Evaluator':
                evaluator_account = getattr(user, 'evaluatoraccount', None)
                user_data["name"] = evaluator_account.name if evaluator_account else None

            formatted_users.append(user_data)

        return Response(formatted_users, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create User
@api_view(['POST'])
def create_user(request):
    data = request.data
    
    # Start by validating the common account fields
    account_data = {
        "username": data.get("username"),
        "password": data.get("password"),
        "accountType": data.get("accountType"),
        "position": data.get("position"),
        "status": data.get("status"),
        "activationDate": data.get("activationDate"),
        "deactivationDate": data.get("deactivationDate"),
    }
    
    # Create the Account instance
    account_serializer = TblAccountsSerializer(data=account_data)
    if account_serializer.is_valid():
        account_instance = account_serializer.save()  # Save account instance
        
        # Now handle the creation based on account type
        account_type = data.get("accountType")
        
        if account_type == 'Admin':
            AdminAccount.objects.create(account=account_instance, name=data.get("name"))

        elif account_type == 'Brgy. Official':
            # Make sure to retrieve the Barangay instance
            barangay_id = data.get("barangay")
            if barangay_id:
                barangay = get_object_or_404(Barangay, id=barangay_id)
                BrgyOfficialAccount.objects.create(
                    account=account_instance,
                    name=data.get("name"),
                    barangay=barangay  # Set the Barangay instance
                )
            else:
                return Response({"error": "Barangay is required for Brgy. Official"}, status=status.HTTP_400_BAD_REQUEST)

        elif account_type == 'Proponent':
            department_id = data.get("department")  # Fetch department ID from the request
            course_id = data.get("course")  # Fetch course ID from the request

            # Fetch the Department instance
            department = get_object_or_404(Department, dept_id=department_id) if department_id else None

            # Fetch the Course instance
            course = get_object_or_404(Course, course_id=course_id) if course_id else None

            # Create the ProponentAccount
            ProponentAccount.objects.create(
                account=account_instance,
                name=data.get("name"),
                department=department,  # Set the Department instance
                course=course  # Set the Course instance
            )

        elif account_type == 'Evaluator':
            evaluator_type = data.get("evaluator_type")  # This should be sent in the request
            evaluator_account = EvaluatorAccount.objects.create(
                account=account_instance,
                name=data.get("name"),
                evaluator_type=evaluator_type
            )
            
            # Create specific evaluator details based on evaluator_type
            if evaluator_type == 'Student':
                StudentEvaluator.objects.create(
                    evaluator=evaluator_account,
                    student_id=data.get("studentId"),
                    student_email=data.get("email"),
                    contact_number=data.get("contactNumber"),
                    course=data.get("course"),
                    department=data.get("department"),
                )
            elif evaluator_type == 'Faculty':
                FacultyEvaluator.objects.create(
                    evaluator=evaluator_account,
                    email=data.get("email"),
                    contact_number=data.get("contactNumber"),
                    department=data.get("department"),
                    position=data.get("position"),
                )
            elif evaluator_type == 'Alumni':
                AlumniEvaluator.objects.create(
                    evaluator=evaluator_account,
                    email=data.get("email"),
                    contact_number=data.get("contactNumber"),
                    course=data.get("course"),
                    department=data.get("department"),
                )
            elif evaluator_type == 'External':
                ExternalParticipantEvaluator.objects.create(
                    evaluator=evaluator_account,
                    email=data.get("email"),
                    contact_number=data.get("contactNumber"),
                    barangay=data.get("barangay"),
                )
            else:
                return Response({"error": "Invalid evaluator type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(account_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(account_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PUT'])
def user_info_action(request, user_id):
    try:
        account = Account.objects.get(user_id=user_id)
    except Account.DoesNotExist:
        return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)

    # Initialize the response data
    response_data = {}

    # Update the common fields in Account
    name = request.data.get('name')
    if name:
        # Update the name in the related account type
        if account.accountType == 'Admin':
            admin_account = AdminAccount.objects.get(account=account)
            admin_account.name = name
            admin_account.save()
        elif account.accountType == 'Brgy. Official':
            brgy_official_account = BrgyOfficialAccount.objects.get(account=account)
            brgy_official_account.name = name
            brgy_official_account.save()
        elif account.accountType == 'Proponent':
            proponent_account = ProponentAccount.objects.get(account=account)
            proponent_account.name = name
            proponent_account.save()
        elif account.accountType == 'Evaluator':
            evaluator_account = EvaluatorAccount.objects.get(account=account)
            evaluator_account.name = name
            evaluator_account.save()
        response_data['name'] = name

    # Update the position
    position = request.data.get('position')
    if position:
        account.position = position  # Update position
        response_data['position'] = position

    # Update status if provided
    accstatus = request.data.get('status')
    if status:
        account.status = accstatus
        if accstatus == "Inactive":
            account.deactivationDate = datetime.now().date()
        elif accstatus == "Active":
            account.deactivationDate = None
        response_data['status'] = accstatus

    # Check if account type has changed
    new_account_type = request.data.get('accountType')
    if new_account_type and new_account_type != account.accountType:
        # Handle the change in account type as previously described
        # First delete the existing related account entry
        if account.accountType == 'Admin':
            AdminAccount.objects.get(account=account).delete()
        elif account.accountType == 'Brgy. Official':
            BrgyOfficialAccount.objects.get(account=account).delete()
        elif account.accountType == 'Proponent':
            ProponentAccount.objects.get(account=account).delete()
        elif account.accountType == 'Evaluator':
            EvaluatorAccount.objects.get(account=account).delete()

        # Create the new account type with updated fields
        account.accountType = new_account_type
        account.save()  # Save the updated account type first

        if new_account_type == 'Admin':
            AdminAccount.objects.create(account=account, name=name)
        elif new_account_type == 'Brgy. Official':
            barangay_id = request.data.get('barangay')
            BrgyOfficialAccount.objects.create(account=account, name=name, barangay_id=barangay_id)
        elif new_account_type == 'Proponent':
            department_id = request.data.get('department')
            course_id = request.data.get('course')
            department = Department.objects.get(dept_id=department_id) if department_id else None
            course = Course.objects.get(course_id=course_id) if course_id else None
            ProponentAccount.objects.create(account=account, name=name, department=department, course=course)
        elif new_account_type == 'Evaluator':
            evaluator_type = request.data.get('evaluator_type')
            EvaluatorAccount.objects.create(account=account, name=name, evaluator_type=evaluator_type)
    elif account.accountType == 'Proponent':
        proponent_account = ProponentAccount.objects.get(account=account)
        
        # Update department if provided
        department_id = request.data.get('department')
        if department_id:
            department = Department.objects.get(dept_id=department_id)
            proponent_account.department = department
            response_data['department'] = department.dept_name  # Assuming you want to return the name

        # Update course if provided
        course_id = request.data.get('course')
        if course_id:
            course = Course.objects.get(course_id=course_id)
            proponent_account.course = course
            response_data['course'] = course.course_name  # Assuming you want to return the name

        proponent_account.save()

    # Save changes to the Account model
    account.save()

    # Return the updated account information
    return Response({"message": "Account status updated successfully"}, status=status.HTTP_200_OK)




from django.contrib.auth.hashers import check_password, make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Account, Department, AdminAccount, BrgyOfficialAccount, ProponentAccount, EvaluatorAccount

@api_view(['PATCH'])
def update_user_profile(request, user_id):
    try:
        account = Account.objects.get(user_id=user_id)
    except Account.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    name = data.get('username')

    # Update the name field for the appropriate account type
    if account.accountType == 'Admin':
        admin_account = AdminAccount.objects.get(account=account)
        admin_account.name = name or admin_account.name
        print("xxx", name)
        admin_account.save()

    elif account.accountType == 'Brgy. Official':
        brgy_official_account = BrgyOfficialAccount.objects.get(account=account)
        brgy_official_account.name = name or brgy_official_account.name
        brgy_official_account.save()

    elif account.accountType == 'Proponent':
        proponent_account = ProponentAccount.objects.get(account=account)
        proponent_account.name = name or proponent_account.name
        department_id = data.get('department')
        if department_id:
            try:
                department = Department.objects.get(dept_id=department_id)
                proponent_account.department = department
            except Department.DoesNotExist:
                return Response({"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)
        proponent_account.save()

    elif account.accountType == 'Evaluator':
        evaluator_account = EvaluatorAccount.objects.get(account=account)
        evaluator_account.name = name or evaluator_account.name
        evaluator_account.save()

    # Update common fields
    account.position = data.get('position', account.position)
    account.save()

    # Reissue tokens
    new_tokens = reissue_token(account)
    return Response({
        "message": "Profile updated successfully!",
        "access_token": new_tokens['access_token'],
        "refresh_token": new_tokens['refresh_token'],
    }, status=status.HTTP_200_OK)


# Change User Password
@api_view(['POST'])
def change_user_password(request, user_id):
    try:
        account = Account.objects.get(user_id=user_id)
    except Account.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    current_password = request.data.get('currentPassword')
    new_password = request.data.get('newPassword')

    if not check_password(current_password, account.password):
        return Response({"error": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

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
# @api_view(['POST'])
# def create_activity_schedule(request):
#     serializedData = ActivityScheduleSerializer(data=request.data, context={'request': request})
#     if serializedData.is_valid():
#         serializedData.save()
#         return Response(serializedData.data, status=status.HTTP_201_CREATED)
#     return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_activity_schedule(request):
    serializedData = ActivityScheduleSerializer(data=request.data)
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
        department_id = self.request.query_params.get('department_id')
        user = self.request.user
        barangay = self.request.user.barangay
        # Check if the user is an admin
        if user.accountType == 'Admin':
            # Start with a base queryset for admins
            queryset = Proposal.objects.all()

            # Apply the status filter for admins
            if status:
                if status == 'Pending':
                    # Exclude fully approved proposals for 'Pending' status
                    queryset = queryset.exclude(status='Approved by Barangay').filter(
                        status__in=['Pending', 'Approved by Director', 'Approved by VPRE', 'Approved by President', 'Partly Approved by Barangay']
                    )
                else:
                    queryset = queryset.filter(status=status)
            
            # Apply the department_id filter if provided
            if department_id:
                queryset = queryset.filter(user_id__department_id=department_id)
            
            # If no specific status was provided, exclude fully approved proposals by default
            if not status:
                queryset = queryset.exclude(status='Approved by Barangay')

            return queryset
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
                    params=[barangay]
                ).filter(status=status)
            
            return Proposal.objects.extra(
                where=["FIND_IN_SET(%s, REPLACE(partner_community, ', ', ',')) > 0"],
                params=[barangay]
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
        department = user.barangay  # Assuming department represents barangay
        
        if not department:
            return Response({"error": "No barangay found for the user"}, status=400)

        # Get all proposals that include this barangay and are approved by barangay
        approved_proposals = Proposal.objects.filter(
            status='Approved by Barangay',
            partner_community__contains=department  # Assuming partner_community is a comma-separated string
        )
        
        # print(approved_proposals)
        
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

    def get(self, request, proposal_id):
        user = request.user
        barangay = user.barangay.brgy_name  # Assuming barangay name is stored here

        try:
            proposal = Proposal.objects.get(proposal_id=proposal_id)
        except Proposal.DoesNotExist:
            return Response({"error": "Proposal not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            barangay_approval = BarangayApproval.objects.get(proposal=proposal, barangay_name=barangay)
            return Response({
                "status": barangay_approval.status,
                "sign_date": barangay_approval.sign_date,
                "remarks": barangay_approval.remarks
            }, status=status.HTTP_200_OK)
        except BarangayApproval.DoesNotExist:
            return Response({"status": "Pending"}, status=status.HTTP_200_OK)
        
    def patch(self, request, proposal_id):
        user = request.user
        barangay = user.barangay.brgy_name  # Assuming the barangay is stored in the department field

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



