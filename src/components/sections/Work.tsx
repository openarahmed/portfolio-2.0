"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Download } from "lucide-react";

// --- DATA STRUCTURE ---
const workSections = [
  {
    id: "web",
    title: "WEB DEVELOPMENT",
    subtitle: "Scalable MERN Stack & Next.js Solutions.",
    layout: "left-large",
    largeProject: {
      title: "CoderMart",
      desc: "E-commerce Platform",
      tags: ["Next.js", "Express.js", "MongoDB", "Firebase", "Tailwind"],
      image: "https://i.postimg.cc/RF4m5J4t/Web_banner_for_codermat.png",
      liveUrl: "https://codermat.com",
      githubUrl: "https://github.com/openarahmed/codermat", // Web e Github thakbe
    },
    smallProjects: [
      {
        title: "Kicken Web",
        desc: "Landing Page",
        tags: ["Next.js", "Tailwind", "Firebase"],
        image: "https://i.postimg.cc/9MbhWXQz/web_banner_for_kicken.png",
        liveUrl: "https://kickenweb.netlify.app",
        githubUrl: "https://github.com/openarahmed/kicken", // Web e Github thakbe
      },
      {
        title: "Taza Mart",
        desc: "Grocery Store",
        tags: ["Next.js", "Firebase", "Tailwind", "EmailJS"],
        image: "https://i.postimg.cc/4dsGkHs9/web_banner_for_tazaamart.png",
        liveUrl: "https://tazaamart.com",
        githubUrl: "https://github.com/openarahmed/TazaaMart", // Web e Github thakbe
      },
    ],
  },
  
  // --- MOBILE SECTION (GITHUB REMOVED) ---
  {
    id: "mobile",
    title: "MOBILE APP SOLUTIONS",
    subtitle: "Cross-platform iOS & Android Apps.",
    layout: "right-large",
    largeProject: {
      title: "FitMat",
      desc: "Workout & Fitness Tracker",
      tags: ["React Native", "Expo", "Firebase", "Firestore"],
      image: "https://i.postimg.cc/tgSM41HY/mobile_app_image_for_fitmat.png",
      downloadUrl: "https://drive.google.com/file/d/1DFMRWKJd9BfeoAJnJo52DyZmUxFZjIJt/view?usp=sharing",
      // githubUrl REMOVED for Privacy
    },
    smallProjects: [
      {
        title: "Routina", 
        desc: "Daily Habit & Task Manager",
        tags: ["React Native", "Expo", "Firebase", "Firestore"],
        image: "https://i.postimg.cc/KYqH8Kyn/mobile_app_image_for_routina.png",
        downloadUrl: "https://drive.google.com/file/d/1KNxuCzjleUXnRJoY9H34MOq6rZQcb856/view?usp=sharing",
        // githubUrl REMOVED for Privacy
      },
      {
        title: "FitMat Meal",
        desc: "Diet & Nutrition Planner",
        tags: ["Flutter", "API Integration"], 
        image: "https://i.postimg.cc/vmqNZ1dT/mobile_app_image_for_fitmat_meal.png",
        downloadUrl: "#", 
        // githubUrl REMOVED for Privacy
      },
    ],
  },
  
  // ... Creative section ...
  {
    id: "creative",
    title: "CREATIVE & VISUALS",
    subtitle: "Motion Graphics, UI/UX & Video Editing.",
    layout: "left-large",
    largeProject: {
      title: "3D Product Commercial",
      tags: ["After Effects", "Blender"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      liveUrl: "#",
      // githubUrl nei, tai button show korbe na
    },
    smallProjects: [
      {
        title: "Brand Identity Design",
        tags: ["Figma", "Illustrator"],
        image: "https://img.freepik.com/free-vector/corporate-branding-identity-design_91128-989.jpg?semt=ais_hybrid&w=740&q=80",
        liveUrl: "#",
      },
      {
        title: "Cinematic Showreel",
        tags: ["DaVinci Resolve"],
        image: "https://elements-resized.envatousercontent.com/elements-video-cover-images/files/360852902/Cinematic-Showreel_Preview-Image.jpg?w=500&cf_fit=cover&q=85&format=auto&s=bc0122b7a0f6dbf2eb054262158f6dbee1c54c88b6f20db3f21bf599c39b405a",
        liveUrl: "#",
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

              {/* --- 1. MOBILE LAYOUT --- */}
              <div className="block lg:hidden relative w-full">
                  <MobileWorkSlider section={section} />
              </div>

              {/* --- 2. DESKTOP LAYOUT --- */}
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

// --- MOBILE COMPONENT ---
function MobileWorkSlider({ section }: { section: any }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [section.largeProject, ...section.smallProjects];

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
        <>
            <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {items.map((proj, idx) => (
                    <div key={idx} className="snap-center w-[85vw] flex-shrink-0 h-[280px]">
                        <LargeCard project={proj} isMobile={true} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-3">
                <div className="flex gap-1.5">
                    {items.map((_, idx) => (
                        <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-4 bg-blue-500" : "w-1 bg-gray-700"}`} />
                    ))}
                </div>
            </div>
        </>
    );
}

// --- REUSABLE COMPONENTS ---

function LargeCard({ project, isMobile = false }: { project: any, isMobile?: boolean }) {
  const actionLink = project.downloadUrl || project.liveUrl;
  const isDownload = !!project.downloadUrl;

  return (
    <Link 
        href={actionLink || "#"} 
        target="_blank" 
        className={`group relative block w-full h-full rounded-[20px] lg:rounded-[30px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl ${isMobile ? 'active:scale-95' : ''}`}
    >
      
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          priority={!isMobile} 
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/60 to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 z-20">
        
        <div className="flex justify-between items-end mb-2 lg:mb-3">
            <h3 className="text-xl lg:text-3xl font-black text-white drop-shadow-md uppercase tracking-tight leading-none">
              {project.title}
            </h3>
            
            <div className="hidden lg:flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {/* CONDITIONAL RENDERING FOR GITHUB BUTTON */}
                {project.githubUrl && (
                    <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, '_blank'); }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                        title="View Code"
                    >
                        <Github size={20} />
                    </button>
                )}
                
                <div className="p-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40">
                    {isDownload ? <Download size={20} /> : <ExternalLink size={20} />}
                </div>
            </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-0 lg:mb-4">
          {project.tags.map((tag: string, i: number) => <Tag key={i} label={tag} />)}
        </div>

        <div className="hidden lg:block w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="w-0 h-full bg-blue-500 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>

      <div className="absolute top-4 right-4 lg:hidden z-20 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 border border-white/10">
         {isDownload ? <Download size={16} /> : <ExternalLink size={16} />}
      </div>

    </Link>
  );
}

function SmallCard({ project }: { project: any }) {
  const actionLink = project.downloadUrl || project.liveUrl;
  const isDownload = !!project.downloadUrl;

  return (
    <Link 
        href={actionLink || "#"}
        target="_blank"
        className="group relative block w-full flex-1 min-h-[240px] rounded-[20px] lg:rounded-[30px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-2xl"
    >
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full rounded-[16px] lg:rounded-[24px] overflow-hidden">
           <Image
             src={project.image}
             alt={project.title}
             fill
             className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
             sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
           />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/60 to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />
      
      <div className={`absolute inset-0 z-20 p-6 lg:p-8 flex flex-col justify-end items-start`}>
        
        <div className="w-full flex justify-between items-end mb-2">
            <h3 className="text-lg lg:text-2xl font-black text-white drop-shadow-md uppercase tracking-tight leading-none">
              {project.title}
            </h3>

            <div className="hidden lg:flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                 {/* CONDITIONAL RENDERING FOR GITHUB BUTTON */}
                 {project.githubUrl && (
                    <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, '_blank'); }}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                    >
                        <Github size={16} />
                    </button>
                 )}

                <div className="p-1.5 rounded-full bg-purple-600 text-white shadow-lg">
                    {isDownload ? <Download size={16} /> : <ExternalLink size={16} />}
                </div>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-0">
          {project.tags.map((tag: string, i: number) => <Tag key={i} label={tag} />)}
        </div>
      </div>
    </Link>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/5 text-[9px] lg:text-[10px] font-bold text-gray-300 uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white transition-colors">
      {label}
    </span>
  );
}