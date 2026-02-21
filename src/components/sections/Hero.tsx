"use client";

import React from "react";
import Image from "next/image";
import {
  Bell,
  Briefcase,
  Calendar,
  PenTool,
  PlaySquare,
  Smartphone,
  Monitor,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) workSection.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#09090e] overflow-hidden">
      {/* =========================================
          DESKTOP VIEW (Premium Glass, strictly lg and above)
         ========================================= */}
      <div className="hidden lg:flex min-h-[100dvh] w-full flex-col items-center justify-center relative px-8 py-12">
        <div className="fixed top-0 left-0 w-[50vw] h-[50vw] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="relative z-10 w-full max-w-[1100px] 2xl:max-w-[1400px] rounded-[40px] bg-[#12121c]/95 backdrop-blur-xl border border-white/5 p-16 2xl:p-20 flex flex-row items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500">
          <div className="flex-1 flex flex-col items-start text-left z-20">
            <div className="inline-flex items-center gap-2 bg-[#1a1a24] rounded-full py-2 px-4 mb-6 border border-white/10 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-[11px] font-bold uppercase tracking-wider">
                AVAILABLE FOR WORK
              </span>
            </div>

            <h1 className="flex flex-col font-black tracking-tighter leading-[1.05] select-none text-left">
              <span className="text-[4rem] xl:text-[4.5rem] 2xl:text-[5.5rem] text-white transition-all duration-500">
                WEB & APP
              </span>
              <span className="text-[4rem] xl:text-[5rem] 2xl:text-[6rem] text-[#9373ff] py-1 transition-all duration-500">
                DEVELOPER
              </span>
            </h1>

            <p className="mt-6 2xl:mt-8 text-[13px] 2xl:text-[15px] font-bold tracking-[0.25em] uppercase max-w-xl 2xl:max-w-2xl leading-relaxed text-left flex flex-wrap gap-4 transition-all duration-500">
              <span className="text-[#3b82f6]">WEBSITE</span>
              <span className="text-[#2a2a3d]">•</span>
              <span className="text-[#a855f7]">MOBILE APP</span>
              <span className="text-[#2a2a3d]">•</span>
              <span className="text-[#ec4899]">GRAPHIC</span>
              <span className="text-[#2a2a3d]">•</span>
              <span className="text-[#f97316]">MOTION</span>
            </p>

            <p className="mt-4 2xl:mt-5 text-[#8b8b9e] text-[13px] 2xl:text-[15px] max-w-md leading-relaxed tracking-wide transition-all duration-500">
              Crafting digital experiences that captivate
            </p>

            <div className="flex flex-row gap-5 mt-8 2xl:mt-10">
              <button
                onClick={scrollToWork}
                className="px-8 py-4 2xl:px-10 2xl:py-5 rounded-xl bg-[#2563eb] text-white font-bold text-xs 2xl:text-sm tracking-widest shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Briefcase size={16} /> VIEW WORK
              </button>
              <button
                onClick={scrollToContact}
                className="px-8 py-4 2xl:px-10 2xl:py-5 rounded-xl border border-[#3b2563] bg-[#161026] text-white font-bold text-xs 2xl:text-sm tracking-widest hover:bg-[#20163b] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
              >
                <Calendar size={16} className="text-[#9373ff]" /> START A
                PROJECT
              </button>
            </div>
          </div>

          <div className="flex-none relative w-[380px] 2xl:w-[480px] aspect-[4/5] group overflow-hidden rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-all duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#250b4d_10%,transparent_80%)] opacity-95 z-0"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[300px] h-[300px] bg-[#5b21b6]/60 blur-[75px] rounded-full pointer-events-none z-0"></div>
            <Image
              src="https://i.postimg.cc/L8cTqLX8/Shakil-s-Personal-Portfolio-Banner.png"
              alt="Shakil Profile"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              quality={90}
              className="object-cover object-bottom scale-100 group-hover:scale-105 transition-transform duration-700 relative z-10"
              priority
            />
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE & TABLET VIEW (Compact Stacked Layout)
         ========================================= */}
      <div className="flex lg:hidden flex-col w-full min-h-[100dvh] bg-[#0d0d16] relative px-5 md:px-16 pt-3 md:pt-10 pb-10 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8 z-10">
          <h1 className="text-[28px] md:text-[40px] font-bold text-[#7c3aed] tracking-tight lowercase">
            shakil.
          </h1>
          <div className="flex items-center gap-3 md:gap-5">
            <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#161626] text-cyan-400 relative">
              <Bell className="w-[18px] h-[18px] md:w-6 md:h-6" />
              <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-[#2a2a40]">
              <Image
                src="https://i.postimg.cc/c4QsPY2p/Screenshot-2025-12-21-154814.png"
                alt="Profile"
                width={48}
                height={48}
                quality={75}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative w-full h-[220px] md:h-[340px] rounded-[32px] md:rounded-[40px] bg-gradient-to-b from-[#16162b] to-[#0f0f1c] border border-[#232338] p-6 md:p-10 mb-6 md:mb-8 overflow-hidden shadow-2xl">
          <div className="relative z-10 w-[65%] md:w-[60%] h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <span className="text-white text-[11px] md:text-[14px] font-bold uppercase tracking-wider">
                SHAKIL AHMED
              </span>
            </div>

            <h2 className="font-black leading-[1.1] tracking-wide mb-4 md:mb-6">
              <span className="text-white text-[20px] md:text-[34px]">
                WEB AND APP
              </span>
              <br />
              <span className="text-[#8b5cf6] text-[25px] md:text-[42px]">
                DEVELOPER
              </span>
            </h2>

            <div className="inline-flex items-center gap-2 bg-[#121220] rounded-full py-1.5 md:py-2 pl-1.5 md:pl-2 pr-4 md:pr-5 mb-2 md:mb-4 border border-[#2a2a3d] w-max">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white text-[11px] md:text-[13px] font-semibold">
                Available for Work
              </span>
            </div>

            <p className="text-gray-300 text-[10px] md:text-[14px] leading-relaxed max-w-[170px] md:max-w-[260px]">
              Crafting digital experiences that captivate
            </p>
          </div>

          {/* FIXED: Changed object-cover to object-contain object-bottom to prevent head cropping */}
          <div className="absolute bottom-0 -right-4 md:right-0 w-[55%] md:w-[50%] h-[100%] md:h-full pointer-events-none">
            <Image
              src="https://i.postimg.cc/L8cTqLX8/Shakil-s-Personal-Portfolio-Banner.png"
              alt="Shakil"
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              quality={85}
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 md:gap-6 mb-6 md:mb-10">
          <button
            onClick={scrollToWork}
            className="flex-1 flex items-center justify-center gap-2 py-3 md:py-5 rounded-xl md:rounded-2xl border border-[#2a2a3d] bg-transparent text-white font-bold text-xs md:text-sm tracking-wide active:scale-95 transition-transform"
          >
            <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            VIEW WORK
          </button>
          <button
            onClick={scrollToContact}
            className="flex-1 flex items-center justify-center gap-2 py-3 md:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-bold text-xs md:text-sm tracking-wide active:scale-95 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            START A PROJECT
          </button>
        </div>

        {/* Expertise Section */}
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-bold tracking-widest text-sm md:text-lg uppercase">
              EXPERTISE
            </h3>
          </div>
          <button className="text-white flex items-center gap-1 text-[13px] md:text-[16px] hover:text-cyan-400 transition-colors">
            See all <ArrowRight className="w-[14px] h-[14px] md:w-5 md:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="bg-[#121220] border border-[#232338] rounded-3xl md:rounded-[32px] p-4 md:p-8 flex flex-col justify-center items-center text-center aspect-square shadow-lg">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-[#1c1c30] rounded-xl md:rounded-2xl flex items-center justify-center text-cyan-400 mb-3 md:mb-5">
              <Monitor className="w-[18px] h-[18px] md:w-8 md:h-8" />
            </div>
            <h4 className="text-white font-bold text-[13px] md:text-[18px] mb-1 md:mb-2">
              Websites
            </h4>
            <p className="text-gray-400 text-[10px] md:text-[14px] leading-tight md:leading-snug">
              Next.js • MERN • <br className="md:hidden" /> Typescript
            </p>
          </div>

          <div className="bg-[#121220] border border-[#232338] rounded-3xl md:rounded-[32px] p-4 md:p-8 flex flex-col justify-center items-center text-center aspect-square shadow-lg">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-[#1c1c30] rounded-xl md:rounded-2xl flex items-center justify-center text-cyan-400 mb-3 md:mb-5">
              <Smartphone className="w-[18px] h-[18px] md:w-8 md:h-8" />
            </div>
            <h4 className="text-white font-bold text-[13px] md:text-[18px] mb-1 md:mb-2">
              Mobile Apps
            </h4>
            <p className="text-gray-400 text-[10px] md:text-[14px] leading-tight md:leading-snug">
              React Native • Expo • <br className="md:hidden" /> Typescript
            </p>
          </div>

          <div className="bg-[#121220] border border-[#232338] rounded-3xl md:rounded-[32px] p-4 md:p-8 flex flex-col justify-center items-center text-center aspect-square shadow-lg">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-[#1c1c30] rounded-xl md:rounded-2xl flex items-center justify-center text-cyan-400 mb-3 md:mb-5">
              <PenTool className="w-[18px] h-[18px] md:w-8 md:h-8" />
            </div>
            <h4 className="text-white font-bold text-[13px] md:text-[18px] mb-1 md:mb-2">
              Graphic Design
            </h4>
            <p className="text-gray-400 text-[10px] md:text-[14px] leading-tight md:leading-snug">
              Graphic Design • Branding
            </p>
          </div>

          <div className="bg-[#121220] border border-[#232338] rounded-3xl md:rounded-[32px] p-4 md:p-8 flex flex-col justify-center items-center text-center aspect-square shadow-lg">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-[#1c1c30] rounded-xl md:rounded-2xl flex items-center justify-center text-[#8b5cf6] mb-3 md:mb-5">
              <PlaySquare className="w-[18px] h-[18px] md:w-8 md:h-8" />
            </div>
            <h4 className="text-white font-bold text-[13px] md:text-[18px] mb-1 md:mb-2">
              Motion Graphics
            </h4>
            <p className="text-gray-400 text-[10px] md:text-[14px] leading-tight md:leading-snug">
              Motion Graphics • 3D • Animation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
