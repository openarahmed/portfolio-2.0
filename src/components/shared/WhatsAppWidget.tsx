'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, X, Bot, User, Sparkles, Cpu } from "lucide-react"; 
import ReactMarkdown from "react-markdown";

// ==========================================
// 1. AI CHAT MODAL COMPONENT (No Changes Here)
// ==========================================
function AIChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (isOpen) {
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100); 
    }
  }, [isOpen, messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "model", text: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", text: "Connection error." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-end md:bottom-28 md:right-10 p-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-sm bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-300">
        <div className="bg-gradient-to-r from-violet-900 to-indigo-900 p-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-full border border-white/10">
              <Sparkles size={16} className="text-yellow-400" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">Digital Alchemist AI</span>
              <span className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-slate-400 text-sm mt-10 space-y-2">
                <Cpu size={40} className="mx-auto text-violet-400 mb-2 opacity-80" />
                <p>Hi! I am Shakil's AI Assistant.</p>
                <p className="text-xs text-slate-500">Ask about my skills, projects, or experience.</p>
              </div>
            )}
            {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${m.role === "user" ? "bg-violet-600" : "bg-slate-800"}`}>
                        {m.role === "user" ? <User size={14} className="text-white"/> : <Cpu size={14} className="text-violet-300"/>}
                    </div>
                    <div className={`px-3 py-2 rounded-2xl text-sm max-w-[85%] leading-relaxed ${
                      m.role === "user" 
                        ? "bg-violet-600 text-white rounded-tr-sm" 
                        : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"
                    }`}>
                        <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 ml-9">
                 <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                 </div>
              </div>
            )}
            <div ref={scrollRef} />
        </div>
        <div className="p-3 bg-slate-950/50 border-t border-white/10 flex gap-2 items-center">
            <input 
                className="flex-1 bg-slate-900 text-white text-sm rounded-full px-4 py-2.5 border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-slate-600"
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === "Enter" && sendMessage()} 
                placeholder="Ask anything..." 
            />
            <button 
              onClick={sendMessage} 
              disabled={!input.trim()}
              className="p-2.5 bg-violet-600 rounded-full text-white hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
            >
              <Send size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN WIDGET COMPONENT (Premium Colored Icon)
// ==========================================
const WhatsAppWidget = () => {
  const WHATSAPP_NUMBER = "8801631234160"; 
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAIAnimating, setIsAIAnimating] = useState(true);

  // 🔄 অ্যানিমেশন টগল
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAIAnimating(prev => !prev); 
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed z-[100] flex flex-col items-center gap-4 
        bottom-20 right-4 
        md:bottom-10 md:right-10"
      >
        
        {/* 🤖 1. AI CHATBOT BUTTON (Premium & Colored) */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="group relative flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95
            /* ✅ GLASSY BACKGROUND (Same as WhatsApp) */
            bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl
            h-12 w-12 md:h-14 md:w-14 p-3"
        >
           {/* Animation Ping */}
           {isAIAnimating && (
             <span className="absolute inset-0 rounded-full bg-purple-500 opacity-20 animate-ping duration-[2000ms]"></span>
           )}
           
           {/* ✅ PREMIUM COLORED ICON with GLOW */}
           {isChatOpen ? (
             <X className="w-full h-full text-white drop-shadow-md" />
           ) : (
             // এখানে text-purple-400 এবং একটি কাস্টম drop-shadow ব্যবহার করা হয়েছে
             <Cpu strokeWidth={1.5} className="w-full h-full text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
           )}

           {/* Tooltip */}
           <span className="absolute right-16 md:right-20 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 shadow-xl pointer-events-none">
             Ask My AI
             <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-t border-white/10"></span>
           </span>
        </button>

        {/* 📞 2. WHATSAPP BUTTON (Glassy & Colored) */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95
            /* ✅ GLASSY BACKGROUND */
            bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl
            h-12 w-12 md:h-14 md:w-14 p-2.5"
        >
          {/* Animation Ping */}
          {!isAIAnimating && (
             <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping duration-[2000ms]"></span>
          )}

          {/* Tooltip */}
          <span className="absolute right-16 md:right-20 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
            WhatsApp Me
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-t border-white/10"></span>
          </span>

          {/* Colored WhatsApp Icon */}
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp"
            width={56} height={56} 
            className="h-full w-full object-contain drop-shadow-md" 
          />
        </a>
      </div>

      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default WhatsAppWidget;