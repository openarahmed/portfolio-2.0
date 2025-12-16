"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Send, Download } from "lucide-react";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // pb-40 ensures space for the fixed dock
    <footer className="relative w-full pt-24 pb-40 bg-[#050511] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Bottom Glow */}
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-blue-900/20 via-purple-900/10 to-transparent pointer-events-none" />
      
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none opacity-20" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        {/* --- 1. BIG TITLE (NOW 1 LINE) --- */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[80px] xl:text-[100px] font-black tracking-tighter uppercase leading-none mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-xl">
            LET'S BUILD SOMETHING
          </span>
        </h2>

        {/* --- 2. SUBTITLE --- */}
        <p className="text-gray-400 text-sm md:text-lg font-medium tracking-wide max-w-2xl mx-auto mb-12">
          Ready to combine logic and creativity? Let's talk about your vision.
        </p>

        {/* --- 3. ACTION BUTTONS --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          
          {/* Main CTA */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative px-8 py-4 rounded-full bg-blue-600 text-white font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.8)] min-w-[200px] flex items-center justify-center gap-2"
          >
            <span>START A PROJECT</span>
          </button>

          {/* Secondary CTA */}
          <Link
            href="/resume.pdf" 
            target="_blank"
            className="px-8 py-4 rounded-full border border-purple-500/50 bg-purple-500/10 text-white font-bold tracking-wide transition-all hover:bg-purple-500/20 hover:border-purple-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)] min-w-[200px] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD RESUME</span>
          </Link>
        </div>

        {/* --- 4. SOCIAL LINKS --- */}
        <div className="flex items-center justify-center gap-8 mb-8">
            <SocialLink href="https://linkedin.com" label="LinkedIn" />
            <SocialLink href="https://github.com" label="GitHub" />
            <SocialLink href="https://behance.net" label="Behance" />
            <SocialLink href="https://dribbble.com" label="Dribbble" />
        </div>

        {/* --- 5. COPYRIGHT --- */}
        <div className="text-gray-600 text-xs uppercase tracking-widest font-medium">
            Copyright © {new Date().getFullYear()} Shakil. All rights reserved.
        </div>

      </div>

      {/* === MODAL COMPONENT === */}
      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}

    </footer>
  );
}

// --- SUB-COMPONENTS ---

function SocialLink({ href, label }: { href: string, label: string }) {
    return (
        <Link 
            href={href} 
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-semibold uppercase tracking-wider relative group"
        >
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

// GLASS MODAL
function ContactModal({ onClose }: { onClose: () => void }) {
    const [projectType, setProjectType] = useState("WEB");

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[30px] p-8 shadow-[0_0_80px_-20px_rgba(37,99,235,0.4)] animate-scale-up">
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-[30px] pointer-events-none" />

                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all z-20"
                >
                    <X size={18} />
                </button>

                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wide drop-shadow-md">
                        Start a Project
                    </h3>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Project Type</label>
                            <div className="flex flex-wrap gap-2">
                                {["WEB", "APP", "VIDEO", "DESIGN"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setProjectType(type)}
                                        className={`px-5 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
                                            projectType === type
                                                ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <textarea 
                                    rows={3}
                                    placeholder="Tell me about your vision..." 
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none font-medium"
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold tracking-wide hover:from-blue-500 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 mt-2 group transform active:scale-[0.98]">
                            <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            SEND MESSAGE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}