// =============================
import { useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [product, setProduct] = useState({ title:"", price:"", description:"" });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const create = async () => {
    await API.post("/products", product);
    alert("Product Created");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />
      <div className="p-8 md:ml-64 max-w-xl">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h1 className="text-xl font-bold mb-4 text-black dark:text-white">Create Product</h1>
          <input className="w-full border p-2 mb-3 rounded" placeholder="Title" onChange={e=>setProduct({...product,title:e.target.value})}/>
          <input className="w-full border p-2 mb-3 rounded" placeholder="Price" onChange={e=>setProduct({...product,price:e.target.value})}/>
          <textarea className="w-full border p-2 mb-3 rounded" placeholder="Description" onChange={e=>setProduct({...product,description:e.target.value})}/>
          <button onClick={create} className="w-full bg-black dark:bg-gray-700 text-white py-2 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition">Create Product</button>
        </div>
      </div>
    </div>
  );
}

