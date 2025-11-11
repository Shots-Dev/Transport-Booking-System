from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.dateparse import parse_datetime
from .models import Vehicle
from .serializers import VehicleSerializer
from utils import calculate_duration_hours, calculate_estimated_price, check_vehicle_availability

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class VehicleSearchAPIView(generics.ListAPIView):
    serializer_class = VehicleSerializer

    def get_queryset(self):
        queryset = Vehicle.objects.filter(is_available=True)

        # Get query parameters
        start_time_str = self.request.GET.get('start_time')
        end_time_str = self.request.GET.get('end_time')
        distance_km_str = self.request.GET.get('distance_km')
        passengers_str = self.request.GET.get('passengers')
        vehicle_type = self.request.GET.get('vehicle_type')

        if not all([start_time_str, end_time_str, distance_km_str, passengers_str]):
            return Vehicle.objects.none()  # Return empty if required params missing

        try:
            start_time = parse_datetime(start_time_str)
            end_time = parse_datetime(end_time_str)
            distance_km = float(distance_km_str)
            passengers = int(passengers_str)
        except (ValueError, TypeError):
            return Vehicle.objects.none()

        # Filter by vehicle_type if provided
        if vehicle_type:
            queryset = queryset.filter(vehicle_type=vehicle_type)

        # Filter by capacity
        queryset = queryset.filter(capacity__gte=passengers)

        # Filter by availability (check overlapping bookings)
        available_vehicles = []
        for vehicle in queryset:
            if check_vehicle_availability(vehicle, start_time, end_time):
                available_vehicles.append(vehicle)

        return available_vehicles

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        distance_km_str = request.GET.get('distance_km')
        passengers_str = request.GET.get('passengers')
        start_time_str = request.GET.get('start_time')

        if not all([distance_km_str, passengers_str, start_time_str]):
            return Response({"error": "Missing required parameters: start_time, end_time, distance_km, passengers"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            distance_km = float(distance_km_str)
            passengers = int(passengers_str)
            start_time = parse_datetime(start_time_str)
        except (ValueError, TypeError):
            return Response({"error": "Invalid parameter values"}, status=status.HTTP_400_BAD_REQUEST)

        results = []
        for vehicle in queryset:
            duration_hours = calculate_duration_hours(distance_km)
            estimated_price = calculate_estimated_price(vehicle.vehicle_type, distance_km, passengers, start_time)
            results.append({
                'vehicle_id': vehicle.id,
                'name': vehicle.name,
                'type': vehicle.vehicle_type,
                'capacity': vehicle.capacity,
                'estimated_price': estimated_price,
                'duration_hours': duration_hours,
            })

        return Response(results)
