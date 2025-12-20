"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { X, Send, Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// --- UPDATED EMAILJS CONFIGURATION ---
const SERVICE_ID = "service_9ro3aoy";
const TEMPLATE_ID = "template_wwn29ef";
const PUBLIC_KEY = "G0dM6Hh5AQ1B91bgi"; 

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer id="contact" className="relative w-full pt-16 pb-32 lg:pt-32 lg:pb-48 bg-[#050511] overflow-hidden flex flex-col items-center justify-center">
      
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-blue-900/20 via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none opacity-20" />

      {/* WRAPPER */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        
        <div className="mb-6 lg:mb-8">
            <h2 className="font-black tracking-tighter uppercase leading-none">
            <span className="text-[clamp(3rem,6vw,6rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-xl inline-block">
                LET'S BUILD SOMETHING
            </span>
            </h2>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm md:text-lg font-medium tracking-wide max-w-xl mx-auto mb-10 lg:mb-12 px-4">
          Ready to combine logic and creativity? Let's talk about your vision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 lg:mb-16 w-full px-4">
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full sm:w-auto px-8 py-3 sm:py-4 rounded-full bg-blue-600 text-white font-bold text-sm sm:text-base tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.8)] min-w-[200px] flex items-center justify-center gap-2"
          >
            <span>START A PROJECT</span>
          </button>

          <Link
            href="/Shakil_Ahmed_FullStack_Developer.pdf" 
            target="_blank"
            className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-full border border-purple-500/50 bg-purple-500/10 text-white font-bold text-sm sm:text-base tracking-wide transition-all hover:bg-purple-500/20 hover:border-purple-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)] min-w-[200px] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD RESUME</span>
          </Link>
        </div>

        {/* UPDATED SOCIAL LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
            <SocialLink href="https://github.com/shakilcodes" label="GitHub" />
            <SocialLink href="https://www.facebook.com/communicate.shakil" label="Facebook" />
        </div>

        {/* UPDATED COPYRIGHT YEAR */}
        <div className="text-gray-600 text-[10px] sm:text-xs uppercase tracking-widest font-medium">
            Copyright © 2023 Shakil. All rights reserved.
        </div>

      </div>

      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}

    </footer>
  );
}

function SocialLink({ href, label }: { href: string, label: string }) {
    return (
        <Link 
            href={href} 
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors duration-300 text-xs sm:text-sm font-semibold uppercase tracking-wider relative group"
        >
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

// --- CONTACT MODAL (Unchanged) ---
function ContactModal({ onClose }: { onClose: () => void }) {
    const form = useRef<HTMLFormElement>(null);
    const [projectType, setProjectType] = useState("WEB");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        if (form.current) {
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
                .then((result) => {
                    setLoading(false);
                    setStatus("success");
                    setTimeout(() => {
                        onClose();
                    }, 2500);
                }, (error) => {
                    setLoading(false);
                    setStatus("error");
                    console.log("EmailJS Error:", error.text);
                });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full sm:max-w-md bg-[#0b0f19] border border-white/10 rounded-[24px] sm:rounded-[30px] p-6 sm:p-8 shadow-[0_0_80px_-20px_rgba(37,99,235,0.4)] animate-scale-up overflow-hidden">
                
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/20 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/20 blur-[100px] pointer-events-none" />

                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-20"
                >
                    <X size={18} />
                </button>

                <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-6 uppercase tracking-wide drop-shadow-md">
                        Start a Project
                    </h3>

                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-in">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <p className="text-white font-bold text-lg">Message Sent!</p>
                            <p className="text-gray-400 text-sm text-center">I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form ref={form} onSubmit={sendEmail} className="space-y-5 sm:space-y-6">
                            <input type="hidden" name="project_type" value={projectType} />

                            <div className="space-y-2">
                                <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Project Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {["WEB", "APP", "VIDEO", "DESIGN"].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setProjectType(type)}
                                            className={`px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold border transition-all duration-300 ${
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

                            <div className="space-y-3 sm:space-y-4">
                                <div className="relative group">
                                    <input 
                                        name="user_name"
                                        type="text" 
                                        required
                                        placeholder="Your Name" 
                                        className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                                    />
                                </div>
                                <div className="relative group">
                                    <input 
                                        name="user_email"
                                        type="email" 
                                        required
                                        placeholder="Your Email" 
                                        className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                                    />
                                </div>
                                <div className="relative group">
                                    <textarea 
                                        name="message"
                                        required
                                        rows={3}
                                        placeholder="Tell me about your vision..." 
                                        className="w-full bg-transparent border-b border-white/10 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none font-medium"
                                    />
                                </div>
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                    <AlertCircle size={16} />
                                    <span>Something went wrong. Check console.</span>
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-sm sm:text-base tracking-wide hover:from-blue-500 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 mt-2 group transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        SENDING...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                        SEND MESSAGE
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}