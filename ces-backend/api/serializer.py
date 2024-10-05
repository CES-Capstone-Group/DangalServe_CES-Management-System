from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import Account, Achievement, Announcement, ResearchAgenda, Proposal, ProposalVersion, BarangayApproval
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


# Custom Token Serializer to include extra fields in JWT
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token
        token['username'] = user.username
        token['accountType'] = user.accountType
        token['department'] = user.department

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        if user.status != 'Active':
            raise AuthenticationFailed('Account is not active')

        # Add extra responses here if necessary
        data['user_id'] = self.user.user_id
        data['username'] = self.user.username
        data['accountType'] = self.user.accountType
        data['department'] = self.user.department

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
    class Meta:
        model = Account
        fields = '__all__'
        
        extra_kwargs = {
            'password': {'required': False}  # Make password field optional
        }

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
class ProposalVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalVersion
        fields = '__all__'
        
class ProposalSerializer(serializers.ModelSerializer):
    versions = ProposalVersionSerializer(many=True, read_only=True)
    class Meta:
        model = Proposal
        # fields = '__all__' 
        exclude = ['user_id', 'current_version']  # Exclude user_id from validation
        extra_kwargs = {
            'status': {'required': True}
        }
        
    def validate(self, data):
        # Ensure either text or file is provided for identified_needs
        if not data.get('identified_needs_text') and not data.get('identified_needs_file'):
            raise serializers.ValidationError("Either 'Identified Needs' text or file must be provided.")

        # Ensure either text or file is provided for budget_requirement
        if not data.get('budget_requirement_text') and not data.get('budget_requirement_file'):
            raise serializers.ValidationError("Either 'Budget Requirement' text or file must be provided.")

        return data

    def create(self, validated_data):
        user = self.context['request'].user  # Get the user object
        proposal = Proposal.objects.create(user_id=user, **validated_data)  # Use user.id to get the user ID
        return proposal

    
    
class BarangayApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarangayApproval
        fields = ['barangay_name', 'status', 'sign_date', 'remarks']