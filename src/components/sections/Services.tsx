"use client";

import React, { useRef, useState, useEffect } from "react";
import { Code2, Smartphone, Clapperboard, ArrowUpRight } from "lucide-react"; 

const services = [
  {
    id: 1,
    title: "WEB DEVELOPMENT",
    desc: "MERN Stack, Scalable Architecture, SEO & Performance.",
    icon: <Code2 />,
    // Dynamic Colors
    gradient: "from-cyan-500 to-blue-600",
    borderDefault: "border-cyan-500/30",         // Always visible border
    borderHover: "group-hover:border-cyan-400",  // Brighter on hover
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    glow: "group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]"
  },
  {
    id: 2,
    title: "MOBILE APP SOLUTIONS",
    desc: "iOS & Android, Cross-platform Flutter/React Native, UI/UX.",
    icon: <Smartphone />,
    gradient: "from-purple-500 to-fuchsia-600",
    borderDefault: "border-purple-500/30",
    borderHover: "group-hover:border-purple-400",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    glow: "group-hover:shadow-[0_0_50px_rgba(192,38,211,0.4)]"
  },
  {
    id: 3,
    title: "CREATIVE PRODUCTION",
    desc: "Video Editing, Motion Graphics, Promo Content Design.",
    icon: <Clapperboard />,
    gradient: "from-orange-500 to-red-600",
    borderDefault: "border-orange-500/30",
    borderHover: "group-hover:border-orange-400",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    glow: "group-hover:shadow-[0_0_50px_rgba(234,88,12,0.4)]"
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll handler
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = window.innerWidth * 0.85; 
      const index = Math.round(scrollLeft / width); 
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-blue-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-purple-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* --- TITLE SECTION --- */}
        <div className="text-left mb-8 lg:mb-20 max-w-4xl">
          <h2 className="flex flex-col font-black tracking-tighter uppercase leading-[0.9]">
            <span className="text-[clamp(2.5rem,6vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg">
              WHAT I DO
            </span>
          </h2>
          <div className="w-12 sm:w-24 h-1 sm:h-1.5 mt-3 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="block lg:hidden relative w-full">
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide"
            >
                {services.map((service) => (
                    <div key={service.id} className="snap-center w-[85vw] flex-shrink-0 h-[300px]">
                        <ServiceCard service={service} />
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center -mt-2 mb-4">
                <div className="flex gap-1.5 p-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
                    {services.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === activeIndex ? "w-6 bg-gradient-to-r from-blue-500 to-purple-500" : "w-1.5 bg-gray-600"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
            {services.map((service) => (
                <div key={service.id} className="h-[400px]">
                     <ServiceCard service={service} />
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}

// --- COLORFUL SERVICE CARD (Updated: Bottom Bar on Hover Only) ---
function ServiceCard({ service }: { service: any }) {
    return (
        <div 
            className={`group relative w-full h-full rounded-[24px] sm:rounded-[30px] border ${service.borderDefault} bg-[#0b0f19] p-6 sm:p-8 flex flex-col items-start justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 ${service.borderHover} ${service.glow}`}
        >
            {/* 1. PERMANENT BACKGROUND TINT (Always Visible) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-[0.08] transition-opacity duration-500 group-hover:opacity-15`} />

            {/* 2. COLORFUL BLOB (Top Right - Always Visible) */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${service.gradient} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
            
            {/* 3. ICON SECTION */}
            <div className="relative w-full mb-4">
                 <div className="relative z-10 flex justify-between items-start">
                    
                    {/* Icon Box: Always Colored */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${service.iconBg} border ${service.borderDefault} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-opacity-20`}>
                        <div className={`${service.iconColor} transition-all duration-500 [&>svg]:w-7 [&>svg]:h-7 sm:[&>svg]:w-8 sm:[&>svg]:h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                            {service.icon}
                        </div>
                    </div>
                    
                    {/* Arrow: Appears/Glows on Hover */}
                    <div className={`${service.iconColor} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300`}>
                        <ArrowUpRight className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* 4. CONTENT SECTION */}
            <div className="relative z-10 mt-auto">
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-wide uppercase leading-none">
                    {service.title.split(" ").map((word:string, i:number) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </h3>

                <p className="text-gray-400 font-medium text-xs sm:text-sm leading-relaxed max-w-[90%] group-hover:text-gray-200 transition-colors duration-300">
                    {service.desc}
                </p>
            </div>

            {/* 5. BOTTOM GLOW BAR (Animation: Width 0 -> Full on Hover) */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} transition-all duration-500 w-0 group-hover:w-full`} />
        </div>
    )
}