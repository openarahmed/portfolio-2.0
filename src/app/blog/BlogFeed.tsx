"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, ArrowUpRight, ChevronRight, Filter, Layers, Cpu, Palette, Briefcase } from "lucide-react";

// --- Types ---
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  tags?: string[];
}

export default function BlogFeed({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // --- DRAG SCROLL LOGIC ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- FILTER LOGIC ---
  const allTags = ["All", "Web Development", "Mobile Apps", "UI/UX Design", "Artificial Intelligence", "Case Studies"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === "All" || post.category === selectedTag || (post.tags && post.tags.includes(selectedTag));
    
    const isMappedMatch = 
        (selectedTag === "UI/UX Design" && (post.category === "Design" || post.category === "UX Design" || post.category === "UI/UX Design")) ||
        (selectedTag === "Web Development" && (post.category === "Development" || post.category === "Frontend" || post.category === "Backend")) ||
        (selectedTag === "Artificial Intelligence" && (post.category === "Tech" || post.category === "AI" || post.category === "Machine Learning")) ||
        (selectedTag === "Mobile Apps" && (post.category === "Mobile Development" || post.category === "Android" || post.category === "iOS")) ||
        (selectedTag === "Case Studies" && (post.category === "Case Study" || post.category === "Business"));

    return matchesSearch && (matchesTag || isMappedMatch);
  });

  if (!posts || posts.length === 0) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  // --- SEGMENTATION ---
  const heroPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const sidePosts = filteredPosts.length > 1 ? filteredPosts.slice(1, 4) : [];
  const excludeIds = [heroPost?.id, ...sidePosts.map(p => p.id)].filter(Boolean);

  const technologyPosts = filteredPosts.filter(p => 
      ["Development", "Web Development", "Mobile Apps", "Mobile Development", "Tech", "Tools", "Next.js", "React"].includes(p.category) && !excludeIds.includes(p.id)
  );

  const aiPosts = filteredPosts.filter(p => 
      ["Artificial Intelligence", "AI", "Machine Learning"].includes(p.category) && !excludeIds.includes(p.id)
  );

  const designPosts = filteredPosts.filter(p => 
      ["Design", "UX Design", "Web Design", "UI/UX", "UI/UX Design"].includes(p.category) && !excludeIds.includes(p.id)
  );

  const caseStudyPosts = filteredPosts.filter(p => 
      ["Case Studies", "Case Study", "Business"].includes(p.category) && !excludeIds.includes(p.id)
  );

  // 👇 CHANGE: added 'pb-40' here
  return (
    <div className="relative z-10 max-w-7xl mx-auto pb-40">
      
      {/* FILTER BAR - Unchanged */}
      <div className="sticky top-6 z-50 mb-8">
        <div className="mx-auto max-w-5xl bg-[#0b0f19]/90 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center gap-4">
            <div className="flex items-center gap-3 w-40 md:w-56 flex-shrink-0 group">
                <Search className="text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none pt-0.5"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="w-[1px] h-5 bg-white/10 hidden md:block" />
            <div className="flex-1 overflow-hidden relative group/scroll h-full flex items-center">
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0b0f19] to-transparent z-10 pointer-events-none rounded-r-full" />
                <div 
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex gap-1 overflow-x-auto w-full items-center px-1 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => !isDragging && setSelectedTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 border border-transparent ${
                                selectedTag === tag 
                                ? "bg-white text-black shadow-lg scale-105 border-white" 
                                : "text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
              <Filter size={32} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No stories found</h3>
              <button onClick={() => {setSearchQuery(""); setSelectedTag("All")}} className="mt-4 text-blue-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">Clear Filters</button>
          </div>
      ) : (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* 1. HERO SECTION (Unchanged) */}
            <section className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {heroPost && (
                <div className="lg:col-span-8 flex flex-col">
                   <Link href={`/blog/${heroPost.slug}`} className="relative flex-1 min-h-[450px] lg:h-auto rounded-[32px] overflow-hidden border border-white/5 shadow-2xl group">
                       <Image src={heroPost.coverImage} alt={heroPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
                       <div className="absolute top-6 left-6">
                           <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">Featured</span>
                       </div>
                       <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10">
                           <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                               <span className="text-blue-400">{heroPost.category}</span>
                               <span className="w-1 h-1 bg-gray-500 rounded-full" />
                               <span>{heroPost.date}</span>
                           </div>
                           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4 group-hover:text-blue-200 transition-colors">
                               {heroPost.title}
                           </h2>
                           <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-2xl leading-relaxed">
                               {heroPost.excerpt}
                           </p>
                       </div>
                   </Link>
                </div>
              )}

              <div className="lg:col-span-4 flex flex-col h-full"> 
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-4">Top Stories</h3>
                  <div className="flex flex-col gap-4 flex-grow"> 
                      {sidePosts.map((post) => (
                          <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 items-start p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-white/5">
                                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex-1 py-0.5">
                                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider block mb-1.5">{post.category}</span>
                                  <h4 className="text-sm font-bold text-white leading-snug group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">{post.title}</h4>
                                  <span className="text-[9px] text-gray-500 font-medium flex items-center gap-1"><Clock size={10} /> {post.readTime} min</span>
                              </div>
                          </Link>
                      ))}
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                        <h4 className="text-sm font-bold text-white mb-1 relative z-10">Newsletter</h4>
                        <p className="text-[10px] text-gray-400 mb-4 relative z-10">Get the latest insights delivered.</p>
                        <div className="flex gap-2 relative z-10">
                            <input type="email" placeholder="Email" className="w-full bg-[#050511] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-gray-200 transition-colors">Join</button>
                        </div>
                    </div>
                  </div>
              </div>
            </section>

            {/* 2. TECHNOLOGY */}
            {technologyPosts.length > 0 && (
                <section>
                    <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                             <Layers size={18} className="text-blue-400" />
                             <h3 className="text-lg font-bold text-white uppercase tracking-wide">Technology</h3>
                        </div>
                        {/* LINK UPDATED */}
                        <Link href="/blog/category/technology" className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {technologyPosts.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full flex flex-col">
                                <div className="relative h-[200px] rounded-[24px] overflow-hidden mb-4 border border-white/5">
                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase rounded-md border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                                <p className="text-gray-400 text-xs line-clamp-2 mb-3 flex-1">{post.excerpt}</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase mt-auto">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                    <span>{post.readTime} min read</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 3. ARTIFICIAL INTELLIGENCE */}
            {aiPosts.length > 0 && (
                <section>
                    <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                             <Cpu size={18} className="text-purple-400" />
                             <h3 className="text-lg font-bold text-white uppercase tracking-wide">Artificial Intelligence</h3>
                        </div>
                        {/* LINK UPDATED */}
                        <Link href="/blog/category/artificial-intelligence" className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {aiPosts.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full flex flex-col">
                                <div className="relative h-[200px] rounded-[24px] overflow-hidden mb-4 border border-white/5">
                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase rounded-md border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-base font-bold text-white leading-tight mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h3>
                                <p className="text-gray-400 text-xs line-clamp-2 mb-3 flex-1">{post.excerpt}</p>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase mt-auto">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                    <span>{post.readTime} min read</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 4. UI/UX DESIGN */}
            {designPosts.length > 0 && (
                <section>
                      <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                             <Palette size={18} className="text-pink-400" />
                             <h3 className="text-lg font-bold text-white uppercase tracking-wide">UI/UX Design</h3>
                        </div>
                        {/* LINK UPDATED */}
                        <Link href="/blog/category/ui-ux-design" className="text-[10px] font-bold text-pink-400 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                        {designPosts.map(post => (
                             <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 items-center bg-[#0b0f19] p-3 rounded-[20px] border border-white/5 hover:border-white/10 transition-all">
                                <div className="relative w-[140px] h-[100px] flex-shrink-0 rounded-xl overflow-hidden">
                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[9px] font-bold text-pink-400 uppercase tracking-wider mb-1 block">{post.category}</span>
                                    <h3 className="text-sm font-bold text-white leading-tight mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                                    <span className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1 group-hover:text-white transition-colors">
                                        Read <ChevronRight size={10} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* 5. CASE STUDIES */}
            {caseStudyPosts.length > 0 && (
                <section>
                    <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                             <Briefcase size={18} className="text-emerald-400" />
                             <h3 className="text-lg font-bold text-white uppercase tracking-wide">Case Studies</h3>
                        </div>
                        {/* LINK UPDATED */}
                        <Link href="/blog/category/case-studies" className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {caseStudyPosts.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                                <div className="relative h-[250px] rounded-[24px] overflow-hidden mb-4 border border-white/5">
                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                                        <p className="text-gray-300 text-xs line-clamp-2">{post.excerpt}</p>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase rounded-full border border-emerald-500/20 backdrop-blur-md">Case Study</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

        </div>
      )}
    </div>
  );
}