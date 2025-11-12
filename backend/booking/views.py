from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.dateparse import parse_datetime
from .models import Booking
from .serializers import BookingSerializer
from utils import calculate_estimated_price, check_vehicle_availability, deduct_wallet_balance
from vehicles.models import Vehicle

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Required fields
        vehicle_id = data.get('vehicle')
        customer_name = data.get('customer_name')
        start_time_str = data.get('start_time')
        end_time_str = data.get('end_time')
        distance_km_str = data.get('distance_km')
        passengers_str = data.get('passengers')

        if not all([vehicle_id, customer_name, start_time_str, end_time_str, distance_km_str, passengers_str]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
            start_time = parse_datetime(start_time_str)
            end_time = parse_datetime(end_time_str)
            distance_km = float(distance_km_str)
            passengers = int(passengers_str)
        except (Vehicle.DoesNotExist, ValueError, TypeError):
            return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

        # Check vehicle availability
        if not check_vehicle_availability(vehicle, start_time, end_time):
            return Response({"error": "Vehicle not available for the selected time"}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate price
        price = calculate_estimated_price(vehicle.vehicle_type, distance_km, passengers, start_time)

        # Deduct from wallet
        success, balance = deduct_wallet_balance(customer_name, price)
        if not success:
            return Response({"error": "Insufficient wallet balance", "current_balance": balance}, status=status.HTTP_400_BAD_REQUEST)

        # Create booking
        data['price'] = price
        data['status'] = 'Confirmed'
        booking = Booking.objects.create(
            vehicle=vehicle,
            customer_name=customer_name,
            start_time=start_time,
            end_time=end_time,
            distance_km=distance_km,
            passengers=passengers,
            price=price,
            status='Confirmed'
        )

        # Mark vehicle as unavailable (optional, depending on business logic)
        # vehicle.is_available = False
        # vehicle.save()

        serializer = self.get_serializer(booking)
        response_data = serializer.data
        response_data['updated_wallet_balance'] = balance
        return Response(response_data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], url_path='customer/(?P<customer_name>[^/.]+)')
    def get_customer_bookings(self, request, customer_name=None):
        """Get all bookings for a customer"""
        bookings = Booking.objects.filter(customer_name=customer_name).order_by('-start_time')
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)
