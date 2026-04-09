// =============================
export default function ProductCard({ product, onBuy }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition p-5">
      <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">{product.title}</h2>
      <p className="text-gray-500 dark:text-gray-300 mb-4">₦{product.price}</p>
      <button
        onClick={() => onBuy(product._id)}
        className="w-full bg-black dark:bg-gray-700 text-white py-2 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition"
      >
        Buy Now
      </button>
    </div>
  );
}
