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
            
@receiver(post_save, sender=Account)
def create_account_details(sender, instance, created, **kwargs):
    if created:  # Only run when a new account is created
        if instance.accountType == 'Admin':
            # Create a corresponding AdminAccount
            AdminAccount.objects.create(account=instance, name=instance.username)

        elif instance.accountType == 'Proponent':
            # Create a ProponentAccount linked to the Account with department and course
            department = Department.objects.filter(dept_id=instance.department_id).first() if hasattr(instance, 'department_id') else None
            course = Course.objects.filter(course_id=instance.course_id).first() if hasattr(instance, 'course_id') else None
            ProponentAccount.objects.create(account=instance, name=instance.username, department=department, course=course)

        elif instance.accountType == 'Brgy. Official':
            # Create a BrgyOfficialAccount and link it to a Barangay if provided
            barangay = Barangay.objects.filter(id=instance.barangay_id).first() if hasattr(instance, 'barangay_id') else None
            BrgyOfficialAccount.objects.create(account=instance, name=instance.username, barangay=barangay)

        elif instance.accountType == 'Evaluator':
            # Create an EvaluatorAccount linked to the Account
            evaluator_account = EvaluatorAccount.objects.create(account=instance, name=instance.username)

            # Create specific Evaluator type based on evaluator_type field
            if hasattr(instance, 'evaluator_type'):
                if instance.evaluator_type == 'Student':
                    StudentEvaluator.objects.create(
                        evaluator=evaluator_account,
                        student_id=instance.student_id,
                        student_email=instance.student_email,
                        contact_number=instance.contact_number,
                        course=instance.course,
                        department=instance.department
                    )
                elif instance.evaluator_type == 'Faculty':
                    FacultyEvaluator.objects.create(
                        evaluator=evaluator_account,
                        email=instance.email,
                        contact_number=instance.contact_number,
                        department=instance.department,
                        position=instance.position
                    )
                elif instance.evaluator_type == 'Alumni':
                    AlumniEvaluator.objects.create(
                        evaluator=evaluator_account,
                        email=instance.email,
                        contact_number=instance.contact_number,
                        course=instance.course,
                        department=instance.department
                    )
                elif instance.evaluator_type == 'External':
                    ExternalParticipantEvaluator.objects.create(
                        evaluator=evaluator_account,
                        email=instance.email,
                        contact_number=instance.contact_number,
                        barangay=instance.barangay
                    )