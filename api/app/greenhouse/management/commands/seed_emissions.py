from django.core.management.base import BaseCommand
from greenhouse.models import EmissionRecord, EmissionType
import random

class Command(BaseCommand):
    help = 'Seed database with sample greenhouse gas emission data'

    def handle(self, *args, **options):
        # Clear existing data
        EmissionRecord.objects.all().delete()
        EmissionType.objects.all().delete()

        # Create emission types
        co2 = EmissionType.objects.create(name='CO2')
        n2o = EmissionType.objects.create(name='N2O')

        # Add sample emissions
        emissions_data = []
        activities = (('Air travel', co2), ('Waste', n2o), ('Agriculture', n2o))
        countries = ('United Kingdom', 'Germany', 'United States', 'Canada')
        for year in range(2015, 2023):
            for country in countries:
                for activity, emission_type in activities:
                    emissions_data.append({
                        'country': country,
                        'year': year,
                        'activity': activity,
                        'emission_type': emission_type,
                        'emissions': round(4 + (8 - 4) * random.random(), 1)
                    })
        EmissionRecord.objects.bulk_create([EmissionRecord(**data) for data in emissions_data])

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
