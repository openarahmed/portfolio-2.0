"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase"; // Ensure path matches your project structure
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  PenTool, 
  LogOut, 
  Settings,
  ShieldCheck 
} from "lucide-react";

// --- Type Definition ---
interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === adminEmail) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router, adminEmail]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#050511] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Create Post", href: "/admin/create", icon: <PenTool size={20} /> },
    { name: "Settings", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#050511] text-white font-sans selection:bg-purple-500/30">
      
      {/* ====================
          SIDEBAR (Glass)
         ==================== */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50 hidden md:flex flex-col border-r border-white/10 bg-[#0b0f19]/60 backdrop-blur-xl">
        
        {/* Brand */}
        <div className="h-20 flex items-center px-8 border-b border-white/5">
            <h2 className="text-xl font-black tracking-wider uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ADMIN</span>
                <span className="text-white ml-1">PANEL</span>
            </h2>
        </div>

        {/* User Info */}
        <div className="px-6 py-6 flex items-center gap-3">
             <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                 <Image src="https://i.postimg.cc/c4QsPY2p/Screenshot-2025-12-21-154814.png" alt="Admin" fill className="object-cover" />
             </div>
             <div>
                 <p className="text-sm font-bold text-white">Shakil</p>
                 <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <ShieldCheck size={10} /> Super Admin
                 </p>
             </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
                <Link 
                    key={item.href} 
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        isActive 
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                    <span className={isActive ? "text-blue-400" : "group-hover:text-purple-400 transition-colors"}>
                        {item.icon}
                    </span>
                    <span className="text-sm font-medium tracking-wide">{item.name}</span>
                </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut(auth)} 
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* ====================
          MAIN CONTENT AREA
         ==================== */}
      <main className="flex-1 md:ml-64 relative min-h-screen overflow-x-hidden">
        {/* Top Gradient Blob for Main Area */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        
        <div className="p-6 md:p-10 relative z-10">
            {children}
        </div>
      </main>
    </div>
  );
}