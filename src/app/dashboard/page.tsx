'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
// import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Mock data for journal entries
  const recentJournals = [
    { title: "Feeling Happy", date: "2025-10-01" },
    { title: "Stressful Day", date: "2025-09-30" },
    { title: "Meditation Success", date: "2025-09-29" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}

      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {userEmail ?? "User"}!</h1>
          <p className="text-lg">Stay positive, track your mood, and improve your wellbeing.</p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mood Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Mood Summary</h2>
            <div className="h-32 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">[Mood Chart Placeholder]</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <a href="/journal" className="bg-green-500 text-white p-3 rounded text-center hover:bg-green-600 transition">Journal</a>
              <a href="/chat" className="bg-blue-500 text-white p-3 rounded text-center hover:bg-blue-600 transition">Chat</a>
              <a href="/wellness" className="bg-purple-500 text-white p-3 rounded text-center hover:bg-purple-600 transition">Wellness</a>
            </div>
          </div>

          {/* Recent Journals */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Journals</h2>
            <ul className="space-y-2">
              {recentJournals.map((journal, idx) => (
                <li key={idx} className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition">
                  <p className="font-semibold text-gray-700">{journal.title}</p>
                  <p className="text-gray-500 text-sm">{journal.date}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Wellness Tip */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Wellness Tip</h2>
            <p className="text-gray-600">Remember to take a short break every hour, meditate for 5 minutes, and stay hydrated for better mood and focus.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
