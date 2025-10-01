'use client'

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600">Healio</h1>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6">
          <a href="/dashboard" className="text-gray-700 hover:text-green-600 font-medium transition">Dashboard</a>
          <a href="/journal" className="text-gray-700 hover:text-green-600 font-medium transition">Journal</a>
          <a href="/chat" className="text-gray-700 hover:text-green-600 font-medium transition">Chat</a>
          <a href="/wellness" className="text-gray-700 hover:text-green-600 font-medium transition">Wellness</a>
        </div>

        {/* User Info + Logout */}
        <div className="flex items-center gap-4">
          {userEmail && <p className="text-sm text-gray-500 hidden sm:block">{userEmail}</p>}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
