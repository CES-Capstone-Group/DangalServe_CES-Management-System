from django.core.management.base import BaseCommand
from api.models import Account, ProponentAccount, Barangay, BrgyOfficialAccount, Course, Department
from django.utils import timezone

class Command(BaseCommand):
    help = 'Seed the database with Proponent and Barangay Official accounts.'

    def handle(self, *args, **kwargs):
        # Create Proponent accounts
        self.create_proponent_account("col_proponent1", "proponent123", "College of Computer Studies")
        self.create_proponent_account("ccs_proponent2", "proponent123", "College of Computer Studies")
        self.create_proponent_account("chass_proponent1", "proponent123", "College of Health and Allied Sciences")
        self.create_proponent_account("ce_proponent1", "proponent123", "College of Engineering")
        self.create_proponent_account("coed_proponent1", "proponent123", "College of Education")

        # Create Barangay Official accounts
        self.create_barangay_official("baclaran_official", "brgyofficial123", "Baclaran")
        self.create_barangay_official("bigaa_official", "brgyofficial123", "Bigaa")
        self.create_barangay_official("diezmo_official", "brgyofficial123", "Diezmo")
        self.create_barangay_official("sala_official", "brgyofficial123", "Sala")
        self.create_barangay_official("san_isidro_official", "brgyofficial123", "San Isidro")

        self.stdout.write(self.style.SUCCESS('Successfully seeded Proponent and Barangay Official accounts.'))

    def create_proponent_account(self, username, password, department_name):
        # Get or create the department
        department = Department.objects.get_or_create(dept_name=department_name)[0]

        # Create the Proponent user account
        proponent_user = Account.objects.create(
            username=username, 
            accountType="Proponent",
            position="Lead Proponent", 
            status="Active", 
            activationDate="2024-01-01"
        )
        proponent_user.set_password(password)  # Set the password manually (hashed)
        proponent_user.save()  # Save the user after setting the password

        # Create the Proponent account details
        proponent_account = ProponentAccount.objects.create(
            account=proponent_user, 
            name=f"{department_name} Proponent", 
            department=department,
            course=Course.objects.first()  # Assuming a course exists for simplicity
        )

        self.stdout.write(self.style.SUCCESS(f'Created Proponent user {username} for {department_name}.'))

    def create_barangay_official(self, username, password, barangay_name):
        # Get or create the Barangay
        barangay = Barangay.objects.get_or_create(brgy_name=barangay_name)[0]

        # Create the Barangay Official user account
        brgy_user = Account.objects.create(
            username=username, 
            accountType="Brgy. Official",
            position="Barangay Official", 
            status="Active", 
            activationDate="2024-01-01"
        )
        brgy_user.set_password(password)  # Set the password manually (hashed)
        brgy_user.save()  # Save the user after setting the password

        # Create the Barangay Official account details
        brgy_official_account = BrgyOfficialAccount.objects.create(
            account=brgy_user, 
            name=f"{barangay_name} Official", 
            barangay=barangay
        )

        self.stdout.write(self.style.SUCCESS(f'Created Barangay Official {username} for {barangay_name}.'))
