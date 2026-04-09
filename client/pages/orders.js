import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import OrderCard from '../components/OrderCard';
import API from '../utils/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    API.get('/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />
      <div className="p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No orders yet.</p>
        ) : (
          orders.map(order => <OrderCard key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
}
