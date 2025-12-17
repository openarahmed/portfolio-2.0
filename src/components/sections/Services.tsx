"use client";

import React from "react";
import { Code2, Smartphone, Clapperboard } from "lucide-react";

const services = [
  {
    id: 1,
    title: "WEB DEVELOPMENT",
    desc: "MERN Stack, Scalable Architecture, SEO & Performance Optimization.",
    icon: <Code2 />,
    color: "from-cyan-400 to-blue-600",
    glow: "group-hover:shadow-[0_0_30px_5px_rgba(6,182,212,0.4)]",
    border: "group-hover:border-cyan-500/50"
  },
  {
    id: 2,
    title: "MOBILE APP SOLUTIONS",
    desc: "iOS & Android, Cross-platform Flutter/React Native, Intuitive UI/UX.",
    icon: <Smartphone />,
    color: "from-purple-400 to-fuchsia-600",
    glow: "group-hover:shadow-[0_0_30px_5px_rgba(192,38,211,0.4)]",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: 3,
    title: "CREATIVE PRODUCTION",
    desc: "Professional Video Editing, Motion Graphics, Promo Content.",
    icon: <Clapperboard />,
    color: "from-orange-400 to-red-600",
    glow: "group-hover:shadow-[0_0_30px_5px_rgba(234,88,12,0.4)]",
    border: "group-hover:border-orange-500/50"
  },
];

export default function Services() {
  return (
    // HYBRID SPACING:
    // Mobile: py-[3rem] (Compact)
    // Desktop: lg:py-[10rem] (Spacious & Premium)
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-blue-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-purple-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Container: Added xl:px-12 for wide desktop alignment */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* --- TITLE SECTION --- */}
        {/* Mobile: mb-8 (Compact) / Desktop: mb-20 (Airy) */}
        <div className="text-left mb-8 lg:mb-20 max-w-4xl">
          <h2 className="flex flex-col font-black tracking-tighter uppercase leading-[0.9]">
            
            {/* HYBRID TEXT SCALE:
                Mobile: Starts at 2.5rem
                Desktop: Ends at 5rem (Huge) 
            */}
            <span className="text-[clamp(2.5rem,7vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg">
              WHAT I BRING
            </span>
            <span className="text-[clamp(2.5rem,7vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 drop-shadow-xl pb-2">
               TO THE TABLE.
            </span>
          </h2>
          
          {/* Accent Line */}
          <div className="w-16 sm:w-24 h-1 sm:h-1.5 mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        {/* --- CARDS GRID --- */}
        {/* Mobile: gap-6 (Tight) / Desktop: gap-8 (Standard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              // Card Height: h-auto (Flexible on mobile) / sm:h-[380px] (Fixed on desktop)
              // Padding: p-6 (Mobile) / p-8 (Desktop)
              className={`group relative h-auto min-h-[300px] sm:h-[380px] rounded-[24px] sm:rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 ${service.border} ${service.glow}`}
            >
              
              {/* Card Inner Reflection */}
              <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
              
              {/* Icon Container */}
              <div className="relative mb-6 sm:mb-8">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.color} blur-[30px] opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full`} />
                <div className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center`}>
                    <div className={`text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] [&>svg]:w-12 [&>svg]:h-12 sm:[&>svg]:w-16 sm:[&>svg]:h-16 [&>svg]:stroke-[1.5]`}>
                       {service.icon}
                    </div>
                </div>
              </div>

              {/* Title: Text size scaled for mobile */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide uppercase drop-shadow-md">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed font-medium text-xs sm:text-base max-w-[100%] sm:max-w-[90%]">
                {service.desc}
              </p>

              {/* Hover Line */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${service.color} transition-all duration-500 group-hover:w-1/2 opacity-0 group-hover:opacity-100 rounded-full`} />
            
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}