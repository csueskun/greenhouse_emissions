from rest_framework.generics import ListAPIView
from .models import EmissionRecord
from .serializers import EmissionRecordSerializer
from django_filters.rest_framework import DjangoFilterBackend

class EmissionListView(ListAPIView):
    queryset = EmissionRecord.objects.all().order_by('year')
    serializer_class = EmissionRecordSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'country': ['exact', 'icontains'],
        'activity': ['exact', 'icontains'],
        'emission_type__name': ['exact', 'icontains'],
    }