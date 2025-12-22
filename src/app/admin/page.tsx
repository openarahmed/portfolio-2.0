"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom"; // IMPORTED PORTAL
import { db } from "../../../lib/firebase";
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  orderBy, 
  query, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";
import Link from "next/link";
import { 
  BarChart3, FileText, Eye, TrendingUp, Plus, Trash2, Edit, Loader2, 
  MoreVertical, AlertTriangle, X, Save,
  Bold, Italic, Heading1, Heading2, Quote, Link as LinkIcon, Code, List, Image as ImageIcon
} from "lucide-react";

// --- Types ---
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[]; 
  content: string;
  readingTime: number;
  views?: number;
  createdAt?: { seconds: number; nanoseconds: number };
  published?: boolean;
}

interface Stats {
  totalPosts: number;
  totalViews: number;
}

interface EditFormState {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string; 
  content: string;
  readingTime: number;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<Stats>({ totalPosts: 0, totalViews: 0 });
  const [mounted, setMounted] = useState(false); // New state for Portal

  // --- Modal States ---
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- Form States for Edit ---
  const [editForm, setEditForm] = useState<EditFormState>({
      title: "", 
      slug: "", 
      excerpt: "", 
      coverImage: "", 
      tags: "", 
      content: "", 
      readingTime: 0
  });

  useEffect(() => {
    fetchPosts();
    setMounted(true); // Component Mounted, ready for Portal
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const postsData: Post[] = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Post));

      setPosts(postsData);
      
      const totalViews = postsData.reduce((acc, curr) => acc + (curr.views || 0), 0);
      setStats({ totalPosts: postsData.length, totalViews: totalViews + 1240 });
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE LOGIC =================
  const confirmDelete = (id: string) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    try {
      await deleteDoc(doc(db, "posts", postToDelete));
      setPosts(posts.filter(post => post.id !== postToDelete));
      setStats(prev => ({...prev, totalPosts: prev.totalPosts - 1}));
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // ================= EDIT LOGIC =================
  const openEditModal = (post: Post) => {
      setEditingPost(post);
      setEditForm({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          coverImage: post.coverImage || "",
          tags: post.tags ? post.tags.join(", ") : "",
          content: post.content || "",
          readingTime: post.readingTime || 0
      });
      setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingPost) return;

      setEditLoading(true);
      try {
          const tagsArray = editForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
          const words = editForm.content.trim().split(/\s+/).length;
          const calcTime = Math.ceil(words / 200);

          const updatedData = {
              title: editForm.title,
              slug: editForm.slug,
              excerpt: editForm.excerpt,
              coverImage: editForm.coverImage,
              content: editForm.content,
              tags: tagsArray,
              readingTime: editForm.readingTime || calcTime,
              updatedAt: serverTimestamp(),
          };

          await updateDoc(doc(db, "posts", editingPost.id), updatedData);
          
          setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...updatedData, tags: tagsArray } as Post : p));
          setShowEditModal(false);
          setEditingPost(null);
      } catch (error) {
          console.error("Update failed:", error);
          alert("Failed to update post");
      } finally {
          setEditLoading(false);
      }
  };

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newText = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end);
    
    setEditForm({ ...editForm, content: newText });

    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  if (loading) return <div className="h-[50vh] flex items-center justify-center text-blue-500"><Loader2 className="animate-spin" size={40} /></div>;

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      
      {/* HEADER & STATS */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6 md:gap-4 mt-8">
        <div>
           <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Overview</p>
           <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Dashboard</h1>
        </div>
        <Link href="/admin/create" className="w-full md:w-auto">
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95">
                <Plus size={18} /> New Post
            </button>
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <StatCard title="Total Posts" value={stats.totalPosts} icon={<FileText size={24} />} color="blue" />
          <StatCard title="Total Views" value={stats.totalViews.toLocaleString()} icon={<Eye size={24} />} color="purple" />
          <StatCard title="Engagement" value="+24%" icon={<TrendingUp size={24} />} color="green" />
      </div>

      {/* POSTS TABLE / LIST */}
      <div className="bg-[#131620]/60 backdrop-blur-xl border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><BarChart3 size={20} className="text-blue-400" /> Recent Articles</h3>
              <button onClick={fetchPosts} className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-wider">Refresh</button>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-gray-400 min-w-[600px]">
                  <thead className="bg-[#0b0f19] text-xs uppercase font-bold text-gray-500">
                      <tr>
                          <th className="px-6 py-4">Title</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                              <td className="px-6 py-4 font-bold text-white max-w-[300px] truncate">{post.title}</td>
                              <td className="px-6 py-4 text-xs font-mono text-gray-500">
                                  {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                      <button onClick={() => openEditModal(post)} className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors">
                                          <Edit size={16} />
                                      </button>
                                      <button onClick={() => confirmDelete(post.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                                          <Trash2 size={16} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          
          {posts.length === 0 && !loading && (
              <div className="p-10 text-center text-gray-500 text-sm">
                  No posts found. Create one to get started.
              </div>
          )}
      </div>

      {/* ================= PORTALS (FIX FOR Z-INDEX) ================= */}
      
      {/* 1. EDIT MODAL PORTAL */}
      {showEditModal && mounted && createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
              <div className="bg-[#0b0f19] border border-white/10 w-full max-w-4xl h-[90vh] sm:h-[85vh] rounded-[24px] sm:rounded-[30px] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
                  
                  {/* Modal Header */}
                  <div className="px-6 sm:px-8 py-5 border-b border-white/5 flex justify-between items-center bg-[#131620]/50 backdrop-blur-md z-20">
                      <div>
                          <h2 className="text-xl sm:text-2xl font-black text-white uppercase">Edit <span className="text-blue-500">Post</span></h2>
                          <p className="text-[10px] sm:text-xs text-gray-500 font-mono mt-0.5">ID: {editingPost?.id}</p>
                      </div>
                      <button onClick={() => setShowEditModal(false)} className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors">
                          <X size={20} />
                      </button>
                  </div>

                  {/* Body */}
                  <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar relative">
                      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
                      
                      <form onSubmit={handleUpdate} className="flex flex-col gap-6 relative z-10">
                          {/* Title & Slug */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Title</label>
                                  <input 
                                      type="text" 
                                      value={editForm.title}
                                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                      className="w-full bg-[#050511] border border-white/10 rounded-xl p-4 text-white font-bold focus:border-blue-500/50 focus:outline-none transition-colors"
                                  />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Slug</label>
                                  <input 
                                      type="text" 
                                      value={editForm.slug}
                                      onChange={(e) => setEditForm({...editForm, slug: e.target.value})}
                                      className="w-full bg-[#050511] border border-white/10 rounded-xl p-4 text-gray-400 font-mono text-sm focus:border-purple-500/50 focus:outline-none transition-colors"
                                  />
                              </div>
                          </div>

                          {/* Image & Tags */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Cover Image</label>
                                  <div className="relative">
                                      <input 
                                          type="text" 
                                          value={editForm.coverImage}
                                          onChange={(e) => setEditForm({...editForm, coverImage: e.target.value})}
                                          className="w-full bg-[#050511] border border-white/10 rounded-xl p-4 pr-12 text-blue-400 font-mono text-xs focus:border-cyan-500/50 focus:outline-none transition-colors"
                                      />
                                      {editForm.coverImage && (
                                          <div className="absolute right-2 top-2 w-8 h-8 rounded overflow-hidden border border-white/20">
                                              <img src={editForm.coverImage} alt="Preview" className="w-full h-full object-cover" />
                                          </div>
                                      )}
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Tags</label>
                                  <input 
                                      type="text" 
                                      value={editForm.tags}
                                      onChange={(e) => setEditForm({...editForm, tags: e.target.value})}
                                      className="w-full bg-[#050511] border border-white/10 rounded-xl p-4 text-white focus:border-pink-500/50 focus:outline-none transition-colors"
                                  />
                              </div>
                          </div>

                          {/* Excerpt */}
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Short Excerpt</label>
                              <textarea 
                                  value={editForm.excerpt}
                                  onChange={(e) => setEditForm({...editForm, excerpt: e.target.value})}
                                  className="w-full h-20 bg-[#050511] border border-white/10 rounded-xl p-4 text-gray-300 text-sm focus:border-indigo-500/50 focus:outline-none resize-none transition-colors"
                              />
                          </div>

                          {/* Content */}
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Content</label>
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
                              <textarea 
                                  ref={textareaRef}
                                  value={editForm.content}
                                  onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                                  className="w-full h-[400px] bg-[#050511] border border-white/10 border-t-0 rounded-b-xl p-6 text-gray-300 font-mono text-sm leading-relaxed focus:border-white/30 focus:outline-none resize-none custom-scrollbar transition-colors"
                              />
                          </div>
                      </form>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-white/5 bg-[#131620]/50 backdrop-blur-md flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 z-20">
                      <button onClick={() => setShowEditModal(false)} className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors font-bold text-sm">
                          Cancel
                      </button>
                      <button onClick={handleUpdate} disabled={editLoading} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold uppercase tracking-widest shadow-lg hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                          {editLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                          {editLoading ? "Saving..." : "Save Changes"}
                      </button>
                  </div>
              </div>
          </div>,
          document.body
      )}

      {/* 2. DELETE MODAL PORTAL */}
      {showDeleteModal && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#0b0f19] border border-white/10 p-8 rounded-[30px] max-w-sm w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
                
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
                        <AlertTriangle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Delete this post?</h3>
                    <p className="text-gray-500 text-sm mb-8">This action cannot be undone. The post will be permanently removed.</p>
                    
                    <div className="flex gap-4 w-full">
                        <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors font-bold text-sm">
                            Cancel
                        </button>
                        <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/20 transition-all">
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
      )}

    </div>
  );
}

// --- SUB COMPONENTS ---
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

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: "blue" | "purple" | "green";
}

function StatCard({ title, value, icon, color }: StatCardProps) {
    const styles = {
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        green: "text-green-400 bg-green-500/10 border-green-500/20",
    };
    return (
        <div className="p-6 rounded-[24px] bg-[#131620]/60 backdrop-blur-xl border border-white/5 hover:-translate-y-1 transition-transform">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl border ${styles[color]}`}>{icon}</div>
                <MoreVertical className="text-gray-600 cursor-pointer" size={20} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</h3>
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</p>
        </div>
    );
}