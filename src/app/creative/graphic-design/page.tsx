"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  X,
  Share2,
  Check,
  PenTool,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";

// === TYPESCRIPT INTERFACE ===
interface GraphicProject {
  id: string;
  date: string;
  type: "case-study" | "standalone";
  title: string;
  category: string;
  description?: string;
  url: string;
  tags?: string[];
  gridSpan?: string;
  richContent?: {
    role: string;
    challenge: string;
    solution: string;
    extraImages?: { id: string; url: string; title: string }[];
  };
}

// === GRAPHIC DESIGN DATA STRUCTURE (All Upgraded to Case Studies) ===
const graphicData: GraphicProject[] = [
  {
    id: "gd1",
    date: "2026-02-25",
    type: "case-study",
    title: "Premium Product Packaging",
    category: "Branding & Print",
    description:
      "A complete label and packaging design system emphasizing organic ingredients and premium market positioning.",
    url: "https://i.postimg.cc/MG0BZPrX/Label-for-holuder-copy.jpg",
    tags: ["Packaging", "Print Design", "Typography", "Photoshop"],
    richContent: {
      role: "Lead Visual Designer",
      challenge:
        "The market for organic spices is heavily saturated. The client needed a packaging design that felt both traditional/authentic and premium/modern to stand out on supermarket shelves.",
      solution:
        "I utilized a warm, earthy color palette combined with clean, modern typography. The focal point is a custom vector illustration that instantly communicates the product's core ingredient. The layout was carefully structured to ensure all regulatory information was readable without cluttering the visual hierarchy.",
    },
  },
  {
    id: "gd2",
    date: "2026-02-15",
    type: "case-study",
    title: "University Webinar Banner",
    category: "Digital Marketing",
    description:
      "A high-conversion digital banner designed for Northern University Bangladesh to promote an upcoming creative webinar.",
    url: "https://i.postimg.cc/2j04Btkt/nub-WEBINAR-(1).jpg",
    tags: ["Digital Banner", "Typography", "Marketing Asset", "Illustrator"],
    richContent: {
      role: "Graphic Designer",
      challenge:
        "Capturing the attention of students scrolling rapidly through social media feeds, requiring clear communication of the webinar's value proposition, date, and key speakers in a limited visual space.",
      solution:
        "Implemented a high-contrast color scheme aligned with NUB's brand identity. I used bold, hierarchical typography to make the key information pop, ensuring the call-to-action was immediately visible and legible on both desktop and mobile screens.",
    },
  },
  {
    id: "gd3",
    date: "2026-02-10",
    type: "case-study",
    title: "Social Media Campaign",
    category: "Brand Awareness",
    description:
      "A cohesive visual asset crafted for a targeted social media marketing campaign, focusing on audience engagement.",
    url: "https://i.postimg.cc/qRXTgn8k/graphics_design.jpg",
    tags: ["Social Media", "Campaign Design", "Layout", "Photoshop"],
    richContent: {
      role: "Content Designer",
      challenge:
        "Creating a visual language that felt fresh and engaging for a younger demographic while maintaining professional brand consistency across multiple digital platforms.",
      solution:
        "Developed a precise design system using dynamic layouts, modern gradient overlays, and strong focal imagery. The structured grid approach allowed the visual to communicate complex information cleanly without feeling cluttered.",
    },
  },
];

export default function GraphicDesignPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] =
    useState<GraphicProject | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [linkCopied, setLinkCopied] = useState(false);

  const sortedData = useMemo(() => {
    return [...graphicData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, []);

  const caseStudies = sortedData.filter((item) => item.type === "case-study");
  const standaloneAssets = sortedData.filter(
    (item) => item.type === "standalone",
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const designId = params.get("design");
      if (designId) {
        const targetDesign = graphicData.find((item) => item.id === designId);
        if (targetDesign) {
          if (targetDesign.type === "case-study") {
            setSelectedCaseStudy(targetDesign);
          } else {
            setSelectedImage({
              url: targetDesign.url,
              title: targetDesign.title,
            });
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPosition({ x: dx, y: dy });
    };

    const handleGlobalMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleOpenCaseStudy = (study: GraphicProject) => {
    setSelectedCaseStudy(study);
    if (typeof window !== "undefined")
      window.history.pushState(null, "", `?design=${study.id}`);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
    if (typeof window !== "undefined")
      window.history.pushState(null, "", window.location.pathname);
  };

  const handleOpenStandaloneImage = (
    id: string,
    url: string,
    title: string,
  ) => {
    setSelectedImage({ url, title });
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    if (typeof window !== "undefined")
      window.history.pushState(null, "", `?design=${id}`);
  };

  const handleOpenSubImage = (url: string, title: string) => {
    setSelectedImage({ url, title });
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    if (typeof window !== "undefined" && !selectedCaseStudy) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    setIsDragging(true);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#050511] text-white selection:bg-blue-500/30 font-sans pb-58">
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

      {/* === 1. HERO SECTION (Compact Layout) === */}
      <section className="relative w-full h-[45vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden py-10">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={graphicData[1]?.url || graphicData[0].url}
            alt="Graphic Design Background"
            fill
            className="object-cover object-center opacity-20 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate] grayscale-[50%]"
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

        {/* Compressed Text Block */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-6">
          <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <PenTool className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl mb-3">
            Visual Architecture
          </h1>
          <p className="text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-5">
            Designing the foundation
          </p>

          <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-5 rounded-full" />

          <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-medium max-w-2xl mx-auto">
            Before I write a single line of code, I architect the visual
            language. My background as a graphic designer ensures that every
            application I build is fundamentally rooted in strong typography,
            layout, and color theory.
          </p>
        </div>
      </section>

      {/* === 2. FEATURED CASE STUDIES === */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8 mb-24 md:mb-32 space-y-20 md:space-y-28">
        <div className="border-b border-white/10 pb-4 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Case Studies
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
              Deep Dives into Design Projects
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
                className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
                onClick={() => handleOpenCaseStudy(study)}
              >
                <Image
                  src={study.url}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-black/80 border border-white/20 text-white font-bold tracking-widest uppercase text-xs transform scale-90 group-hover:scale-100 transition-transform duration-500">
                    Read Case Study <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4 w-max">
                  <LayoutTemplate size={12} /> {study.category}
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
                  View Full Project{" "}
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* === 3. STANDALONE ASSETS (Bento Grid) - Preserved for future additions === */}
      {standaloneAssets.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="mb-10 border-b border-white/10 pb-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Design Archive
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
              Banners, Social & Print
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
            {standaloneAssets.map((asset) => (
              <div
                key={asset.id}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0b0f19] ${asset.gridSpan || "col-span-1 row-span-1"}`}
                onClick={() =>
                  handleOpenStandaloneImage(asset.id, asset.url, asset.title)
                }
              >
                <Image
                  src={asset.url}
                  alt={asset.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 z-20">
                  <ZoomIn size={18} />
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-blue-400 text-[9px] font-bold tracking-widest uppercase mb-1">
                    {asset.category}
                  </p>
                  <h3
                    className={`font-bold text-white tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${asset.gridSpan?.includes("row-span-2") ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
                  >
                    {asset.title}
                  </h3>
                  <div className="h-0.5 w-0 bg-blue-500 mt-2 group-hover:w-10 transition-all duration-500 ease-out" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* === 4. CALL TO ACTION === */}
      <section className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4">
          Let's Build Something
        </h2>
        <p className="text-gray-400 mb-8 font-medium text-sm md:text-base">
          From pixel-perfect branding to robust frontend architecture. I bring
          visual assets to life through code.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-black text-xs tracking-widest uppercase hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 active:scale-95"
        >
          Start a Project
        </Link>
      </section>

      {/* === 5. RICH CASE STUDY MODAL === */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[90] bg-[#050511] overflow-y-auto animate-in fade-in duration-300 scroll-smooth">
          <div className="fixed top-0 w-full px-4 md:px-6 py-4 flex items-center justify-between bg-[#050511]/80 backdrop-blur-xl border-b border-white/5 z-50">
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400">
              Case Study
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                {linkCopied ? (
                  <Check size={18} className="text-blue-400" />
                ) : (
                  <Share2 size={18} />
                )}
              </button>
              <button
                onClick={handleCloseCaseStudy}
                className="p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            className="relative w-full h-[40vh] md:h-[60vh] mt-14 md:mt-16 group cursor-pointer"
            onClick={() =>
              handleOpenSubImage(selectedCaseStudy.url, selectedCaseStudy.title)
            }
          >
            <Image
              src={selectedCaseStudy.url}
              alt={selectedCaseStudy.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold tracking-widest text-xs transition-all duration-300 transform scale-95 group-hover:scale-100">
                <ZoomIn size={16} /> Enlarge Image
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
            <div className="mb-12 md:mb-16 text-center stagger-item">
              <div className="inline-block px-3 py-1 mb-6 rounded-full border border-blue-500/30 text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
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

            {selectedCaseStudy.richContent?.extraImages &&
              selectedCaseStudy.richContent.extraImages.length > 0 && (
                <div
                  className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/10 stagger-item"
                  style={{ animationDelay: "300ms" }}
                >
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest mb-6 md:mb-8 text-center">
                    Project Gallery
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {selectedCaseStudy.richContent.extraImages.map(
                      (img: any) => (
                        <div
                          key={img.id}
                          className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/5 bg-[#12121a]"
                          onClick={() => handleOpenSubImage(img.url, img.title)}
                        >
                          <Image
                            src={img.url}
                            alt={img.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <ZoomIn
                              size={24}
                              className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/* === 6. SINGLE IMAGE LIGHTBOX MODAL WITH DRAGGABLE ZOOM === */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleCloseImage}
        >
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 md:gap-3 z-50">
            {!selectedCaseStudy && (
              <button
                title="Copy Link"
                onClick={handleCopyLink}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
              >
                {linkCopied ? (
                  <Check size={20} className="text-blue-400" />
                ) : (
                  <Share2 size={20} />
                )}
              </button>
            )}
            <button
              title="Zoom Out"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className={`p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md ${zoomLevel <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ZoomOut size={20} />
            </button>
            <button
              title="Zoom In"
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel((prev) => Math.min(prev + 0.5, 4));
              }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
            >
              <ZoomIn size={20} />
            </button>
            <button
              title="Close"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseImage();
              }}
              className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors backdrop-blur-md ml-2 md:ml-4"
            >
              <X size={24} />
            </button>
          </div>

          <div
            className="relative w-full max-w-[95vw] md:max-w-7xl h-[85vh] flex items-center justify-center overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              onMouseDown={handleMouseDown}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                cursor:
                  zoomLevel > 1
                    ? isDragging
                      ? "grabbing"
                      : "grab"
                    : "default",
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
              className="max-w-full max-h-full object-contain shadow-2xl"
              draggable={false}
            />

            <div
              className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-medium tracking-widest text-sm uppercase transition-opacity duration-300 ${zoomLevel > 1.2 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
