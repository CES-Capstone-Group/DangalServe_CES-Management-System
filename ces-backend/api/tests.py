from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework import status
from .models import Proposal, ProposalVersion, BarangayApproval, Signatory, Account, BrgyOfficialAccount, Barangay, ResearchAgenda

class ProposalTestCase(TestCase):
    def setUp(self):
        # Create users
        self.barangay = Barangay.objects.create(brgy_name="Diezmo")

        # Create an admin user
        self.admin_user = Account.objects.create_user(
            username="admin",
            password="adminpass",
            accountType="Admin",
            activationDate=timezone.now()
        )

        # Create a proponent user
        self.proponent_user = Account.objects.create_user(
            username="proponent",
            password="proponentpass",
            accountType="Proponent",
            activationDate=timezone.now()
        )

        # Create a barangay official user and link it to a BrgyOfficialAccount
        self.barangay_official = Account.objects.create_user(
            username="barangay_official",
            password="barangaypass",
            accountType="Brgy. Official",
            activationDate=timezone.now()
        )

        self.brgy_official_account = BrgyOfficialAccount.objects.create(
            account=self.barangay_official,
            name="Diezmo Official",
            barangay=self.barangay
        )
        
        # Create research agendas
        self.research_agenda_1 = ResearchAgenda.objects.create(
            label="Research Agenda 1"
        )
        self.research_agenda_2 = ResearchAgenda.objects.create(
            label="Research Agenda 2"
        )

        # Create a proposal
        self.proposal = Proposal.objects.create(
            user_id=self.proponent_user,
            title="Test Proposal",
            status="Pending",
            engagement_date="2024-01-01",
            disengagement_date="2024-01-01",
            department="Engineering",
            lead_proponent="Proponent User",
            contact_details="1234567890",
            project_description="Test project description",
            target_date=timezone.now().date(),
            location="Test Location",
            partner_community="Diezmo",
            school=1,
            barangay=0,
            government_org="",
            non_government_org="",
            identified_needs_text="Identified needs text",
            identified_needs_file=None,
            general_objectives="General objectives",
            specific_objectives="Specific objectives",
            success_indicators="Success indicators",
            cooperating_agencies="Cooperating agencies",
            monitoring_mechanics="Monitoring mechanics",
            evaluation_mechanics="Evaluation mechanics",
            timetable="Timetable details",
            risk_assessment="Risk assessment details",
            action_plans="Action plans",
            sustainability_approaches="Sustainability approaches",
            budget_requirement_text="Budget requirements text",
            budget_requirement_file=None,
            directorSignDate=timezone.now(),
            VPRESignDate=None,
            PRESignDate=None,
        )
        
        self.proposal.research_agendas.set([self.research_agenda_1, self.research_agenda_2])

        # Create signatories
        self.signatory1 = Signatory.objects.create(
            proposal=self.proposal,
            name="Director Name",
            position="Director",
            section="endorsed",
        )
        self.signatory2 = Signatory.objects.create(
            proposal=self.proposal,
            name="VP Name",
            position="Vice President",
            section="concurred",
        )

        # API client setup
        self.client = APIClient()

    def test_create_proposal(self):
        """Test creating a proposal with all fields populated."""
        self.client.force_authenticate(user=self.proponent_user)
        data = {
            "title": "New Proposal Full Data",
            "status": "Pending",
            "engagement_date": "2024-01-01",
            "disengagement_date": "2024-12-31",
            "department": "Computer Science",
            "lead_proponent": "Proponent Lead",
            "contact_details": "9876543210",
            "project_description": "Detailed project description",
            "target_date": "2024-06-01",
            "location": "New Location",
            "partner_community": "Diezmo",
            "school": True,
            "barangay": False,
            "government_org": "",
            "non_government_org": "",
            "identified_needs_text": "Detailed needs",
            "general_objectives": "Comprehensive objectives",
            "specific_objectives": "Detailed specific objectives",
            "success_indicators": "Success criteria",
            "cooperating_agencies": "Agency A, Agency B",
            "monitoring_mechanics": "Monitoring plans",
            "evaluation_mechanics": "Evaluation plans",
            "timetable": "2024-01-01 to 2024-12-31",
            "risk_assessment": "Risks and mitigation",
            "action_plans": "Action plans",
            "sustainability_approaches": "Sustainability details",
            "budget_requirement_text": "Budget details",
            "research_agendas": [self.research_agenda_1.id, self.research_agenda_2.id],
            "signatories": [
                {"name": "Director Name", "position": "Director", "section": "endorsed"},
                {"name": "VP Name", "position": "Vice President", "section": "concurred"},
            ],
        }
        response = self.client.post("/api/proposals/", data, format="json")        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "New Proposal Full Data")
        self.assertEqual(Signatory.objects.filter(proposal__title="New Proposal Full Data").count(), 2)

    def test_status_transition_valid(self):
        """Test valid status transitions."""
        self.proposal.status = "Pending"
        self.proposal.save()

        self.client.force_authenticate(user=self.admin_user)

        # Transition from Pending to Approved by Director
        response = self.client.patch(f"/api/proposals/{self.proposal.proposal_id}/", {"status": "Approved by Director"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.proposal.refresh_from_db()
        self.assertEqual(self.proposal.status, "Approved by Director")

        # Transition from Approved by Director to Approved by Barangay
        response = self.client.patch(f"/api/proposals/{self.proposal.proposal_id}/", {"status": "Approved by Barangay"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.proposal.refresh_from_db()
        self.assertEqual(self.proposal.status, "Approved by Barangay")

    def test_status_transition_invalid(self):
        """Test invalid status transitions."""
        self.proposal.status = "Pending"
        self.proposal.save()

        self.client.force_authenticate(user=self.admin_user)

        # Attempt to transition from Pending to Approved by Barangay directly
        response = self.client.patch(f"/api/proposals/{self.proposal.proposal_id}/", {"status": "Approved by Barangay"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.proposal.refresh_from_db()
        self.assertEqual(self.proposal.status, "Pending")

    def test_barangay_approval(self):
        """Test barangay approval flow."""
        # Assign a barangay to the official and the proposal
        barangay_name = "Barangay A"
        self.barangay_official.brgyofficialaccount.barangay.brgy_name = barangay_name
        self.barangay_official.brgyofficialaccount.save()
        self.proposal.partner_community = barangay_name
        self.proposal.save()

        # Barangay official approves the proposal
        self.client.force_authenticate(user=self.barangay_official)
        response = self.client.patch(f"/api/proposals/{self.proposal.proposal_id}/approve/", {"status": "Approved"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.proposal.refresh_from_db()
        self.assertEqual(self.proposal.status, "Approved by Barangay")

    def test_resubmit_rejected_proposal(self):
        """Test resubmission of a rejected proposal."""
        self.proposal.status = "Rejected"
        self.proposal.save()
        
        # Create the initial version for the proposal
        version = ProposalVersion.objects.create(
            proposal=self.proposal,
            version_number=1,
            title=self.proposal.title,
            project_description=self.proposal.project_description,
        )
        self.proposal.current_version_id = version.id  # Link to the version
        self.proposal.save()

        self.client.force_authenticate(user=self.proponent_user)

        # Data for resubmission
        data = {
            "title": "Updated Proposal Title",
            "project_description": "Updated description.",
            "engagement_date": "2024-01-01",
            "disengagement_date": "2024-12-31",
            "department": "Updated Department",
            "lead_proponent": "Updated Lead Proponent",
            "contact_details": "9876543210",
            "target_date": "2024-06-01",
            "location": "Updated Location",
            "partner_community": "Updated Community",
            "school": True,
            "barangay": False,
            "government_org": "Updated Gov Org",
            "non_government_org": "Updated NGO",
            "identified_needs_text": "Updated identified needs",
            "general_objectives": "Updated objectives",
            "specific_objectives": "Updated specific objectives",
            "success_indicators": "Updated success indicators",
            "cooperating_agencies": "Updated cooperating agencies",
            "monitoring_mechanics": "Updated monitoring mechanics",
            "evaluation_mechanics": "Updated evaluation mechanics",
            "timetable": "Updated timetable",
            "risk_assessment": "Updated risk assessment",
            "action_plans": "Updated action plans",
            "sustainability_approaches": "Updated sustainability approaches",
            "budget_requirement_text": "Updated budget",
            "research_agendas": [self.research_agenda_1.id, self.research_agenda_2.id],
        }

        # Make a PATCH request to resubmit the proposal
        response = self.client.patch(f"/api/proposals/{self.proposal.proposal_id}/resubmit/", data)

        # Debugging outputs for test validation
        print(f"Response Status: {response.status_code}")
        print(f"Response Data: {response.data}")

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.proposal.refresh_from_db()
        self.assertEqual(self.proposal.status, "Pending")
        self.assertEqual(self.proposal.title, "Updated Proposal Title")

        # Check that a new version was created
        versions = ProposalVersion.objects.filter(proposal=self.proposal)
        self.assertEqual(versions.count(), 2)
        self.assertEqual(versions.last().version_number, 2)
        self.assertEqual(versions.last().title, "Updated Proposal Title")

    def test_proposal_versions(self):
        """Test proposal versioning."""
        self.proposal.status = "Rejected"
        self.proposal.save()

        self.client.force_authenticate(user=self.proponent_user)

        # Resubmit the proposal, which creates a new version
        data = {
            "title": "Proposal with Signatories",
            "status": "Pending",
            "engagement_date": "2024-01-01",  # Valid date
            "disengagement_date": "2024-12-31",  # Valid date
            "department": "Engineering",
            "lead_proponent": "Proponent User",
            "contact_details": "1234567890",
            "project_description": "A proposal with signatories.",
            "target_date": "2024-06-01",  # Valid target date
            "location": "Test Location",
            "partner_community": "Diezmo",
            "school": True,
            "barangay": False,
            "government_org": "",
            "non_government_org": "",
            "identified_needs_text": "Detailed needs",
            "general_objectives": "Comprehensive objectives",
            "specific_objectives": "Detailed specific objectives",
            "success_indicators": "Success criteria",
            "cooperating_agencies": "Agency A, Agency B",
            "monitoring_mechanics": "Monitoring plans",
            "evaluation_mechanics": "Evaluation plans",
            "timetable": "2024-01-01 to 2024-12-31",  # Valid timetable
            "risk_assessment": "Risks and mitigation",
            "action_plans": "Action plans",
            "sustainability_approaches": "Sustainability details",
            "budget_requirement_text": "Budget details",
            "research_agendas": [self.research_agenda_1.id],
            "signatories": [
                {"name": "Director Name", "position": "Director", "section": "endorsed"},
                {"name": "VP Name", "position": "VP", "section": "concurred"},
            ],
            
        }
        response = self.client.patch(f"/api/proposals/{self.proposal.proposal_id}/resubmit/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that a new version was created
        versions = ProposalVersion.objects.filter(proposal=self.proposal)
        self.assertEqual(versions.count(), 1)
        self.assertEqual(versions.first().version_number, 1)

    def test_signatory_creation(self):
        """Test creation of signatories."""
        self.client.force_authenticate(user=self.proponent_user)

        data = {
            "title": "Proposal with Signatories",
            "status": "Pending",
            "engagement_date": "2024-01-01",  # Valid date
            "disengagement_date": "2024-12-31",  # Valid date
            "department": "Engineering",
            "lead_proponent": "Proponent User",
            "contact_details": "1234567890",
            "project_description": "A proposal with signatories.",
            "target_date": "2024-06-01",  # Valid target date
            "location": "Test Location",
            "partner_community": "Diezmo",
            "school": True,
            "barangay": False,
            "government_org": "",
            "non_government_org": "",
            "identified_needs_text": "Detailed needs",
            "general_objectives": "Comprehensive objectives",
            "specific_objectives": "Detailed specific objectives",
            "success_indicators": "Success criteria",
            "cooperating_agencies": "Agency A, Agency B",
            "monitoring_mechanics": "Monitoring plans",
            "evaluation_mechanics": "Evaluation plans",
            "timetable": "2024-01-01 to 2024-12-31",  # Valid timetable
            "risk_assessment": "Risks and mitigation",
            "action_plans": "Action plans",
            "sustainability_approaches": "Sustainability details",
            "budget_requirement_text": "Budget details",
            "research_agendas": [self.research_agenda_1.id],
            "signatories": [
                {"name": "Director Name", "position": "Director", "section": "endorsed"},
                {"name": "VP Name", "position": "VP", "section": "concurred"},
            ],
            
        }
        response = self.client.post("/api/proposals/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Signatory.objects.count(), 2)
        self.assertEqual(Signatory.objects.first().name, "Director Name")
