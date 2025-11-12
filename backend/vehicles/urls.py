from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, VehicleSearchAPIView

router = DefaultRouter()
router.register(r'', VehicleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search/', VehicleSearchAPIView.as_view(), name='vehicle-search'),
]
