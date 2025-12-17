"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#050511]">
      
      {/* === 1. BACKGROUND EFFECTS === */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none opacity-20" />

      {/* === 2. MAIN CONTENT WRAPPER === */}
      {/* MOBILE TWEAK: 
          - pt-16 (Reduced from pt-24 to pull content UP)
          - pb-0 (No bottom padding on container, handled by image wrapper)
      */}
      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between h-full w-full
        px-4 sm:px-6 lg:px-8 xl:px-12 
        pt-16 lg:pt-0 pb-0 
        gap-y-6 lg:gap-y-0">
        
        {/* --- LEFT SIDE: TEXT --- */}
        <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20 max-w-[800px]">
          
          <h1 className="flex flex-col font-black tracking-tighter leading-[0.9] select-none">
            {/* BIGGER MOBILE TEXT:
               - Min size increased to 3.5rem (Digital) and 3rem (Architect)
               - Desktop max size remains 7.5rem/6.5rem (Huge)
            */}
            <span className="text-[clamp(3.5rem,12vw,7.5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              DIGITAL
            </span>
            <span className="text-[clamp(3rem,11vw,6.5rem)] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-300 to-gray-600 drop-shadow-xl pb-2">
              ARCHITECT
            </span>
          </h1>

          <p className="mt-4 lg:mt-[clamp(1rem,1.5vw,2rem)] text-[10px] sm:text-sm lg:text-[1.125rem] text-gray-300 font-medium tracking-[0.2em] uppercase max-w-[300px] sm:max-w-xl leading-relaxed">
            Senior Full-Stack & Mobile Expert 
            <span className="hidden sm:inline text-blue-500 mx-3">|</span> 
            <br className="sm:hidden" /> 
            <span className="text-gray-400">Visuals by Design.</span>
          </p>

          <div className="flex flex-row justify-center lg:justify-start gap-3 lg:gap-4 mt-6 lg:mt-[clamp(2rem,3vw,3.5rem)] w-full max-w-[350px] lg:max-w-none">
            
            <button className="flex-1 sm:flex-none min-w-[auto] sm:min-w-[150px] px-4 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#1a56db] text-white font-bold text-[10px] sm:text-sm tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 group relative overflow-hidden">
              <span className="relative z-10">VIEW WORK</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            <button className="flex-1 sm:flex-none min-w-[auto] sm:min-w-[150px] px-4 sm:px-8 py-3 sm:py-4 rounded-xl border border-purple-500/30 bg-[#1e1b4b]/50 text-white font-bold text-[10px] sm:text-sm tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:bg-purple-900/20 transition-all hover:scale-105 active:scale-95">
              GET IN TOUCH
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: IMAGE --- */}
        {/* pb-24 ensures image sits above the floating dock */}
        <div className="w-full lg:flex-1 flex justify-center lg:justify-end relative mt-6 lg:mt-0 pb-24 lg:pb-0 lg:pl-10">
            
            <div className="relative w-[240px] sm:w-[350px] lg:w-[clamp(280px,60vw,480px)] aspect-[4/5]">
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 rounded-full blur-[60px] opacity-40 animate-pulse-slow"></div>

                <div className="relative z-10 w-full h-full rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden group">
                    <div className="absolute -top-[50%] -right-[50%] w-[150%] h-[150%] bg-gradient-to-b from-white/10 via-transparent to-transparent rotate-45 pointer-events-none z-20" />
                    
                    <Image 
                        src="https://i.postimg.cc/DfLDPdRf/Shakil-portfolio-banner.png" 
                        alt="Shakil Profile"
                        fill
                        className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700"
                        priority
                        sizes="(max-width: 768px) 70vw, 500px"
                    />
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}