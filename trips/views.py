from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics
from .models import Trip
from .serializers import TripSerializer
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer


class DriverTripView(generics.RetrieveAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    lookup_field = 'code'


@api_view(['POST'])
def start_trip(request, code):
    trip = get_object_or_404(Trip, code=code)
    if trip.status != 'assigned':
        return Response({'error': 'Trip already started'}, status=400)
    trip.status = 'started'
    trip.started_at = timezone.now()
    trip.save()
    return Response(TripSerializer(trip).data)


@api_view(['POST'])
def arrive_trip(request, code):
    trip = get_object_or_404(Trip, code=code)
    if trip.status != 'started':
        return Response({'error': 'Trip not started'}, status=400)
    trip.status = 'arrived'
    trip.arrived_at = timezone.now()
    trip.save()
    return Response(TripSerializer(trip).data)


@api_view(['POST'])
def finish_trip(request, code):
    trip = get_object_or_404(Trip, code=code)
    if trip.status != 'arrived':
        return Response({'error': 'Trip not arrived'}, status=400)
    trip.status = 'finished'
    trip.finished_at = timezone.now()
    trip.save()
    return Response(TripSerializer(trip).data)
