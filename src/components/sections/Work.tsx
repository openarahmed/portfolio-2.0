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
    <section className="relative w-full py-24 bg-[#050511] overflow-hidden space-y-32">
      
      {/* Global Background Glows */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        
        {/* === TITLE HEADER === */}
        <div className="mb-20 text-center md:text-left">
          <h2 className="flex flex-col text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg block">
              SELECTED PROJECTS
            </span>
          
          </h2>
          <div className="w-24 h-1.5 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full md:mx-0 mx-auto" />
        </div>

        {/* === LOOP THROUGH SECTIONS === */}
        <div className="flex flex-col gap-32">
          {workSections.map((section) => (
            <div key={section.id} className="relative">
              
              {/* Section Sub-Header */}
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-white/5 pb-4">
                 <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide uppercase">
                        {section.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium tracking-wider mt-1">
                        {section.subtitle}
                    </p>
                 </div>
                 <div className="text-xs font-mono text-gray-500 uppercase">
                    0{workSections.indexOf(section) + 1} / 03
                 </div>
              </div>

              {/* GRID LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[550px]">
                
                {/* CONDITIONAL RENDERING */}
                {section.layout === "left-large" ? (
                  <>
                    {/* WEB & CREATIVE: Large Left, Small Right */}
                    <div className="w-full h-[400px] lg:h-full">
                      <LargeCard project={section.largeProject} />
                    </div>
                    <div className="flex flex-col gap-4 h-full">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard 
                          key={idx} 
                          project={proj} 
                          overlayStyle="radial" // Corner Overlay for these
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* MOBILE: Small Left, Large Right */}
                    <div className="flex flex-col gap-4 h-full order-2 lg:order-1">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard 
                          key={idx} 
                          project={proj} 
                          overlayStyle="linear" // FULL BOTTOM-TO-TOP for Mobile
                        />
                      ))}
                    </div>
                    <div className="w-full h-[400px] lg:h-full order-1 lg:order-2">
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
      {/* Large Card Always has Bottom-to-Top Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/80 to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />
      <div className="absolute bottom-0 left-0 w-full p-8 z-20">
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

// Updated SmallCard with overlayStyle prop
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

      {/* CONDITIONAL OVERLAY */}
      {overlayStyle === "linear" ? (
        // LINEAR: Bottom to Top (Used for Mobile Section)
        <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/80 to-transparent opacity-90 z-10" />
      ) : (
        // RADIAL: Corner Only (Used for Web & Creative Section)
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(2,0,6,0.95) 0%, rgba(2,0,6,0.6) 45%, transparent 80%)",
          }}
        />
      )}

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />

      {/* Content */}
      <div className={`absolute inset-0 z-20 p-8 flex flex-col justify-end items-start`}>
        <h3 className="text-xl md:text-2xl font-black text-white mb-2 drop-shadow-md uppercase tracking-tight leading-none">
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