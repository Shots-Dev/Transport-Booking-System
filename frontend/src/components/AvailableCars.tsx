import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Car, MapPin, Clock, Users, Star, Calendar, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../contexts/UserContext";

interface AvailableCarsProps {
  onBack: () => void;
}

interface Vehicle {
  id: number;
  name: string;
  vehicle_type: string;
  capacity: number;
  rate_per_km: string;
  is_available: boolean;
}

export default function AvailableCars({ onBack }: AvailableCarsProps) {
  const { customerName } = useUser();
  const [availableCars, setAvailableCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingForm, setBookingForm] = useState({
    startTime: null as Date | null,
    endTime: null as Date | null,
    distanceKm: '',
    passengers: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/vehicles/');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      const data = await response.json();
      setAvailableCars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBookCar = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async () => {
    if (!selectedVehicle || !bookingForm.startTime || !bookingForm.endTime || !bookingForm.distanceKm || !bookingForm.passengers) {
      alert('Please fill in all fields');
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        vehicle: selectedVehicle.id,
        customer_name: customerName,
        start_time: bookingForm.startTime.toISOString(),
        end_time: bookingForm.endTime.toISOString(),
        distance_km: parseFloat(bookingForm.distanceKm),
        passengers: parseInt(bookingForm.passengers)
      };

      const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const data = await response.json();
      alert(`Booking successful! Total price: R${data.price}`);
      setShowBookingModal(false);
      setBookingForm({
        startTime: null,
        endTime: null,
        distanceKm: '',
        passengers: ''
      });
      setSelectedVehicle(null);
    } catch (error) {
      alert(`Booking failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setBookingLoading(false);
    }
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedVehicle(null);
    setBookingForm({
      startTime: null,
      endTime: null,
      distanceKm: '',
      passengers: ''
    });
  };

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
      <div className="max-w-6xl mx-auto p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Cars</h1>
          <p className="text-gray-600">Choose from our fleet of vehicles</p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCars.map((car) => (
            <Card key={car.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Car Image Placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Car className="w-16 h-16 text-gray-400" />
                </div>

                {/* Car Details */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                    <p className="text-sm text-gray-600">{car.vehicle_type}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {car.capacity} seats
                    </div>
                    <div className="text-lg font-bold text-[#2563eb]">
                      R{car.rate_per_km}/km
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      car.is_available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {car.is_available ? 'Available' : 'Unavailable'}
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    onClick={() => handleBookCar(car)}
                    disabled={!car.is_available}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {car.is_available ? 'Book Now' : 'Unavailable'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Cars Message (if empty) */}
        {availableCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No cars available at the moment</p>
            <p className="text-sm text-gray-500 mt-2">Please check back later</p>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book {selectedVehicle.name}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Start Time */}
                <div>
                  <Label htmlFor="startTime" className="text-sm font-medium text-gray-700 mb-2 block">
                    Start Time
                  </Label>
                  <DatePicker
                    selected={bookingForm.startTime}
                    onChange={(date) => setBookingForm(prev => ({ ...prev, startTime: date }))}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select start time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>

                {/* End Time */}
                <div>
                  <Label htmlFor="endTime" className="text-sm font-medium text-gray-700 mb-2 block">
                    End Time
                  </Label>
                  <DatePicker
                    selected={bookingForm.endTime}
                    onChange={(date) => setBookingForm(prev => ({ ...prev, endTime: date }))}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select end time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  />
                </div>

                {/* Distance */}
                <div>
                  <Label htmlFor="distance" className="text-sm font-medium text-gray-700 mb-2 block">
                    Distance (km)
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Enter distance in km"
                    value={bookingForm.distanceKm}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, distanceKm: e.target.value }))}
                    min="0"
                    step="0.1"
                    className="w-full"
                  />
                </div>

                {/* Passengers */}
                <div>
                  <Label htmlFor="passengers" className="text-sm font-medium text-gray-700 mb-2 block">
                    Number of Passengers
                  </Label>
                  <Input
                    id="passengers"
                    type="number"
                    placeholder="Enter number of passengers"
                    value={bookingForm.passengers}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, passengers: e.target.value }))}
                    min="1"
                    max={selectedVehicle.capacity}
                    className="w-full"
                  />
                </div>

                {/* Price Preview */}
                {bookingForm.distanceKm && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Estimated Price:</p>
                    <p className="text-2xl font-bold text-[#2563eb]">
                      R{(parseFloat(bookingForm.distanceKm) * parseFloat(selectedVehicle.rate_per_km)).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBookingSubmit}
                  disabled={bookingLoading}
                  className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
