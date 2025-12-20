"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Sudhu Resume er jonno thakbe
import { Home, Monitor, Layers, Info, Mail, FileText } from "lucide-react";

const navItems = [
  { name: "Home", href: "home", icon: Home },
  { name: "Work", href: "work", icon: Monitor },
  { name: "Stack", href: "stack", icon: Layers },
  { name: "About", href: "about", icon: Info },
  { name: "Contact", href: "contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  // --- SCROLL SPY (Auto detect active section) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // --- SMOOTH SCROLL HANDLER ---
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Stop instant jump
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll execution
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id); // Manually set active immediately
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full sm:bottom-8 sm:left-1/2 sm:w-auto sm:-translate-x-1/2 z-50 transition-all duration-300">
      <nav className="flex items-center justify-between sm:justify-center w-full sm:w-auto gap-1 sm:gap-2 px-6 pb-5 pt-3 sm:px-4 sm:py-2.5 rounded-t-2xl sm:rounded-2xl border-t sm:border border-white/10 bg-[#050511]/90 sm:bg-[#050511]/80 backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] ring-1 ring-white/5 relative overflow-hidden">
        
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />

        <ul className="flex items-center justify-between w-full sm:w-auto gap-0 sm:gap-1 relative z-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.name} className="flex-1 sm:flex-none flex justify-center">
                
                {/* CHANGE: Used normal <a> instead of <Link> for smooth scroll */}
                <a
                  href={`#${item.href}`}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={`group relative flex flex-col items-center justify-center gap-1 p-2 sm:px-4 sm:py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive ? "bg-white/5 sm:bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 sm:w-4 sm:h-4 transition-all duration-300 ${
                      isActive ? "text-white scale-105 sm:scale-110" : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  />
                  <span
                    className={`hidden sm:block text-[10px] font-medium transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>
                  
                  {isActive && (
                    <span className="absolute -bottom-2 sm:bottom-0.5 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                </a>
              </li>
            );
          })}

          <div className="hidden sm:block w-[1px] h-8 bg-white/10 mx-2 relative z-10" />

          {/* Resume Link keeps using Next.js Link because it opens a new file/tab */}
          <li className="flex-1 sm:flex-none flex justify-center">
            <Link
              href="/Shakil_Ahmed_FullStack_Developer.pdf"
              target="_blank"
              className="group relative flex flex-col items-center justify-center gap-1 p-2 sm:px-6 sm:py-2 rounded-xl transition-all duration-500"
            >
              <div className="hidden sm:block absolute inset-0 bg-blue-500/20 blur-md rounded-xl opacity-60 group-hover:opacity-100 group-hover:bg-blue-500/30 transition-all duration-500" />
              <FileText className="w-6 h-6 sm:w-4 sm:h-4 text-blue-400 sm:text-blue-100 relative z-10 sm:drop-shadow-[0_0_10px_rgba(60,160,255,0.8)]" />
              <span className="hidden sm:block text-[10px] font-bold text-blue-100 relative z-10 drop-shadow-[0_0_10px_rgba(60,160,255,0.8)] uppercase tracking-wide">
                Resume
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}