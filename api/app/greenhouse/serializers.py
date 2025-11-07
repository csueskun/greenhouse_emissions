from rest_framework import serializers
from .models import EmissionRecord, EmissionType

class EmissionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmissionType
        fields = '__all__'

class EmissionRecordSerializer(serializers.ModelSerializer):
    emission_type = EmissionTypeSerializer(read_only=True)

    class Meta:
        model = EmissionRecord
        fields = '__all__'