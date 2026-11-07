from rest_framework import serializers
from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    duration=serializers.DurationField(read_only=True)
    class Meta:
        model = Trip
        fields = '__all__'