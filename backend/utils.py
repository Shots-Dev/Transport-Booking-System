from datetime import datetime
from decimal import Decimal
from django.utils import timezone
from vehicles.models import Vehicle
from booking.models import Booking
from wallet.models import Wallet

def calculate_duration_hours(distance_km):
    """Calculate trip duration assuming 60 km/h average speed."""
    return distance_km / 60

def calculate_base_price(vehicle_type, distance_km, passengers):
    """Calculate base price based on vehicle type and distance."""
    rates = {
        'Sedan': Decimal('6.00'),
        'SUV': Decimal('7.00'),
        'Minibus': Decimal('8.00'),
        'Truck': Decimal('9.00'),
    }
    rate_per_km = rates.get(vehicle_type, Decimal('6.00'))
    base_price = distance_km * rate_per_km + (2 * passengers)
    return base_price

def calculate_surcharge(start_time):
    """Calculate surcharge for weekend or public holiday."""
    surcharge = Decimal('0.00')
    day_of_week = start_time.weekday()  # 0=Monday, 6=Sunday
    if day_of_week >= 5:  # Saturday or Sunday
        surcharge = Decimal('0.10')  # 10%
    # Note: Public holiday check would require a holidays library or manual list
    # For simplicity, assuming no public holidays in this implementation
    return surcharge

def calculate_estimated_price(vehicle_type, distance_km, passengers, start_time):
    """Calculate total estimated price including surcharges."""
    base_price = calculate_base_price(vehicle_type, distance_km, passengers)
    surcharge_rate = calculate_surcharge(start_time)
    total_price = base_price * (1 + surcharge_rate)
    return total_price

def check_vehicle_availability(vehicle, start_time, end_time):
    """Check if vehicle is available for the given time range."""
    overlapping_bookings = Booking.objects.filter(
        vehicle=vehicle,
        status__in=['Pending', 'Confirmed'],
        start_time__lt=end_time,
        end_time__gt=start_time
    )
    return not overlapping_bookings.exists()

def deduct_wallet_balance(customer_name, amount):
    """Deduct amount from customer's wallet if sufficient balance."""
    try:
        wallet = Wallet.objects.get(customer_name=customer_name)
        if wallet.balance >= amount:
            wallet.balance -= amount
            wallet.save()
            return True, wallet.balance
        else:
            return False, wallet.balance
    except Wallet.DoesNotExist:
        return False, Decimal('0.00')
