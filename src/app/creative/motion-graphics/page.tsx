"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  X,
  Share2,
  Check,
  MonitorPlay,
  ArrowRight,
  Facebook,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";

// ✅ Import data and interface
import { motionData, type MotionProject } from "./data";

export default function MotionGraphicsPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] =
    useState<MotionProject | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    url: string;
    title: string;
  } | null>(null);

  const [linkCopied, setLinkCopied] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState("");

  // Auto-sort data by date
  const sortedData = useMemo(() => {
    return [...motionData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, []);

  const caseStudies = sortedData.filter((item) => item.type === "case-study");
  const standaloneAssets = sortedData.filter(
    (item) => item.type === "standalone",
  );

  // Read URL parameters for Deep Linking
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentOrigin(window.location.origin);
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get("video");
      if (videoId) {
        const targetVideo = motionData.find((item) => item.id === videoId);
        if (targetVideo) {
          if (targetVideo.type === "case-study") {
            setSelectedCaseStudy(targetVideo);
          } else {
            setSelectedVideo({
              id: targetVideo.id,
              url: targetVideo.videoUrl,
              title: targetVideo.title,
            });
          }
        }
      }
    }
  }, []);

  // Routing handlers
  const handleOpenCaseStudy = (study: MotionProject) => {
    setSelectedCaseStudy(study);
    if (typeof window !== "undefined")
      window.history.pushState(null, "", `?video=${study.id}`);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
    if (typeof window !== "undefined")
      window.history.pushState(null, "", window.location.pathname);
  };

  const handleOpenStandaloneVideo = (
    id: string,
    videoUrl: string,
    title: string,
  ) => {
    setSelectedVideo({ id, url: videoUrl, title });
    if (typeof window !== "undefined")
      window.history.pushState(null, "", `?video=${id}`);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    if (typeof window !== "undefined") {
      if (selectedCaseStudy) {
        window.history.pushState(null, "", `?video=${selectedCaseStudy.id}`);
      } else {
        window.history.pushState(null, "", window.location.pathname);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#050511] text-white selection:bg-purple-500/30 font-sans pb-58">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes customFadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .stagger-item { opacity: 0; animation: customFadeInUp 0.6s ease-out forwards; }
      `,
        }}
      />

      {/* === 1. HERO SECTION === */}
      <section className="relative w-full h-[45vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden py-10">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={motionData[0].thumbnailUrl}
            alt="Motion Graphics Background"
            fill
            className="object-cover object-center opacity-30 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050511]/40 via-[#050511]/80 to-[#050511]" />
        </div>

        <Link
          href="/"
          className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase hidden md:inline-block">
            Back to Portfolio
          </span>
        </Link>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-6">
          <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <MonitorPlay className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl mb-3">
            Motion & Editing
          </h1>
          <p className="text-purple-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-5">
            Bringing visuals to life
          </p>

          <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-5 rounded-full" />

          <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-medium max-w-2xl mx-auto">
            Static design is only half the story. I utilize professional editing
            and cutting-edge tools to craft compelling visual stories and
            dynamic content that commands attention.
          </p>
        </div>
      </section>

      {/* === 2. FEATURED CASE STUDIES === */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8 mb-24 md:mb-32 space-y-20 md:space-y-28">
        <div className="border-b border-white/10 pb-4 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Cinematic Projects
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
              Deep Dives into Video Production
            </p>
          </div>
        </div>

        {caseStudies.map((study, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={study.id}
              className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
            >
              <div
                className="w-full lg:w-1/2 relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                onClick={() => handleOpenCaseStudy(study)}
              >
                <Image
                  src={study.thumbnailUrl}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-50 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-[ping_1.5s_ease-in-out_infinite] rounded-full bg-white/20 opacity-30"></span>
                    <span className="absolute inline-flex h-[85%] w-[85%] animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-purple-100/10 blur-md"></span>
                    <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-4 w-max">
                  <MonitorPlay size={12} /> {study.category}
                </div>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                  {study.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {study.tags?.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-bold text-gray-300 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenCaseStudy(study)}
                  className="w-max px-6 py-3 md:px-8 md:py-4 rounded-xl border border-white/20 bg-transparent text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all active:scale-95 flex items-center gap-2 group"
                >
                  <Play size={16} className="fill-current" /> Watch Project{" "}
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform ml-1"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* === 3. STANDALONE ASSETS === */}
      {standaloneAssets.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="mb-10 border-b border-white/10 pb-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Video Archive
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
              Shorts, UI Motion & Loops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
            {standaloneAssets.map((asset) => (
              <div
                key={asset.id}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0b0f19] ${asset.gridSpan || "col-span-1 row-span-1"}`}
                onClick={() =>
                  handleOpenStandaloneVideo(
                    asset.id,
                    asset.videoUrl,
                    asset.title,
                  )
                }
              >
                <Image
                  src={asset.thumbnailUrl}
                  alt={asset.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-purple-400 text-[9px] font-bold tracking-widest uppercase mb-1">
                    {asset.category}
                  </p>
                  <h3
                    className={`font-bold text-white tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${asset.gridSpan?.includes("row-span-2") ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
                  >
                    {asset.title}
                  </h3>
                  <div className="h-0.5 w-0 bg-purple-500 mt-2 group-hover:w-10 transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* === 4. CALL TO ACTION === */}
      <section className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4">
          Let's Animate Ideas
        </h2>
        <p className="text-gray-400 mb-8 font-medium text-sm md:text-base">
          From cinematic storytelling to dynamic web content. Let's build
          something exceptional together.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-purple-600 text-white font-black text-xs tracking-widest uppercase hover:bg-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 active:scale-95"
        >
          Start a Project
        </Link>
      </section>

      {/* === 5. RICH CASE STUDY MODAL === */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[90] bg-[#050511] overflow-y-auto animate-in fade-in duration-300 scroll-smooth">
          <div className="fixed top-0 w-full px-4 md:px-6 py-4 flex items-center justify-between bg-[#050511]/80 backdrop-blur-xl border-b border-white/5 z-50">
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400">
              Video Project
            </span>
            <div className="flex gap-2 items-center">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentOrigin}/creative/motion-graphics/${selectedCaseStudy.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#1877F2] transition-colors hidden sm:block"
                title="Share on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${currentOrigin}/creative/motion-graphics/${selectedCaseStudy.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#0A66C2] transition-colors hidden sm:block"
                title="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${currentOrigin}/creative/motion-graphics/${selectedCaseStudy.id}`,
                  );
                  setLinkCopied(true);
                  setTimeout(() => setLinkCopied(false), 2000);
                }}
                className="p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                title="Copy Link"
              >
                {linkCopied ? (
                  <Check size={18} className="text-purple-400" />
                ) : (
                  <LinkIcon size={18} />
                )}
              </button>
              <button
                onClick={handleCloseCaseStudy}
                className="p-2 md:p-2.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors ml-2 border border-red-500/30"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="relative w-full h-[40vh] md:h-[75vh] mt-14 md:mt-16 bg-black border-b border-white/10">
            <iframe
              src={`${selectedCaseStudy.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
              className="absolute inset-0 w-full h-full"
              title={selectedCaseStudy.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
            <div className="mb-12 md:mb-16 text-center stagger-item">
              <div className="inline-block px-3 py-1 mb-6 rounded-full border border-purple-500/30 text-purple-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {selectedCaseStudy.category}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-6">
                {selectedCaseStudy.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {selectedCaseStudy.tags?.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest"
                  >
                    {tag}{" "}
                    {i < (selectedCaseStudy.tags?.length || 0) - 1 && (
                      <span className="mx-2 text-white/20">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <div
                className="col-span-1 flex flex-row md:flex-col gap-8 md:gap-8 stagger-item"
                style={{ animationDelay: "100ms" }}
              >
                <div className="flex-1 md:flex-none">
                  <h4 className="text-white text-[11px] md:text-sm font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                    Role
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {selectedCaseStudy.richContent?.role}
                  </p>
                </div>
                <div className="flex-1 md:flex-none">
                  <h4 className="text-white text-[11px] md:text-sm font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                    Timeline
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {new Date(selectedCaseStudy.date).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )}
                  </p>
                </div>
              </div>

              <div
                className="col-span-1 md:col-span-2 space-y-10 md:space-y-12 stagger-item"
                style={{ animationDelay: "200ms" }}
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                    The Challenge
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {selectedCaseStudy.richContent?.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                    The Solution
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {selectedCaseStudy.richContent?.solution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === 6. SIMPLE VIDEO LIGHTBOX MODAL === */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={handleCloseVideo}
        >
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 md:gap-3 z-50">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentOrigin}/creative/motion-graphics/${selectedVideo.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-[#1877F2] transition-colors backdrop-blur-md hidden md:flex border border-[#1877F2]/30"
              title="Share on Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${currentOrigin}/creative/motion-graphics/${selectedVideo.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#0A66C2]/20 hover:bg-[#0A66C2]/40 text-[#0A66C2] transition-colors backdrop-blur-md hidden md:flex border border-[#0A66C2]/30"
              title="Share on LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <button
              title="Copy Direct Link"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${currentOrigin}/creative/motion-graphics/${selectedVideo.id}`,
                );
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md mr-4 border border-white/20"
            >
              {linkCopied ? (
                <Check size={20} className="text-purple-400" />
              ) : (
                <LinkIcon size={20} />
              )}
            </button>
            <button
              title="Close"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseVideo();
              }}
              className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors backdrop-blur-md ml-2 md:ml-4 border border-red-500/30"
            >
              <X size={24} />
            </button>
          </div>

          <div
            className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${selectedVideo.url}?autoplay=1&rel=0&modestbranding=1`}
              className="absolute inset-0 w-full h-full"
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-medium tracking-widest text-sm uppercase pointer-events-none">
            {selectedVideo.title}
          </div>
        </div>
      )}
    </main>
  );
}
