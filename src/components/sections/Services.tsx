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
    <section className="relative w-full py-24 bg-[#050511] overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- TITLE SECTION (UPDATED) --- */}
        <div className="text-left mb-16 max-w-4xl">
          <h2 className="flex flex-col text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
            {/* Top Line: Bright Silver */}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg">
              WHAT I BRING TO THE TABLE.
            </span>
            {/* Bottom Line: Darker Metallic Silver */}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 drop-shadow-xl pb-2">
           
            </span>
          </h2>
          
          {/* Accent Line (Left Aligned) */}
          <div className="w-24 h-1.5 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`group relative h-[380px] rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 ${service.border} ${service.glow}`}
            >
              
              {/* Card Inner Reflection */}
              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
              
              {/* Neon Icon Container */}
              <div className="relative mb-8">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br ${service.color} blur-[30px] opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full`} />
                <div className={`relative z-10 w-20 h-20 flex items-center justify-center`}>
                    <div className={`text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] [&>svg]:w-16 [&>svg]:h-16 [&>svg]:stroke-[1.5]`}>
                       {service.icon}
                    </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wide uppercase drop-shadow-md">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed font-medium text-sm sm:text-base max-w-[90%]">
                {service.desc}
              </p>

              {/* Hover Bottom Line Gradient */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${service.color} transition-all duration-500 group-hover:w-1/2 opacity-0 group-hover:opacity-100 rounded-full`} />
            
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}