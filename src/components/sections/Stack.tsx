"use client";

import React from "react";
// Lucide doesn't have brand icons (React, Node etc.), so we use 'react-icons'
// Make sure to run: npm install react-icons
import { FaReact, FaNodeJs, FaPython, FaDocker, FaHtml5, FaCss3Alt, FaAws } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiFigma, SiFlutter } from "react-icons/si"; 

const stackData = [
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
  { name: "Python", icon: <FaPython />, color: "#3776AB" },
  { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
  { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
  { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900" },
  { name: "Flutter", icon: <SiFlutter />, color: "#02569B" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
];

export default function Stack() {
  return (
    // Background matches Hero Section (#050511) for consistency
    <section className="relative w-full py-24 overflow-hidden bg-[#050511] flex flex-col items-center justify-center min-h-[700px]">
      
      {/* === 1. GLOBAL BG RING (The Aura) === */}
      {/* Centered behind the cards, matching the Hero glow style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-blue-600/40 blur-[100px] animate-pulse-slow pointer-events-none z-0" />

      {/* Optional: Grid Texture (Same as Hero) for blending */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none opacity-20 z-0" />


      {/* === 2. CONTENT === */}
      <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center gap-12">
        
        {/* Section Title */}
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
            TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ARSENAL</span>
          </h2>
          <p className="mt-4 text-gray-400 uppercase tracking-[0.2em] text-sm font-medium">
             Powering Next-Gen Applications
          </p>
        </div>

        {/* Marquee Container */}
        <div className="w-full flex flex-col gap-8">
            
            {/* Row 1: Left Scroll */}
            <Marquee direction="left" speed={45}>
            {stackData.map((tech, idx) => (
                <GlassCard key={idx} tech={tech} />
            ))}
            </Marquee>

            {/* Row 2: Right Scroll */}
            <Marquee direction="right" speed={55}>
            {[...stackData].reverse().map((tech, idx) => (
                <GlassCard key={`rev-${idx}`} tech={tech} />
            ))}
            </Marquee>

        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left var(--speed, 30s) linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right var(--speed, 30s) linear infinite;
        }
      `}</style>
    </section>
  );
}


// --- HELPER COMPONENTS ---

function Marquee({ children, direction, speed }: { children: React.ReactNode, direction: "left" | "right", speed: number }) {
  return (
    <div className="relative flex overflow-hidden group w-full">
        {/* Gradient Fade on Edges (Blending with BG) */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#050511] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#050511] to-transparent z-20 pointer-events-none" />
        
        <div 
            className={`flex gap-4 sm:gap-6 min-w-full ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
            style={{ "--speed": `${speed}s` } as React.CSSProperties}
        >
            {children}
            {children}
        </div>
    </div>
  );
}

function GlassCard({ tech }: { tech: { name: string, icon: React.ReactNode, color: string } }) {
  return (
    // Dimensions match desktop design: w-28 h-28
    <div className="group relative w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        
        {/* Top Glossy Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Hover Inner Color Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
        />

        {/* Icon */}
        <div className="relative z-10 text-3xl sm:text-5xl text-gray-300 transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            {tech.icon}
        </div>

        {/* Tooltip Name */}
        <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 drop-shadow-md">
                {tech.name}
            </span>
        </div>
    </div>
  );
}