"use client";

import React from "react";
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
    // HYBRID SPACING LOGIC:
    // Mobile (<1024px): py-[3rem] (Compact, starts right after Hero)
    // Desktop (>=1024px): lg:py-[clamp(6rem,10vh,10rem)] (YOUR PREFERRED HUGE SPACING)
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] overflow-hidden bg-[#050511] flex flex-col items-center justify-center">
      
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 blur-[120px] animate-pulse-slow pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none opacity-20 z-0" />

      {/* Content Wrapper */}
      {/* HYBRID GAP LOGIC:
          Mobile: gap-[1.5rem] (Tight & Clean)
          Desktop: lg:gap-[clamp(2rem,5vh,4rem)] (Your spacious gap)
      */}
      <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center gap-[1.5rem] lg:gap-[clamp(2rem,5vh,4rem)]">
        
        {/* Header */}
        <div className="text-center px-4">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white tracking-tighter drop-shadow-lg leading-none">
            TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ARSENAL</span>
          </h2>
          <p className="mt-4 text-gray-400 uppercase tracking-[0.2em] text-[10px] sm:text-sm font-medium">
              Powering Next-Gen Applications
          </p>
        </div>

        {/* Marquee Section */}
        <div className="w-full flex flex-col gap-4 sm:gap-8 mt-4 sm:mt-8">
            
            <Marquee direction="left" speed={20}>
              {stackData.map((tech, idx) => (
                  <GlassCard key={idx} tech={tech} />
              ))}
            </Marquee>

            <Marquee direction="right" speed={25}>
              {[...stackData].reverse().map((tech, idx) => (
                  <GlassCard key={`rev-${idx}`} tech={tech} />
              ))}
            </Marquee>

        </div>
      </div>

      {/* Optimized Animations (GPU Accelerated) */}
      <style jsx global>{`
        .marquee-container {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
        }

        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes scroll-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .animate-scroll-left {
          animation: scroll-left var(--speed) linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right var(--speed) linear infinite;
        }

        /* MOBILE OVERRIDE: 10s SUPER FAST */
        @media (max-width: 640px) {
          .animate-scroll-left, .animate-scroll-right {
             animation-duration: 10s !important; 
          }
        }
      `}</style>
    </section>
  );
}

// --- HELPER COMPONENTS ---

function Marquee({ children, direction, speed }: { children: React.ReactNode, direction: "left" | "right", speed: number }) {
  return (
    <div className="relative flex overflow-hidden group w-full select-none">
        
        {/* Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-r from-[#050511] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-l from-[#050511] to-transparent z-20 pointer-events-none" />
        
        {/* Marquee Track */}
        <div 
            className={`marquee-container flex gap-4 sm:gap-8 min-w-full ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
            style={{ "--speed": `${speed}s` } as React.CSSProperties}
        >
            {children}
            {children}
            {children} 
        </div>
    </div>
  );
}

function GlassCard({ tech }: { tech: { name: string, icon: React.ReactNode, color: string } }) {
  return (
    <div className="group relative w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
        />
        <div className="relative z-10 text-3xl sm:text-6xl text-gray-400 transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            {tech.icon}
        </div>
        <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-white/90 drop-shadow-md">
                {tech.name}
            </span>
        </div>
    </div>
  );
}