// =============================
export default function Sidebar({ open }) {
  return (
    <div className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed md:translate-x-0 top-0 left-0 w-64 h-full bg-gray-800 text-white p-6 transition-transform z-50`}> 
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="flex flex-col gap-4">
        <li><a href="/dashboard" className="hover:text-gray-300">Home</a></li>
        <li><a href="/orders" className="hover:text-gray-300">Orders</a></li>
        <li><a href="/wallet" className="hover:text-gray-300">Wallet</a></li>
        <li><a href="/logout" className="hover:text-gray-300">Logout</a></li>
      </ul>
    </div>
  );
}