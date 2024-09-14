from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import Account, Achievement, Announcement, ResearchAgenda

# Serializer for login and authentication
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            # Debugging log
            print(f"Authenticating user: {username} with password: {password}")
            user = authenticate(username=username, password=password)
            if user is None:
                raise serializers.ValidationError(
                    "Invalid credentials provided.", code="authorization"
                )
            return {"user": user}
        else:
            raise serializers.ValidationError("Must include username and password.")

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
    class Meta:
        model = ResearchAgenda
        fields = '__all__' 

# Serializer for Achievement model
class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

# Serializer for Announcement model
class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
