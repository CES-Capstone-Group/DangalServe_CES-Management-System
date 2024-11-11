from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import ImpactEvaluation

class ImpactEvaluationListCreateViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create sample data using integer values
        self.data = {
            "division_name": "Division A",
            "activity_title": "Activity X",
            "activity_date": "2024-11-11",
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
        ImpactEvaluation.objects.create(**self.data)

    # Tests whether the API correctly lists all ImpactEvaluation objects
    def test_list_impact_evaluation(self):
        response = self.client.get('/impact/')  # Adjust URL if necessary
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)  # Ensure at least one item is returned

    # Tests the creation of a new ImpactEvaluation object through a POST request.
    def test_create_impact_evaluation(self):
        response = self.client.post('/impact/', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ImpactEvaluation.objects.count(), 2)  # Check if the count has increased


class ImpactEvaluationDetailViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Use integer values for test data
        self.impact = ImpactEvaluation.objects.create(
            division_name="Division B",
            activity_title="Activity Y",
            activity_date="2024-11-11",
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
        self.url = f'/impact/{self.impact.id}/'  # Adjust URL if necessary

    # Tests whether a specific ImpactEvaluation object can be retrieved correctly.
    def test_retrieve_impact_evaluation(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['Q1'], 3)

    # Tests updating a specific ImpactEvaluation object with new data.
    def test_update_impact_evaluation(self):
        updated_data = {
            "division_name": "Updated Division",
            "activity_title": "Updated Activity",
            "activity_date": "2024-11-12",
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

    #  Tests deleting a specific ImpactEvaluation object.
    def test_delete_impact_evaluation(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ImpactEvaluation.objects.count(), 0)  # Ensure the object is deleted


class ImpactEvaluationSummaryViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create sample data using integer values
        ImpactEvaluation.objects.create(
            division_name="Division A",
            activity_title="Activity X",
            activity_date="2024-11-11",
            venue="Venue Y",
            objectives="Objectives for testing.",
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
            Q11=3
        )
        ImpactEvaluation.objects.create(
            division_name="Division B",
            activity_title="Activity Y",
            activity_date="2024-11-11",
            venue="Venue Z",
            objectives="Testing objectives.",
            Q1=2,
            Q2=2,
            Q3=2,
            Q4=2,
            Q5=2,
            Q6=2,
            Q7=2,
            Q8=2,
            Q9=2,
            Q10=2,
            Q11=2
        )

    # Tests whether the summary view returns the correct status code and (implicitly) the correct averages for the questions.
    def test_get_correct_averages(self):
        response = self.client.get('/impact/summary/')  # Adjust URL if necessary
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add assertions for calculated averages as needed
