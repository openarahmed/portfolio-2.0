"use client";
import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User } from "lucide-react"; 
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) setTimeout(scrollToBottom, 100);
  }, [isOpen, messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput("");
    
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", text: "Connection Error." }]);
    } finally {
      setLoading(false);
    }
  };

  // UI Render (মডাল যদি বন্ধ থাকে, কিছুই দেখাবে না)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center md:items-end md:justify-end md:bottom-28 md:right-10 p-4 pointer-events-none">
      
      {/* Chat Container */}
      <div className="pointer-events-auto w-full max-w-sm bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
               <Bot size={20} className="text-purple-300" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Digital Alchemist AI</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 mt-10 text-sm">
              <p>Hi! I am Shakil's AI.</p>
              <p className="mt-2">Ask me about:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Skills", "Projects", "Experience", "Contact"].map((tag) => (
                  <button 
                    key={tag} 
                    onClick={() => { setInput(`Tell me about your ${tag}`); }} // Quick Fix to trigger manually
                    className="bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-xs border border-white/10 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-indigo-600" : "bg-purple-900"}`}>
                {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-purple-300" />}
              </div>
              <div className={`p-3 text-sm rounded-2xl max-w-[80%] ${
                msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white/10 text-slate-200 rounded-tl-none border border-white/5"
              }`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
             <div className="flex gap-2 items-center text-xs text-slate-500 ml-10">
               <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
               <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
               Thinking...
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-slate-950/50 border-t border-white/10">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything..."
              className="w-full bg-slate-900 text-white placeholder-slate-500 text-sm rounded-full pl-4 pr-10 py-3 border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button 
              onClick={sendMessage}
              disabled={!input.trim()}
              className="absolute right-2 p-1.5 bg-purple-600 rounded-full text-white hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}