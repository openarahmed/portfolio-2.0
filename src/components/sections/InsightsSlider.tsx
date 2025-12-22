"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

// --- Custom Grid Logic (For Desktop 5-Card Layout) ---
const getDesktopCardStyle = (index: number) => {
  switch (index) {
    case 0: // Top Left (Wide)
      return {
        gridClass: "md:col-span-2 md:row-start-1",
        heightClass: "h-[280px]",
        glow: "from-blue-500/40 via-cyan-500/40 to-teal-500/40",
        border: "group-hover:border-blue-500/50"
      };
    case 1: // Top Right (Square)
      return {
        gridClass: "md:col-start-4 md:row-start-1",
        heightClass: "h-[280px]",
        glow: "from-purple-500/40 via-pink-500/40 to-red-500/40",
        border: "group-hover:border-purple-500/50"
      };
    case 2: // Middle (Tall Vertical)
      return {
        gridClass: "md:col-start-3 md:row-start-1 md:row-span-2",
        heightClass: "h-[500px] md:h-full",
        glow: "from-emerald-500/40 via-green-500/40 to-lime-500/40",
        border: "group-hover:border-emerald-500/50"
      };
    case 3: // Bottom Left (Wide)
      return {
        gridClass: "md:col-span-2 md:row-start-2",
        heightClass: "h-[280px]",
        glow: "from-orange-500/40 via-amber-500/40 to-yellow-500/40",
        border: "group-hover:border-orange-500/50"
      };
    case 4: // Bottom Right (Square)
      return {
        gridClass: "md:col-start-4 md:row-start-2",
        heightClass: "h-[280px]",
        glow: "from-indigo-500/40 via-violet-500/40 to-fuchsia-500/40",
        border: "group-hover:border-indigo-500/50"
      };
    default:
      return {
        gridClass: "",
        heightClass: "h-[280px]",
        glow: "from-gray-500/20 to-white/20",
        border: "group-hover:border-white/20"
      };
  }
};

interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  category: string;
  readTime: number;
  date?: string;
}

export default function InsightsSlider({ posts }: { posts: Post[] }) {
  // --- SLIDER LOGIC (Mobile Only) ---
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
    <>
      {/* =========================================================
          1. DESKTOP VIEW ONLY (Laptops/Desktops - lg+)
          The original 5-card complex grid layout.
         ========================================================= */}
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {posts.map((post, index) => {
          const style = getDesktopCardStyle(index);
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`group relative block w-full ${style.gridClass}`}
            >
              {/* Outer Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${style.glow} rounded-[32px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className={`relative w-full ${style.heightClass} bg-[#0b0f19]/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden ${style.border} transition-colors duration-500 flex flex-col`}>
                <div className="absolute inset-0 z-0">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-[#050511]/40 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                  <div className="mb-auto">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className={`font-bold text-white leading-tight mb-3 group-hover:text-blue-200 transition-colors ${index === 2 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        Read Story <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase">
                        <Clock size={12} />
                        <span>{post.readTime} Min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* =========================================================
          2. TABLET VIEW ONLY (Tablets - md to lg)
          Bento Grid: 1 Large Top + 2 Small Bottom
         ========================================================= */}
      <div className="hidden md:block lg:hidden relative w-full">
          <div className="grid grid-cols-2 gap-5">
              
              {/* Top Row: 1 Large Card (First Post) */}
              {posts.length > 0 && (
                  <div className="col-span-2 h-[340px]">
                      <TabletCard post={posts[0]} isLarge={true} />
                  </div>
              )}
              
              {/* Bottom Row: 2 Small Cards (Next 2 Posts) */}
              {posts.slice(1, 3).map((post) => (
                  <div key={post.id} className="col-span-1 h-[260px]">
                      <TabletCard post={post} isLarge={false} />
                  </div>
              ))}
          </div>
      </div>

      {/* =========================================================
          3. MOBILE VIEW ONLY (Phones - xs to sm)
          Slider layout
         ========================================================= */}
      <div className="block md:hidden">
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 scrollbar-hide"
        >
          {posts.map((post, index) => (
            <div key={post.id} className="snap-center w-[85vw] flex-shrink-0">
              <Link href={`/blog/${post.slug}`} className="group relative block w-full h-[320px] rounded-[24px] bg-[#0b0f19] border border-white/10 overflow-hidden active:scale-95 transition-transform duration-200">
                {/* Image */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={post.coverImage} 
                        alt={post.title} 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-[#050511]/60 to-transparent opacity-90" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                    <div className="mb-3">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/20 text-[10px] font-bold uppercase rounded-md backdrop-blur-md">
                            {post.category}
                        </span>
                    </div>
                    <h3 className="text-xl font-black text-white leading-tight mb-2 line-clamp-2">
                        {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase border-t border-white/10 pt-3 mt-1">
                        <span>{post.date || "Recent"}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <span>{post.readTime} min read</span>
                    </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center -mt-2">
          <div className="flex gap-1.5">
            {posts.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-4 bg-blue-500" : "w-1 bg-gray-700"}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// --- SUB-COMPONENT: TABLET CARD ---
function TabletCard({ post, isLarge }: { post: Post, isLarge: boolean }) {
    return (
        <Link 
            href={`/blog/${post.slug}`} 
            className="group relative block w-full h-full rounded-[24px] overflow-hidden border border-white/10 bg-[#0b0f19] shadow-lg hover:border-blue-500/30 transition-all duration-300"
        >
            <div className="absolute inset-0 w-full h-full">
                <Image 
                    src={post.coverImage} 
                    alt={post.title} 
                    fill 
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#020006] via-[#020006]/60 to-transparent opacity-90 z-10" />
            
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                        {post.category}
                    </span>
                </div>
                
                <h3 className={`font-black text-white leading-tight mb-2 group-hover:text-blue-200 transition-colors ${isLarge ? 'text-3xl' : 'text-xl line-clamp-2'}`}>
                    {post.title}
                </h3>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                        Read Article <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase">
                        <Clock size={12} />
                        <span>{post.readTime} Min</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}