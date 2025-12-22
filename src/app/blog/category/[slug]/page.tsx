import { db } from "../../../../../lib/firebase"; // Adjust path
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ArrowUpRight, Filter, Layers } from "lucide-react";

// --- ISR Revalidation ---
export const revalidate = 60;

// --- CATEGORY MAPPING LOGIC ---
const CATEGORY_MAP: Record<string, string[]> = {
  "technology": ["Development", "Web Development", "Mobile Apps", "Mobile Development", "Tech", "Tools", "Next.js", "React"],
  "artificial-intelligence": ["Artificial Intelligence", "AI", "Machine Learning"],
  "ui-ux-design": ["Design", "UX Design", "Web Design", "UI/UX", "UI/UX Design"],
  "case-studies": ["Case Studies", "Case Study", "Business"],
  "mobile-apps": ["Mobile Apps", "Mobile Development", "Android", "iOS"],
};

// --- DATA FETCHING ---
async function getCategoryPosts(slug: string) {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const validCategories = CATEGORY_MAP[slug] || [];

    // Filter & Map
    const posts = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        
        let formattedDate = "Recent";
        if (data.createdAt?.toDate) {
            formattedDate = data.createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        } else if (data.date) {
            formattedDate = data.date;
        }

        return {
          id: doc.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          coverImage: data.coverImage,
          category: data.category || "Tech",
          date: formattedDate,
          readTime: data.readTime || 5,
        };
      })
      .filter(post => validCategories.includes(post.category));

    return posts;
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getCategoryPosts(slug);

  // Layout Logic: Split posts into Hero, Sidebar, and Grid
  const heroPost = posts.length > 0 ? posts[0] : null;
  const sidePosts = posts.length > 1 ? posts.slice(1, 4) : [];
  const gridPosts = posts.length > 4 ? posts.slice(4) : [];

  // Title Formatting
  const title = slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#050511] font-sans pt-24 pb-20 px-4 sm:px-6">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group">
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 backdrop-blur-md border border-white/10">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Hub</span>
                </Link>
                
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
                    {title} <span className="text-blue-500">.</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                    Browsing {posts.length} articles in this category.
                </p>
            </div>
        </div>

        {posts.length === 0 ? (
            // --- EMPTY STATE ---
            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5">
                <Filter size={40} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-gray-500">There are no posts in this category yet.</p>
            </div>
        ) : (
            <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                
                {/* --- 1. HERO & SIDEBAR SECTION --- */}
                <section className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                    
                    {/* Left: Main Feature (Big Card) */}
                    {heroPost && (
                        <div className="lg:col-span-8 flex flex-col">
                            <Link href={`/blog/${heroPost.slug}`} className="relative flex-1 min-h-[400px] lg:h-auto rounded-[32px] overflow-hidden border border-white/5 shadow-2xl group">
                                <Image src={heroPost.coverImage} alt={heroPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
                                
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">Latest</span>
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

                    {/* Right: Sidebar (Small Cards) */}
                    <div className="lg:col-span-4 flex flex-col h-full"> 
                        {sidePosts.length > 0 && (
                            <>
                                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] border-b border-white/10 pb-3 mb-4">Trending in {title}</h3>
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
                            </>
                        )}
                        
                        {/* Newsletter Box */}
                        <div className="mt-auto pt-6">
                            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                                <h4 className="text-sm font-bold text-white mb-1 relative z-10">Newsletter</h4>
                                <p className="text-[10px] text-gray-400 mb-4 relative z-10">Get the latest insights.</p>
                                <div className="flex gap-2 relative z-10">
                                    <input type="email" placeholder="Email" className="w-full bg-[#050511] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors" />
                                    <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-gray-200 transition-colors">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 2. GRID SECTION (Remaining Cards) --- */}
                {gridPosts.length > 0 && (
                    <section>
                        <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
                            <div className="flex items-center gap-2">
                                <Layers size={18} className="text-blue-400" />
                                <h3 className="text-lg font-bold text-white uppercase tracking-wide">More Articles</h3>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {gridPosts.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full flex flex-col">
                                    <div className="relative h-[200px] rounded-[24px] overflow-hidden mb-4 border border-white/5">
                                        <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase rounded-md border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-base font-bold text-white leading-tight mb-2 group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h3>
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

            </div>
        )}

      </div>
    </div>
  );
}