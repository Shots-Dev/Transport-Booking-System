import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Mail, Lock } from "lucide-react";

interface LoginProps {
  onBack: () => void;
  userType: "customer" | "admin" | null;
  onLoginSuccess: () => void;
}

export default function Login({ onBack, userType, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    if (userType === "customer" && email === "shots@123" && password === "shots123") {
      onLoginSuccess();
    } else {
      alert("Invalid credentials");
    }
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

      {/* Login Content */}
      <div className="flex items-center justify-center p-8">
        <div className="w-[500px]">
          <Card className="bg-white border-gray-200 shadow-sm w-full">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="mr-4 p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {userType === "admin" ? "Admin Login" : "Customer Login"}
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <a href="#" className="text-sm text-[#2563eb] hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
