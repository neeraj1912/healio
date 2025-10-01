// // 'use client'

// // import { useRouter } from 'next/navigation';
// // import { supabase } from '@/lib/supabaseClient';
// // import { useState, useEffect } from 'react';

// // export default function Sidebar() {
// //   const router = useRouter();
// //   const [userEmail, setUserEmail] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       const { data: { user } } = await supabase.auth.getUser();
// //       if (user) setUserEmail(user.email ?? null);
// //     };
// //     fetchUser();
// //   }, []);

// //   const handleLogout = async () => {
// //     await supabase.auth.signOut();
// //     router.push('/login');
// //   };

// //   return (
// //     <aside className="w-64 bg-white shadow-lg h-screen p-6 flex flex-col justify-between">
// //       <div>
// //         <h1 className="text-2xl font-bold mb-6 text-green-600">Healio</h1>

// //         <nav className="flex flex-col gap-4">
// //           <a href="/dashboard" className="text-gray-700 hover:text-green-600 font-semibold transition">Dashboard</a>
// //           <a href="/journal" className="text-gray-700 hover:text-green-600 font-semibold transition">Journal</a>
// //           <a href="/chat" className="text-gray-700 hover:text-green-600 font-semibold transition">Chat</a>
// //           <a href="/wellness" className="text-gray-700 hover:text-green-600 font-semibold transition">Wellness</a>
// //         </nav>
// //       </div>

// //       <div className="mt-6">
// //         <p className="text-sm text-gray-500 mb-3">{userEmail}</p>
// //         <button
// //           onClick={handleLogout}
// //           className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </aside>
// //   );
// // }

// 'use client'

// import { useRouter } from 'next/navigation';
// import { supabase } from '@/lib/supabaseClient';
// import { useState, useEffect } from 'react';
// import { FaHome, FaBook, FaComments, FaHeartbeat, FaSignOutAlt } from 'react-icons/fa';

// export default function Sidebar() {
//   const router = useRouter();
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) setUserEmail(user.email ?? null);
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push('/login');
//   };

//   const menuItems = [
//     { name: 'Dashboard', icon: <FaHome />, href: '/dashboard' },
//     { name: 'Journal', icon: <FaBook />, href: '/journal' },
//     { name: 'Chat', icon: <FaComments />, href: '/chat' },
//     { name: 'Wellness', icon: <FaHeartbeat />, href: '/wellness' },
//   ];

//   return (
//     <aside
//       className={`bg-white shadow-lg h-screen flex flex-col justify-between transition-all duration-300 
//                   ${expanded ? 'w-64' : 'w-16'} 
//                   hover:w-64`}
//       onMouseEnter={() => setExpanded(true)}
//       onMouseLeave={() => setExpanded(false)}
//     >
//       {/* Top Logo */}
//       <div className="p-6 flex flex-col items-center">
//         <h1 className={`text-green-600 font-bold text-xl mb-8 transition-opacity ${expanded ? 'opacity-100' : 'opacity-0'}`}>
//           Healio
//         </h1>

//         {/* Menu Items */}
//         <nav className="flex flex-col gap-4 w-full">
//           {menuItems.map((item, idx) => (
//             <a
//               key={idx}
//               href={item.href}
//               className="flex items-center gap-4 text-gray-700 hover:text-green-600 px-4 py-2 rounded transition-colors"
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className={`transition-opacity ${expanded ? 'opacity-100' : 'opacity-0'}`}>{item.name}</span>
//             </a>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom User Info & Logout */}
//       <div className="p-6 flex flex-col items-center">
//         <p className={`text-sm text-gray-500 mb-3 transition-opacity ${expanded ? 'opacity-100' : 'opacity-0'}`}>
//           {userEmail}
//         </p>
//         <button
//           onClick={handleLogout}
//           className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
//         >
//           <FaSignOutAlt className="mx-auto" />
//           {expanded && <span className="ml-2">Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// }
'use client'

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { FaHome, FaBook, FaComments, FaHeart, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', href: '/dashboard' },
    { icon: <FaBook />, label: 'Journal', href: '/journal' },
    { icon: <FaComments />, label: 'Chat', href: '/chat' },
    { icon: <FaHeart />, label: 'Wellness', href: '/wellness' },
  ];

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col justify-between
                 w-20 hover:w-56 bg-white/90 backdrop-blur-md
                 shadow-lg rounded-tr-xl rounded-br-xl transition-all duration-300 z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col items-start mt-6 px-2 gap-4">
        <h1 className={`text-green-600 font-bold text-xl px-2 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          Healio
        </h1>
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="flex items-center gap-4 p-3 w-full text-gray-700 hover:text-green-600
                       rounded-lg hover:bg-green-50 transition-colors"
          >
            {item.icon}
            <span className={`whitespace-nowrap transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              {item.label}
            </span>
          </a>
        ))}
      </div>

      <div className="flex flex-col items-start mb-6 px-2 gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-3 w-full text-red-500 hover:text-red-600 rounded-lg
                     hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt />
          <span className={`whitespace-nowrap transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Logout
          </span>
        </button>
        {isOpen && userEmail && <p className="text-sm text-gray-500 px-2">{userEmail}</p>}
      </div>
    </aside>
  );
}
