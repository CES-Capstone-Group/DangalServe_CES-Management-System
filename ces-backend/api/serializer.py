from rest_framework import serializers
from .models import Achievement
from .models import Announcement
from .models import Account
from .models import ResearchAgenda

class TblAccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        
        extra_kwargs = {
            'password': {'required': False}  # Make password field optional
        }
                
        # fields = ['accountID', 'name', 'accountType', 'department', 'position', 'activationDate', 'deactivationDate', 'status'] 
        # extra_kwargs = {'password': {'write_only': True}}

class ResearchAgendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchAgenda
        fields = '__all__' 
        
class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
        
