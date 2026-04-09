// =============================
import { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/router";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const submit = async () => {
    await API.post("/auth/register", form);
    alert("Registered successfully");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 shadow rounded-2xl w-96">
        <h1 className="text-xl font-bold mb-6 text-black dark:text-white">Register</h1>
        <input className="w-full border p-2 mb-4 rounded" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="w-full border p-2 mb-4 rounded" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="w-full border p-2 mb-4 rounded" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
        <button onClick={submit} className="w-full bg-black dark:bg-gray-700 text-white py-2 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition">Register</button>
      </div>
    </div>
  );
}
