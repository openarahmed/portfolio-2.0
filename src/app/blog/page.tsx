import { db } from "../../../lib/firebase"; // Adjust path if needed (e.g., "../../lib/firebase")
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import BlogFeed from "./BlogFeed";

// --- Data Revalidation ---
// এটা প্রতি ৬০ সেকেন্ড পর পর ডাটা রিফ্রেশ করবে (ISR)
export const revalidate = 60; 

// --- Type Definition ---
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

// --- Server Data Fetching ---
async function getPosts() {
  try {
    // 1. Query: Get all posts sorted by 'createdAt' descending (Newest first)
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    // 2. Map Firestore Documents to UI format
    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      
      // Date Formatting: Handle Firestore Timestamp or String fallback
      let formattedDate = "Recent";
      if (data.createdAt?.toDate) {
         formattedDate = data.createdAt.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
         });
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
        author: data.author || "Admin",
        date: formattedDate,
        readTime: data.readTime || 5,
        tags: data.tags || [],
      } as Post;
    });

    return posts;

  } catch (error) {
    console.error("Error fetching posts from Firestore:", error);
    return []; // Return empty array on error to prevent crash
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="relative min-h-screen w-full bg-[#050511] overflow-hidden pt-16 pb-8 px-4 sm:px-6 font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      {/* --- COMPACT HEADER --- */}
      <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Knowledge Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-2 leading-none">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Alchemist</span> Blog
          </h1>
          
          <p className="text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase max-w-xl mx-auto">
              Curated insights on Code, Design, and Digital Products.
          </p>
      </div>

      {/* --- UI FEED (Real Data) --- */}
      <BlogFeed posts={posts} />

    </section>
  );
}