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
    
# Department Model
class Department(models.Model):
    dept_id = models.AutoField(primary_key=True)  # Auto-incrementing ID
    dept_name = models.CharField(max_length=100)  # Department Name

    def __str__(self):
        return self.dept_name

#Course Model
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    course_name = models.CharField(max_length=100)
    dept = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.course_name

class Barangay(models.Model):
    brgy_name = models.CharField(max_length=100)  # Field for the name of the barangay
    moa = models.FileField(upload_to='moa_files/', blank=True, null=True)  # Field for the MOA file/image

    def __str__(self):
        return self.brgy_name
    
    # class Meta:
    #     abstract = True

# Account model that represents your custom user table (api_account)
class Account(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    accountType = models.CharField(max_length=255)  # 'Admin', 'Brgy. Official', 'Proponent', 'Evaluator'
    position = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=50)
    activationDate = models.DateField()
    deactivationDate = models.DateField(null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    def __str__(self):
        return f"{self.user_id} - {self.accountType}"

    def save(self, *args, **kwargs):
        if self._state.adding or not self.pk:  # If creating or updating the password
            self.password = make_password(self.password)
        super(Account, self).save(*args, **kwargs)
        
    def get_department_name(self):
        # Check if the account is a Proponent and has a department
        if hasattr(self, 'proponentaccount') and self.proponentaccount.department:
            return self.proponentaccount.department.dept_name
        return None
    get_department_name.short_description = 'Department'  # This will be the display name in the admin

# Admin account details
class AdminAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

# Barangay Official account details
class BrgyOfficialAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    barangay = models.ForeignKey(Barangay, on_delete=models.SET_NULL, null=True)

# Proponent account details
class ProponentAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)

# Evaluator account details
class EvaluatorAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    evaluator_type = models.CharField(max_length=50)  # 'Student', 'Faculty', 'External', 'Alumni'

# Specific evaluator types
class StudentEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=50)  # Student ID field
    email = models.EmailField()  # Student Email field
    contact_number = models.CharField(max_length=15)  # Contact Number field
    course = models.CharField(max_length=255)  # Course field
    department = models.CharField(max_length=255)  # Department field

class FacultyEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField()  # Email field
    contact_number = models.CharField(max_length=15)  # Contact Number field
    department = models.CharField(max_length=255)  # Department field
    position = models.CharField(max_length=255)  # Position field
    
class NonTeachingEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField()  # Email field
    contact_number = models.CharField(max_length=15)  # Contact Number field
    position = models.CharField(max_length=255)  # Position field
    department = models.CharField(max_length=255)  # Department field

class AlumniEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField()  # Email field
    contact_number = models.CharField(max_length=15)  # Contact Number field
    course = models.CharField(max_length=255)  # Course field
    department = models.CharField(max_length=255)  # Department field

class ExternalParticipantEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField()  # Email field
    contact_number = models.CharField(max_length=15)  # Contact Number field
    barangay = models.CharField(max_length=255)  # Barangay field


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


class Document(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/')  # Files will be uploaded to the 'documents/' folder
    uploaded_at = models.DateTimeField(auto_now_add=True)

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


class ActivitySchedule(models.Model):
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE)  # Foreign key to the Proposal table
    activity_title = models.CharField(max_length=255)
    target_date = models.DateField()
    target_time = models.TimeField(null=True, blank=True)
    file = models.FileField(upload_to='activity_files/', max_length=25, null=True, blank=True)

    def __str__(self):
        return self.activity_title