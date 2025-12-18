"use client";

import React from "react";
// Importing appropriate icons
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaLock, FaVideo, FaBootstrap } from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiExpress, 
  SiMongodb, 
  SiFirebase, 
  SiRedux, 
  SiTailwindcss, 
  SiStripe, 
  SiExpo, 
  SiPostman, 
  SiAdobephotoshop, 
  SiAdobepremierepro,
  SiFigma
} from "react-icons/si"; 

// --- REAL TECH STACK DATA ---
const stackData = [
  // Frontend
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" }, // White glow for dark mode
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
  { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952B3" },
  { name: "Redux", icon: <SiRedux />, color: "#764ABC" },

  // Backend & Database
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
  { name: "Express.js", icon: <SiExpress />, color: "#ffffff" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
  { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },

  // Mobile App
  { name: "React Native", icon: <FaReact />, color: "#61DAFB" },
  { name: "Expo", icon: <SiExpo />, color: "#ffffff" },

  // Payments & Tools
  { name: "Stripe", icon: <SiStripe />, color: "#008CDD" },
  { name: "SSLCommerz", icon: <FaLock />, color: "#F7931E" }, // Security Icon used
  { name: "Git", icon: <FaGitAlt />, color: "#F05032" }, // Added Essential
  { name: "Postman", icon: <SiPostman />, color: "#FF6C37" }, // Added Essential

  // Creative & Design
  { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
  { name: "Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF" },
  { name: "Premiere Pro", icon: <SiAdobepremierepro />, color: "#9999FF" },
  { name: "CapCut", icon: <FaVideo />, color: "#ffffff" }, // Video Icon used
];

export default function Stack() {
  return (
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] overflow-hidden bg-[#050511] flex flex-col items-center justify-center">
      
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 blur-[120px] animate-pulse-slow pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none opacity-20 z-0" />

      {/* Content Wrapper */}
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
            
            {/* Row 1: Left Scroll */}
            <Marquee direction="left" speed={40}>
              {stackData.slice(0, 11).map((tech, idx) => (
                  <GlassCard key={idx} tech={tech} />
              ))}
            </Marquee>

            {/* Row 2: Right Scroll (Rest of the items) */}
            <Marquee direction="right" speed={40}>
              {stackData.slice(11).map((tech, idx) => (
                  <GlassCard key={`rev-${idx}`} tech={tech} />
              ))}
            </Marquee>

        </div>
      </div>

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
        @media (max-width: 640px) {
          .animate-scroll-left, .animate-scroll-right {
             animation-duration: 20s !important; 
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
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-r from-[#050511] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-40 bg-gradient-to-l from-[#050511] to-transparent z-20 pointer-events-none" />
        
        <div 
            className={`marquee-container flex gap-4 sm:gap-8 min-w-full ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
            style={{ "--speed": `${speed}s` } as React.CSSProperties}
        >
            {children}
            {children}
            {children} 
            {children} 
        </div>
    </div>
  );
}

function GlassCard({ tech }: { tech: { name: string, icon: React.ReactNode, color: string } }) {
  return (
    <div className="group relative w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 active:scale-90 hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] cursor-pointer">
        
        {/* Top Gloss */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* COLOR GLOW (Always Visible) */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
        />

        {/* ICON (Always White & Visible) */}
        <div className="relative z-10 transition-all duration-300 
            text-3xl sm:text-6xl text-white 
            -translate-y-2
        ">
            {tech.icon}
        </div>

        {/* TEXT NAME (Always Visible) */}
        <div className="absolute bottom-2 opacity-100 translate-y-0">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white/90 drop-shadow-md">
                {tech.name}
            </span>
        </div>
    </div>
  );
}