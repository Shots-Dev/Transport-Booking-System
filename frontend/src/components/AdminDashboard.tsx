import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  ArrowLeft, 
  Car, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from "lucide-react";
import { useUser } from "../contexts/UserContext";

interface AdminDashboardProps {
  onBack: () => void;
}

interface Vehicle {
  id: number;
  name: string;
  vehicle_type: string;
  capacity: number;
  rate_per_km: number;
  is_available: boolean;
}

interface Booking {
  id: number;
  vehicle: number;
  customer_name: string;
  start_time: string;
  end_time: string;
  distance_km: number;
  passengers: number;
  price: number;
  status: string;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { customerName } = useUser();
  const [activeTab, setActiveTab] = useState<"overview" | "fleet" | "bookings" | "revenue">("overview");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [bookingFilter, setBookingFilter] = useState<string>("all");

  // Form state for adding/editing vehicles
  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    vehicle_type: "Sedan",
    capacity: 4,
    rate_per_km: 10.0,
    is_available: true
  });

  useEffect(() => {
    fetchVehicles();
    fetchBookings();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/vehicles/");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/bookings/");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/vehicles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleForm),
      });
      if (response.ok) {
        await fetchVehicles();
        setShowAddVehicle(false);
        setVehicleForm({
          name: "",
          vehicle_type: "Sedan",
          capacity: 4,
          rate_per_km: 10.0,
          is_available: true
        });
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
    setLoading(false);
  };

  const handleUpdateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/vehicles/${editingVehicle.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleForm),
      });
      if (response.ok) {
        await fetchVehicles();
        setEditingVehicle(null);
        setVehicleForm({
          name: "",
          vehicle_type: "Sedan",
          capacity: 4,
          rate_per_km: 10.0,
          is_available: true
        });
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
    setLoading(false);
  };

  const handleDeleteVehicle = async (id: number) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/vehicles/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchVehicles();
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const startEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleForm({
      name: vehicle.name,
      vehicle_type: vehicle.vehicle_type,
      capacity: vehicle.capacity,
      rate_per_km: vehicle.rate_per_km,
      is_available: vehicle.is_available
    });
  };

  // Calculate statistics
  const totalRevenue = bookings.reduce((sum, booking) => sum + parseFloat(booking.price.toString()), 0);
  const activeBookings = bookings.filter(b => b.status === "Confirmed").length;
  const availableVehicles = vehicles.filter(v => v.is_available).length;
  const completedBookings = bookings.filter(b => b.status === "Completed").length;

  const filteredBookings = bookingFilter === "all" 
    ? bookings 
    : bookings.filter(b => b.status.toLowerCase() === bookingFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#e8ecf1]">
      {/* Header Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <img src="/CSIR_logo.png" alt="CSIR Logo" className="h-10 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {customerName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-4 font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("fleet")}
            className={`pb-4 px-4 font-medium ${
              activeTab === "fleet"
                ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Fleet Management
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`pb-4 px-4 font-medium ${
              activeTab === "bookings"
                ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`pb-4 px-4 font-medium ${
              activeTab === "revenue"
                ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Revenue
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">R{totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{activeBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Available Vehicles</p>
                    <p className="text-2xl font-bold text-gray-900">{availableVehicles}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{completedBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card className="bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vehicle</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">{booking.customer_name}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Vehicle #{booking.vehicle}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(booking.start_time).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">R{booking.price}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === "Confirmed" ? "bg-green-100 text-green-800" :
                            booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            booking.status === "Completed" ? "bg-blue-100 text-blue-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Fleet Management Tab */}
        {activeTab === "fleet" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Fleet Management</h2>
              <Button
                onClick={() => setShowAddVehicle(true)}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            {/* Add/Edit Vehicle Form */}
            {(showAddVehicle || editingVehicle) && (
              <Card className="bg-white p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
                </h3>
                <form onSubmit={editingVehicle ? handleUpdateVehicle : handleAddVehicle} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Vehicle Name</Label>
                      <Input
                        id="name"
                        value={vehicleForm.name}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicle_type">Vehicle Type</Label>
                      <select
                        id="vehicle_type"
                        value={vehicleForm.vehicle_type}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, vehicle_type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Minibus">Minibus</option>
                        <option value="Truck">Truck</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={vehicleForm.capacity}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, capacity: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rate_per_km">Rate per KM (R)</Label>
                      <Input
                        id="rate_per_km"
                        type="number"
                        step="0.01"
                        value={vehicleForm.rate_per_km}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, rate_per_km: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_available"
                      checked={vehicleForm.is_available}
                      onChange={(e) => setVehicleForm({ ...vehicleForm, is_available: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="is_available">Available</Label>
                  </div>
                  <div className="flex space-x-4">
                    <Button type="submit" disabled={loading} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
                      {loading ? "Saving..." : editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddVehicle(false);
                        setEditingVehicle(null);
                        setVehicleForm({
                          name: "",
                          vehicle_type: "Sedan",
                          capacity: 4,
                          rate_per_km: 10.0,
                          is_available: true
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Vehicles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="bg-white p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                      <p className="text-sm text-gray-600">{vehicle.vehicle_type}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      vehicle.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {vehicle.is_available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">Capacity: {vehicle.capacity} passengers</p>
                    <p className="text-sm text-gray-600">Rate: R{vehicle.rate_per_km}/km</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditVehicle(vehicle)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="flex-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">All Bookings</h2>
              <div className="flex items-center space-x-4">
                <Label htmlFor="filter">Filter by Status:</Label>
                <select
                  id="filter"
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <Card className="bg-white p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vehicle</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Start Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Distance</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Passengers</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">#{booking.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{booking.customer_name}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">Vehicle #{booking.vehicle}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(booking.start_time).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{booking.distance_km} km</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{booking.passengers}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">R{booking.price}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === "Confirmed" ? "bg-green-100 text-green-800" :
                            booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            booking.status === "Completed" ? "bg-blue-100 text-blue-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === "revenue" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Revenue Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white p-6">
                <h3 className="text-sm text-gray-600 mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-gray-900">R{totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-green-600 mt-2">All time</p>
              </Card>

              <Card className="bg-white p-6">
                <h3 className="text-sm text-gray-600 mb-2">Average Booking Value</h3>
                <p className="text-3xl font-bold text-gray-900">
                  R{bookings.length > 0 ? (totalRevenue / bookings.length).toFixed(2) : "0.00"}
                </p>
                <p className="text-sm text-gray-600 mt-2">Per booking</p>
              </Card>

              <Card className="bg-white p-6">
                <h3 className="text-sm text-gray-600 mb-2">Total Bookings</h3>
                <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
                <p className="text-sm text-gray-600 mt-2">All time</p>
              </Card>
            </div>

            {/* Revenue by Vehicle Type */}
            <Card className="bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Vehicle Type</h3>
              <div className="space-y-4">
                {["Sedan", "SUV", "Minibus", "Truck"].map((type) => {
                  const typeBookings = bookings.filter(b => {
                    const vehicle = vehicles.find(v => v.id === b.vehicle);
                    return vehicle?.vehicle_type === type;
                  });
                  const typeRevenue = typeBookings.reduce((sum, b) => sum + parseFloat(b.price.toString()), 0);
                  const percentage = totalRevenue > 0 ? (typeRevenue / totalRevenue) * 100 : 0;

                  return (
                    <div key={type}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">{type}</span>
                        <span className="text-sm text-gray-600">R{typeRevenue.toFixed(2)} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#2563eb] h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Revenue by Status */}
            <Card className="bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Booking Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Pending", "Confirmed", "Completed", "Cancelled"].map((status) => {
                  const statusBookings = bookings.filter(b => b.status === status);
                  const statusRevenue = statusBookings.reduce((sum, b) => sum + parseFloat(b.price.toString()), 0);

                  return (
                    <div key={status} className="text-center">
                      <p className="text-sm text-gray-600 mb-1">{status}</p>
                      <p className="text-xl font-bold text-gray-900">R{statusRevenue.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{statusBookings.length} bookings</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
