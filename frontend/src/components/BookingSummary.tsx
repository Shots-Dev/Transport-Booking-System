import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Car, MapPin, Clock, Users, DollarSign, Calendar, CheckCircle } from "lucide-react";
import { useUser } from "../contexts/UserContext";

interface BookingSummaryProps {
  onBack: () => void;
  onConfirmBooking: () => void;
  vehicle: {
    id: number;
    name: string;
    vehicle_type: string;
    capacity: number;
    rate_per_km: string;
  };
  bookingDetails: {
    startTime: Date;
    endTime: Date;
    distanceKm: number;
    passengers: number;
  };
}

export default function BookingSummary({ onBack, onConfirmBooking, vehicle, bookingDetails }: BookingSummaryProps) {
  const { customerName } = useUser();
  const [walletBalance, setWalletBalance] = useState(0.00);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, [customerName]);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/wallet/balance/${encodeURIComponent(customerName)}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data = await response.json();
      setWalletBalance(parseFloat(data.balance));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setWalletBalance(0.00);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    return bookingDetails.distanceKm * parseFloat(vehicle.rate_per_km);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleConfirmBooking = async () => {
    setConfirming(true);
    try {
      await onConfirmBooking();
    } finally {
      setConfirming(false);
    }
  };

  const price = calculatePrice();
  const hasEnoughBalance = walletBalance >= price;

  return (
    <div className="min-h-screen bg-[#e8ecf1]">
      {/* Header Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <img src="/CSIR_logo.png" alt="CSIR Logo" className="h-10 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Booking
          </Button>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Summary</h1>
          <p className="text-gray-600">Review your booking details before confirming</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Details */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Vehicle Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{vehicle.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{vehicle.vehicle_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{vehicle.capacity} passengers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-medium">R{vehicle.rate_per_km}/km</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Trip Details */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Trip Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Start Time:
                  </span>
                  <span className="font-medium text-right">{formatDateTime(bookingDetails.startTime)}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    End Time:
                  </span>
                  <span className="font-medium text-right">{formatDateTime(bookingDetails.endTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Distance:
                  </span>
                  <span className="font-medium">{bookingDetails.distanceKm} km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Passengers:
                  </span>
                  <span className="font-medium">{bookingDetails.passengers}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Pricing Summary */}
        <Card className="bg-white border-gray-200 shadow-sm mt-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Pricing Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rate per km:</span>
                <span className="font-medium">R{vehicle.rate_per_km}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Distance:</span>
                <span className="font-medium">{bookingDetails.distanceKm} km</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Price:</span>
                  <span className="text-[#2563eb]">R{price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Wallet Balance */}
        <Card className="bg-white border-gray-200 shadow-sm mt-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Wallet Balance</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Balance:</span>
              <span className={`text-xl font-bold ${hasEnoughBalance ? 'text-green-600' : 'text-red-600'}`}>
                R{walletBalance.toFixed(2)}
              </span>
            </div>
            {!hasEnoughBalance && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  Insufficient balance. You need R{(price - walletBalance).toFixed(2)} more.
                  Please top up your wallet before proceeding.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back to Edit
          </Button>
          <Button
            onClick={handleConfirmBooking}
            disabled={!hasEnoughBalance || confirming}
            className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {confirming ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Confirming...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Booking
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
