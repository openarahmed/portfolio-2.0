"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

// --- DATA STRUCTURE ---
const workSections = [
  {
    id: "web",
    title: "WEB DEVELOPMENT",
    subtitle: "Scalable MERN Stack & Next.js Solutions.",
    layout: "left-large",
    largeProject: {
      title: "SaaS Analytics Platform",
      tags: ["React", "Node.js", "AWS"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    },
    smallProjects: [
      {
        title: "E-Commerce Dashboard",
        tags: ["Next.js", "Tailwind"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      },
      {
        title: "Real Estate Portal",
        tags: ["MERN", "Redux"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "mobile",
    title: "MOBILE APP SOLUTIONS",
    subtitle: "Cross-platform iOS & Android Apps.",
    layout: "right-large",
    largeProject: {
      title: "Fintech Wallet App",
      tags: ["Flutter", "Firebase"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    },
    smallProjects: [
      {
        title: "Food Delivery App",
        tags: ["React Native", "Redux"],
        image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop",
      },
      {
        title: "Fitness Tracker",
        tags: ["Flutter", "HealthKit"],
        image: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?q=80&w=2072&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "creative",
    title: "CREATIVE & VISUALS",
    subtitle: "Motion Graphics, UI/UX & Video Editing.",
    layout: "left-large",
    largeProject: {
      title: "3D Product Commercial",
      tags: ["After Effects", "Blender"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    },
    smallProjects: [
      {
        title: "Brand Identity Design",
        tags: ["Figma", "Illustrator"],
        image: "https://img.freepik.com/free-vector/corporate-branding-identity-design_91128-989.jpg?semt=ais_hybrid&w=740&q=80",
      },
      {
        title: "Cinematic Showreel",
        tags: ["DaVinci Resolve"],
        image: "https://elements-resized.envatousercontent.com/elements-video-cover-images/files/360852902/Cinematic-Showreel_Preview-Image.jpg?w=500&cf_fit=cover&q=85&format=auto&s=bc0122b7a0f6dbf2eb054262158f6dbee1c54c88b6f20db3f21bf599c39b405a",
      },
    ],
  },
];

export default function Work() {
  return (
    <section id="work" className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden space-y-12 lg:space-y-32">
      
      {/* Global Background Glows */}
      <div className="absolute top-20 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      {/* CONTAINER */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* === TITLE HEADER === */}
        <div className="mb-8 lg:mb-20 text-left">
          <h2 className="flex flex-col font-black tracking-tighter uppercase leading-[0.9]">
            <span className="text-[clamp(2.5rem,6vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg block">
              RECENT WORK.
            </span>
          </h2>
          <div className="w-12 sm:w-24 h-1 sm:h-1.5 mt-3 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        {/* === LOOP THROUGH SECTIONS === */}
        <div className="flex flex-col gap-12 lg:gap-32">
          {workSections.map((section, index) => (
            <div key={section.id} className="relative w-full">
              
              {/* Section Sub-Header */}
              <div className="mb-4 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-1 border-b border-white/5 pb-2 md:pb-4">
                 <div>
                    <h3 className="text-lg sm:text-3xl font-black text-white tracking-wide uppercase">
                        {section.title}
                    </h3>
                    <p className="text-gray-400 text-[10px] sm:text-sm font-medium tracking-wider mt-0.5">
                        {section.subtitle}
                    </p>
                 </div>
                 <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase hidden md:block">
                    0{index + 1} / 03
                 </div>
              </div>

              {/* --- 1. MOBILE LAYOUT (With Dots) --- */}
              <div className="block lg:hidden relative w-full">
                  <MobileWorkSlider section={section} />
              </div>

              {/* --- 2. DESKTOP LAYOUT (Unchanged) --- */}
              <div className="hidden lg:grid grid-cols-2 gap-6 xl:gap-8 lg:h-[550px] w-full">
                {section.layout === "left-large" ? (
                  <>
                    <div className="w-full h-full">
                      <LargeCard project={section.largeProject} />
                    </div>
                    <div className="flex flex-col gap-6 xl:gap-8 h-full">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard key={idx} project={proj} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-6 xl:gap-8 h-full order-2 lg:order-1">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard key={idx} project={proj} />
                      ))}
                    </div>
                    <div className="w-full h-full order-1 lg:order-2">
                      <LargeCard project={section.largeProject} />
                    </div>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- NEW COMPONENT: HANDLES MOBILE SLIDER & DOTS INDEPENDENTLY ---
function MobileWorkSlider({ section }: { section: any }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Combine large and small projects into one list for the slider
    const items = [section.largeProject, ...section.smallProjects];

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            // 85vw logic to match Services
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
        <>
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide"
            >
                {items.map((proj, idx) => (
                    // Using w-[85vw] and h-[280px] to match Services exactly
                    <div key={idx} className="snap-center w-[85vw] flex-shrink-0 h-[280px]">
                        <LargeCard project={proj} isMobile={true} />
                    </div>
                ))}
            </div>

            {/* Centered Dots */}
            <div className="flex justify-center mt-3">
                <div className="flex gap-1.5">
                    {items.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                idx === activeIndex ? "w-4 bg-blue-500" : "w-1 bg-gray-700"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

// --- REUSABLE COMPONENTS ---

function LargeCard({ project, isMobile = false }: { project: any, isMobile?: boolean }) {
  return (
    <div className={`group relative w-full h-full rounded-[20px] lg:rounded-[30px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl ${isMobile ? 'active:scale-95' : ''}`}>
      
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/60 to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 z-20">
        <h3 className="text-xl lg:text-3xl font-black text-white mb-2 lg:mb-3 drop-shadow-md uppercase tracking-tight leading-none">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-0 lg:mb-4">
          {project.tags.map((tag: string, i: number) => <Tag key={i} label={tag} />)}
        </div>

        <div className="hidden lg:block w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="w-0 h-full bg-blue-500 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>
  );
}

function SmallCard({ project }: { project: any }) {
  return (
    <div className="group relative w-full flex-1 min-h-[240px] rounded-[20px] lg:rounded-[30px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-2xl">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none"
           style={{ background: "radial-gradient(circle at bottom left, rgba(2,0,6,0.95) 0%, rgba(2,0,6,0.6) 45%, transparent 80%)" }}
      />
      <div className={`absolute inset-0 z-20 p-6 lg:p-8 flex flex-col justify-end items-start`}>
        <h3 className="text-lg lg:text-2xl font-black text-white mb-2 drop-shadow-md uppercase tracking-tight leading-none">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag: string, i: number) => <Tag key={i} label={tag} />)}
        </div>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/5 text-[9px] lg:text-[10px] font-bold text-gray-300 uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white transition-colors">
      {label}
    </span>
  );
}