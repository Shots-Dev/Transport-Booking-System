from django.db import models
from vehicles.models import Vehicle

class Booking(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
        ('Completed', 'Completed'),
    ]

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    distance_km = models.DecimalField(max_digits=5, decimal_places=2)
    passengers = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"Booking for {self.customer_name} - {self.vehicle.name} ({self.status})"
