"use client";

import React from "react";
import Image from "next/image";
import { Bell, Briefcase, Calendar, PenTool, Play, Smartphone, Monitor } from "lucide-react";

export default function Hero() {
  
  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) workSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
        scrollToWork();
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#050511] overflow-hidden">
      
      {/* =========================================
          DESKTOP VIEW (Large Screens)
         ========================================= */}
      <div className="hidden lg:flex min-h-[100dvh] w-full flex-col items-center justify-center relative">
          
          <div className="fixed top-0 left-0 w-[50vw] h-[50vw] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
          <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none opacity-20" />

          <div className="mx-auto w-full max-w-[1440px] relative z-10 flex flex-row items-center justify-between h-full px-12 gap-0"> 
            
            <div className="flex-1 flex flex-col items-start text-left z-20 max-w-[800px]">
              <h1 className="flex flex-col font-black tracking-tighter leading-[0.9] select-none text-left w-auto">
                <span className="text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                  DIGITAL
                </span>
                <span className="text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-300 to-gray-600 drop-shadow-xl pb-2">
                  ALCHEMIST
                </span>
              </h1>
              
              <p className="mt-8 text-lg text-gray-300 font-bold tracking-[0.2em] uppercase max-w-xl leading-relaxed text-left w-auto">
                <span className="text-blue-400">WEBsite</span>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-purple-400">MOBILE APP</span>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-pink-400">Graphic</span>
                <span className="mx-2 text-gray-600">•</span>
                <span className="text-orange-400">MOTION</span>
              </p>

              <div className="flex flex-row gap-4 mt-12 w-auto justify-start">
                <button 
                  onClick={scrollToWork}
                  className="px-8 py-4 rounded-xl bg-[#1a56db] text-white font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
                >
                  <span className="relative z-10">VIEW WORK</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
                <button 
                  onClick={scrollToContact}
                  className="px-8 py-4 rounded-xl border border-purple-500/30 bg-[#1e1b4b]/50 text-white font-bold text-sm tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:bg-purple-900/20 transition-all hover:scale-105 active:scale-95"
                >
                  GET IN TOUCH
                </button>
              </div>
            </div>

            <div className="flex-1 flex justify-end relative pl-10 w-auto">
                <div className="relative w-[480px] aspect-[4/5] group cursor-pointer transition-transform active:scale-95 duration-300">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 rounded-full blur-[60px] opacity-40 animate-pulse-slow"></div>
                    <div className="relative z-10 w-full h-full rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
                        <Image 
                            src="https://i.postimg.cc/L8cTqLX8/Shakil-s-Personal-Portfolio-Banner.png" 
                            alt="Shakil Profile"
                            fill
                            className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                    </div>
                </div>
            </div>
          </div>
      </div>


      {/* =========================================
          MOBILE & TABLET VIEW (xs to md)
          FIXED: Removed md:max-w-[720px] and md:mx-auto
          to ensure full width consistency.
         ========================================= */}
      <div className="flex lg:hidden flex-col w-full min-h-[100dvh] bg-[#050511] relative px-4 sm:px-6 md:px-8 pt-6 pb-10 md:py-12 font-sans justify-center">
        
        {/* Mobile Background Elements */}
        <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-purple-600/30 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[250px] h-[250px] bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />

        {/* 1. APP HEADER */}
        <div className="flex items-center justify-between mb-6 md:mb-10 relative z-10">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-1.5 backdrop-blur-md md:py-2 md:pl-2.5 md:pr-5">
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20">
                    <Image 
                        src="https://i.postimg.cc/c4QsPY2p/Screenshot-2025-12-21-154814.png" 
                        alt="Profile" width={42} height={42} className="object-cover w-full h-full" 
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-[#050511] rounded-full z-10"></div>
                </div>
                
                <div className="flex flex-col leading-none gap-0.5">
                    <span className="text-gray-400 text-[9px] md:text-[11px] font-medium uppercase tracking-wider">Status</span>
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-green-500"></span>
                        </span>
                        <span className="text-white font-bold text-xs md:text-sm">Available for Work</span>
                    </div>
                </div>
            </div>

            <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-cyan-400 active:scale-95 transition-transform">
                <div className="relative">
                    <Bell size={18} className="md:w-6 md:h-6" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full border border-[#050511]" />
                </div>
            </button>
        </div>

        {/* 2. HERO CARD */}
       {/* 2. HERO CARD */}
        {/* Changed aspect ratio to md:aspect-[2/1] for better tablet shape */}
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-[30px] md:rounded-[40px] overflow-hidden mb-6 md:mb-10 border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 blur-[50px] rounded-full" />
            
            <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">
                <div className="flex flex-col justify-center h-full relative z-20">
                    {/* Increased font size for tablet */}
                    <h1 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase italic tracking-tighter">
                        DIGITAL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ALCHEMIST</span>
                    </h1>
                </div>
                
                {/* Fixed Image for Tablet: Made it larger and adjusted positioning */}
                <div className="relative h-[115%] md:h-[130%] w-[140px] md:w-[350px] -mb-8 -mr-5 md:-mr-10 md:-mb-12 flex items-end">
                    <Image 
                        src="https://i.postimg.cc/L8cTqLX8/Shakil-s-Personal-Portfolio-Banner.png" 
                        alt="Shakil" 
                        fill 
                        className="object-cover object-top drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    />
                </div>
            </div>
        </div>

        {/* 3. ACTION BUTTONS */}
        <div className="flex gap-4 md:gap-6 mb-8 md:mb-12">
            <button 
                onClick={scrollToWork}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 md:py-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300 font-bold text-xs md:text-sm uppercase tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95 transition-transform"
            >
                <Briefcase size={16} className="md:w-5 md:h-5" />
                View Work
            </button>
            <button 
                onClick={scrollToContact}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 md:py-5 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-300 font-bold text-xs md:text-sm uppercase tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.2)] active:scale-95 transition-transform"
            >
                <Calendar size={16} className="md:w-5 md:h-5" />
                Start a Project
            </button>
        </div>

        {/* 4. EXPERTISE HUB (Bento Grid) */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 h-[240px] md:h-[320px] mb-4">
            <div className="flex flex-col gap-4 md:gap-6 h-full">
                <div 
                    onClick={() => scrollToSection('web')}
                    className="cursor-pointer flex-1 bg-gradient-to-b from-blue-900/40 to-blue-900/10 border border-blue-500/20 rounded-3xl md:rounded-[32px] p-4 md:p-6 flex flex-col justify-center items-center text-center shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] active:scale-95 transition-transform hover:bg-blue-900/20"
                >
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                        <Monitor size={20} className="md:w-7 md:h-7" />
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm tracking-wider">WEBSITES</span>
                </div>
                <div 
                    onClick={() => scrollToSection('video')}
                    className="cursor-pointer h-[80px] md:h-[110px] bg-white/5 border border-white/10 rounded-3xl md:rounded-[32px] p-4 md:p-6 flex items-center gap-3 active:scale-95 transition-transform hover:bg-white/10"
                >
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Play size={16} className="md:w-6 md:h-6" />
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm tracking-wider">MOTION GRAPHIC</span>
                </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 h-full">
                 <div 
                    onClick={() => scrollToSection('graphics')}
                    className="cursor-pointer h-[80px] md:h-[110px] bg-white/5 border border-white/10 rounded-3xl md:rounded-[32px] p-4 md:p-6 flex items-center gap-3 active:scale-95 transition-transform hover:bg-white/10"
                 >
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                        <PenTool size={16} className="md:w-6 md:h-6" />
                    </div>
                    <span className="text-gray-300 font-bold text-xs md:text-sm tracking-wider">GRAPHIC DESIGN</span>
                </div>
                <div 
                    onClick={() => scrollToSection('mobile')}
                    className="cursor-pointer flex-1 bg-gradient-to-b from-purple-900/40 to-purple-900/10 border border-purple-500/20 rounded-3xl md:rounded-[32px] p-4 md:p-6 flex flex-col justify-center items-center text-center shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] active:scale-95 transition-transform hover:bg-purple-900/20"
                >
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-2 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                        <Smartphone size={20} className="md:w-7 md:h-7" />
                    </div>
                    <span className="text-white font-bold text-xs md:text-sm tracking-wider">MOBILE APP</span>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}