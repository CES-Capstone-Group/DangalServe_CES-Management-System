from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)
from datetime import timedelta
import binascii
import os

# Custom user manager
class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)  # Hashes the password
        user.save(using=self._db)
        return user

    def create_admin(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_admin", True)
        return self.create_user(username, password, **extra_fields)

# Account model that represents your custom user table (api_account)
class Account(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    accountType = models.CharField(max_length=255)
    department = models.CharField(null=True, blank=True, max_length=255)
    position = models.CharField(null=True, max_length=255)
    activationDate = models.DateField()
    deactivationDate = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    def __str__(self):
        return f"{self.user_id} - {self.accountType}"
    def save(self, *args, **kwargs):
        # Hash the password if it's not already hashed
        if self._state.adding or not self.pk:  # If creating a new user or updating the password
            self.password = make_password(self.password)
        super(Account, self).save(*args, **kwargs)

# Custom token model for authentication
class CustomAuthToken(models.Model):
    key = models.CharField(max_length=40, primary_key=True)
    refresh_key = models.CharField(max_length=40, unique=True, blank=True, null=True)  # Refresh Token
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='auth_tokens', on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)
    refresh_expiration = models.DateTimeField(null=True, blank=True)  # Expiration date for refresh token

    def save(self, *args, **kwargs):
        # Generate a new access token key if it's not provided
        if not self.key:
            self.key = self.generate_key()

        # Generate a refresh token and set expiration date if it's not already present
        if not self.refresh_key:
            self.refresh_key = self.generate_key()
            self.refresh_expiration = timezone.now() + timedelta(days=7)  # Refresh token valid for 7 days

        return super().save(*args, **kwargs)

    @staticmethod
    def generate_key():
        return binascii.hexlify(os.urandom(20)).decode()

    def is_refresh_token_valid(self):
        # Check if refresh token is still valid
        return timezone.now() <= self.refresh_expiration

    def refresh_access_token(self):
        # Generate a new access token
        self.key = self.generate_key()
        self.save()

    def __str__(self):
        return self.key

# ResearchAgenda, Achievement, and Announcement models (unchanged)
class ResearchAgenda(models.Model):
    label = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='research_agenda_images/', null=True, blank=True)

    def __str__(self):
        return self.label if self.label else 'No Label'

class Achievement(models.Model):
    award_title = models.CharField(max_length=255)  # The title of the award
    awardee = models.CharField(max_length=255)  # The person receiving the award
    awarded_by = models.CharField(max_length=255)  # The person or organization giving the award
    date_awarded = models.DateField()  # The date the award was given
    image = models.ImageField(upload_to='awards/', max_length=255, null=True, blank=True)  # Image of the award

    def __str__(self):
        return self.award_title

class Announcement(models.Model):
    title = models.CharField(max_length=255)  # Field for the announcement title
    details = models.TextField()  # Field for the announcement details
    image = models.ImageField(upload_to='announcements/', blank=True, null=True)  # Field for uploading an image

    def __str__(self):
        return self.title