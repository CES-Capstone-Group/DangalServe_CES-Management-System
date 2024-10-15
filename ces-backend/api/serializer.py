from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import Account, Achievement, Announcement, Barangay, Department, ResearchAgenda, Proponent, Proposal, Signatory, ProposalVersion, BarangayApproval
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
import json

# Custom Token Serializer to include extra fields in JWT
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token
        token['username'] = user.username
        token['name'] = user.name
        token['accountType'] = user.accountType
        token['department'] = user.department
        token['position'] = user.position

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

#Serializer for handling Barangay model
class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = ['id', 'brgy_name', 'moa']  # Specify the fields you want to serialize

# Serializer for the Department model
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'dept_name']  # Specify the fields to be included in the serializer

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