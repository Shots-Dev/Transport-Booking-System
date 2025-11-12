# Backend Implementation TODO

- [x] 1. Define Wallet model (customer_name, balance) in backend/wallet/models.py
- [x] 2. Define Booking model (vehicle FK, customer_name, start_time, end_time, distance_km, passengers, price, status) in backend/booking/models.py
- [x] 3. Create backend/utils.py for pricing calculation (base_price, surcharges) and availability checks
- [x] 4. Create backend/booking/serializers.py for BookingSerializer
- [x] 5. Update backend/vehicles/views.py to add VehicleSearchAPIView
- [x] 6. Update backend/booking/views.py to add BookingViewSet with custom create method
- [x] 7. Update backend/booking/urls.py and backend/vehicles/urls.py for new endpoints
- [x] 8. Run makemigrations and migrate for new models
- [ ] Followup: Test endpoints with sample data
