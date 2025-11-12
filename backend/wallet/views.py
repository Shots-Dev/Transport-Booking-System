from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Wallet
from .serializers import WalletSerializer
from decimal import Decimal

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    @action(detail=False, methods=['get'], url_path='balance/(?P<customer_name>[^/.]+)')
    def get_balance(self, request, customer_name=None):
        """Get wallet balance for a customer"""
        wallet = get_object_or_404(Wallet, customer_name=customer_name)
        return Response({
            'customer_name': wallet.customer_name,
            'balance': wallet.balance
        })

    @action(detail=False, methods=['post'], url_path='load/(?P<customer_name>[^/.]+)')
    def load_funds(self, request, customer_name=None):
        """Load funds into customer's wallet"""
        amount_str = request.data.get('amount')
        if not amount_str:
            return Response({"error": "Amount is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = Decimal(amount_str)
            if amount <= 0:
                return Response({"error": "Amount must be positive"}, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError):
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        wallet, created = Wallet.objects.get_or_create(
            customer_name=customer_name,
            defaults={'balance': Decimal('0.00')}
        )

        wallet.balance += amount
        wallet.save()

        return Response({
            'customer_name': wallet.customer_name,
            'new_balance': wallet.balance,
            'amount_loaded': amount
        }, status=status.HTTP_200_OK)
