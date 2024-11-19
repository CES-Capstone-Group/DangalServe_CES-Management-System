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
    dept_name = models.CharField(max_length=100, default="Unknown Department")  # Department Name

    def __str__(self):
        return self.dept_name

#Course Model
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    course_name = models.CharField(max_length=100, default="Unknown Course")
    dept = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.course_name

class Barangay(models.Model):
    brgy_name = models.CharField(max_length=100, default="Unknown Barangay")  # Field for the name of the barangay
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
    accountType = models.CharField(max_length=255, default="Proponent")  # 'Admin', 'Brgy. Official', 'Proponent', 'Evaluator'
    position = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=50, default="Active")
    activationDate = models.DateField()
    deactivationDate = models.DateField(null=True, blank=True)

    failed_login_attempts = models.IntegerField(default=0)
    lockout_until = models.DateTimeField(null=True, blank=True)

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
    name = models.CharField(max_length=255, default="Unknown Admin")

# Barangay Official account details
class BrgyOfficialAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="Unknown Barangay")
    barangay = models.ForeignKey(Barangay, on_delete=models.SET_NULL, null=True)

# Proponent account details
class ProponentAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="Unknown Proponent")
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)

# Evaluator account details
class EvaluatorAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="Unknown Evaluator")
    evaluator_type = models.CharField(max_length=50)  # 'Student', 'Faculty', 'External', 'Alumni'

# Specific evaluator types
class StudentEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=50, default="000000")
    email = models.EmailField(default="student@example.com")
    contact_number = models.CharField(max_length=15, default="0000000000")
    course = models.CharField(max_length=255, default="Unknown Course")
    department = models.CharField(max_length=255, default="Unknown Department")

class FacultyEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField(default="faculty@example.com")
    contact_number = models.CharField(max_length=15, default="0000000000")
    department = models.CharField(max_length=255, default="Unknown Department")
    position = models.CharField(max_length=255, default="Unknown Position")

class NonTeachingEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField(default="nonteaching@example.com")
    contact_number = models.CharField(max_length=15, default="0000000000")
    position = models.CharField(max_length=255, default="Unknown Position")
    department = models.CharField(max_length=255, default="Unknown Department")

class AlumniEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField(default="alumni@example.com")
    contact_number = models.CharField(max_length=15, default="0000000000")
    course = models.CharField(max_length=255, default="Unknown Course")
    department = models.CharField(max_length=255, default="Unknown Department")

class ExternalParticipantEvaluator(models.Model):
    evaluator = models.OneToOneField(EvaluatorAccount, on_delete=models.CASCADE)
    email = models.EmailField(default="external@example.com")
    contact_number = models.CharField(max_length=15, default="0000000000")
    barangay = models.CharField(max_length=255, default="Unknown Barangay")


class ResearchAgenda(models.Model):
    label = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='research_agenda_images/', null=True, blank=True)

    def __str__(self):
        return self.label if self.label else 'No Label'

class Achievement(models.Model):
    award_title = models.CharField(max_length=255, default="Unknown Award")  # The title of the award
    awardee = models.CharField(max_length=255, default="Unknown Awardee")  # The person receiving the award
    awarded_by = models.CharField(max_length=255, default="Unknown Awarded By")  # The person or organization giving the award
    date_awarded = models.DateField(default="0000-00-00")  # The date the award was given
    image = models.ImageField(upload_to='awards/', max_length=255, null=True, blank=True)  # Image of the award

    def __str__(self):
        return self.award_title

class Announcement(models.Model):
    title = models.CharField(max_length=255, default="Unknown Title")  # Field for the announcement title
    details = models.TextField(default="Unknown Details")  # Field for the announcement details
    image = models.ImageField(upload_to='announcements/', blank=True, null=True)  # Field for uploading an image

    def __str__(self):
        return self.title


class Document(models.Model):
    title = models.CharField(max_length=255, default="Unknown Title")
    file = models.FileField(upload_to='documents/')  # Files will be uploaded to the 'documents/' folder
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



from django.db import models

class Proponent(models.Model):
    name = models.CharField(max_length=255, default="Unknown Proponent")
    position = models.CharField(max_length=255, default="Unknown Position")
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

    research_agendas = models.ManyToManyField(
        ResearchAgenda, 
        blank=True, 
        related_name='proposals'
    )
    
    proposal_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="Unknown Title")
    engagement_date = models.DateField(default="0000-00-00")
    disengagement_date = models.DateField(default="0000-00-00")
    department = models.CharField(max_length=255, default="Unknown Department")
    lead_proponent = models.CharField(max_length=255, default="Unknown Lead Proponent")
    # Remove the ManyToManyField for proponents, as it's already handled in the Proponent model.
    contact_details = models.CharField(max_length=255, default="00000000000")
    project_description = models.TextField(default="Unknown Porject Descriptiojn")
    target_date = models.DateField(default="0000-00-00")
    location = models.CharField(max_length=255, default="Unknown Location")
    partner_community = models.CharField(max_length=255, default="Unknown Parter Community")
    school = models.BooleanField(default=False)
    barangay = models.BooleanField(default=False )
    government_org = models.CharField(max_length=255, blank=True, null=True)
    non_government_org = models.CharField(max_length=255, blank=True, null=True)
    identified_needs_text = models.TextField(null=True, blank=True)
    identified_needs_file = models.FileField(upload_to='Proposals/identified_needs/', null=True, blank=True)
    general_objectives = models.TextField(default="Unknown General Objectives")
    specific_objectives = models.TextField(default="Unknown Specific Objectives")
    success_indicators = models.TextField(default="Unknown Success Indicators")
    cooperating_agencies = models.TextField(default="Unknown Cooperating Agencies")
    monitoring_mechanics = models.TextField( default="Unknown Monitoring Mechanics")
    evaluation_mechanics = models.TextField(default="Unknown Evaluation Mechanics")
    timetable = models.TextField(default="Unknown Time Table")
    risk_assessment = models.TextField(default="Unknown Risk Assessment")
    action_plans = models.TextField(default="Unknown Action Plans")
    sustainability_approaches = models.TextField(default="Unknown Sustainability Approaches")
    budget_requirement_text = models.TextField(null=True, blank=True)
    budget_requirement_file = models.FileField(upload_to='Proposals/budget_requirements/', null=True, blank=True)

    directorSignDate = models.DateField(null=True, blank=True)
    VPRESignDate = models.DateField(null=True, blank=True)
    PRESignDate = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')
    
    remarks = models.TextField(null=True, blank=True)

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
    research_agendas = models.ManyToManyField(
        ResearchAgenda, 
        blank=True, 
        related_name='proposal_versions'
    )
    version_number = models.PositiveIntegerField(default=1)
    title = models.CharField(max_length=255, default="Untitled Proposal")
    engagement_date = models.DateField(default=timezone.now)  # Current date as default
    disengagement_date = models.DateField(default=timezone.now)  # Current date as default
    department = models.CharField(max_length=255, default="General Department")
    lead_proponent = models.CharField(max_length=255, default="Lead Proponent")
    contact_details = models.CharField(max_length=255, default="Contact Details")
    project_description = models.TextField(default="Project Description")
    target_date = models.DateField(default=timezone.now)  # Current date as default
    location = models.CharField(max_length=255, default="Unknown Location")
    partner_community = models.CharField(max_length=255, default="Community Name")
    school = models.BooleanField(default=False)
    barangay = models.BooleanField(default=False)
    government_org = models.CharField(max_length=255, blank=True, null=True, default="Unknown Government Org")
    non_government_org = models.CharField(max_length=255, blank=True, null=True, default="Unknown Non-Government Org")
    identified_needs_text = models.TextField(null=True, blank=True, default="Needs Description")
    identified_needs_file = models.FileField(upload_to='Proposals/identified_needs/', null=True, blank=True)
    general_objectives = models.TextField(default="General Objectives")
    specific_objectives = models.TextField(default="Specific Objectives")
    success_indicators = models.TextField(default="Success Indicators")
    cooperating_agencies = models.TextField(default="Cooperating Agencies")
    monitoring_mechanics = models.TextField(default="Monitoring Mechanics")
    evaluation_mechanics = models.TextField(default="Evaluation Mechanics")
    timetable = models.TextField(default="Timetable")
    risk_assessment = models.TextField(default="Risk Assessment")
    action_plans = models.TextField(default="Action Plans")
    sustainability_approaches = models.TextField(default="Sustainability Approaches")
    budget_requirement_text = models.TextField(null=True, blank=True, default="Budget Requirements")
    budget_requirement_file = models.FileField(upload_to='Proposals/budget_requirements/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    version_status = models.CharField(max_length=30, choices=Proposal.STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"{self.proposal.title} - Version {self.version_number}"

class BarangayApproval(models.Model):
    proposal = models.ForeignKey(Proposal, related_name='barangay_approvals', on_delete=models.CASCADE)
    barangay_name = models.CharField(max_length=255, default="Unknown Barangay")
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')
    sign_date = models.DateField(null=True, blank=True, default=None)
    remarks = models.TextField(blank=True, null=True, default="No Remarks")

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
    name = models.CharField(max_length=255, default="Signatory Name")
    position = models.CharField(max_length=255, default="Position")
    section = models.CharField(max_length=20, choices=PROPOSAL_SECTIONS, default='prepared')

    def __str__(self):
        return f'{self.name} ({self.position}) - {self.section}'

class ActivitySchedule(models.Model):
    proposal = models.ForeignKey('Proposal', on_delete=models.CASCADE)
    activity_title = models.CharField(max_length=255, default="Activity Title")
    activity_objectives = models.TextField(default="")  # Added objectives field
    activity_venue = models.CharField(max_length=255, default="")  # Added venue field
    brgy = models.ForeignKey('Barangay', on_delete=models.CASCADE, related_name='activities', null=True, blank=True)
    target_date = models.DateField(default=timezone.now)  # Current date as default
    target_time = models.TimeField(null=True, blank=True, default=None)
    files = models.ManyToManyField('FileUpload', blank=True)
    status = models.CharField(max_length=50, default="In Progress")

    def __str__(self):
        return self.activity_title
        
class FileUpload(models.Model):
    file = models.FileField(upload_to='activities/', null=True, blank=True)

    def __str__(self):
        return str(self.file)
