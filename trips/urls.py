from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TripViewSet, DriverTripView, start_trip, arrive_trip, finish_trip

router = DefaultRouter()
router.register('trips', TripViewSet)

urlpatterns = router.urls + [
    path('driver/<str:code>/',DriverTripView.as_view()),
    path('driver/<str:code>/start/',start_trip),
    path('driver/<str:code>/arrive/', arrive_trip),
    path('driver/<str:code>/finish/', finish_trip),
]