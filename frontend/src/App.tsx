import { useState } from "react";
import { Car, Users, Shield } from "lucide-react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import Login from "./components/Login";
import CustomerDashboard from "./components/CustomerDashboard";
import Wallet from "./components/Wallet";
import AvailableCars from "./components/AvailableCars";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "login" | "dashboard" | "wallet" | "availableCars">("home");
  const [userType, setUserType] = useState<"customer" | "admin" | null>(null);

  const handleCustomerLogin = () => {
    setCurrentView("login");
    setUserType("customer");
  };

  const handleAdminLogin = () => {
    setCurrentView("login");
    setUserType("admin");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setUserType(null);
  };

  const handleLoginSuccess = () => {
    setCurrentView("dashboard");
  };

  return (
    <UserProvider>
      {currentView === "login" && (
        <Login onBack={handleBackToHome} userType={userType} onLoginSuccess={handleLoginSuccess} />
      )}

      {currentView === "dashboard" && (
        <CustomerDashboard onBack={handleBackToHome} onNavigateToWallet={() => setCurrentView("wallet")} onNavigateToAvailableCars={() => setCurrentView("availableCars")} />
      )}

      {currentView === "wallet" && (
        <Wallet onBack={() => setCurrentView("dashboard")} />
      )}

      {currentView === "availableCars" && (
        <AvailableCars onBack={() => setCurrentView("dashboard")} />
      )}

      {currentView === "home" && (
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
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-4xl">
              {/* Header Section */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Car className="w-10 h-10 text-[#2563eb] stroke-[2.5]" />
                  </div>
                </div>
                <h1 className="text-gray-900 mb-3">Transport Booking System</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Book private and shared vehicles with transparent pricing, real-time
                  availability, and secure wallet payments.
                </p>
              </div>

              {/* Portal Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Portal Card */}
                <Card className="bg-white border-gray-200 shadow-sm">
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                      <Users className="w-7 h-7 text-[#2563eb]" />
                    </div>
                    <h2 className="text-gray-900 mb-3">Customer Portal</h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Search vehicles, get instant quotes, manage bookings, and top up your wallet.
                    </p>
                    <Button
                      onClick={handleCustomerLogin}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                    >
                      Customer Login
                    </Button>
                  </div>
                </Card>

                {/* Admin Portal Card */}
                <Card className="bg-white border-gray-200 shadow-sm">
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                      <Shield className="w-7 h-7 text-[#2563eb]" />
                    </div>
                    <h2 className="text-gray-900 mb-3">Admin Portal</h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Manage fleet, monitor bookings, track revenue, and oversee operations.
                    </p>
                    <Button
                      onClick={handleAdminLogin}
                      variant="secondary"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900"
                    >
                      Admin Login
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserProvider>
  );
}
