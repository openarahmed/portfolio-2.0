"use client";

import React from "react";
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
      tags: ["React", "Node.js", "AWS", "MongoDB"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    },
    smallProjects: [
      {
        title: "E-Commerce Dashboard",
        tags: ["Next.js", "Tailwind", "Stripe"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      },
      {
        title: "Real Estate Portal",
        tags: ["MERN", "Redux", "Google Maps"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "mobile",
    title: "MOBILE APP DEVELOPMENT",
    subtitle: "Cross-platform iOS & Android Apps.",
    layout: "right-large", // Large card on Right
    largeProject: {
      title: "Fintech Wallet App",
      tags: ["Flutter", "Firebase", "Dart"],
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
      tags: ["After Effects", "Blender", "Premiere"],
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
        tags: ["DaVinci Resolve", "Sound Design"],
        image: "https://elements-resized.envatousercontent.com/elements-video-cover-images/files/360852902/Cinematic-Showreel_Preview-Image.jpg?w=500&cf_fit=cover&q=85&format=auto&s=bc0122b7a0f6dbf2eb054262158f6dbee1c54c88b6f20db3f21bf599c39b405a",
      },
    ],
  },
];

export default function Work() {
  return (
    // HYBRID SPACING:
    // Mobile: py-[3rem] (Compact)
    // Desktop: lg:py-[clamp(6rem,10vh,10rem)] (Spacious)
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden space-y-20 lg:space-y-32">
      
      {/* Global Background Glows */}
      <div className="absolute top-20 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      {/* Container: Added xl:px-12 for alignment */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 max-w-7xl">
        
        {/* === TITLE HEADER === */}
        {/* Mobile: mb-10 / Desktop: mb-20 */}
        <div className="mb-10 lg:mb-20 text-center md:text-left">
          <h2 className="flex flex-col font-black tracking-tighter uppercase leading-[0.9]">
            {/* HYBRID TEXT SCALE */}
            <span className="text-[clamp(2.5rem,7vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg block">
              SELECTED PROJECTS
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 sm:h-1.5 mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full md:mx-0 mx-auto" />
        </div>

        {/* === LOOP THROUGH SECTIONS === */}
        {/* Mobile: gap-20 / Desktop: gap-32 */}
        <div className="flex flex-col gap-20 lg:gap-32">
          {workSections.map((section) => (
            <div key={section.id} className="relative">
              
              {/* Section Sub-Header */}
              <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-white/5 pb-4">
                 <div>
                    <h3 className="text-xl sm:text-3xl font-black text-white tracking-wide uppercase">
                        {section.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-wider mt-1">
                        {section.subtitle}
                    </p>
                 </div>
                 <div className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase">
                    0{workSections.indexOf(section) + 1} / 03
                 </div>
              </div>

              {/* GRID LAYOUT */}
              {/* Mobile: Standard Stack / Desktop: Specific Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[550px]">
                
                {/* CONDITIONAL RENDERING FOR DESKTOP */}
                {section.layout === "left-large" ? (
                  <>
                    {/* WEB & CREATIVE: Large Left, Small Right */}
                    <div className="w-full h-[300px] sm:h-[400px] lg:h-full">
                      <LargeCard project={section.largeProject} />
                    </div>
                    <div className="flex flex-col gap-4 h-full">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard 
                          key={idx} 
                          project={proj} 
                          // Mobile gets linear (clearer text), Desktop gets radial (corner style)
                          overlayStyle="linear" 
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* MOBILE APP SECTION: 
                        Mobile View: We want Small Cards first, then Large Card? 
                        OR Large Card first?
                        Usually Large first is better for impact.
                        So we use Flex Order on Mobile.
                    */}
                    {/* Small Cards (Right on Desktop) */}
                    <div className="flex flex-col gap-4 h-full order-2 lg:order-1">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard 
                          key={idx} 
                          project={proj} 
                          overlayStyle="linear"
                        />
                      ))}
                    </div>
                    {/* Large Card (Left on Desktop) */}
                    <div className="w-full h-[300px] sm:h-[400px] lg:h-full order-1 lg:order-2">
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

// --- REUSABLE COMPONENTS ---

function LargeCard({ project }: { project: { title: string; tags: string[]; image: string } }) {
  return (
    <div className="group relative w-full h-full rounded-[24px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/80 to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-3 drop-shadow-md uppercase tracking-tight">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => <Tag key={i} label={tag} />)}
        </div>
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="w-0 h-full bg-blue-500 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </div>
  );
}

// Updated SmallCard logic
function SmallCard({ project, overlayStyle = "radial" }: { project: { title: string; tags: string[]; image: string }, overlayStyle?: "linear" | "radial" }) {
  return (
    <div className="group relative flex-1 min-h-[200px] rounded-[24px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-2xl">
      
      {/* Full Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* INTELLIGENT OVERLAY: 
          On Mobile (Small screens), we force LINEAR gradient because cards are stacked and need bottom text clarity.
          On Desktop, we can use Radial or whatever pass via props.
      */}
      <div className="absolute inset-0 z-10 block lg:hidden bg-gradient-to-t from-[#020006] via-[#020006]/80 to-transparent opacity-90" />
      
      <div className="hidden lg:block absolute inset-0 z-10">
         {overlayStyle === "linear" ? (
             <div className="w-full h-full bg-gradient-to-t from-[#020006] via-[#020006]/80 to-transparent opacity-90" />
         ) : (
             <div 
                className="w-full h-full"
                style={{ background: "radial-gradient(circle at bottom left, rgba(2,0,6,0.95) 0%, rgba(2,0,6,0.6) 45%, transparent 80%)" }}
             />
         )}
      </div>

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />

      {/* Content */}
      <div className={`absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end items-start`}>
        <h3 className="text-lg sm:text-2xl font-black text-white mb-2 drop-shadow-md uppercase tracking-tight leading-none">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, i) => <Tag key={i} label={tag} />)}
        </div>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/5 text-[10px] font-bold text-gray-300 uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white transition-colors">
      {label}
    </span>
  );
}