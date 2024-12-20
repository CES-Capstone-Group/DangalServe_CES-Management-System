from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import Account, Achievement, ActivitySchedule, FileUpload, Announcement, Barangay, Course, Department, Document, ResearchAgenda, Proponent, Proposal, Signatory, ProposalVersion, BarangayApproval
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.exceptions import ValidationError
import json
from django.utils import timezone
from datetime import timedelta

# Custom Token Serializer to include extra fields in JWT    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Set 'name' claim in the token using the appropriate name from the associated model
        if user.accountType == 'Admin' and hasattr(user, 'adminaccount'):
            token['name'] = user.adminaccount.name
        elif user.accountType == 'Brgy. Official' and hasattr(user, 'brgyofficialaccount'):
            token['name'] = user.brgyofficialaccount.name
        elif user.accountType == 'Proponent' and hasattr(user, 'proponentaccount'):
            token['name'] = user.proponentaccount.name
        elif user.accountType == 'Evaluator' and hasattr(user, 'evaluatoraccount'):
            token['name'] = user.evaluatoraccount.name
        else:
            token['name'] = user.username  # Fallback to the account's username if no name is found

        # Add additional claims
        token['position'] = user.position
        token['accountType'] = user.accountType

        # Include additional details for Proponents
        if user.accountType == 'Proponent':
            proponent = getattr(user, 'proponentaccount', None)
            if proponent and proponent.department:
                token['department'] = proponent.department.dept_name
            else:
                token['department'] = None

        # Include additional details for Barangay Officials
        elif user.accountType == 'Brgy. Official':
            brgy_official = getattr(user, 'brgyofficialaccount', None)
            if brgy_official and brgy_official.barangay:
                token['barangay'] = brgy_official.barangay.brgy_name
            else:
                token['barangay'] = None

        return token

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        # Attempt to get the user from the database
        user = Account.objects.filter(username=username).first()
        if user is None:
            raise AuthenticationFailed("Invalid credentials. Please try again.")

        # Check if the account is locked
        current_time = timezone.now()
        if user.lockout_until and user.lockout_until > current_time:
            minutes_left = int((user.lockout_until - current_time).total_seconds() // 60)
            raise AuthenticationFailed(
                f"Account is locked. Please try again after {minutes_left} minute(s)."
            )

        # Check if the provided password is correct
        if not user.check_password(password):
            # Increment failed login attempts
            user.failed_login_attempts += 1
            if user.failed_login_attempts >= 3:
                user.lockout_until = current_time + timedelta(minutes=15)  # Lock for 15 minutes
                user.failed_login_attempts = 0  # Reset failed attempts after locking
            user.save()
            raise AuthenticationFailed("Invalid credentials. Please try again.")

        # Perform the standard validation
        data = super().validate(attrs)

        # Ensure the account is active
        if user.status != "Active":
            raise AuthenticationFailed("Account is not active")

        # Reset failed attempts if login is successful
        user.failed_login_attempts = 0
        user.lockout_until = None
        user.save()

        # Add extra response data
        data["user_id"] = user.user_id
        data["accountType"] = user.accountType
        data["position"] = user.position

        # Set 'name' in the response using the appropriate associated model
        if user.accountType == "Admin" and hasattr(user, "adminaccount"):
            data["name"] = user.adminaccount.name
        elif user.accountType == "Brgy. Official" and hasattr(user, "brgyofficialaccount"):
            data["name"] = user.brgyofficialaccount.name
        elif user.accountType == "Proponent" and hasattr(user, "proponentaccount"):
            data["name"] = user.proponentaccount.name
        elif user.accountType == "Evaluator" and hasattr(user, "evaluatoraccount"):
            data["name"] = user.evaluatoraccount.name
        else:
            data["name"] = user.username  # Fallback to the account's username if no name is found

        # Include additional details for Proponents
        if user.accountType == "Proponent":
            proponent = getattr(user, "proponentaccount", None)
            if proponent and proponent.department:
                data["department_name"] = proponent.department.dept_name
            else:
                data["department_name"] = None

            if proponent and proponent.course:
                data["course_name"] = proponent.course.course_name
            else:
                data["course_name"] = None

        # Include additional details for Barangay Officials
        elif user.accountType == "Brgy. Official":
            brgy_official = getattr(user, "brgyofficialaccount", None)
            if brgy_official and brgy_official.barangay:
                data["brgy_name"] = brgy_official.barangay.brgy_name
            else:
                data["brgy_name"] = None

        return data


# Serializer for login and authentication
# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     def validate(self, data):
#         username = data.get("username")
#         password = data.get("password")

#         if username and password:
#             # Debugging log
#             print(f"Authenticating user: {username} with password: {password}")
#             user = authenticate(username=username, password=password)
#             if user is None:
#                 raise serializers.ValidationError(
#                     "Invalid credentials provided.", code="authorization"
#                 )
#             return {"user": user}
#         else:
#             raise serializers.ValidationError("Must include username and password.")

# Serializer for handling Account model
class TblAccountsSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='proponentaccount.department.dept_name', read_only=True)
    course_name = serializers.CharField(source='proponentaccount.course.course_name', read_only=True)
    barangay_name = serializers.CharField(source='brgyofficialaccount.barangay.brgy_name', read_only=True)

    class Meta:
        model = Account
        fields = '__all__'
        # fields = ['user_id', 'username', 'name', 'accountType', 'position', 
        #         'activationDate', 'deactivationDate', 'status', 
        #         'department_name', 'course_name']
        
        extra_kwargs = {
            'password': {'required': False}  # Make password field optional
        }
        
    def validate(self, data):
        # Perform model-level validation
        account = Account(**data)
        try:
            account.clean()  # Raises ValidationError if data is invalid
        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        return data

#Serializer for handling Barangay model
class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = ['id', 'brgy_name', 'moa']  # Specify the fields you want to serialize

# Serializer for the Course model
class CourseSerializer(serializers.ModelSerializer):
    dept_name = serializers.CharField(source='dept.dept_name', read_only=True)  # Display department name

    class Meta:
        model = Course
        fields = ['course_id', 'course_name', 'dept', 'dept_name']  
        
        
from kpi.serializer import KpiTableSerializer
class DepartmentSerializer(serializers.ModelSerializer):
# Serializer for the Department model
    courses = CourseSerializer(many=True, read_only=True) 
    # tables = KpiTableSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ['dept_id', 'dept_name', 'courses']
        
    def get_tables(self, obj):
        # Only include tables if 'include_tables' is passed in the context
        if self.context.get('include_tables'):
            return KpiTableSerializer(obj.tables.all(), many=True).data
        return None


# Serializer for ResearchAgenda model
class ResearchAgendaSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ResearchAgenda
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class AchievementSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Achievement
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None


class AnnouncementSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Announcement
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'title', 'file', 'uploaded_at']

class ProposalVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalVersion
        fields = '__all__'
        
class ProponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proponent
        fields = ['name', 'position']


class SignatorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Signatory
        fields = ['name', 'position', 'section']


class ProposalSerializer(serializers.ModelSerializer):
    proponents = ProponentSerializer(many=True, required=False)
    signatories = SignatorySerializer(many=True, required=False)
    user_department_id = serializers.IntegerField(source='user_id.proponentaccount.department_id', read_only=True)

  
    class Meta:
        model = Proposal
        exclude = ['user_id']

    def create(self, validated_data):
        proponents_data = json.loads(self.context['request'].data.get('proponents', '[]'))
        signatories_data = json.loads(self.context['request'].data.get('signatories', '[]'))
        
        # Create the proposal
        user = self.context['request'].user
        proposal = Proposal.objects.create(user_id=user, **validated_data)

        # Handle proponents
        for proponent_data in proponents_data:
            Proponent.objects.create(proposal=proposal, **proponent_data)

        # Handle signatories
        for signatory_data in signatories_data:
            Signatory.objects.create(proposal=proposal, **signatory_data)

        return proposal

    def update(self, instance, validated_data):
        proponents_data = validated_data.pop('proponents', [])
        signatories_data = validated_data.pop('signatories', [])

        # Validation for status changes
        current_status = instance.status
        new_status = validated_data.get('status', current_status)

        # Enforce approval sequence rules
        if new_status == "Approved by Director" and current_status != "Pending":
            raise serializers.ValidationError("Proposal must be 'Pending' to be approved by the Director.")
        if new_status == "Approved by Barangay" and current_status != "Approved by Director":
            raise serializers.ValidationError("Proposal must be 'Approved by Director' before being approved by Barangay.")
        if new_status == "Approved by VPRE" and current_status != "Approved by Barangay":
            raise serializers.ValidationError("Proposal must be 'Approved by Barangay' before being approved by VPRE.")
        if new_status == "Approved by President" and current_status != "Approved by VPRE":
            raise serializers.ValidationError("Proposal must be 'Approved by VPRE' before being approved by the President.")

        # Update the proposal instance
        instance = super().update(instance, validated_data)

        # Clear and re-add proponents
        instance.proponents.clear()
        for proponent_data in proponents_data:
            proponent, created = Proponent.objects.get_or_create(**proponent_data)
            instance.proponents.add(proponent)

        # Clear and re-add signatories
        instance.signatories.all().delete()
        for signatory_data in signatories_data:
            Signatory.objects.create(proposal=instance, **signatory_data)

        return instance
    
    
class BarangayApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarangayApproval
        fields = ['barangay_name', 'status', 'sign_date', 'remarks']

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ['file']

class ActivityScheduleSerializer(serializers.ModelSerializer):
    proposal_title = serializers.ReadOnlyField(source='proposal.title')  # Retrieves title from the Proposal model
    files = FileUploadSerializer(many=True, read_only=False)  # Serialize multiple file uploads

    class Meta:
        model = ActivitySchedule
        fields = [     
            'id',
            'activity_title',
            'target_date',
            'target_time',
            'proposal',
            'activity_objectives',
            'activity_venue',
            'status',]  

    