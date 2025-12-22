"use client";

import React from "react";
// Added GraduationCap for the education section
import { PenTool, Code, Smartphone, Clapperboard, GraduationCap } from "lucide-react";

// --- DATA ---
const milestones = [
  {
    id: 1,
    year: "4 YRS",
    title: "Graphic Designer",
    role: "Visual UI/UX Designer",
    subtitle: "Mastering design principles & aesthetics.",
    description: "Started my journey in visual communication. Spent 4 years refining pixel-perfect designs, understanding color theory, and creating compelling brand identities that stand out in the digital space.",
    icon: <PenTool />,
    color: "cyan",
    gradient: "from-cyan-400 to-teal-500",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.6)]",
  },
  // --- NEW EDUCATION SECTION ADDED HERE ---
  {
    id: 2,
    year: "ACADEMIC",
    title: "English Honours",
    role: "Northern University Bangladesh",
    subtitle: "Building communication & analytical skills.",
    description: "Currently pursuing BA (Hons) in English. While studying literature and linguistics, I started my journey into Full Stack Development. This academic background strengthens my communication skills, vital for global tech collaboration.",
    icon: <GraduationCap />,
    color: "emerald", // Using a fresh color (Greenish) for education
    gradient: "from-emerald-400 to-green-600",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.6)]",
  },
  {
    id: 3,
    year: "WEB DEV",
    title: "Full Stack Dev",
    role: "MERN Stack Specialist",
    subtitle: "Building scalable web applications.",
    description: "Transitioned into engineering alongside my studies. Mastered the MERN stack and Next.js, focusing on scalable architecture, server-side rendering, and high-performance web applications.",
    icon: <Code />,
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.6)]",
  },
  {
    id: 4,
    year: "MOBILE DEV",
    title: "App Developer",
    role: "Cross-Platform Engineer",
    subtitle: "Creating native mobile experiences.",
    description: "Expanded into the mobile ecosystem using React Native. Translating complex web functionalities into native mobile experiences with intuitive gestures and smooth animations.",
    icon: <Smartphone />,
    color: "purple",
    gradient: "from-purple-500 to-fuchsia-600",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.6)]",
  },
  {
    id: 5,
    year: "CONTENT",
    title: "Video Creator",
    role: "Tech Content Strategist",
    subtitle: "Combining tech with storytelling.",
    description: "Leveraging technical knowledge to create engaging video content. Blending storytelling with technology to market products effectively and connect with a broader audience through visuals.",
    icon: <Clapperboard />,
    color: "pink",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.6)]",
  },
];

export default function Evolution() {
  return (
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* --- HEADER --- */}
        <div className="mb-12 lg:mb-24 text-center">
          <h2 className="flex flex-col font-black tracking-tighter uppercase leading-[0.9] mb-4">
             <span className="text-[clamp(2.4rem,8vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-xl">
               THE EVOLUTION
             </span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-base font-medium tracking-widest uppercase">
            From creative design to full-stack engineering.
          </p>
        </div>

        {/* --- TIMELINE CONTAINER --- */}
        <div className="relative">
            
            {/* The Central Vertical Line */}
            <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[2px] lg:w-[3px] bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 opacity-30 lg:opacity-50 lg:-translate-x-1/2 rounded-full" />

            <div className="flex flex-col gap-12 lg:gap-24">
                {milestones.map((item, index) => {
                    // Logic to alternate layout (Even: Standard, Odd: Reversed)
                    const isEven = index % 2 === 0;

                    return (
                        <div key={item.id} className={`relative flex flex-col items-start lg:items-center w-full group ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                            
                            {/* 1. LEFT SIDE (DOM) - Description for Even, Title for Odd */}
                            <div className={`w-full lg:w-1/2 mb-2 lg:mb-0 order-2 lg:order-1 pl-12 lg:pl-0 
                                ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}
                            `}>
                                 <p className="text-gray-400 text-sm leading-relaxed hidden lg:block hover:text-gray-200 transition-colors duration-300">
                                   {item.description}
                                 </p>
                            </div>

                            {/* 2. CENTER: Icon Node */}
                            <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center order-1 lg:order-2 h-10 lg:h-auto top-0 lg:top-auto">
                                 <div className={`relative w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-[#0b0f19] border border-white/20 flex items-center justify-center z-20 ${item.glow} transition-transform duration-500 group-hover:scale-110`}>
                                     <div className={`text-white w-5 h-5 lg:w-7 lg:h-7 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]`}>
                                         {item.icon}
                                     </div>
                                 </div>

                                 {/* Connectors */}
                                 <div className={`hidden lg:block absolute right-full top-1/2 -translate-y-1/2 h-[1px] w-12 bg-gradient-to-l ${item.gradient} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                                 <div className={`hidden lg:block absolute left-full top-1/2 -translate-y-1/2 h-[1px] w-12 bg-gradient-to-r ${item.gradient} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                            </div>

                            {/* 3. RIGHT SIDE (DOM) - Title for Even, Description for Odd */}
                            <div className={`w-full lg:w-1/2 order-1 lg:order-3 pl-12 lg:pl-0 
                                ${isEven ? 'lg:pl-16 lg:text-left' : 'lg:pr-16 lg:text-right'}
                            `}>
                                 
                                 {/* Title Header */}
                                 <h3 className={`flex flex-wrap items-center gap-2 text-xl lg:text-2xl font-black text-white uppercase tracking-tight mb-1 
                                     ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}
                                 `}>
                                   <span>{item.title}</span>
                                   <span className="text-[10px] lg:text-sm text-gray-500 font-normal tracking-normal normal-case border border-white/10 px-2 py-0.5 rounded-full bg-white/5 whitespace-nowrap">
                                     {item.year}
                                   </span>
                                 </h3>

                                 <h4 className={`text-xs lg:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} uppercase tracking-wider mb-2`}>
                                   {item.role}
                                 </h4>
                                 <p className="text-gray-500 text-xs lg:text-sm font-medium mb-3 lg:mb-0">
                                   {item.subtitle}
                                 </p>
                                 
                                 {/* Mobile Description */}
                                 <p className="text-gray-400 text-xs sm:text-sm leading-relaxed block lg:hidden border-l-2 border-white/10 pl-3 mt-2">
                                   {item.description}
                                 </p>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>

      </div>
    </section>
  );
}