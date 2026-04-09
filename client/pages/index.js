// =============================
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import API from '../utils/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data));
  }, []);

  const buy = async (id) => {
    const order = await API.post('/orders', { productId: id });
    const pay = await API.post('/payments/pay', { orderId: order.data._id, email: 'test@email.com' });
    window.location.href = pay.data.data.authorization_url;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="p-8 grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} onBuy={buy} />
        ))}
      </div>
    </div>
  );
}

// pages/index.js (Buy button)
const buy = async (id) => {
  const order = await API.post("/orders", { productId: id });
  const pay = await API.post("/payments/pay", { orderId: order.data._id, email: userEmail });
  window.location.href = pay.data.data.authorization_url;
};