from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import (
    Proposal,
    BarangayApproval,
    Account,
    AdminAccount,
    ProponentAccount,
    BrgyOfficialAccount,
    EvaluatorAccount,
    StudentEvaluator,
    FacultyEvaluator,
    AlumniEvaluator,
    ExternalParticipantEvaluator,
    Barangay,
    Department,
    Course,
    Barangay,
    Department,
    Course
)

@receiver(post_save, sender=Proposal)
def create_barangay_approvals(sender, instance, created, **kwargs):
    if created:
        # Create a BarangayApproval for each barangay in partner_community
        for barangay in instance.partner_community_list():
            BarangayApproval.objects.create(proposal=instance, barangay_name=barangay)
            
# @receiver(post_save, sender=Account)
# def create_account_details(sender, instance, created, **kwargs):
#     print("kwargs received:", kwargs)
#     if created:  # Only run when a new account is created
#         if instance.accountType == 'Admin':
#             # Create a corresponding AdminAccount
#             AdminAccount.objects.create(account=instance, name=instance.username)

#         elif instance.accountType == 'Proponent':
#             # Create a ProponentAccount linked to the Account with department and course
#             department = Department.objects.filter(dept_id=instance.department_id).first() if hasattr(instance, 'department_id') else None
#             course = Course.objects.filter(course_id=instance.course_id).first() if hasattr(instance, 'course_id') else None
#             ProponentAccount.objects.create(account=instance, name=instance.username, department=department, course=course)

#         elif instance.accountType == 'Brgy. Official':
#             # Get the barangay ID from the request data
#             barangay_id = kwargs.get('barangay')  # Adjusted to get barangay from kwargs
#             barangay = Barangay.objects.filter(id=barangay_id).first() if barangay_id else None
#             BrgyOfficialAccount.objects.create(account=instance, name=instance.username, barangay=barangay)

#         elif instance.accountType == 'Evaluator':
#             # Extract evaluator_type and other details from the request
#             evaluator_type = kwargs.get('evaluator_type')  # Get evaluator_type from the kwargs
#             print("evaluator_type", evaluator_type)
#             if evaluator_type:
#                 # Create an EvaluatorAccount linked to the Account
#                 evaluator_account = EvaluatorAccount.objects.create(
#                     account=instance,
#                     name=instance.username,
#                     evaluator_type=evaluator_type  # Use the evaluator_type from the request
#                 )

#                 # Create specific evaluator details based on evaluator_type
#                 if evaluator_type == 'Student':
#                     StudentEvaluator.objects.create(
#                         evaluator=evaluator_account,
#                         student_id=kwargs.get('student_id'),  # Get student_id from kwargs
#                         student_email=kwargs.get('student_email'),  # Get student_email from kwargs
#                         contact_number=kwargs.get('contact_number'),  # Get contact_number from kwargs
#                         course=kwargs.get('course'),  # Get course from kwargs
#                         department=kwargs.get('department')  # Get department from kwargs
#                     )
#                 elif evaluator_type == 'Faculty':
#                     FacultyEvaluator.objects.create(
#                         evaluator=evaluator_account,
#                         email=kwargs.get('email'),  # Get email from kwargs
#                         contact_number=kwargs.get('contact_number'),  # Get contact_number from kwargs
#                         department=kwargs.get('department'),  # Get department from kwargs
#                         position=kwargs.get('position')  # Get position from kwargs
#                     )
#                 elif evaluator_type == 'Alumni':
#                     AlumniEvaluator.objects.create(
#                         evaluator=evaluator_account,
#                         email=kwargs.get('email'),  # Get email from kwargs
#                         contact_number=kwargs.get('contact_number'),  # Get contact_number from kwargs
#                         course=kwargs.get('course'),  # Get course from kwargs
#                         department=kwargs.get('department')  # Get department from kwargs
#                     )
#                 elif evaluator_type == 'External':
#                     ExternalParticipantEvaluator.objects.create(
#                         evaluator=evaluator_account,
#                         email=kwargs.get('email'),  # Get email from kwargs
#                         contact_number=kwargs.get('contact_number'),  # Get contact_number from kwargs
#                         barangay=kwargs.get('barangay')  # Get barangay from kwargs
#                     )
#