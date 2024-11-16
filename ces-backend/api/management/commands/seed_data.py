from django.core.management.base import BaseCommand
from api.models import Barangay, Department, Course, Account, AdminAccount

class Command(BaseCommand):
    help = 'Seed the database with initial data for barangays, departments, courses, and admin account'

    def handle(self, *args, **kwargs):
        # Seed Barangay data
        barangays = ['Baclaran', 'Bigaa', 'Diezmo', 'Sala', 'San Isidro']
        for name in barangays:
            Barangay.objects.get_or_create(brgy_name=name)

        # Seed Department data
        departments = ['College of Computer Studies', 'College of Health and Allied Sciences', 
                    'College of Engineering', 'College of Education']
        for dept_name in departments:
            Department.objects.get_or_create(dept_name=dept_name)

        # Seed Course data for College of Computer Studies
        ccs_courses = ['Bachelor of Science in Information Technology', 'Bachelor of Science in Computing Studies']
        ccs_department = Department.objects.get(dept_name='College of Computer Studies')
        for course_name in ccs_courses:
            Course.objects.get_or_create(course_name=course_name, dept=ccs_department)

        # Seed Course data for College of Health and Allied Sciences
        chas_courses = ['Bachelor of Science in Nursing']
        chas_department = Department.objects.get(dept_name='College of Health and Allied Sciences')
        for course_name in chas_courses:
            Course.objects.get_or_create(course_name=course_name, dept=chas_department)

        # Seed Course data for College of Engineering
        coe_courses = ['Bachelor of Science in Computer Engineering', 'Bachelor of Science in Electronics Engineering', 
                    'Bachelor of Science in Industrial Engineering']
        coe_department = Department.objects.get(dept_name='College of Engineering')
        for course_name in coe_courses:
            Course.objects.get_or_create(course_name=course_name, dept=coe_department)

        # Seed Course data for College of Education
        coed_courses = ['Bachelor of Elementary Education', 'Bachelor of Secondary Education Major in English', 
                        'Bachelor of Secondary Education Major in Filipino', 'Bachelor of Secondary Education Major in Mathematics',
                        'Bachelor of Secondary Education Major in Social Studies']
        coed_department = Department.objects.get(dept_name='College of Education')
        for course_name in coed_courses:
            Course.objects.get_or_create(course_name=course_name, dept=coed_department)
            
        # Create an admin account with hashed password
        admin_account = Account.objects.create_user(username="Anna", password="Anna123", accountType="Admin", 
                                                    position="Administrator", status="Active", activationDate="2024-01-01")
        admin_account.set_password('Anna123')  # Ensure the password is hashed
        admin_account.save()

        # Create AdminAccount instance and associate with the created admin account
        admin_account_details = AdminAccount.objects.create(account=admin_account, name="Anna-Liza F. Sigue")
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded barangays, departments, courses, and admin account.'))