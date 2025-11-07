from django.db import models

class EmissionType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class EmissionRecord(models.Model):
    year = models.IntegerField()
    emissions = models.FloatField()
    emission_type = models.ForeignKey(EmissionType, on_delete=models.CASCADE)
    country = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)