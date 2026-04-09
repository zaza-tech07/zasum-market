import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail");

  const fetchBalance = async () => {
    const res = await API.get("/wallet");
    setBalance(res.data.balance);
  };

  useEffect(() => { fetchBalance(); }, []);

  const deposit = async () => {
    const amount = prompt("Enter amount to deposit:");
    if (!amount) return;
    const res = await API.post("/payments/pay", { email: userEmail, amount });
    window.location.href = res.data.data.authorization_url;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />
      <div className="p-8 md:ml-64 max-w-md">
        <div className="bg-black text-white p-6 rounded-2xl">
          <h2 className="text-sm">Wallet Balance</h2>
          <h1 className="text-3xl font-bold">₦{balance}</h1>
          <button onClick={deposit} className="mt-4 w-full bg-yellow-500 text-black py-2 rounded-xl hover:bg-yellow-600 transition">Deposit</button>
        </div>
      </div>
    </div>
  );
}

// pages/wallet.js (update Deposit button)
const deposit = async () => {
  const amount = prompt("Enter amount to deposit:");
  const res = await API.post("/payments/pay", { email: userEmail, amount });
  window.location.href = res.data.data.authorization_url; // Paystack redirect
};