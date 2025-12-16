"use client";

import Link from "next/link";
import Image from "next/image";
// Lucide icons removed because they were only used in the dock

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#050511] py-12 lg:py-0">
      
      {/* === 1. BACKGROUND EFFECTS === */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none opacity-20" />


      {/* === 2. MAIN CONTENT WRAPPER === */}
      <div className="container px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between h-full max-w-[1400px]">
        
        {/* --- LEFT SIDE: TEXT --- */}
        <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 z-20 mb-10 lg:mb-0 lg:pr-6 max-w-[650px]">
          
          <h1 className="flex flex-col font-black tracking-tighter leading-[0.9]">
            {/* Clamp Logic for Text */}
            <span className="text-[clamp(60px,12vw,130px)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              DIGITAL
            </span>
            <span className="text-[clamp(50px,10vw,110px)] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-300 to-gray-600 drop-shadow-xl pb-2">
              ARCHITECT
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-lg text-gray-300 font-medium tracking-widest uppercase max-w-[90%] sm:max-w-lg leading-relaxed">
            Senior Full-Stack & Mobile Expert <span className="hidden sm:inline text-gray-500 mx-2">|</span> <br className="sm:hidden" /> Visuals by Design.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4 sm:pt-6 w-full">
            <button className="flex-1 sm:flex-none min-w-[140px] px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#1a56db] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-600 transition-all hover:scale-105 active:scale-95">
              VIEW WORK
            </button>
            <button className="flex-1 sm:flex-none min-w-[140px] px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-purple-500/30 bg-[#1e1b4b]/50 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:bg-purple-900/20 transition-all hover:scale-105 active:scale-95">
              GET IN TOUCH
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: IMAGE --- */}
        <div className="w-full lg:flex-1 flex justify-center lg:justify-end relative">
            
            <div className="relative w-[65vw] max-w-[280px] sm:max-w-[350px] lg:max-w-[380px] xl:max-w-[420px] aspect-[4/5]">
                
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 rounded-full blur-[60px] sm:blur-[80px] opacity-50 sm:opacity-60 pointer-events-none animate-pulse-slow"></div>

                {/* Glass Card */}
                <div className="relative z-10 w-full h-full rounded-[24px] sm:rounded-[35px] border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden group">
                    <div className="absolute -top-[50%] -right-[50%] w-[150%] h-[150%] bg-gradient-to-b from-white/10 via-transparent to-transparent rotate-45 pointer-events-none z-20" />
                    
                    <Image 
                        src="https://i.postimg.cc/DfLDPdRf/Shakil-portfolio-banner.png" 
                        alt="Shakil Profile"
                        fill
                        className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700"
                        priority
                        sizes="(max-width: 768px) 70vw, 400px"
                    />
                </div>
            </div>
        </div>

      </div>

    </section>
  );
}