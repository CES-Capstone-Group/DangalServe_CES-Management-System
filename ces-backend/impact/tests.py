from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.utils import timezone
from .models import ImpactEvaluation
from api.models import ActivitySchedule, Proposal, Account, Department, Course


class ProposalTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a user account
        self.user_account = Account.objects.create(
            username="sample_user",
            password="password123",  # This will be hashed automatically
            accountType="Proponent",
            position="Lead Proponent",
            status="Active",
            activationDate=timezone.now()
        )

        # Create a department and a course
        self.department = Department.objects.create(dept_name="Science Department")
        self.course = Course.objects.create(course_name="Environmental Science", dept=self.department)

        # Create a sample proposal
        self.sample_proposal = Proposal.objects.create(
            user_id=self.user_account,
            title="Community Environmental Awareness Program",
            engagement_date=timezone.now().date(),
            disengagement_date=timezone.now().date() + timezone.timedelta(days=30),
            department=self.department.dept_name,
            lead_proponent="Dr. Jane Doe",
            contact_details="123-456-7890",
            project_description="An initiative to promote environmental awareness in local communities.",
            target_date=timezone.now().date(),
            location="Barangay Hall, Local Town",
            partner_community="Barangay Greenfield",
            school=True,
            barangay=True,
            government_org="Department of Environment",
            non_government_org="Green Earth NGO",
            identified_needs_text="The community needs educational materials and resources for environmental protection.",
            general_objectives="To educate the community about sustainable practices.",
            specific_objectives="Conduct workshops, distribute educational leaflets, and organize tree-planting activities.",
            success_indicators="Improved knowledge and active participation in environmental activities.",
            cooperating_agencies="Local environmental offices and youth organizations.",
            monitoring_mechanics="Regular assessments and community feedback forms.",
            evaluation_mechanics="Pre and post-event surveys and analysis of participation data.",
            timetable="Month-long awareness campaign with weekly events.",
            risk_assessment="Possible low turnout due to weather conditions.",
            action_plans="Implement a backup plan for indoor activities in case of rain.",
            sustainability_approaches="Continuous engagement through social media and follow-up events.",
            budget_requirement_text="Estimated budget of $5000 for materials and refreshments.",
            status="Approved by Barangay"
        )

    def test_proposal_creation(self):
        self.assertEqual(self.sample_proposal.title, "Community Environmental Awareness Program")
        self.assertEqual(self.sample_proposal.user_id, self.user_account)


class ImpactEvaluationListCreateViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a user account
        self.user_account = Account.objects.create(
            username="sample_user",
            password="password123",  # This will be hashed automatically
            accountType="Proponent",
            position="Lead Proponent",
            status="Active",
            activationDate=timezone.now()
        )

        # Create a department and a sample proposal
        self.department = Department.objects.create(dept_name="Science Department")
        self.sample_proposal = Proposal.objects.create(
            user_id=self.user_account,
            title="Community Environmental Awareness Program",
            engagement_date=timezone.now().date(),
            disengagement_date=timezone.now().date() + timezone.timedelta(days=30),
            department=self.department.dept_name,
            lead_proponent="Dr. Jane Doe",
            contact_details="123-456-7890",
            project_description="An initiative to promote environmental awareness in local communities.",
            target_date=timezone.now().date(),
            location="Barangay Hall, Local Town",
            partner_community="Barangay Greenfield",
            school=True,
            barangay=True,
            government_org="Department of Environment",
            non_government_org="Green Earth NGO",
            identified_needs_text="The community needs educational materials and resources for environmental protection.",
            general_objectives="To educate the community about sustainable practices.",
            specific_objectives="Conduct workshops, distribute educational leaflets, and organize tree-planting activities.",
            success_indicators="Improved knowledge and active participation in environmental activities.",
            cooperating_agencies="Local environmental offices and youth organizations.",
            monitoring_mechanics="Regular assessments and community feedback forms.",
            evaluation_mechanics="Pre and post-event surveys and analysis of participation data.",
            timetable="Month-long awareness campaign with weekly events.",
            risk_assessment="Possible low turnout due to weather conditions.",
            action_plans="Implement a backup plan for indoor activities in case of rain.",
            sustainability_approaches="Continuous engagement through social media and follow-up events.",
            budget_requirement_text="Estimated budget of $5000 for materials and refreshments.",
            status="Approved by Barangay"
        )

        # Create an ActivitySchedule object linked to the proposal
        self.activity_schedule = ActivitySchedule.objects.create(
            activity_title="Activity X",
            target_date=timezone.now().date(),
            target_time="12:00:00",
            status="In Progress",
            proposal=self.sample_proposal
        )

        # Data for creating an ImpactEvaluation
        self.data = {
            "activity_schedule": self.activity_schedule.id,  # Use the ID, not the instance
            "division_name": "Division A",
            "venue": "Venue Y",
            "objectives": "Objectives for testing.",
            "Q1": 3,
            "Q2": 3,
            "Q3": 3,
            "Q4": 3,
            "Q5": 3,
            "Q6": 3,
            "Q7": 3,
            "Q8": 3,
            "Q9": 3,
            "Q10": 3,
            "Q11": 3,
            "Q12_recommendations": "No recommendations at this time."
        }

    def test_list_impact_evaluation(self):
        response = self.client.get('/impact/')  # Adjust URL if necessary
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertGreaterEqual(len(response.data), 1)

    def test_create_impact_evaluation(self):
        response = self.client.post('/impact/', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ImpactEvaluation.objects.count(), 1)


class ImpactEvaluationDetailViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a user account and proposal
        self.user_account = Account.objects.create(
            username="sample_user",
            password="password123",
            accountType="Proponent",
            position="Lead Proponent",
            status="Active",
            activationDate=timezone.now()
        )

        self.department = Department.objects.create(dept_name="Science Department")
        self.sample_proposal = Proposal.objects.create(
            user_id=self.user_account,
            title="Community Environmental Awareness Program",
            engagement_date=timezone.now().date(),
            disengagement_date=timezone.now().date() + timezone.timedelta(days=30),
            department=self.department.dept_name,
            lead_proponent="Dr. Jane Doe",
            contact_details="123-456-7890",
            project_description="An initiative to promote environmental awareness in local communities.",
            target_date=timezone.now().date(),
            location="Barangay Hall, Local Town",
            partner_community="Barangay Greenfield",
            school=True,
            barangay=True,
            government_org="Department of Environment",
            non_government_org="Green Earth NGO",
            identified_needs_text="The community needs educational materials and resources for environmental protection.",
            general_objectives="To educate the community about sustainable practices.",
            specific_objectives="Conduct workshops, distribute educational leaflets, and organize tree-planting activities.",
            success_indicators="Improved knowledge and active participation in environmental activities.",
            cooperating_agencies="Local environmental offices and youth organizations.",
            monitoring_mechanics="Regular assessments and community feedback forms.",
            evaluation_mechanics="Pre and post-event surveys and analysis of participation data.",
            timetable="Month-long awareness campaign with weekly events.",
            risk_assessment="Possible low turnout due to weather conditions.",
            action_plans="Implement a backup plan for indoor activities in case of rain.",
            sustainability_approaches="Continuous engagement through social media and follow-up events.",
            budget_requirement_text="Estimated budget of $5000 for materials and refreshments.",
            status="Approved by Barangay"
        )

        # Create an ActivitySchedule object linked to the proposal
        self.activity_schedule = ActivitySchedule.objects.create(
            activity_title="Activity X",
            target_date=timezone.now().date(),
            target_time="12:00:00",
            status="In Progress",
            proposal=self.sample_proposal
        )

        # Create an ImpactEvaluation object
        self.impact = ImpactEvaluation.objects.create(
            activity_schedule=self.activity_schedule,
            division_name="Division B",
            venue="Venue Z",
            objectives="Testing objectives.",
            Q1=3,
            Q2=3,
            Q3=3,
            Q4=3,
            Q5=3,
            Q6=3,
            Q7=3,
            Q8=3,
            Q9=3,
            Q10=3,
            Q11=3,
            Q12_recommendations="Some recommendations."
        )
        self.url = f'/impact/{self.impact.id}/'

    def test_retrieve_impact_evaluation(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['Q1'], 3)

    def test_update_impact_evaluation(self):
        updated_data = {
            "activity_schedule": self.activity_schedule.id,
            "division_name": "Updated Division",
            "venue": "Updated Venue",
            "objectives": "Updated objectives.",
            "Q1": 2,
            "Q2": 2,
            "Q3": 2,
            "Q4": 2,
            "Q5": 2,
            "Q6": 2,
            "Q7": 2,
            "Q8": 2,
            "Q9": 2,
            "Q10": 2,
            "Q11": 2,
            "Q12_recommendations": "Updated recommendations."
        }
        response = self.client.put(self.url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.impact.refresh_from_db()
        self.assertEqual(int(self.impact.Q1), 2)
        self.assertEqual(int(self.impact.Q2), 2)

    def test_delete_impact_evaluation(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ImpactEvaluation.objects.count(), 0)


class ImpactEvaluationSummaryViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a user account and proposal
        self.user_account = Account.objects.create(
            username="sample_user",
            password="password123",
            accountType="Proponent",
            position="Lead Proponent",
            status="Active",
            activationDate=timezone.now()
        )

        self.department = Department.objects.create(dept_name="Science Department")
        self.sample_proposal = Proposal.objects.create(
            user_id=self.user_account,
            title="Community Environmental Awareness Program",
            engagement_date=timezone.now().date(),
            disengagement_date=timezone.now().date() + timezone.timedelta(days=30),
            department=self.department.dept_name,
            lead_proponent="Dr. Jane Doe",
            contact_details="123-456-7890",
            project_description="An initiative to promote environmental awareness in local communities.",
            target_date=timezone.now().date(),
            location="Barangay Hall, Local Town",
            partner_community="Barangay Greenfield",
            school=True,
            barangay=True,
            government_org="Department of Environment",
            non_government_org="Green Earth NGO",
            identified_needs_text="The community needs educational materials and resources for environmental protection.",
            general_objectives="To educate the community about sustainable practices.",
            specific_objectives="Conduct workshops, distribute educational leaflets, and organize tree-planting activities.",
            success_indicators="Improved knowledge and active participation in environmental activities.",
            cooperating_agencies="Local environmental offices and youth organizations.",
            monitoring_mechanics="Regular assessments and community feedback forms.",
            evaluation_mechanics="Pre and post-event surveys and analysis of participation data.",
            timetable="Month-long awareness campaign with weekly events.",
            risk_assessment="Possible low turnout due to weather conditions.",
            action_plans="Implement a backup plan for indoor activities in case of rain.",
            sustainability_approaches="Continuous engagement through social media and follow-up events.",
            budget_requirement_text="Estimated budget of $5000 for materials and refreshments.",
            status="Approved by Barangay"
        )

        # Create an ActivitySchedule object linked to the proposal
        self.activity_schedule = ActivitySchedule.objects.create(
            activity_title="Activity X",
            target_date=timezone.now().date(),
            target_time="12:00:00",
            status="In Progress",
            proposal=self.sample_proposal
        )

        # Create sample ImpactEvaluation objects
        ImpactEvaluation.objects.create(
            activity_schedule=self.activity_schedule,
            division_name="Division A",
            venue="Venue Y",
            objectives="Objectives for testing.",
            Q1=3, Q2=2, Q3=1, Q4=3, Q5=2, Q6=1, Q7=3, Q8=2, Q9=1, Q10=3, Q11=2
        )
        ImpactEvaluation.objects.create(
            activity_schedule=self.activity_schedule,
            division_name="Division B",
            venue="Venue Z",
            objectives="More testing objectives.",
            Q1=2, Q2=3, Q3=2, Q4=1, Q5=3, Q6=2, Q7=1, Q8=3, Q9=2, Q10=1, Q11=3
        )

    def test_get_correct_averages(self):
        response = self.client.get('/impact/summary/', {
            'activity_id': self.activity_schedule.id,
            'question_number': 1
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Q1_average", response.data)
        self.assertIn("assessment_paragraph", response.data)
        self.assertEqual(response.data["Q1_average"], 2.5)

        response = self.client.get('/impact/summary/', {
            'activity_id': self.activity_schedule.id,
            'question_number': 2
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Q2_average", response.data)
        self.assertIn("assessment_paragraph", response.data)
        self.assertEqual(response.data["Q2_average"], 2.5)
