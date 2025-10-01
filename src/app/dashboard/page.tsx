'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-4">
          {userEmail ? `Welcome ${userEmail}!` : 'You are not logged in.'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white rounded shadow">Mood Summary</div>
          <div className="p-6 bg-white rounded shadow">Quick Links</div>
          <div className="p-6 bg-white rounded shadow">Recent Journals</div>
        </div>
      </main>
    </div>
  );
}
