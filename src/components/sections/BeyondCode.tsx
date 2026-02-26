"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PenTool, PlaySquare, Camera, ArrowRight } from "lucide-react";

// --- DATA STRUCTURE ---
const creativeSkills = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    hoverText: "Crafting pixel-perfect visual identities and UI foundations.",
    icon: <PenTool className="w-6 h-6 sm:w-8 sm:h-8" />,
    image: "https://i.postimg.cc/qRXTgn8k/graphics_design.jpg",
    link: "/creative/graphic-design",
    color: "from-blue-600/20 to-blue-900/40",
    borderGlow: "group-hover:border-blue-500/50",
    iconColor: "text-blue-400",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    hoverText: "Designing fluid animations for intuitive user interactions.",
    icon: <PlaySquare className="w-6 h-6 sm:w-8 sm:h-8" />,
    image: "https://i.postimg.cc/6qWNZ3hD/portfolio_video_banner.png",
    link: "/creative/motion-graphics",
    color: "from-purple-600/20 to-purple-900/40",
    borderGlow: "group-hover:border-purple-500/50",
    iconColor: "text-purple-400",
  },
  {
    id: "photography",
    title: "Photography",
    hoverText: "Mastering light, composition, and spatial awareness.",
    icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    link: "/creative/photography",
    color: "from-emerald-600/20 to-emerald-900/40",
    borderGlow: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-400",
  },
];

export default function BeyondCode() {
  return (
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden">
      {/* Global Background Accents */}
      <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* CONTAINER */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* === HEADER === */}
        <div className="mb-12 lg:mb-20 text-center flex flex-col items-center">
          <h2 className="font-black tracking-tighter uppercase leading-[1.1] text-[clamp(2rem,5vw,4rem)] text-white drop-shadow-lg">
            Beyond The Code
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl text-center leading-relaxed font-medium tracking-wide">
            Exploring visual aesthetics, composition, and motion to craft better
            digital experiences.
          </p>
          <div className="w-16 h-1 mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full" />
        </div>

        {/* === GRID LAYOUT === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {creativeSkills.map((skill) => (
            <Link href={skill.link} key={skill.id} className="block group">
              <div
                className={`relative w-full h-[320px] sm:h-[380px] lg:h-[450px] rounded-[24px] lg:rounded-[32px] border border-white/5 bg-[#0b0f19] overflow-hidden shadow-2xl transition-all duration-500 ${skill.borderGlow}`}
              >
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                  <Image
                    src={skill.image}
                    alt={skill.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Overlays (Reduced initial opacity from 80 to 60 for better visibility) */}
                <div className="absolute inset-0 bg-[#050511]/60 group-hover:bg-[#050511]/40 transition-colors duration-500 z-10" />

                {/* Color Gradient Overlay (Always slightly visible now, gets stronger on hover) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${skill.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/80 to-transparent opacity-90 z-10" />

                {/* Content Container */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center ${skill.iconColor} shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500`}
                  >
                    {skill.icon}
                  </div>

                  {/* Text Content */}
                  {/* Removed group-hover translation so text stays anchored */}
                  <div className="transform transition-transform duration-500">
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">
                      {skill.title}
                    </h3>

                    {/* FIXED: Removed opacity-0 and h-0 so text is always visible */}
                    <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed transition-colors duration-500 group-hover:text-gray-200">
                      {skill.hoverText}
                    </p>

                    {/* Action Link (Now also permanently visible, arrow animates on hover) */}
                    <div className="flex items-center gap-2 mt-4 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-xs font-bold tracking-widest uppercase">
                        Explore Gallery
                      </span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
