"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Download, Play, X, ZoomIn } from "lucide-react";

// --- DATA STRUCTURE ---
const workSections = [
  // 1. WEB DEVELOPMENT
  {
    id: "web",
    title: "WEB DEVELOPMENT",
    subtitle: "Scalable MERN Stack & Next.js Solutions.",
    layout: "left-large",
    largeProject: {
      title: "CoderMart",
      desc: "A digital web services agency focused on seamless communication and elevating brand value with modern web solutions.",
      tags: ["Next.js", "Express.js", "MongoDB", "Firebase", "Tailwind"],
      image: "https://i.postimg.cc/RF4m5J4t/Web_banner_for_codermat.png",
      liveUrl: "https://codermat.com",
      githubUrl: "https://github.com/openarahmed/codermat", 
    },
    smallProjects: [
      {
        title: "Kicken Web",
        desc: "Sports academy platform facilitating online trials, student communication, and showcasing achievements.",
        tags: ["Next.js", "Tailwind", "Firebase"],
        image: "https://i.postimg.cc/9MbhWXQz/web_banner_for_kicken.png",
        liveUrl: "https://kickenweb.netlify.app",
        githubUrl: "https://github.com/openarahmed/kicken", 
      },
      {
        title: "Taza Mart",
        desc: "Full-featured e-commerce site offering product showcasing, seamless order placement, and real-time tracking.",
        tags: ["Next.js", "Firebase", "Tailwind", "EmailJS"],
        image: "https://i.postimg.cc/4dsGkHs9/web_banner_for_tazaamart.png",
        liveUrl: "https://tazaamart.com",
        githubUrl: "https://github.com/openarahmed/TazaaMart", 
      },
    ],
  },
  
  // 2. MOBILE APP SOLUTIONS
  {
    id: "mobile",
    title: "MOBILE APP SOLUTIONS",
    subtitle: "Cross-platform iOS & Android Apps.",
    layout: "right-large",
    largeProject: {
      title: "FitMat",
      desc: "Comprehensive fitness app featuring a calorie counter, exercise form correction, and daily workout tracking.",
      tags: ["React Native", "Expo", "Firebase", "Firestore"],
      image: "https://i.postimg.cc/tgSM41HY/mobile_app_image_for_fitmat.png",
      downloadUrl: "https://drive.google.com/file/d/1DFMRWKJd9BfeoAJnJo52DyZmUxFZjIJt/view?usp=sharing",
    },
    smallProjects: [
      {
        title: "Routina", 
        desc: "Smart AI-based task manager providing productivity tips, job finding tools, and detailed user analytics.",
        tags: ["React Native", "Expo", "Firebase", "Firestore"],
        image: "https://i.postimg.cc/KYqH8Kyn/mobile_app_image_for_routina.png",
        downloadUrl: "https://drive.google.com/file/d/1KNxuCzjleUXnRJoY9H34MOq6rZQcb856/view?usp=sharing",
      },
      {
        title: "FitMat Meal",
        desc: "A specialized nutrition planner within the FitMat ecosystem for diet tracking and healthy meal planning.",
          tags: ["React Native", "Expo", "Firebase", "Firestore"],
        image: "https://i.postimg.cc/vmqNZ1dT/mobile_app_image_for_fitmat_meal.png",
        downloadUrl: "#", 
    },
    ],
  },

  // 3. VIDEO EDITING
  {
    id: "video",
    title: "MOTION & EDITING",
    subtitle: "High-end Commercials & Visual Storytelling.",
    layout: "left-large",
    largeProject: {
      title: "AI Video Production",
      desc: "Cinematic AI Storytelling",
      tags: ["Veo3", "Premier Pro", "ElevenLab"],
      type: "video",
      image: "https://i.postimg.cc/GtL1D2Q3/portfolio_video_banner_1.png",
      videoUrl: "https://www.youtube.com/embed/xwseky2ZxYA", 
    },
    smallProjects: [
      {
        title: "Cinematic Trailer",
        desc: "Professional Editing",
        tags: ["Premier Pro", "Veo3"],
        type: "video",
        image: "https://i.postimg.cc/kXXzCLGX/portfolio-video-banner-3.png",
        videoUrl: "https://www.youtube.com/embed/tclP9A2ze64", 
      },
      {
        title: "Short Form Content",
        desc: "Engaging Social Clips",
        tags: ["Premier Pro", "ElevenLab"],
        type: "video",
        image: "https://i.postimg.cc/6qWNZ3hD/portfolio_video_banner.png", 
        videoUrl: "https://www.youtube.com/embed/-HT9K-u4afY", 
      },
    ],
  },


  // 4. GRAPHIC DESIGN
  {
    id: "graphics",
    title: "BRANDING & DESIGN",
    subtitle: "Visual Identity, UI Kits & Print Design.",
    layout: "right-large", 
    largeProject: {
      title: "Product Packaging",
      desc: "Premium label and packaging design for consumer goods.",
      tags: ["Photoshop"],
      type: "image",
      image: "https://i.postimg.cc/MG0BZPrX/Label-for-holuder-copy.jpg",
    },
    smallProjects: [
      {
        title: "Webinar Banner",
        desc: "Professional event banner design for university webinars.",
        tags: ["Photoshop"],
        type: "image",
        image: "https://i.postimg.cc/2j04Btkt/nub-WEBINAR-(1).jpg",
      },
      {
        title: "Social Media Post",
        desc: "Eye-catching promotional graphics for brand awareness.",
        tags: ["Photoshop"],
        type: "image",
        image: "https://i.postimg.cc/qRXTgn8k/graphics_design.jpg",
      },
    ],
  },
];

export default function Work() {
  const [modalData, setModalData] = useState<any>(null);

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
              RECENT WORK
            </span>
          </h2>
          <div className="w-12 sm:w-24 h-1 sm:h-1.5 mt-3 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        {/* === LOOP THROUGH SECTIONS === */}
        <div className="flex flex-col gap-12 lg:gap-32">
          {workSections.map((section, index) => (
            <div id={section.id} key={section.id} className="relative w-full scroll-mt-24">
              
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
                    0{index + 1} / 04
                 </div>
              </div>

              {/* =========================================================
                  1. MOBILE LAYOUT ONLY (Phones - xs to sm)
                  CHANGED: 'block lg:hidden' -> 'block md:hidden'
                  This keeps the slider ONLY for phones.
                 ========================================================= */}
              <div className="block md:hidden relative w-full">
                  <MobileWorkSlider section={section} setModalData={setModalData} />
              </div>

              {/* =========================================================
                  2. TABLET LAYOUT ONLY (Tablets - md to lg)
                  NEW: Specific layout for iPads/Tabs.
                  Uses a Bento Grid: 1 Large Top + 2 Small Bottom
                 ========================================================= */}
              <div className="hidden md:block lg:hidden relative w-full">
                  <div className="grid grid-cols-2 gap-5">
                      {/* Top Row: Large Card (Full Width) */}
                      <div className="col-span-2 h-[340px]">
                          <LargeCard project={section.largeProject} setModalData={setModalData} />
                      </div>
                      
                      {/* Bottom Row: 2 Small Cards (Half Width Each) */}
                      {section.smallProjects.map((proj, idx) => (
                          <div key={idx} className="col-span-1 h-[260px]">
                              <SmallCard project={proj} setModalData={setModalData} />
                          </div>
                      ))}
                  </div>
              </div>

              {/* =========================================================
                  3. DESKTOP LAYOUT ONLY (Laptops/Desktops - lg+)
                  Unchanged: Keeps the original side-by-side layout
                 ========================================================= */}
              <div className="hidden lg:grid grid-cols-2 gap-6 xl:gap-8 lg:h-[550px] w-full">
                {section.layout === "left-large" ? (
                  <>
                    <div className="w-full h-full">
                      <LargeCard project={section.largeProject} setModalData={setModalData} />
                    </div>
                    <div className="flex flex-col gap-6 xl:gap-8 h-full">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard key={idx} project={proj} setModalData={setModalData} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-6 xl:gap-8 h-full order-2 lg:order-1">
                      {section.smallProjects.map((proj, idx) => (
                        <SmallCard key={idx} project={proj} setModalData={setModalData} />
                      ))}
                    </div>
                    <div className="w-full h-full order-1 lg:order-2">
                      <LargeCard project={section.largeProject} setModalData={setModalData} />
                    </div>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* === MEDIA MODAL (POPUP) === */}
      {modalData && <MediaModal data={modalData} onClose={() => setModalData(null)} />}

    </section>
  );
}

function MediaModal({ data, onClose }: { data: any, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"><X size={24} /></button>
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0b0f19] flex items-center justify-center">
                    {data.type === "video" ? (
                        <div className="relative w-full pt-[56.25%] bg-black"><iframe src={`${data.videoUrl}?autoplay=1`} className="absolute top-0 left-0 w-full h-full" title={data.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div>
                    ) : (
                        <div className="relative w-full h-auto max-h-[80vh] flex items-center justify-center p-2"><img src={data.image} alt={data.title} className="max-w-full max-h-[80vh] object-contain rounded-lg"/></div>
                    )}
                </div>
                <div className="mt-4 text-center"><h3 className="text-xl font-bold text-white">{data.title}</h3><p className="text-gray-400 text-sm mt-1">{data.desc}</p></div>
            </div>
        </div>
    );
}

function MobileWorkSlider({ section, setModalData }: { section: any, setModalData: any }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [section.largeProject, ...section.smallProjects];
    const handleScroll = () => { if (scrollRef.current) { const scrollLeft = scrollRef.current.scrollLeft; const width = window.innerWidth * 0.85; const index = Math.round(scrollLeft / width); setActiveIndex(index); } };
    useEffect(() => { const container = scrollRef.current; if (container) { container.addEventListener("scroll", handleScroll); return () => container.removeEventListener("scroll", handleScroll); } }, []);
    return (
        <>
            <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {items.map((proj, idx) => (<div key={idx} className="snap-center w-[85vw] flex-shrink-0 h-[280px]"><LargeCard project={proj} isMobile={true} setModalData={setModalData} /></div>))}
            </div>
            <div className="flex justify-center mt-3"><div className="flex gap-1.5">{items.map((_, idx) => (<div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-4 bg-blue-500" : "w-1 bg-gray-700"}`} />))}</div></div>
        </>
    );
}

// --- UPDATED LARGE CARD (With "Live" Video Animation) ---
function LargeCard({ project, isMobile = false, setModalData }: { project: any, isMobile?: boolean, setModalData: any }) {
  const isVideo = project.type === "video";
  const isImageModal = project.type === "image";
  const actionLink = project.downloadUrl || project.liveUrl;
  
  const handleClick = (e: React.MouseEvent) => {
      if (isVideo || isImageModal) {
          e.preventDefault();
          setModalData(project);
      }
  };

  const Wrapper = isVideo || isImageModal ? 'div' : Link;
  const wrapperProps = isVideo || isImageModal ? { onClick: handleClick, className: "cursor-pointer" } : { href: actionLink || "#", target: "_blank" };

  return (
    // @ts-ignore
    <Wrapper 
        {...wrapperProps}
        className={`group relative block w-full h-full rounded-[20px] lg:rounded-[30px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl ${isMobile ? 'active:scale-95' : ''}`}
    >
      <div className="absolute inset-0 w-full h-full">
        <Image src={project.image} alt={project.title} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" priority={!isMobile} sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/60 to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />
      
      {/* --- MOBILE ONLY: Top Right Buttons (Always Visible) --- */}
      <div className="absolute top-4 right-4 z-30 flex gap-3 lg:hidden">
          {project.githubUrl && (
             <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, '_blank'); }} className="p-2 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md active:bg-white/20 transition-colors"><Github size={18} /></button>
          )}
          {!isVideo && !isImageModal && (
             <div className="p-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40">{project.downloadUrl ? <Download size={18} /> : <ExternalLink size={18} />}</div>
          )}
      </div>

      {/* --- VIDEO PLAY BUTTON WITH LIVE ANIMATION (UPDATED) --- */}
      {isVideo && (
        <div className="absolute inset-0 z-20 flex items-center justify-center group/video">
          {/* Container for ripples and button */}
          <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center">
              {/* ANIMATION LAYER 1: Outer Ripple (Ping effect) */}
              <span className="absolute inline-flex h-full w-full animate-[ping_1.5s_ease-in-out_infinite] rounded-full bg-white/20 opacity-30"></span>

              {/* ANIMATION LAYER 2: Inner Glow (Pulse effect) */}
              <span className="absolute inline-flex h-[85%] w-[85%] animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-blue-100/10 blur-md"></span>

              {/* MAIN BUTTON ICON */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover/video:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:border-white/50">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>
          </div>
        </div>
      )}

      {isImageModal && ( <div className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={20} /></div> )}
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 z-20">
        <div className="flex justify-between items-end mb-2">
            <div className="w-full">
                <h3 className="text-xl lg:text-3xl font-black text-white drop-shadow-md uppercase tracking-tight leading-none mb-2">{project.title}</h3>
                <p className="text-gray-300 text-xs lg:text-sm font-medium leading-relaxed line-clamp-2">{project.desc}</p>
            </div>
            
            {/* --- DESKTOP ONLY: Bottom Right Buttons (Hover Only) --- */}
            <div className="hidden lg:flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 pl-4">
                {project.githubUrl && (
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, '_blank'); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"><Github size={20} /></button>
                )}
                {!isVideo && !isImageModal && (
                    <div className="p-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40">{project.downloadUrl ? <Download size={20} /> : <ExternalLink size={20} />}</div>
                )}
            </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 mb-0 lg:mb-4">
          {project.tags.map((tag: string, i: number) => <Tag key={i} label={tag} />)}
        </div>

        <div className="hidden lg:block w-full h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="w-0 h-full bg-blue-500 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </Wrapper>
  );
}

// --- UPDATED SMALL CARD (With "Live" Video Animation) ---
function SmallCard({ project, setModalData }: { project: any, setModalData: any }) {
  const isVideo = project.type === "video";
  const isImageModal = project.type === "image";
  const actionLink = project.downloadUrl || project.liveUrl;

  const handleClick = (e: React.MouseEvent) => {
      if (isVideo || isImageModal) {
          e.preventDefault();
          setModalData(project);
      }
  };

  const Wrapper = isVideo || isImageModal ? 'div' : Link;
  const wrapperProps = isVideo || isImageModal ? { onClick: handleClick, className: "cursor-pointer" } : { href: actionLink || "#", target: "_blank" };

  return (
    // @ts-ignore
    <Wrapper 
        {...wrapperProps}
        className="group relative block w-full flex-1 min-h-[240px] rounded-[20px] lg:rounded-[30px] border border-white/10 bg-[#0b0f19] overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-2xl"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image src={project.image} alt={project.title} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/60 to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />

      {/* --- MOBILE ONLY: Top Right Buttons (Always Visible) --- */}
      <div className="absolute top-4 right-4 z-30 flex gap-2 lg:hidden">
          {project.githubUrl && (
             <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, '_blank'); }} className="p-1.5 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md active:bg-white/20 transition-colors"><Github size={16} /></button>
          )}
          {!isVideo && !isImageModal && (
             <div className="p-1.5 rounded-full bg-purple-600 text-white shadow-lg">{project.downloadUrl ? <Download size={16} /> : <ExternalLink size={16} />}</div>
          )}
      </div>

      {/* --- VIDEO PLAY BUTTON WITH LIVE ANIMATION (UPDATED) --- */}
      {isVideo && (
        <div className="absolute inset-0 z-20 flex items-center justify-center group/video">
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-[ping_1.5s_ease-in-out_infinite] rounded-full bg-white/20 opacity-30"></span>
              <span className="absolute inline-flex h-[85%] w-[85%] animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-purple-100/10 blur-md"></span>
              <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover/video:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:border-white/50">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
          </div>
        </div>
      )}

      {isImageModal && ( <div className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={16} /></div> )}

      <div className={`absolute inset-0 z-20 p-6 lg:p-8 flex flex-col justify-end items-start`}>
        <div className="w-full flex justify-between items-end mb-1">
            <div className="w-full">
                <h3 className="text-lg lg:text-2xl font-black text-white drop-shadow-md uppercase tracking-tight leading-none mb-1">{project.title}</h3>
                <p className="text-gray-300 text-[10px] lg:text-xs font-medium leading-relaxed line-clamp-2 opacity-80">{project.desc}</p>
            </div>

            {/* --- DESKTOP ONLY: Bottom Right Buttons (Hover Only) --- */}
            <div className="hidden lg:flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 pl-2">
                 {project.githubUrl && (
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.githubUrl, '_blank'); }} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"><Github size={16} /></button>
                 )}
                {!isVideo && !isImageModal && (
                    <div className="p-1.5 rounded-full bg-purple-600 text-white shadow-lg">
                        {project.downloadUrl ? <Download size={16} /> : <ExternalLink size={16} />}
                    </div>
                )}
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag: string, i: number) => <Tag key={i} label={tag} />)}
        </div>
      </div>
    </Wrapper>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/5 text-[9px] lg:text-[10px] font-bold text-gray-300 uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white transition-colors">
      {label}
    </span>
  );
}