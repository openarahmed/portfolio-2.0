"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase"; // পাথ চেক করে নিও
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Camera,
  FileText,
  ChevronDown,
  ChevronUp,
  ImagePlus,
  PenTool,
  List,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<string | null>("Blogs");

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

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="flex min-h-screen bg-[#050511] text-white font-sans selection:bg-purple-500/30">
      {/* SIDEBAR */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50 hidden md:flex flex-col border-r border-white/10 bg-[#0b0f19]/60 backdrop-blur-xl overflow-y-auto custom-scrollbar">
        <div className="h-20 flex items-center px-8 border-b border-white/5 flex-shrink-0">
          <h2 className="text-xl font-black tracking-wider uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              ADMIN
            </span>
            <span className="text-white ml-1">PANEL</span>
          </h2>
        </div>

        <div className="px-6 py-6 flex items-center gap-3 flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
            <Image
              src="https://i.postimg.cc/c4QsPY2p/Screenshot-2025-12-21-154814.png"
              alt="Admin"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Shakil</p>
            <p className="text-[10px] text-green-400 flex items-center gap-1">
              <ShieldCheck size={10} /> Super Admin
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-2 mt-2">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              pathname === "/admin"
                ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="text-sm font-medium tracking-wide">Overview</span>
          </Link>

          {/* DROPDOWN: BLOGS */}
          <div className="pt-2">
            <button
              onClick={() => toggleMenu("Blogs")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                openMenu === "Blogs"
                  ? "text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText
                  size={20}
                  className={openMenu === "Blogs" ? "text-purple-400" : ""}
                />
                <span className="text-sm font-medium tracking-wide">Blogs</span>
              </div>
              {openMenu === "Blogs" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${openMenu === "Blogs" ? "max-h-40 mt-1 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="flex flex-col ml-4 pl-4 border-l border-white/10 space-y-1">
                <Link
                  href="/admin/blogs"
                  className={`py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2 ${pathname === "/admin/blogs" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                >
                  <List size={16} /> Manage Blogs
                </Link>
                <Link
                  href="/admin/blogs/create"
                  className={`py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2 ${pathname === "/admin/blogs/create" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                >
                  <PenTool size={16} /> Create Blog
                </Link>
              </div>
            </div>
          </div>

          {/* DROPDOWN: PHOTOGRAPHY */}
          <div className="pt-1">
            <button
              onClick={() => toggleMenu("Photography")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                openMenu === "Photography"
                  ? "text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Camera
                  size={20}
                  className={
                    openMenu === "Photography" ? "text-emerald-400" : ""
                  }
                />
                <span className="text-sm font-medium tracking-wide">
                  Photography
                </span>
              </div>
              {openMenu === "Photography" ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${openMenu === "Photography" ? "max-h-40 mt-1 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="flex flex-col ml-4 pl-4 border-l border-white/10 space-y-1">
                <Link
                  href="/admin/photography"
                  className={`py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2 ${pathname === "/admin/photography" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                >
                  <List size={16} /> Manage Photos
                </Link>
                <Link
                  href="/admin/photography/create"
                  className={`py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2 ${pathname === "/admin/photography/create" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
                >
                  <ImagePlus size={16} /> Add Photo
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 mt-2 rounded-xl transition-all duration-300 ${
              pathname === "/admin/settings"
                ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings size={20} />
            <span className="text-sm font-medium tracking-wide">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 flex-shrink-0">
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 relative min-h-screen overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="p-6 md:p-10 relative z-10">{children}</div>
      </main>
    </div>
  );
}
