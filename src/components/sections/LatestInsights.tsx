import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { db } from "../../../lib/firebase"; 
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
// 👇 Import the new client component
import InsightsSlider from "../sections/InsightsSlider"; 

export const revalidate = 60;

async function getLatestPosts() {
  try {
    const q = query(
      collection(db, "posts"), 
      orderBy("createdAt", "desc"), 
      limit(5)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        coverImage: data.coverImage,
        category: data.category || "Tech",
        readTime: data.readTime || 5,
        // Add date if available in your firebase, otherwise handled in UI
        date: data.date || "Recent" 
      };
    });
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export default async function LatestInsights() {
  const recentPosts = await getLatestPosts();

  if (recentPosts.length === 0) return null;

  return (
    // Updated Section Padding to match Work/Services
    <section className="relative w-full py-[3rem] lg:py-[clamp(6rem,10vh,10rem)] bg-[#050511] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Updated Container Max-Width & Padding for Consistency */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                  <Layers size={20} className="text-blue-400" />
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Knowledge Hub</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                  Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Blogs</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Deep dives into code, design systems, and the future of tech.
              </p>
          </div>
          
          <Link 
            href="/blog" 
            className="group hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap"
          >
            Read All Blogs 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- CLIENT COMPONENT FOR SLIDER/GRID --- */}
        <InsightsSlider posts={recentPosts} />

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
            <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white text-sm font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20"
            >
                Read All Articles
            </Link>
        </div>

      </div>
    </section>
  );
}