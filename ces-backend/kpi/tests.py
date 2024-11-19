from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import KpiTable, Kpi, Department

class KpiViewTests(APITestCase):

    def setUp(self):
        # Create a Department instance
        self.department = Department.objects.create(dept_name="Test Department")

        # Create a KpiTable instance
        self.kpi_table = KpiTable.objects.create(department=self.department, title="Test KPI Table")

        # Create a Kpi instance
        self.kpi = Kpi.objects.create(
            kpi_table=self.kpi_table,
            kpi_name="Sample KPI",
            target="80%",
            quarterly_data={"2023": [10, 20, 30, 40]}
        )

        # Define URLs for the views
        self.kpi_table_list_url = reverse('kpi:kpi-table-list-create')
        self.kpi_table_detail_url = reverse('kpi:kpi-table-detail', args=[self.kpi_table.id])
        self.kpi_list_url = reverse('kpi:kpi-list-create')
        self.kpi_detail_url = reverse('kpi:kpi-detail', args=[self.kpi.id])

class KpiTableTests(KpiViewTests):

    def test_create_kpi_table(self):
        data = {
            "department": self.department.dept_id,
            "title": "New KPI Table"
        }
        response = self.client.post(self.kpi_table_list_url, data, format='json')  # Use format='json'
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(KpiTable.objects.count(), 2)
        self.assertEqual(KpiTable.objects.last().title, "New KPI Table")

    def test_list_kpi_tables(self):
        response = self.client.get(self.kpi_table_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.kpi_table.title)

    def test_retrieve_kpi_table(self):
        response = self.client.get(self.kpi_table_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.kpi_table.title)

    def test_update_kpi_table(self):
        data = {
            "department": self.department.dept_id,  # Include department for update
            "title": "Updated KPI Table"
        }
        response = self.client.put(self.kpi_table_detail_url, data, format='json')  # Use format='json'
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.kpi_table.refresh_from_db()
        self.assertEqual(self.kpi_table.title, "Updated KPI Table")

    def test_delete_kpi_table(self):
        response = self.client.delete(self.kpi_table_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(KpiTable.objects.count(), 0)

class KpiTests(KpiViewTests):

    def test_create_kpi(self):
        data = {
            "kpi_table": self.kpi_table.id,
            "kpi_name": "New KPI",
            "target": "90%",
            "quarterly_data": {"2023": [5, 15, 25, 35]}
        }
        response = self.client.post(self.kpi_list_url, data, format='json')  # Use format='json'
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Kpi.objects.count(), 2)
        self.assertEqual(Kpi.objects.last().kpi_name, "New KPI")

    def test_list_kpis(self):
        response = self.client.get(self.kpi_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['kpi_name'], self.kpi.kpi_name)

    def test_retrieve_kpi(self):
        response = self.client.get(self.kpi_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['kpi_name'], self.kpi.kpi_name)

    def test_update_kpi(self):
        data = {
            "kpi_table": self.kpi_table.id,  # Include kpi_table for update
            "kpi_name": "Updated KPI",
            "target": "100%",
            "quarterly_data": {"2023": [50, 60, 70, 80]}
        }
        response = self.client.put(self.kpi_detail_url, data, format='json')  # Use format='json'
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.kpi.refresh_from_db()
        self.assertEqual(self.kpi.kpi_name, "Updated KPI")
        self.assertEqual(self.kpi.target, "100%")

    def test_delete_kpi(self):
        response = self.client.delete(self.kpi_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Kpi.objects.count(), 0)
