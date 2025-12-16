"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Monitor, Layers, Info, Mail, FileText } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Work", href: "/work", icon: Monitor },
  { name: "Stack", href: "/stack", icon: Layers },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    // Responsive Container:
    // Mobile: w-[92%] (fits nicely with margins)
    // Desktop: w-auto (shrinks to content)
    <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto max-w-md sm:max-w-none">
      
      {/* Scrollable Container (Safety for very small screens) */}
      <nav className="flex items-center justify-between sm:justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2.5 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)] ring-1 ring-white/5 relative overflow-hidden transition-all duration-300">
        
        {/* Top Reflection */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />

        <ul className="flex items-center justify-between w-full sm:w-auto gap-1 sm:gap-1 relative z-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="flex-1 sm:flex-none">
                <Link
                  href={item.href}
                  className={`group flex flex-col items-center justify-center gap-1 px-3 py-2.5 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 ${
                    isActive ? "bg-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]" : "hover:bg-white/5"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  />
                  
                  {/* Text: HIDDEN on Mobile, SHOWN on Desktop */}
                  <span
                    className={`hidden sm:block text-[10px] font-medium transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider (Hidden on very small screens to save space if needed, or kept slim) */}
        <div className="hidden sm:block w-[1px] h-8 bg-white/5 mx-1 relative z-10" />

        {/* Resume Button */}
        <Link
          href="/resume"
          className="group relative flex flex-col items-center justify-center gap-1 px-3 py-2 sm:px-6 sm:py-2 rounded-xl transition-all duration-500 ml-1 sm:ml-0"
        >
          {/* 1. The Pure Glow */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-60 group-hover:opacity-100 group-hover:bg-blue-500/30 transition-all duration-500" />
          
          {/* 2. Center Light Source */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-400/20 blur-lg rounded-full" />

          {/* Icon */}
          <FileText className="w-5 h-5 sm:w-4 sm:h-4 text-blue-100 relative z-10 drop-shadow-[0_0_12px_rgba(60,160,255,1)]" />
          
          {/* Resume Text: HIDDEN on Mobile, SHOWN on Desktop */}
          <span className="hidden sm:block text-[10px] font-semibold text-blue-100 relative z-10 drop-shadow-[0_0_12px_rgba(60,160,255,1)]">
            Resume
          </span>
        </Link>
      </nav>
    </div>
  );
}