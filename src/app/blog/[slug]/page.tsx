import { db } from "../../../../lib/firebase"; 
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Linkedin, Twitter, CheckCircle, Target, BarChart, BookOpen, Quote } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

// --- TYPE DEFINITIONS ---
interface Post {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  content: string; 
  readingTime?: number;
  createdAt?: Timestamp;
  date?: string; 
  author?: string;
  category?: string;
  keyTakeaways?: string[];
  difficultyLevel?: string;
  targetAudience?: string[];
}

// --- DATA FETCHING ---
async function getPost(slug: string): Promise<Post | null> {
  if (!slug) return null;
  
  try {
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;

    const data = querySnapshot.docs[0].data();

    return {
        ...data,
        content: data.content || data.description || "", 
    } as Post;

  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// --- PAGE COMPONENT ---
export default async function SinglePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const post = await getPost(slug);

  if (!post) {
    return (
        <div className="h-screen w-full bg-[#050511] flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-gray-400 mb-8">Post not found in the matrix.</p>
            <Link href="/blog" className="px-6 py-3 bg-blue-600 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-blue-500 transition">
                Go Back Home
            </Link>
        </div>
    );
  }

  // Date Formatting
  let formattedDate = "Recent";
  if (post.createdAt) {
     formattedDate = new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  } else if (post.date) {
     formattedDate = post.date;
  }

  // --- CUSTOM MARKDOWN COMPONENTS (The UX Magic) ---
  const markdownComponents = {
    // Elegant Paragraphs with optimal line-height
    p: ({ ...props }) => (
        <p className="text-gray-300 text-[1.1rem] leading-[1.8] mb-8 font-normal tracking-wide" {...props} />
    ),
    // Strong Headings with breathing room
    h1: ({ ...props }) => (
        <h1 className="text-3xl font-bold text-white mt-12 mb-6" {...props} />
    ),
    h2: ({ ...props }) => (
        <h2 className="text-2xl font-bold text-blue-100 mt-16 mb-6 border-l-4 border-blue-500 pl-4" {...props} />
    ),
    h3: ({ ...props }) => (
        <h3 className="text-xl font-semibold text-purple-200 mt-10 mb-4" {...props} />
    ),
    // Readable Lists
    ul: ({ ...props }) => (
        <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-3 marker:text-blue-500" {...props} />
    ),
    ol: ({ ...props }) => (
        <ol className="list-decimal pl-6 mb-8 text-gray-300 space-y-3 marker:text-purple-500" {...props} />
    ),
    li: ({ ...props }) => (
        <li className="pl-2 leading-relaxed" {...props} />
    ),
    // Standout Blockquotes
    blockquote: ({ ...props }) => (
        <blockquote className="relative border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/10 to-transparent p-6 py-8 my-10 rounded-r-xl italic text-gray-200 shadow-sm">
            <Quote className="absolute top-4 left-4 text-purple-500/20 w-8 h-8 -z-10" />
            <div {...props} />
        </blockquote>
    ),
    // Interactive Links
    a: ({ ...props }) => (
        <a className="text-blue-400 font-medium underline decoration-blue-400/30 underline-offset-4 hover:decoration-blue-400 transition-all hover:text-blue-300" {...props} />
    ),
    // Code Blocks (Mac window style)
    pre: ({ ...props }) => (
        <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117]">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" {...props} />
        </div>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
        return inline ? (
            <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-pink-300 font-mono text-sm border border-white/5" {...props}>
                {children}
            </code>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    },
    // Images
    img: ({ ...props }) => (
        <div className="my-10 relative group">
            <img className="rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.01]" {...props} alt="Blog visual" />
        </div>
    ),
  };

  return (
    <article className="min-h-screen bg-[#050511] text-gray-300 font-sans selection:bg-blue-500/30 pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[50vh] min-h-[450px]">
         {post.coverImage ? (
             <Image src={post.coverImage} alt={post.title} fill className="object-cover opacity-40" priority />
         ) : (
             <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 opacity-40" />
         )}
         <div className="absolute inset-0 bg-gradient-to-b from-[#050511]/40 via-[#050511]/80 to-[#050511]" />

         <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-20">
             <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
                 
                 <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
                     <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 backdrop-blur-md border border-white/10">
                        <ArrowLeft size={18} />
                     </div>
                     <span className="text-sm font-bold uppercase tracking-widest">Back to Hub</span>
                 </Link>

                 <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        {post.category || "Tech"}
                    </span>
                    {post.difficultyLevel && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-widest rounded-lg backdrop-blur-md">
                            <BarChart size={12} className="text-purple-400" /> {post.difficultyLevel}
                        </span>
                    )}
                 </div>

                 <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.15] mb-8 drop-shadow-lg tracking-tight">
                     {post.title}
                 </h1>

                 <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-400 border-t border-white/10 pt-6">
                     <div className="flex items-center gap-2">
                         <Calendar size={16} className="text-blue-400" />
                         <span>{formattedDate}</span>
                     </div>
                     <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-700" />
                     <div className="flex items-center gap-2">
                         <Clock size={16} className="text-purple-400" />
                         <span>{post.readingTime || 5} min read</span>
                     </div>
                     <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-700" />
                     <div className="flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-[8px] font-bold text-white">
                            {post.author ? post.author[0] : "A"}
                         </div>
                         <span>{post.author || "Shakil"}</span>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 pt-10">
          
          {/* LEFT COLUMN: Article Body */}
          <div className="min-w-0">
              
              {/* Premium Key Takeaways Box */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#131620] to-[#0b0f19] border border-white/10 rounded-2xl p-8 mb-12 shadow-2xl">
                      {/* Decorative Background */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
                      
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                          <Target className="text-blue-400" size={20} /> 
                          <span className="uppercase tracking-widest text-sm text-blue-400">In this article</span>
                      </h3>
                      <ul className="space-y-4 relative z-10">
                          {post.keyTakeaways.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-4 text-[15px] text-gray-300 font-medium leading-relaxed group">
                                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                                      <CheckCircle size={12} className="text-blue-400" />
                                  </div>
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              )}

              {/* The Actual Content */}
              <div className="animate-in fade-in duration-700">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                      {post.content}
                  </ReactMarkdown>
              </div>

              {/* Final Conclusion / Call to Action area could go here */}
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <div className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                  
                  {/* Table of Contents (Could be generated dynamically, simpler static for now) */}
                  <div className="bg-[#0b0f19] border border-white/5 rounded-2xl p-6">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <BookOpen size={14} /> On this page
                      </h4>
                      <div className="text-sm text-gray-400 space-y-3">
                          <p className="text-blue-400 pl-3 border-l-2 border-blue-500">Introduction</p>
                          {post.keyTakeaways && <p className="hover:text-gray-200 pl-3 border-l-2 border-transparent cursor-pointer transition-colors">Key Takeaways</p>}
                          <p className="hover:text-gray-200 pl-3 border-l-2 border-transparent cursor-pointer transition-colors">Detailed Analysis</p>
                          <p className="hover:text-gray-200 pl-3 border-l-2 border-transparent cursor-pointer transition-colors">Conclusion</p>
                      </div>
                  </div>

                  {/* Share & Social */}
                  <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Share Article</h4>
                      <div className="flex gap-2">
                          <button className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] text-gray-400 transition-all border border-white/5 hover:border-[#1DA1F2]/30 flex items-center justify-center">
                              <Twitter size={18} />
                          </button>
                          <button className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] text-gray-400 transition-all border border-white/5 hover:border-[#0A66C2]/30 flex items-center justify-center">
                              <Linkedin size={18} />
                          </button>
                          <button className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 hover:text-[#1877F2] text-gray-400 transition-all border border-white/5 hover:border-[#1877F2]/30 flex items-center justify-center">
                              <Facebook size={18} />
                          </button>
                      </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                      <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Related Topics</h4>
                          <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag, idx) => (
                                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white text-xs font-medium cursor-pointer transition-all">
                                      #{tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* Target Audience Badge */}
                  {post.targetAudience && (
                      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-white/5">
                          <h4 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3">Perfect For</h4>
                          <ul className="space-y-2">
                              {post.targetAudience.map((aud, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                                      {aud}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}

              </div>
          </div>

      </div>

      {/* MOBILE FOOTER (Tags & Share for small screens) */}
      <div className="lg:hidden mt-20 px-6 max-w-4xl mx-auto border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Share2 size={16} /> Share:
                  </span>
                  <div className="flex gap-4">
                      <button className="text-gray-400 hover:text-white"><Twitter size={20}/></button>
                      <button className="text-gray-400 hover:text-white"><Linkedin size={20}/></button>
                      <button className="text-gray-400 hover:text-white"><Facebook size={20}/></button>
                  </div>
              </div>
              <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs border border-white/5">#{tag}</span>
                  ))}
              </div>
          </div>
      </div>

    </article>
  );
}