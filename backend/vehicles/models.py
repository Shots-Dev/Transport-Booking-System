from django.db import models

# Create your models here.
from django.db import models

class Vehicle(models.Model):
    VEHICLE_TYPES = [
        ('Sedan', 'Sedan'),
        ('SUV', 'SUV'),
        ('Minibus', 'Minibus'),
        ('Truck', 'Truck'),
    ]

    name = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPES)
    capacity = models.IntegerField()
    rate_per_km = models.DecimalField(max_digits=5, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.vehicle_type})"

