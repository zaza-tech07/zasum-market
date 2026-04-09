// =============================
export default function OrderCard({ order }) {
  const statusColors = {
    pending: 'bg-yellow-200 text-yellow-800',
    paid: 'bg-blue-200 text-blue-800',
    delivered: 'bg-green-200 text-green-800',
    completed: 'bg-gray-200 text-gray-800',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow mb-4">
      <h2 className="font-semibold text-black dark:text-white mb-2">{order.product.title}</h2>
      <p className="text-gray-500 dark:text-gray-300 mb-1">Price: ₦{order.product.price}</p>
      <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>{order.status}</p>
    </div>
  );
}