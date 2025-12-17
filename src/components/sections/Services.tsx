"use client";

import React, { useRef, useState, useEffect } from "react";
import { Code2, Smartphone, Clapperboard } from "lucide-react"; // Arrow icons removed

const services = [
  {
    id: 1,
    title: "WEB DEVELOPMENT",
    desc: "MERN Stack, Scalable Architecture, SEO & Performance.",
    icon: <Code2 />,
    color: "from-cyan-400 to-blue-600",
    glow: "group-hover:shadow-[0_0_30px_5px_rgba(6,182,212,0.4)]",
    border: "group-hover:border-cyan-500/50"
  },
  {
    id: 2,
    title: "MOBILE APP SOLUTIONS",
    desc: "iOS & Android, Cross-platform Flutter/React Native, UI/UX.",
    icon: <Smartphone />,
    color: "from-purple-400 to-fuchsia-600",
    glow: "group-hover:shadow-[0_0_30px_5px_rgba(192,38,211,0.4)]",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: 3,
    title: "CREATIVE PRODUCTION",
    desc: "Video Editing, Motion Graphics, Promo Content Design.",
    icon: <Clapperboard />,
    color: "from-orange-400 to-red-600",
    glow: "group-hover:shadow-[0_0_30px_5px_rgba(234,88,12,0.4)]",
    border: "group-hover:border-orange-500/50"
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
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-blue-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-purple-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* --- TITLE SECTION --- */}
        <div className="text-left mb-8 lg:mb-16 max-w-4xl">
          <h2 className="flex flex-col font-black tracking-tighter uppercase leading-[0.9]">
            <span className="text-[clamp(2.5rem,6vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg">
              WHAT I DO.
            </span>
          </h2>
          <div className="w-12 sm:w-24 h-1 sm:h-1.5 mt-3 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="block lg:hidden relative w-full">
            
            {/* Cards Container */}
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide"
            >
                {services.map((service) => (
                    <div key={service.id} className="snap-center w-[85vw] flex-shrink-0 h-[280px]">
                        <ServiceCard service={service} />
                    </div>
                ))}
            </div>

            {/* ONLY DOTS (Centered & Smaller) */}
            <div className="flex justify-center mt-3">
                <div className="flex gap-1.5">
                    {services.map((_, idx) => (
                        <div 
                            key={idx}
                            // Changed size: h-1 (4px) instead of h-1.5 (6px)
                            // Active width: w-4 (16px) instead of w-6
                            className={`h-1 rounded-full transition-all duration-300 ${
                                idx === activeIndex ? "w-4 bg-blue-500" : "w-1 bg-gray-700"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* --- DESKTOP VIEW (Unchanged) --- */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
            {services.map((service) => (
                <div key={service.id} className="h-[350px]">
                     <ServiceCard service={service} />
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}

// --- REUSABLE CARD COMPONENT ---
function ServiceCard({ service }: { service: any }) {
    return (
        <div 
            className={`group relative w-full h-full rounded-[24px] sm:rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 ${service.border} ${service.glow}`}
        >
            <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
            
            <div className="relative mb-4 sm:mb-8 flex-shrink-0">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${service.color} blur-[30px] opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full`} />
                <div className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center`}>
                    <div className={`text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] [&>svg]:w-10 [&>svg]:h-10 sm:[&>svg]:w-16 sm:[&>svg]:h-16 [&>svg]:stroke-[1.5]`}>
                        {service.icon}
                    </div>
                </div>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4 tracking-wide uppercase drop-shadow-md">
            {service.title}
            </h3>

            <p className="text-gray-400 leading-relaxed font-medium text-xs sm:text-base max-w-[100%] sm:max-w-[90%] line-clamp-3">
            {service.desc}
            </p>

            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${service.color} transition-all duration-500 group-hover:w-1/2 opacity-0 group-hover:opacity-100 rounded-full`} />
        </div>
    )
}