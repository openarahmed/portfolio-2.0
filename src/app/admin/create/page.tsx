"use client";

import React, { useState, useEffect, useRef } from "react";
import { db } from "../../../../lib/firebase"; // Ensure this path is correct based on your aliases
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { 
  Link as LinkIcon, 
  Send, 
  Loader2, 
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  Tag,
  Clock,
  Layout,
  Maximize2,
  ArrowLeft,
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Quote, 
  Code, 
  List
} from "lucide-react";

export default function CreatePostPage() {
  // --- States with Types ---
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>(""); 
  const [coverImage, setCoverImage] = useState<string>(""); 
  const [tags, setTags] = useState<string>(""); 
  const [content, setContent] = useState<string>("");
  const [readingTime, setReadingTime] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Ref for Content Textarea (needed for toolbar)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- Effects ---
  
  // 1. Auto-generate slug
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  }, [title]);

  // 2. Auto-calculate Reading Time
  useEffect(() => {
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200); 
    setReadingTime(time);
  }, [content]);

  // --- Handlers ---

  // Toolbar Text Insertion Logic
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    setContent(newText);

    // Reset cursor position
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

      await addDoc(collection(db, "posts"), {
        title,
        slug,
        excerpt,
        coverImage,
        tags: tagsArray,
        content,
        readingTime,
        createdAt: serverTimestamp(),
        published: true,
      });
      
      setSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setTitle("");
        setSlug("");
        setExcerpt("");
        setCoverImage("");
        setTags("");
        setContent("");
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error publishing post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
            
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
                <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 text-sm font-bold uppercase tracking-wider group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white leading-none">
                    Write <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 filter drop-shadow-lg">
                        New Article
                    </span>
                </h1>
            </div>
        </div>

        {/* --- FORM CARD --- */}
        <div className="relative w-full bg-[#131620]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden">
            
            {/* Ambient Background within Card */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

            <form onSubmit={handlePublish} className="flex flex-col gap-8 relative z-10">
                
                {/* --- TOP ROW: TITLE & SLUG --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Title */}
                    <div className="lg:col-span-2 space-y-3 group">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">Blog Title</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter a catchy title..."
                                className="w-full bg-[#050511] border border-white/10 rounded-2xl py-5 pl-5 pr-12 text-white placeholder-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-bold text-xl shadow-inner"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Sparkles className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                        </div>
                    </div>

                    {/* Slug */}
                    <div className="space-y-3 group">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Slug</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type="text"
                                className="w-full bg-[#050511] border border-white/10 rounded-2xl py-5 pl-12 pr-5 text-gray-400 placeholder-gray-700 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono text-sm shadow-inner"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* --- SECOND ROW: TAGS & READING TIME --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     <div className="space-y-3 group">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-pink-400 transition-colors">Tags</label>
                        <div className="relative">
                            <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type="text"
                                placeholder="React, Design, UI/UX..."
                                className="w-full bg-[#050511] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white placeholder-gray-700 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all shadow-inner"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Auto Calculation Display */}
                    <div className="flex items-end pb-1">
                        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 w-full">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Est. Time</p>
                                <p className="text-base font-bold text-white">{readingTime} min read</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- THIRD ROW: IMAGES & EXCERPT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cover Image Input */}
                    <div className="lg:col-span-2 space-y-3 group">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-cyan-400 transition-colors">Cover Image URL</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type="text"
                                placeholder="https://..."
                                className="w-full bg-[#050511] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm shadow-inner"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Preview Box */}
                    <div className="relative h-[120px] lg:h-auto rounded-2xl overflow-hidden bg-[#050511] border border-white/10 flex items-center justify-center group/image shadow-inner">
                        {coverImage ? (
                            <>
                                <Image src={coverImage} alt="Preview" fill className="object-cover opacity-80 group-hover/image:opacity-100 transition-opacity" />
                                <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-lg text-white backdrop-blur-md">
                                    <Maximize2 size={12} />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-700">
                                <ImageIcon size={24} />
                                <span className="text-[10px] font-medium uppercase tracking-wider">No Image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-3 group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">Short Excerpt</label>
                    <div className="relative">
                        <Layout className="absolute left-5 top-5 text-gray-600" size={18} />
                        <textarea
                            placeholder="Brief summary for search engines and cards..."
                            className="w-full h-24 bg-[#050511] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none text-sm shadow-inner"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- MAIN CONTENT WITH TOOLBAR --- */}
                <div className="space-y-3 group">
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                        Content (Markdown)
                    </label>
                    
                    {/* Toolbar Strip */}
                    <div className="flex flex-wrap items-center gap-1 bg-[#1a1d2d] border border-white/10 border-b-0 rounded-t-xl p-2 sticky top-0 z-10 shadow-lg">
                        <ToolbarBtn icon={<Heading1 size={16} />} onClick={() => insertText("# ", "")} tooltip="H1" />
                        <ToolbarBtn icon={<Heading2 size={16} />} onClick={() => insertText("## ", "")} tooltip="H2" />
                        <div className="w-[1px] h-5 bg-white/10 mx-1"></div>
                        <ToolbarBtn icon={<Bold size={16} />} onClick={() => insertText("**", "**")} tooltip="Bold" />
                        <ToolbarBtn icon={<Italic size={16} />} onClick={() => insertText("*", "*")} tooltip="Italic" />
                        <ToolbarBtn icon={<Quote size={16} />} onClick={() => insertText("> ", "")} tooltip="Quote" />
                        <div className="w-[1px] h-5 bg-white/10 mx-1"></div>
                        <ToolbarBtn icon={<LinkIcon size={16} />} onClick={() => insertText("[Link Text](", ")")} tooltip="Link" />
                        <ToolbarBtn icon={<ImageIcon size={16} />} onClick={() => insertText("![Alt Text](", ")")} tooltip="Image" />
                        <ToolbarBtn icon={<Code size={16} />} onClick={() => insertText("```javascript\n", "\n```")} tooltip="Code Block" />
                        <ToolbarBtn icon={<List size={16} />} onClick={() => insertText("- ", "")} tooltip="List" />
                    </div>

                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            placeholder="# Write your masterpiece here..."
                            className="w-full h-[500px] bg-[#050511] border border-white/10 border-t-0 rounded-b-xl p-6 text-gray-300 placeholder-gray-800 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-mono text-sm leading-relaxed resize-none shadow-inner custom-scrollbar"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* --- FOOTER ACTIONS --- */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    {success ? (
                        <div className="flex items-center gap-2 text-green-400 animate-pulse">
                            <CheckCircle2 size={18} />
                            <span className="text-sm font-bold">Published Successfully!</span>
                        </div>
                    ) : (
                        <span className="text-gray-600 text-xs">Ready to publish?</span>
                    )}

                    <button 
                        disabled={loading}
                        className="relative overflow-hidden group px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            {loading ? "Processing..." : "Publish Post"}
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                </div>

            </form>
        </div>
    </div>
  );
}

// --- Sub Component: Toolbar Button ---
interface ToolbarBtnProps {
    icon: React.ReactNode;
    onClick: () => void;
    tooltip: string;
}

function ToolbarBtn({ icon, onClick, tooltip }: ToolbarBtnProps) {
    return (
        <button 
            type="button" 
            onClick={onClick}
            title={tooltip}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors active:scale-95"
        >
            {icon}
        </button>
    )
}