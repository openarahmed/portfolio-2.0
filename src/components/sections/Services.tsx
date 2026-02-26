"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Smartphone,
  Clapperboard,
  ArrowUpRight,
  Palette,
  Camera,
  MonitorPlay,
  ShoppingCart,
  Globe,
  Briefcase,
  Layers,
  LayoutDashboard,
  Monitor,
  Fingerprint,
  Video,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "WEB DEVELOPMENT",
    desc: "MERN Stack, Scalable Architecture, SEO & Performance.",
    icon: <Code2 />,
    gradient: "from-cyan-500 to-blue-600",
    borderDefault: "border-cyan-500/30",
    borderHover: "group-hover:border-cyan-400",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    glow: "group-hover:shadow-[0_0_50px_rgba(6,182,212,0.4)]",
    tags: [
      { name: "E-Commerce", icon: <ShoppingCart size={14} /> },
      { name: "Business Websites", icon: <Briefcase size={14} /> },
      { name: "News Portals", icon: <Globe size={14} /> },
      { name: "SaaS Dashboards", icon: <LayoutDashboard size={14} /> },
      { name: "Landing Pages", icon: <Monitor size={14} /> },
    ],
  },
  {
    id: 2,
    title: "MOBILE APP SOLUTION",
    desc: "iOS & Android, Cross-platform Flutter/React Native, UI/UX.",
    icon: <Smartphone />,
    gradient: "from-purple-500 to-fuchsia-600",
    borderDefault: "border-purple-500/30",
    borderHover: "group-hover:border-purple-400",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    glow: "group-hover:shadow-[0_0_50px_rgba(192,38,211,0.4)]",
    tags: [
      { name: "Native iOS & Android", icon: <Smartphone size={14} /> },
      { name: "Cross-Platform", icon: <Layers size={14} /> },
      { name: "App UI/UX Design", icon: <Palette size={14} /> },
      { name: "API Integration", icon: <Code2 size={14} /> },
      { name: "App Maintenance", icon: <LayoutDashboard size={14} /> },
    ],
  },
  {
    id: 3,
    title: "CREATIVE PRODUCTION",
    desc: "Graphic Design, Motion Graphics & Photography.",
    icon: <Clapperboard />,
    gradient: "from-orange-500 to-red-600",
    borderDefault: "border-orange-500/30",
    borderHover: "group-hover:border-orange-400",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    glow: "group-hover:shadow-[0_0_50px_rgba(234,88,12,0.4)]",
    links: [
      {
        name: "Graphic Design",
        url: "/creative/graphic-design",
        icon: <Palette size={14} />,
      },
      {
        name: "Motion Graphics",
        url: "/creative/motion-graphics",
        icon: <MonitorPlay size={14} />,
      },
      {
        name: "Photography",
        url: "/creative/photography",
        icon: <Camera size={14} />,
      },
      {
        name: "Brand Identity",
        url: "/creative/graphic-design",
        icon: <Fingerprint size={14} />,
      },
      {
        name: "Video Production",
        url: "/creative/motion-graphics",
        icon: <Video size={14} />,
      },
    ],
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-blue-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] bg-purple-900/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* --- TITLE SECTION --- */}
        <div className="text-left mb-8 lg:mb-20 max-w-4xl">
          <h2 className="flex flex-col font-black tracking-tighter uppercase leading-[0.9]">
            <span className="text-[clamp(2.5rem,6vw,5rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-lg">
              WHAT I DO
            </span>
          </h2>
          <div className="w-12 sm:w-24 h-1 sm:h-1.5 mt-3 sm:mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </div>

        {/* --- MOBILE VIEW (Slider) --- */}
        <div className="block md:hidden relative w-full">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="snap-center w-[85vw] flex-shrink-0"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center -mt-2 mb-4">
            <div className="flex gap-1.5 p-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
              {services.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-6 bg-gradient-to-r from-blue-500 to-purple-500"
                      : "w-1.5 bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- TABLET VIEW (Grid Layout) --- */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {services.slice(0, 2).map((service) => (
            <div key={service.id} className="h-full">
              <ServiceCard service={service} />
            </div>
          ))}
          <div className="col-span-2 h-full">
            <ServiceCard service={services[2]} isHorizontal={true} />
          </div>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
          {services.map((service) => (
            <div key={service.id} className="h-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- COLORFUL SERVICE CARD ---
function ServiceCard({
  service,
  isHorizontal = false,
}: {
  service: any;
  isHorizontal?: boolean;
}) {
  return (
    <div
      className={`group relative w-full h-full rounded-[24px] sm:rounded-[30px] border ${service.borderDefault} bg-[#0b0f19] p-6 sm:p-8 flex ${isHorizontal ? "flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10" : "flex-col items-start gap-6"} overflow-hidden transition-all duration-500 hover:-translate-y-2 ${service.borderHover} ${service.glow}`}
    >
      {/* 1. PERMANENT BACKGROUND TINT */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-[0.05] transition-opacity duration-500 group-hover:opacity-10`}
      />

      {/* 2. COLORFUL BLOB */}
      <div
        className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${service.gradient} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
      />

      {/* 3. MASSIVE WATERMARK ICON */}
      <div
        className={`absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none ${service.iconColor} [&>svg]:w-48 [&>svg]:h-48 md:[&>svg]:w-64 md:[&>svg]:h-64`}
      >
        {service.icon}
      </div>

      {/* 4. TOP ICON SECTION */}
      <div className={`relative z-10 ${isHorizontal ? "w-auto" : "w-full"}`}>
        <div className="flex justify-between items-start w-full">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${service.iconBg} border ${service.borderDefault} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-opacity-20`}
          >
            <div
              className={`${service.iconColor} transition-all duration-500 [&>svg]:w-7 [&>svg]:h-7 sm:[&>svg]:w-8 sm:[&>svg]:h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
            >
              {service.icon}
            </div>
          </div>

          {!isHorizontal && (
            <div
              className={`${service.iconColor} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300`}
            >
              <ArrowUpRight className="w-6 h-6" />
            </div>
          )}
        </div>
      </div>

      {/* 5. CONTENT SECTION */}
      <div
        className={`relative z-10 flex flex-col justify-start ${isHorizontal ? "flex-1" : "flex-1 w-full"}`}
      >
        <div className="flex items-center justify-between mb-3 w-full">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase leading-none">
            {service.title}
          </h3>
          {isHorizontal && (
            <div
              className={`${service.iconColor} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ml-4`}
            >
              <ArrowUpRight className="w-6 h-6" />
            </div>
          )}
        </div>

        <p className="text-gray-400 font-medium text-xs sm:text-sm leading-relaxed max-w-[95%] group-hover:text-gray-200 transition-colors duration-300">
          {service.desc}
        </p>

        {/* 6. PILL SYSTEM */}
        <div className="flex flex-col items-start gap-2.5 mt-6 w-full">
          {/* Render Interactive Links (Creative Production) */}
          {service.links &&
            service.links.map((link: any) => (
              <Link
                key={link.name}
                href={link.url}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 w-max"
              >
                <span className={service.iconColor}>{link.icon}</span>
                {link.name}
              </Link>
            ))}

          {/* Render Static Tags (Web & Mobile Apps) */}
          {service.tags &&
            service.tags.map((tag: any) => (
              <div
                key={tag.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest w-max"
              >
                <span className={service.iconColor}>{tag.icon}</span>
                {tag.name}
              </div>
            ))}
        </div>
      </div>

      {/* 7. BOTTOM GLOW BAR */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} transition-all duration-500 w-0 group-hover:w-full`}
      />
    </div>
  );
}
