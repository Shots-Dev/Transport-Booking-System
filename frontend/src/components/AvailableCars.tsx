import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Car, MapPin, Clock, Users, Star } from "lucide-react";

interface AvailableCarsProps {
  onBack: () => void;
}

export default function AvailableCars({ onBack }: AvailableCarsProps) {
  const [availableCars] = useState([
    {
      id: 1,
      type: "Sedan",
      model: "Toyota Corolla",
      price: 25,
      seats: 4,
      rating: 4.5,
      location: "Cape Town CBD",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 2,
      type: "SUV",
      model: "Honda CR-V",
      price: 35,
      seats: 5,
      rating: 4.8,
      location: "Johannesburg Airport",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 3,
      type: "Hatchback",
      model: "Volkswagen Polo",
      price: 20,
      seats: 4,
      rating: 4.2,
      location: "Durban Central",
      available: false,
      image: "/car-placeholder.jpg"
    },
    {
      id: 4,
      type: "Luxury",
      model: "BMW 3 Series",
      price: 50,
      seats: 4,
      rating: 4.9,
      location: "Pretoria CBD",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 5,
      type: "Minivan",
      model: "Toyota Quantum",
      price: 40,
      seats: 8,
      rating: 4.6,
      location: "Port Elizabeth",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 6,
      type: "Pickup Truck",
      model: "Ford Ranger",
      price: 45,
      seats: 4,
      rating: 4.7,
      location: "Bloemfontein",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 7,
      type: "Electric",
      model: "Tesla Model 3",
      price: 55,
      seats: 5,
      rating: 4.9,
      location: "Cape Town Airport",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 8,
      type: "Compact",
      model: "Renault Clio",
      price: 18,
      seats: 4,
      rating: 4.1,
      location: "East London",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 9,
      type: "SUV",
      model: "Nissan Qashqai",
      price: 32,
      seats: 5,
      rating: 4.4,
      location: "Kimberley",
      available: false,
      image: "/car-placeholder.jpg"
    },
    {
      id: 10,
      type: "Luxury",
      model: "Mercedes C-Class",
      price: 60,
      seats: 4,
      rating: 4.8,
      location: "Sandton",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 11,
      type: "Hatchback",
      model: "Ford Fiesta",
      price: 22,
      seats: 4,
      rating: 4.3,
      location: "Pietermaritzburg",
      available: true,
      image: "/car-placeholder.jpg"
    },
    {
      id: 12,
      type: "SUV",
      model: "Jeep Grand Cherokee",
      price: 48,
      seats: 5,
      rating: 4.7,
      location: "George",
      available: true,
      image: "/car-placeholder.jpg"
    }
  ]);

  const handleBookCar = (carId: number) => {
    alert(`Booking car with ID: ${carId}`);
    // TODO: Implement booking logic
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
                    <h3 className="text-lg font-semibold text-gray-900">{car.model}</h3>
                    <p className="text-sm text-gray-600">{car.type}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {car.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {car.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {car.seats} seats
                    </div>
                    <div className="text-lg font-bold text-[#2563eb]">
                      R{car.price}/hour
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      car.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {car.available ? 'Available' : 'Unavailable'}
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    onClick={() => handleBookCar(car.id)}
                    disabled={!car.available}
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {car.available ? 'Book Now' : 'Unavailable'}
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
      </div>
    </div>
  );
}
