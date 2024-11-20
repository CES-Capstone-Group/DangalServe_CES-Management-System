from django.core.management.base import BaseCommand
from api.models import Account, AdminAccount, ProponentAccount, Barangay, BrgyOfficialAccount, Course, Department
from django.utils import timezone

class Command(BaseCommand):
    help = 'Seed the database with Proponent and Barangay Official accounts.'

    def handle(self, *args, **kwargs):
        # Create Proponent accounts with actual names
        self.create_proponent_account("domingo_coe", "proponent123", "College of Engineering", "Engr. Bernie B. Domingo - COE Coordinator")
        self.create_proponent_account("magaling_ccs", "proponent123", "College of Computer Studies", "Dr. Evangelina A. Magaling - CCS Coordinator")
        self.create_proponent_account("cleofe_coed", "proponent123", "College of Education", "Ms. Sharleen I. Cleofe - COED Coordinator")
        self.create_proponent_account("em_cbaa", "proponent123", "College of Business Administration and Accountancy", "Ms. Flordeliza S. Em - CBAA Coordinator")
        self.create_proponent_account("lazaro_cas", "proponent123", "College of Arts and Sciences", "Mr. Roy Kenneth Y. Lazaro - CAS Coordinator")
        self.create_proponent_account("isip_chas", "proponent123", "College of Health and Allied Sciences", "Ms. Isabelita N. Isip - CHAS Coordinator")

        # Create Barangay Official accounts with actual names
        self.create_barangay_official("sala_alimagno", "brgy123", "Sala", "HON. FRANCISCO ALIMAGNO")
        self.create_barangay_official("san_isidro_algire", "brgy123", "San Isidro", "HON. RICHARD ALGIRE")
        self.create_barangay_official("diezmo_malabanan", "brgy123", "Diezmo", "HON. ALFREDO MALABANAN")
        self.create_barangay_official("baclaran_galang", "brgy123", "Baclaran", "HON. OLIVER P. GALANG")
        self.create_barangay_official("bigaa_cantalejo", "brgy123", "Bigaa", "HON. ROSE ANNE V. CANTALEJO")

        self.stdout.write(self.style.SUCCESS('Successfully seeded Proponent and Barangay Official accounts.'))

    def create_proponent_account(self, username, password, department_name, prop_name):
        # Get or create the department
        department = Department.objects.get_or_create(dept_name=department_name)[0]

        # Create the Proponent user account
        proponent_user = Account.objects.create(
            username=username,
            accountType="Proponent",
            position="Coordinator",
            status="Active",
            activationDate="2024-01-01"
        )
        proponent_user.set_password(password)  # Set the password manually (hashed)
        proponent_user.save()  # Save the user after setting the password

        # Create the Proponent account details
        proponent_account = ProponentAccount.objects.create(
            account=proponent_user, 
            name=prop_name,  # Use the actual name
            department=department,
            course=Course.objects.first()  # Assuming a course exists for simplicity
        )

        self.stdout.write(self.style.SUCCESS(f'Created Proponent user {username} for {department_name}.'))

    def create_barangay_official(self, username, password, barangay_name, brgy_name):
        # Get or create the Barangay
        barangay = Barangay.objects.get_or_create(brgy_name=barangay_name)[0]

        # Create the Barangay Official user account
        brgy_user = Account.objects.create(
            username=username,
            accountType="Brgy. Official",
            position="Barangay Captain",
            status="Active",
            activationDate="2024-01-01"
        )
        brgy_user.set_password(password)  # Set the password manually (hashed)
        brgy_user.save()  # Save the user after setting the password

        # Create the Barangay Official account details
        brgy_official_account = BrgyOfficialAccount.objects.create(
            account=brgy_user, 
            name=brgy_name, 
            barangay=barangay
        )

        self.stdout.write(self.style.SUCCESS(f'Created Barangay Official {username} for {barangay_name}.'))
