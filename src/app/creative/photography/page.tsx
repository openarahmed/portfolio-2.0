"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  X,
  Layers,
  Check,
  Camera,
  Facebook,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";

// ✅ ১. নতুন ডেটা ফাইল থেকে ইমপোর্ট করা হচ্ছে
import { photographyData, type PhotoItem } from "./data";

export default function PhotographyPage() {
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    url: string;
    title: string;
  } | null>(null);

  const [selectedAlbum, setSelectedAlbum] = useState<{
    id: string;
    title: string;
    description?: string;
    coverUrl: string;
    images: PhotoItem[];
  } | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [linkCopied, setLinkCopied] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState("");

  const sortedData = useMemo(() => {
    return [...photographyData].sort(
      (a, b) =>
        new Date(b.date || "").getTime() - new Date(a.date || "").getTime(),
    );
  }, []);

  const latestPost = sortedData[0];
  const featuredShots = sortedData.slice(0, 3);
  const galleryShots = sortedData;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentOrigin(window.location.origin);
      const params = new URLSearchParams(window.location.search);
      const photoId = params.get("photo");
      if (photoId) {
        let targetPhoto: PhotoItem | null = null;
        let isAlbumTarget = false;

        for (const item of photographyData) {
          if (item.id === photoId) {
            targetPhoto = item;
            if (item.isAlbum) isAlbumTarget = true;
            break;
          }
          if (item.isAlbum && item.album) {
            const innerMatch = item.album.find((a) => a.id === photoId);
            if (innerMatch) {
              targetPhoto = innerMatch;
              break;
            }
          }
        }

        if (targetPhoto) {
          if (isAlbumTarget && targetPhoto.album) {
            setSelectedAlbum({
              id: targetPhoto.id,
              title: targetPhoto.title,
              description: targetPhoto.description,
              coverUrl: targetPhoto.url,
              images: targetPhoto.album,
            });
          } else {
            setSelectedImage({
              id: targetPhoto.id,
              url: targetPhoto.url,
              title: targetPhoto.title,
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

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleOpenImage = (id: string, url: string, title: string) => {
    setSelectedImage({ id, url, title });
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `?photo=${id}`);
    }
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    if (typeof window !== "undefined") {
      if (selectedAlbum) {
        window.history.pushState(null, "", `?photo=${selectedAlbum.id}`);
      } else {
        window.history.pushState(null, "", window.location.pathname);
      }
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
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setIsDragging(true);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage) {
      const shareUrl = `${currentOrigin}/creative/photography/${selectedImage.id}`;
      navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#050511] text-white selection:bg-emerald-500/30 font-sans pb-58">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes customFadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .album-image-stagger {
          opacity: 0;
          animation: customFadeInUp 0.6s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <section className="relative w-full h-[45vh] min-h-[350px] flex flex-col justify-center items-center overflow-hidden py-10">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={
              latestPost?.url ||
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
            }
            alt="Hero Background"
            fill
            className="object-cover object-center opacity-30 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050511]/40 via-[#050511]/70 to-[#050511]" />
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
          <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Camera className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl mb-3">
            Through My Lens
          </h1>
          <p className="text-emerald-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-5">
            Framing the digital world
          </p>
          <div className="w-10 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-5 rounded-full" />
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-medium max-w-2xl mx-auto">
            Understanding light, spatial awareness, and visual balance does not
            just create better photographs. It builds an intuition for pixel
            perfect design, ensuring every user interface I develop feels
            natural, focused, and effortless to navigate.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8 mb-20 md:mb-24">
        <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Featured Highlights
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
              Latest Work
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px] md:auto-rows-[240px]">
          {featuredShots.map((shot, index) => {
            const gridSpan =
              index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";

            return (
              <div
                key={`featured-container-${shot.id}`}
                className={`relative break-inside-avoid ${gridSpan}`}
              >
                {shot.isAlbum && (
                  <>
                    <div className="absolute inset-0 bg-[#121826] rounded-xl md:rounded-2xl transform rotate-[-3deg] scale-[0.97] translate-y-3 opacity-50 z-0 transition-transform duration-300 group-hover:rotate-[-5deg]"></div>
                    <div className="absolute inset-0 bg-[#1e293b] rounded-xl md:rounded-2xl transform rotate-[3deg] scale-[0.97] translate-y-1.5 opacity-70 z-0 transition-transform duration-300 group-hover:rotate-[5deg]"></div>
                  </>
                )}

                <div
                  className={`relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0b0f19] z-10`}
                  onClick={() => {
                    if (shot.isAlbum && shot.album) {
                      setSelectedAlbum({
                        id: shot.id,
                        title: shot.title,
                        description: shot.description,
                        coverUrl: shot.url,
                        images: shot.album,
                      });
                      if (typeof window !== "undefined") {
                        window.history.pushState(null, "", `?photo=${shot.id}`);
                      }
                    } else {
                      handleOpenImage(shot.id, shot.url, shot.title);
                    }
                  }}
                >
                  <Image
                    src={shot.url}
                    alt={shot.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 z-20">
                    {shot.isAlbum ? <Layers size={16} /> : <ZoomIn size={16} />}
                  </div>

                  {shot.isAlbum && shot.album && (
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-wider border border-white/20 flex items-center gap-1 shadow-lg z-20 text-emerald-400">
                      <Layers size={12} /> {shot.album.length} Photos
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3
                      className={`${index === 0 ? "text-2xl md:text-4xl" : "text-lg md:text-xl"} font-bold text-white tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}
                    >
                      {shot.title}
                    </h3>
                    <div className="h-0.5 w-0 bg-emerald-500 mt-2 group-hover:w-12 transition-all duration-500 ease-out" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Gallery Archive
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
            Chronological Collection
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryShots.map((shot) => (
            <div
              key={`gallery-${shot.id}`}
              className="relative break-inside-avoid mb-4"
            >
              {shot.isAlbum && (
                <>
                  <div className="absolute inset-0 bg-[#121826] rounded-lg transform rotate-[-4deg] scale-[0.95] translate-y-2 opacity-50 z-0 transition-transform duration-300 group-hover:rotate-[-6deg]"></div>
                  <div className="absolute inset-0 bg-[#1e293b] rounded-lg transform rotate-[4deg] scale-[0.95] translate-y-1 opacity-70 z-0 transition-transform duration-300 group-hover:rotate-[6deg]"></div>
                </>
              )}

              <div
                className="relative rounded-lg overflow-hidden group cursor-pointer bg-[#0b0f19] border border-white/5 z-10"
                onClick={() => {
                  if (shot.isAlbum && shot.album) {
                    setSelectedAlbum({
                      id: shot.id,
                      title: shot.title,
                      description: shot.description,
                      coverUrl: shot.url,
                      images: shot.album,
                    });
                    if (typeof window !== "undefined") {
                      window.history.pushState(null, "", `?photo=${shot.id}`);
                    }
                  } else {
                    handleOpenImage(shot.id, shot.url, shot.title);
                  }
                }}
              >
                <img
                  src={shot.url}
                  alt={shot.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                    {shot.isAlbum ? (
                      <Layers size={18} className="text-white" />
                    ) : (
                      <ZoomIn size={18} className="text-white" />
                    )}
                  </div>
                  <h4 className="text-white font-bold tracking-wider uppercase text-xs">
                    {shot.isAlbum ? "View Series" : shot.title}
                  </h4>
                </div>

                {shot.isAlbum && shot.album && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-wider border border-white/20 flex items-center gap-1 shadow-lg z-20">
                    <Layers size={12} /> {shot.album.length} Photos
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4">
          Ready to Build?
        </h2>
        <p className="text-gray-400 mb-8 font-medium text-sm md:text-base">
          From framing the perfect shot to architecting scalable applications.
          Let us create something exceptional together.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-xs tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95"
        >
          Start a Project
        </Link>
      </section>

      {/* DEDICATED ALBUM MODAL */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-[90] bg-[#050511]/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
          <div className="sticky top-0 w-full flex items-center justify-between border-b border-white/10 z-50 shadow-2xl overflow-hidden min-h-[160px] md:min-h-[200px] bg-black/50">
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={selectedAlbum.coverUrl}
                alt="Album Cover"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 w-full px-6 md:px-12 py-8 flex items-start justify-between">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-lg">
                  {selectedAlbum.title}
                </h2>
                <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mt-3 mb-4 flex items-center gap-2">
                  <Layers size={14} /> {selectedAlbum.images.length} Photos
                  Collection
                </p>
                {selectedAlbum.description && (
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                    {selectedAlbum.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedAlbum.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-[#1877F2] transition-colors backdrop-blur-md hidden md:flex border border-[#1877F2]/30"
                  title="Share Album on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedAlbum.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#0A66C2]/20 hover:bg-[#0A66C2]/40 text-[#0A66C2] transition-colors backdrop-blur-md hidden md:flex border border-[#0A66C2]/30"
                  title="Share Album on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <button
                  title="Copy Album Link"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(
                      `${currentOrigin}/creative/photography/${selectedAlbum.id}`,
                    );
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/20"
                >
                  {linkCopied ? (
                    <Check size={20} className="text-emerald-400" />
                  ) : (
                    <LinkIcon size={20} />
                  )}
                </button>
                <button
                  className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors backdrop-blur-md border border-red-500/30 ml-2"
                  onClick={() => {
                    setSelectedAlbum(null);
                    if (typeof window !== "undefined") {
                      window.history.pushState(
                        null,
                        "",
                        window.location.pathname,
                      );
                    }
                  }}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {selectedAlbum.images.map((img, index) => (
                <div
                  key={img.id}
                  className="album-image-stagger relative break-inside-avoid rounded-xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0b0f19]"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => handleOpenImage(img.id, img.url, img.title)}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn
                      size={24}
                      className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SINGLE IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleCloseImage}
        >
          <div className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 md:gap-3 z-50">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedImage.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-[#1877F2] transition-colors backdrop-blur-md hidden md:flex border border-[#1877F2]/30"
              title="Share on Facebook"
            >
              <Facebook size={20} />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedImage.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#0A66C2]/20 hover:bg-[#0A66C2]/40 text-[#0A66C2] transition-colors backdrop-blur-md hidden md:flex border border-[#0A66C2]/30"
              title="Share on LinkedIn"
            >
              <Linkedin size={20} />
            </a>

            <button
              title="Copy Direct Link"
              onClick={handleCopyLink}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md mr-4 border border-white/20"
            >
              {linkCopied ? (
                <Check size={20} className="text-emerald-400" />
              ) : (
                <LinkIcon size={20} />
              )}
            </button>

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
              className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors backdrop-blur-md ml-2 md:ml-4 border border-red-500/30"
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
