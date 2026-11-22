from django.test import TestCase
from datetime import timedelta
from django.utils import timezone

# Create your tests here.
from .models import Trip


class TripModelTests(TestCase):
    def test_code_is_generated_on_save(self):
        trip = Trip.objects.create(origin='Brescia', destination='Milano')
        self.assertEqual(len(trip.code), 6)

    def test_duration_is_none_when_trip_is_not_finished(self):
        trip = Trip.objects.create(origin='Brescia', destination='Milano')
        self.assertIsNone(trip.duration)

    def test_duration_is_calculated_from_times(self):
        start = timezone.now()
        trip = Trip.objects.create(
            origin='Brescia',
            destination='Milano',
            started_at=start,
            finished_at=start + timedelta(hours=2),
        )
        self.assertEqual(trip.duration, timedelta(hours=2))


class DriverApiTests(TestCase):
    def setUp(self):
        self.trip = Trip.objects.create(origin='Brescia', destination='Milano')

    def test_start_changes_status_and_sets_time(self):
        response = self.client.post(f'/api/driver/{self.trip.code}/start/')
        self.assertEqual(response.status_code, 200)
        self.trip.refresh_from_db()
        self.assertEqual(self.trip.status, 'started')
        self.assertIsNotNone(self.trip.started_at)

    def test_cannot_arrive_before_start(self):
        response = self.client.post(f'/api/driver/{self.trip.code}/arrive/')
        self.assertEqual(response.status_code, 400)