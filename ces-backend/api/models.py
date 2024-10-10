from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
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
# class CustomAuthToken(models.Model):
#     key = models.CharField(max_length=40, primary_key=True)
#     refresh_key = models.CharField(max_length=40, unique=True, blank=True, null=True)  # Refresh Token
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='auth_tokens', on_delete=models.CASCADE)
#     created = models.DateTimeField(default=timezone.now)
#     refresh_expiration = models.DateTimeField(null=True, blank=True)  # Expiration date for refresh token

#     def save(self, *args, **kwargs):
#         # Generate a new access token key if it's not provided
#         if not self.key:
#             self.key = self.generate_key()

#         # Generate a refresh token and set expiration date if it's not already present
#         if not self.refresh_key:
#             self.refresh_key = self.generate_key()
#             self.refresh_expiration = timezone.now() + timedelta(days=7)  # Refresh token valid for 7 days

#         return super().save(*args, **kwargs)

#     @staticmethod
#     def generate_key():
#         return binascii.hexlify(os.urandom(20)).decode()

#     def is_refresh_token_valid(self):
#         # Check if refresh token is still valid
#         return timezone.now() <= self.refresh_expiration

#     def refresh_access_token(self):
#         # Generate a new access token
#         self.key = self.generate_key()
#         self.save()

#     def __str__(self):
#         return self.key



class Barangay(models.Model):
    brgy_name = models.CharField(max_length=100)  # Field for the name of the barangay
    moa = models.FileField(upload_to='moa_files/', blank=True, null=True)  # Field for the MOA file/image

    def __str__(self):
        return self.brgy_name


# Department Model
class Department(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incrementing ID
    dept_name = models.CharField(max_length=100)  # Department Name

    def __str__(self):
        return self.dept_name

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




from django.db import models

class Proponent(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    proposal = models.ForeignKey('Proposal', related_name='proponents', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} ({self.position})'
    
class Proposal(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved by Director', 'Approved by Director'),
        ('Approved by VPRE', 'Approved by VPRE'),
        ('Approved by Barangay', 'Approved by Barangay'),
        ('Approved by President', 'Approved by President'),
        ('Partly Approved by Barangay', 'Partly Approved by Barangay'),
        ('Rejected', 'Rejected'),
    ]

    is_three_year_plan = models.BooleanField(default=False)
    is_one_year_plan = models.BooleanField(default=False)

    proposal_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    engagement_date = models.DateField()
    disengagement_date = models.DateField()
    department = models.CharField(max_length=255)
    lead_proponent = models.CharField(max_length=255)
    # Remove the ManyToManyField for proponents, as it's already handled in the Proponent model.
    contact_details = models.CharField(max_length=255)
    project_description = models.TextField()
    target_date = models.DateField()
    location = models.CharField(max_length=255)
    partner_community = models.CharField(max_length=255)
    school = models.BooleanField(default=False)
    barangay = models.BooleanField(default=False)
    government_org = models.CharField(max_length=255, blank=True, null=True)
    non_government_org = models.CharField(max_length=255, blank=True, null=True)
    identified_needs_text = models.TextField(null=True, blank=True)
    identified_needs_file = models.FileField(upload_to='Proposals/identified_needs/', null=True, blank=True)
    general_objectives = models.TextField()
    specific_objectives = models.TextField()
    success_indicators = models.TextField()
    cooperating_agencies = models.TextField()
    monitoring_mechanics = models.TextField()
    evaluation_mechanics = models.TextField()
    timetable = models.TextField()
    risk_assessment = models.TextField()
    action_plans = models.TextField()
    sustainability_approaches = models.TextField()
    budget_requirement_text = models.TextField(null=True, blank=True)
    budget_requirement_file = models.FileField(upload_to='Proposals/budget_requirements/', null=True, blank=True)

    directorSignDate = models.DateField(null=True, blank=True)
    VPRESignDate = models.DateField(null=True, blank=True)
    PRESignDate = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')

    current_version = models.ForeignKey('ProposalVersion', null=True, blank=True, on_delete=models.SET_NULL, related_name='active_proposal')

    def clean(self):
        """Custom validation to ensure either text or file is provided for identified_needs and budget_requirement."""
        if not self.identified_needs_text and not self.identified_needs_file:
            raise ValidationError('Either identified_needs_text or identified_needs_file must be provided.')
        if not self.budget_requirement_text and not self.budget_requirement_file:
            raise ValidationError('Either budget_requirement_text or budget_requirement_file must be provided.')
        super(Proposal, self).clean()

    def partner_community_list(self):
        """Helper method to get the partner community as a list."""
        return [barangay.strip() for barangay in self.partner_community.split(',')]

    def update_overall_status(self):
        """Update the overall status based on barangay approvals."""
        total_barangays = len(self.partner_community_list())
        approved_barangays = self.barangay_approvals.filter(status='Approved').count()

        if self.barangay_approvals.filter(status='Rejected').exists():
            self.status = 'Rejected'
        elif approved_barangays == total_barangays:
            self.status = 'Approved by Barangay'
        elif approved_barangays > 0:
            self.status = 'Partly Approved by Barangay'
        else:
            self.status = 'Approved by President'
        self.save()

    def __str__(self):
        return self.title


class ProposalVersion(models.Model):
    proposal = models.ForeignKey(Proposal, related_name='versions', on_delete=models.CASCADE)
    version_number = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    engagement_date = models.DateField()
    disengagement_date = models.DateField()
    department = models.CharField(max_length=255)
    lead_proponent = models.CharField(max_length=255)
    contact_details = models.CharField(max_length=255)
    project_description = models.TextField()
    target_date = models.DateField()
    location = models.CharField(max_length=255)
    partner_community = models.CharField(max_length=255)  # Comma-separated list of barangays
    school = models.BooleanField(default=False)
    barangay = models.BooleanField(default=False)
    government_org = models.CharField(max_length=255, blank=True, null=True)
    non_government_org = models.CharField(max_length=255, blank=True, null=True)
    identified_needs_text = models.TextField(null=True, blank=True)
    identified_needs_file = models.FileField(upload_to='Proposals/identified_needs/', null=True, blank=True)
    general_objectives = models.TextField()
    specific_objectives = models.TextField()
    success_indicators = models.TextField()
    cooperating_agencies = models.TextField()
    monitoring_mechanics = models.TextField()
    evaluation_mechanics = models.TextField()
    timetable = models.TextField()
    risk_assessment = models.TextField()
    action_plans = models.TextField()
    sustainability_approaches = models.TextField()
    budget_requirement_text = models.TextField(null=True, blank=True)
    budget_requirement_file = models.FileField(upload_to='Proposals/budget_requirements/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    version_status = models.CharField(max_length=30, choices=Proposal.STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"{self.proposal.title} - Version {self.version_number}"


class BarangayApproval(models.Model):
    proposal = models.ForeignKey(Proposal, related_name='barangay_approvals', on_delete=models.CASCADE)
    barangay_name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')
    sign_date = models.DateField(null=True, blank=True)
    remarks = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('proposal', 'barangay_name')

    def __str__(self):
        return f"{self.barangay_name} - {self.status}"


class Signatory(models.Model):
    PROPOSAL_SECTIONS = [
        ('prepared', 'Prepared By'),
        ('endorsed', 'Endorsed By'),
        ('concurred', 'Concurred By'),
    ]
    proposal = models.ForeignKey(Proposal, related_name='signatories', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    section = models.CharField(max_length=20, choices=PROPOSAL_SECTIONS)

    def __str__(self):
        return f'{self.name} ({self.position}) - {self.section}'
