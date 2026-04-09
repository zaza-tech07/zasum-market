// =============================
import { useState } from 'react';

export default function Navbar({ toggleSidebar }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      <h1 className="text-xl font-bold text-black dark:text-white">ZASUM</h1>
      <div className="flex gap-4 items-center">
        <button onClick={toggleSidebar} className="md:hidden">☰</button>
        <button onClick={toggleDark} className="bg-gray-200 dark:bg-gray-700 p-2 rounded">{darkMode ? '☀️' : '🌙'}</button>
      </div>
    </div>
  );
}