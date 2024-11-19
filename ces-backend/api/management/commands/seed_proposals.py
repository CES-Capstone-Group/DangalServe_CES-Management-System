from django.core.management.base import BaseCommand
from api.models import Department, Account, Proposal, Signatory, ProponentAccount, Barangay
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seed the database with complete proposals, including all fields and signatories.'

    def handle(self, *args, **kwargs):
        # Seed the departments and proposals
        departments = ['College of Computer Studies', 'College of Health and Allied Sciences', 
                       'College of Engineering', 'College of Education']
        
        for dept_name in departments:
            department = Department.objects.get(dept_name=dept_name)
            self.create_proposals_for_department(department)

        self.stdout.write(self.style.SUCCESS('Successfully seeded proposals and related data.'))

    def create_proposals_for_department(self, department):
        # Create two proposals: one approved and one pending for each department
        for i in range(2):
            status = 'Approved by Director' if i == 0 else 'Pending'
            # Use filter() and .first() to get the first proponent for the department
            proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()

            if not proponent:
                self.stdout.write(self.style.ERROR(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
                continue

            # Define partner community (a string of one or more barangays)
            barangays = ['Baclaran', 'Bigaa', 'Diezmo']  # Sample barangays for the department
            partner_community = ",".join(barangays)

            # Determine if it's a three-year or one-year plan
            is_three_year_plan = True if department.dept_name == 'College of Engineering' else False
            is_one_year_plan = not is_three_year_plan

            # Set sign dates based on approval status
            directorSignDate = timezone.now().date() if status == 'Approved by Director' else None
            VPRESignDate = timezone.now().date() if status == 'Approved by Director' else None
            PRESignDate = None  # Assuming the President doesn't sign in this case

            # Create the proposal
            proposal = Proposal.objects.create(
                user_id=proponent,
                title=f"Proposal for {department.dept_name}",
                engagement_date=timezone.now().date() - timedelta(days=10),
                disengagement_date=timezone.now().date() + timedelta(days=30),
                department=department.dept_name,
                lead_proponent=f"{department.dept_name} Proponent",
                contact_details="contact@example.com",
                project_description="A detailed project description for the proposal.",
                target_date=timezone.now().date() + timedelta(days=30),
                location="Location Example",
                partner_community=partner_community,  # A string of barangays separated by commas
                school=True,  # Assuming this is True for the example
                barangay=False,  # Assuming False for the example
                government_org="Government Organization Example",
                non_government_org="Non-Government Organization Example",
                identified_needs_text="Textual description of the identified needs.",
                identified_needs_file=None,  # Assuming no file for the example
                general_objectives="General objectives of the proposal.",
                specific_objectives="Specific objectives of the proposal.",
                success_indicators="Success indicators of the proposal.",
                cooperating_agencies="Cooperating agencies involved.",
                monitoring_mechanics="Mechanics for monitoring the proposal.",
                evaluation_mechanics="Mechanics for evaluating the proposal.",
                timetable="Timetable of the proposal activities.",
                risk_assessment="Risk assessment for the proposal.",
                action_plans="Action plans to achieve the objectives.",
                sustainability_approaches="Sustainability approaches for the proposal.",
                budget_requirement_text="Budget requirements in text format.",
                budget_requirement_file=None,  # Assuming no file for the example
                directorSignDate=directorSignDate,
                VPRESignDate=VPRESignDate,
                PRESignDate=PRESignDate,
                is_three_year_plan=is_three_year_plan,
                is_one_year_plan=is_one_year_plan,
                status=status
            )

            # Create signatories for the proposal
            self.create_signatories_for_proposal(proposal)

            self.stdout.write(self.style.SUCCESS(f'Created proposal "{proposal.title}" for {department.dept_name} with status {status}.'))

    def create_signatories_for_proposal(self, proposal):
        # Create a signatory for the proposal
        signatory1 = Signatory.objects.create(
            proposal=proposal,
            name="John Doe",
            position="Director",
            section="prepared"
        )
        signatory2 = Signatory.objects.create(
            proposal=proposal,
            name="Jane Doe",
            position="Vice President",
            section="endorsed"
        )
        signatory3 = Signatory.objects.create(
            proposal=proposal,
            name="Will Smith",
            position="Vice Director",
            section="concurred"
        )

        self.stdout.write(self.style.SUCCESS(f'Created signatories for proposal "{proposal.title}".'))
