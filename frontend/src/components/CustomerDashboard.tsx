import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Wallet, Search, Calendar, CreditCard } from "lucide-react";

interface CustomerDashboardProps {
  onBack: () => void;
  onNavigateToWallet: () => void;
  onNavigateToAvailableCars: () => void;
}

export default function CustomerDashboard({ onBack, onNavigateToWallet, onNavigateToAvailableCars }: CustomerDashboardProps) {
  const [walletBalance] = useState(150.00); // Mock balance

  const handleLoadWallet = () => {
    // Navigate to wallet page
    onNavigateToWallet();
  };

  const handleSearchVehicles = () => {
    // Navigate to available cars page
    onNavigateToAvailableCars();
  };

  const handleMyBookings = () => {
    // Navigate to bookings page
    alert("Navigate to my bookings");
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

      {/* Dashboard Content */}
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
            Back
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hi Shots!</h1>
          <p className="text-gray-600">Welcome back to your dashboard</p>
        </div>

        {/* Wallet Balance Card */}
        <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl rounded-2xl mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Wallet Balance</h2>
                <p className="text-4xl font-bold text-[#2563eb]">R{walletBalance.toFixed(2)}</p>
              </div>
              <div className="bg-[#2563eb]/10 p-4 rounded-full">
                <Wallet className="w-16 h-16 text-[#2563eb]" />
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions - Large Buttons Side by Side */}
        <div className="flex flex-row gap-6 mb-8 justify-center text-center">
          <Button
            onClick={handleLoadWallet}
            className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white text-lg font-semibold flex flex-col items-center justify-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ width: '350px', height: '200px' }}
          >
            <div className="bg-white/20 p-4 rounded-full mb-4">
              <CreditCard className="w-12 h-12" />
            </div>
            Load Wallet
          </Button>
          <Button
            onClick={handleSearchVehicles}
            variant="outline"
            className="border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white text-lg font-semibold flex flex-col items-center justify-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
            style={{ width: '350px', height: '200px' }}
          >
            <div className="bg-[#2563eb]/10 p-4 rounded-full mb-4">
              <Search className="w-12 h-12" />
            </div>
            Search Vehicles
          </Button>
          <Button
            onClick={handleMyBookings}
            variant="outline"
            className="border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white text-lg font-semibold flex flex-col items-center justify-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
            style={{ width: '350px', height: '200px' }}
          >
            <div className="bg-[#2563eb]/10 p-4 rounded-full mb-4">
              <Calendar className="w-12 h-12" />
            </div>
            My Bookings
          </Button>
        </div>

        {/* Upcoming Bookings Preview */}
        <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Trips</h2>
            <div className="text-center py-8">
              <div className="bg-gray-100 p-6 rounded-full inline-block mb-6">
                <Calendar className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-2">No upcoming trips scheduled</p>
              <p className="text-sm text-gray-500">Book your next ride to see it here</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
