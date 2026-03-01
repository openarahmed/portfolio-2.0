"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "../../../../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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
  Loader2,
} from "lucide-react";

export interface PhotoItem {
  id: string;
  date?: string;
  isAlbum?: boolean;
  url: string;
  title: string;
  description?: string;
  album?: PhotoItem[];
  createdAt?: any;
}

export default function PhotographyPage() {
  const [photographyData, setPhotographyData] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "photography"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PhotoItem[];
        setPhotographyData(data);
      } catch (error) {
        console.error("Error fetching photography data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !loading &&
      photographyData.length > 0
    ) {
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
            const coverPhotoItem: PhotoItem = {
              id: targetPhoto.id,
              url: targetPhoto.url,
              title: `${targetPhoto.title} (Cover)`,
              isAlbum: false,
            };

            setSelectedAlbum({
              id: targetPhoto.id,
              title: targetPhoto.title,
              description: targetPhoto.description,
              coverUrl: targetPhoto.url,
              images: [coverPhotoItem, ...targetPhoto.album],
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
  }, [loading, photographyData]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex items-center justify-center text-emerald-500">
        <Loader2 className="animate-spin w-12 h-12" />
      </div>
    );
  }

  const latestPost = photographyData[0];
  const featuredShots = photographyData.slice(0, 3);
  const galleryShots = photographyData;

  return (
    <main className="min-h-screen bg-[#050511] text-white selection:bg-emerald-500/30 font-sans pb-32 md:pb-58">
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

      <section className="relative w-full h-[40vh] min-h-[280px] md:h-[45vh] md:min-h-[350px] flex flex-col justify-center items-center overflow-hidden py-6 md:py-10">
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
          className="absolute top-4 left-4 md:top-8 md:left-8 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <div className="p-2 md:p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} className="md:w-5 md:h-5" />
          </div>
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase hidden sm:inline-block">
            Back to Portfolio
          </span>
        </Link>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-4 md:mt-6">
          <div className="w-8 h-8 md:w-12 md:h-12 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Camera className="w-4 h-4 md:w-6 md:h-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl mb-2 md:mb-3">
            Through My Lens
          </h1>
          <p className="text-emerald-400 text-[9px] md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-5">
            Framing the digital world
          </p>
          <div className="w-8 md:w-10 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-3 md:mb-5 rounded-full" />
          <p className="text-gray-300 text-[11px] md:text-sm leading-normal md:leading-relaxed font-medium max-w-2xl mx-auto px-2 md:px-0">
            Understanding light, spatial awareness, and visual balance does not
            just create better photographs. It builds an intuition for pixel
            perfect design, ensuring every user interface I develop feels
            natural, focused, and effortless to navigate.
          </p>
        </div>
      </section>

      {/* FEATURED HIGHLIGHTS */}
      {featuredShots.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 mb-12 md:mb-24">
          <div className="mb-4 md:mb-8 border-b border-white/10 pb-2 md:pb-4 flex justify-between items-end">
            <div>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight">
                Featured Highlights
              </h2>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mt-1 md:mt-2">
                Latest Work
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px] sm:auto-rows-[220px] md:auto-rows-[280px]">
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
                      <div className="absolute inset-0 bg-[#121826] rounded-xl md:rounded-2xl transform rotate-[-3deg] scale-[0.97] translate-y-2 md:translate-y-3 opacity-50 z-0 transition-transform duration-300 group-hover:rotate-[-5deg]"></div>
                      <div className="absolute inset-0 bg-[#1e293b] rounded-xl md:rounded-2xl transform rotate-[3deg] scale-[0.97] translate-y-1 md:translate-y-1.5 opacity-70 z-0 transition-transform duration-300 group-hover:rotate-[5deg]"></div>
                    </>
                  )}

                  <div
                    className={`relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0b0f19] z-10`}
                    onClick={() => {
                      if (shot.isAlbum && shot.album) {
                        const coverPhotoItem: PhotoItem = {
                          id: shot.id,
                          url: shot.url,
                          title: `${shot.title} (Cover)`,
                          isAlbum: false,
                        };

                        setSelectedAlbum({
                          id: shot.id,
                          title: shot.title,
                          description: shot.description,
                          coverUrl: shot.url,
                          images: [coverPhotoItem, ...shot.album],
                        });
                        if (typeof window !== "undefined") {
                          window.history.pushState(
                            null,
                            "",
                            `?photo=${shot.id}`,
                          );
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

                    {/* ✅ Solid Gradient Overlay (No hover opacity change, stays dark at bottom) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-[#050511]/40 to-transparent opacity-90 z-10 pointer-events-none" />

                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20">
                      <div className="p-1.5 md:p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-2 group-hover:translate-y-0 shadow-lg">
                        {shot.isAlbum ? (
                          <Layers size={14} className="md:w-5 md:h-5" />
                        ) : (
                          <ZoomIn size={14} className="md:w-5 md:h-5" />
                        )}
                      </div>
                    </div>

                    {shot.isAlbum && shot.album && (
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/70 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-xs font-bold tracking-widest border border-white/10 flex items-center gap-1.5 shadow-lg z-20 text-emerald-400">
                        <Layers size={12} className="md:w-3.5 md:h-3.5" />
                        {1 + shot.album.length} PHOTOS
                      </div>
                    )}

                    {/* ✅ Bottom Text Details (Always Visible) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 flex flex-col justify-end pointer-events-none">
                      <div>
                        <h3
                          className={`${index === 0 ? "text-xl md:text-3xl" : "text-base md:text-xl"} font-black text-white tracking-tight drop-shadow-xl mb-1`}
                        >
                          {shot.title}
                        </h3>

                        <p className="text-gray-300 text-[10px] md:text-sm line-clamp-2 leading-relaxed font-medium">
                          {shot.description ||
                            "Explore this stunning capture from the collection."}
                        </p>

                        <div className="h-[2px] w-0 bg-emerald-500 mt-3 md:mt-4 group-hover:w-10 md:group-hover:w-16 transition-all duration-700 ease-out rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* GALLERY ARCHIVE */}
      {galleryShots.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
          <div className="mb-4 md:mb-8 border-b border-white/10 pb-2 md:pb-4">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight">
              Gallery Archive
            </h2>
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest mt-1 md:mt-2">
              Chronological Collection
            </p>
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {galleryShots.map((shot) => (
              <div
                key={`gallery-${shot.id}`}
                className="relative break-inside-avoid mb-3 md:mb-4"
              >
                {shot.isAlbum && (
                  <>
                    <div className="absolute inset-0 bg-[#121826] rounded-lg transform rotate-[-4deg] scale-[0.95] translate-y-1 md:translate-y-2 opacity-50 z-0 transition-transform duration-300 group-hover:rotate-[-6deg]"></div>
                    <div className="absolute inset-0 bg-[#1e293b] rounded-lg transform rotate-[4deg] scale-[0.95] translate-y-0.5 md:translate-y-1 opacity-70 z-0 transition-transform duration-300 group-hover:rotate-[6deg]"></div>
                  </>
                )}

                <div
                  className="relative rounded-lg overflow-hidden group cursor-pointer bg-[#0b0f19] border border-white/5 z-10"
                  onClick={() => {
                    if (shot.isAlbum && shot.album) {
                      const coverPhotoItem: PhotoItem = {
                        id: shot.id,
                        url: shot.url,
                        title: `${shot.title} (Cover)`,
                        isAlbum: false,
                      };

                      setSelectedAlbum({
                        id: shot.id,
                        title: shot.title,
                        description: shot.description,
                        coverUrl: shot.url,
                        images: [coverPhotoItem, ...shot.album],
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

                  {/* ✅ Fixed Gradient Overlay (Always Visible) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-[#050511]/40 to-transparent opacity-90 z-10 pointer-events-none" />

                  {/* Center Zoom Icon (Visible on Hover) */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out shadow-2xl">
                      {shot.isAlbum ? (
                        <Layers
                          size={16}
                          className="text-white md:w-5 md:h-5"
                        />
                      ) : (
                        <ZoomIn
                          size={16}
                          className="text-white md:w-5 md:h-5"
                        />
                      )}
                    </div>
                  </div>

                  {shot.isAlbum && shot.album && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-black/70 backdrop-blur-md px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md text-[8px] md:text-[10px] font-bold tracking-widest border border-white/10 flex items-center gap-1 shadow-lg z-20 text-emerald-400">
                      <Layers size={10} className="md:w-3 md:h-3" />
                      {1 + shot.album.length}
                    </div>
                  )}

                  {/* ✅ Bottom Text Details (Always Visible) */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 z-20 pointer-events-none">
                    <div>
                      <h4 className="text-white font-bold tracking-tight text-sm md:text-base drop-shadow-lg line-clamp-1 mb-1">
                        {shot.title}
                      </h4>
                      <p className="text-gray-300 text-[9px] md:text-xs line-clamp-2 leading-snug font-medium">
                        {shot.description ||
                          "A beautiful visual moment captured in time."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-2xl mx-auto px-6 text-center mb-8 md:mb-0">
        <h2 className="text-xl md:text-4xl font-black uppercase tracking-tight mb-2 md:mb-4">
          Ready to Build?
        </h2>
        <p className="text-gray-400 mb-6 md:mb-8 font-medium text-xs md:text-base">
          From framing the perfect shot to architecting scalable applications.
          Let us create something exceptional together.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black font-black text-[10px] md:text-xs tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95"
        >
          Start a Project
        </Link>
      </section>

      {/* DEDICATED ALBUM MODAL */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-[90] bg-[#050511]/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
          <div className="sticky top-0 w-full flex justify-center border-b border-white/10 z-50 shadow-2xl overflow-hidden min-h-[140px] md:min-h-[200px] bg-black/50">
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

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 min-h-[140px] md:min-h-[200px] flex flex-col justify-center">
              <button
                title="Close Album"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 p-1.5 md:p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors border border-red-500/30 z-50"
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
                <X size={18} className="md:w-5 md:h-5" />
              </button>

              <div className="max-w-3xl pr-10 md:pr-16">
                <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-lg mb-2 md:mb-3">
                  {selectedAlbum.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 md:mb-4">
                  <p className="text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                    <Layers size={12} className="md:w-3.5 md:h-3.5" />{" "}
                    {selectedAlbum.images.length} Photos Collection
                  </p>

                  <div className="flex items-center gap-1.5 md:gap-2.5">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedAlbum.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 md:p-2.5 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-[#1877F2] transition-colors backdrop-blur-md flex border border-[#1877F2]/30"
                      title="Share Album on Facebook"
                    >
                      <Facebook size={14} className="md:w-4 md:h-4" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedAlbum.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 md:p-2.5 rounded-full bg-[#0A66C2]/20 hover:bg-[#0A66C2]/40 text-[#0A66C2] transition-colors backdrop-blur-md flex border border-[#0A66C2]/30"
                      title="Share Album on LinkedIn"
                    >
                      <Linkedin size={14} className="md:w-4 md:h-4" />
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
                      className="p-1.5 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md flex border border-white/20"
                    >
                      {linkCopied ? (
                        <Check
                          size={14}
                          className="text-emerald-400 md:w-4 md:h-4"
                        />
                      ) : (
                        <LinkIcon size={14} className="md:w-4 md:h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {selectedAlbum.description && (
                  <p className="text-gray-300 text-[11px] md:text-base leading-relaxed font-medium">
                    {selectedAlbum.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 py-4 md:py-10">
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {selectedAlbum.images.map((img, index) => (
                <div
                  key={img.id}
                  className="album-image-stagger relative break-inside-avoid rounded-xl overflow-hidden group cursor-pointer border border-white/5 bg-[#0b0f19]"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleOpenImage(img.id, img.url, img.title)}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* ✅ Modal Grid Text & Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-[#050511]/40 to-transparent opacity-90 z-10 pointer-events-none" />

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] pointer-events-none z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out shadow-2xl">
                      <ZoomIn size={16} className="text-white md:w-5 md:h-5" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20 pointer-events-none">
                    <h4 className="text-white font-bold tracking-tight text-xs md:text-sm drop-shadow-lg line-clamp-1">
                      {img.title || "Gallery Photo"}
                    </h4>
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
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-300"
          onClick={handleCloseImage}
        >
          <div className="absolute top-2 right-2 md:top-8 md:right-8 flex items-center gap-1.5 md:gap-3 z-50 flex-wrap justify-end">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedImage.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-[#1877F2] transition-colors backdrop-blur-md flex border border-[#1877F2]/30"
              title="Share on Facebook"
            >
              <Facebook size={16} className="md:w-5 md:h-5" />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${currentOrigin}/creative/photography/${selectedImage.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 rounded-full bg-[#0A66C2]/20 hover:bg-[#0A66C2]/40 text-[#0A66C2] transition-colors backdrop-blur-md flex border border-[#0A66C2]/30"
              title="Share on LinkedIn"
            >
              <Linkedin size={16} className="md:w-5 md:h-5" />
            </a>

            <button
              title="Copy Direct Link"
              onClick={handleCopyLink}
              className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md flex border border-white/20"
            >
              {linkCopied ? (
                <Check size={16} className="text-emerald-400 md:w-5 md:h-5" />
              ) : (
                <LinkIcon size={16} className="md:w-5 md:h-5" />
              )}
            </button>

            <button
              title="Zoom Out"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className={`p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md flex ${zoomLevel <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ZoomOut size={16} className="md:w-5 md:h-5" />
            </button>
            <button
              title="Zoom In"
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel((prev) => Math.min(prev + 0.5, 4));
              }}
              className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md flex"
            >
              <ZoomIn size={16} className="md:w-5 md:h-5" />
            </button>
            <button
              title="Close"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseImage();
              }}
              className="p-2 md:p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors backdrop-blur-md flex ml-1 md:ml-4 border border-red-500/30"
            >
              <X size={16} className="md:w-6 md:h-6" />
            </button>
          </div>

          <div
            className="relative w-full max-w-[98vw] md:max-w-7xl h-[80vh] md:h-[85vh] flex items-center justify-center overflow-hidden rounded-lg mt-8 md:mt-0"
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
              className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-medium tracking-widest text-[10px] md:text-sm uppercase transition-opacity duration-300 ${zoomLevel > 1.2 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
