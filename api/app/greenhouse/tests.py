from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import EmissionRecord, EmissionType

class EmissionAPITest(TestCase):

    def setUp(self):
        # Create emission types
        self.co2 = EmissionType.objects.create(name="CO2")
        self.n2o = EmissionType.objects.create(name="N2O")

        # Create some emissions
        EmissionRecord.objects.create(
            year=2015,
            emissions=5.2,
            emission_type=self.co2,
            country="Colombia",
            activity="Waste"
        )
        EmissionRecord.objects.create(
            year=2016,
            emissions=2.9,
            emission_type=self.n2o,
            country="Venezuela",
            activity="Air travel"
        )

        self.client = APIClient()

    def test_emissions_list(self):
        url = reverse('emission-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual(response.data[0]['emission_type']['name'], 'CO2')
        self.assertEqual(response.data[0]['country'], 'Colombia')
        self.assertEqual(response.data[0]['activity'], 'Waste')
        self.assertEqual(response.data[0]['year'], 2015)
        self.assertEqual(float(response.data[0]['emissions']), 5.2)

        self.assertEqual(response.data[1]['emission_type']['name'], 'N2O')
        self.assertEqual(response.data[1]['country'], 'Venezuela')
        self.assertEqual(response.data[1]['activity'], 'Air travel')
        self.assertEqual(response.data[1]['year'], 2016)
        self.assertEqual(float(response.data[1]['emissions']), 2.9)

