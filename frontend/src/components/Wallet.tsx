import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Wallet as WalletIcon, Plus, History } from "lucide-react";

interface WalletProps {
  onBack: () => void;
}

export default function Wallet({ onBack }: WalletProps) {
  const [balance, setBalance] = useState(150.00);
  const [loadAmount, setLoadAmount] = useState("");

  const handleLoadFunds = () => {
    const amount = parseFloat(loadAmount);
    if (amount > 0) {
      setBalance(prev => prev + amount);
      setLoadAmount("");
      alert(`Successfully loaded R${amount.toFixed(2)} to your wallet!`);
    } else {
      alert("Please enter a valid amount");
    }
  };

  // Mock transaction history
  const transactions = [
    { id: 1, type: "Load", amount: 50.00, date: "2024-01-15", description: "Wallet top-up" },
    { id: 2, type: "Deduction", amount: -25.50, date: "2024-01-14", description: "Trip payment" },
    { id: 3, type: "Refund", amount: 10.00, date: "2024-01-13", description: "Trip cancellation refund" },
  ];

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

      {/* Wallet Content */}
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

        {/* Current Balance */}
        <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl rounded-2xl mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Wallet Balance</h1>
                <p className="text-5xl font-bold text-[#2563eb]">R{balance.toFixed(2)}</p>
              </div>
              <div className="bg-[#2563eb]/10 p-6 rounded-full">
                <WalletIcon className="w-20 h-20 text-[#2563eb]" />
              </div>
            </div>
          </div>
        </Card>

        {/* Load Funds Section */}
        <Card className="bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-xl rounded-2xl mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-[#2563eb]/10 p-3 rounded-full mr-4">
                <Plus className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Load Funds</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <Label htmlFor="amount" className="text-lg font-medium text-gray-700 mb-2 block">Amount (R)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={loadAmount}
                  onChange={(e) => setLoadAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  className="text-lg py-4 px-4 rounded-xl border-2 border-gray-400 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-sm"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleLoadFunds}
                  className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Load Funds
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <div className="bg-[#2563eb]/10 p-3 rounded-full mr-4">
                <History className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            </div>
            <div className="space-y-6">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-200">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      transaction.amount > 0 ? 'bg-green-100' :
                      transaction.amount < 0 ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <span className={`text-lg font-bold ${
                        transaction.amount > 0 ? 'text-green-600' :
                        transaction.amount < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : transaction.amount < 0 ? '-' : ''}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-xl ${
                      transaction.amount > 0 ? 'text-green-600' :
                      transaction.amount < 0 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">{transaction.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
