from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import Account, Achievement, Announcement, ResearchAgenda, Proposal

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Account


# Custom Token Serializer to include extra fields in JWT
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token
        token['username'] = user.username
        token['accountType'] = user.accountType

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses here if necessary
        data['user_id'] = self.user.user_id
        data['username'] = self.user.username
        data['accountType'] = self.user.accountType

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

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        exclude = ['user_id']  # Exclude user_id from validation
        extra_kwargs = {
            'status': {'required': True}  
        }

    def create(self, validated_data):
        user = self.context['request'].user  # Get the user object
        proposal = Proposal.objects.create(user_id=user, **validated_data)  # Use user.id to get the user ID
        return proposal
