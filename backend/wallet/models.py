from django.db import models

class Wallet(models.Model):
    customer_name = models.CharField(max_length=100, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.customer_name} - R{self.balance}"
