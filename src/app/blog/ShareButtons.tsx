"use client";

import { useState, useEffect } from "react";
import { Facebook, Linkedin, Twitter, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
  className?: string; // For custom styling passed from parent
}

export default function ShareButtons({ title, slug, className }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Get the full URL on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(`${window.location.origin}/blog/${slug}`);
    }
  }, [slug]);

  const handleShare = (platform: string) => {
    if (!currentUrl) return;

    let shareUrl = "";
    const text = encodeURIComponent(title);
    const url = encodeURIComponent(currentUrl);

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handleCopy = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Twitter / X */}
      <button 
        onClick={() => handleShare("twitter")}
        className="p-2.5 rounded-xl bg-white/5 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] text-gray-400 transition-all border border-white/5 hover:border-[#1DA1F2]/30 flex items-center justify-center group"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* LinkedIn */}
      <button 
        onClick={() => handleShare("linkedin")}
        className="p-2.5 rounded-xl bg-white/5 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] text-gray-400 transition-all border border-white/5 hover:border-[#0A66C2]/30 flex items-center justify-center group"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Facebook */}
      <button 
        onClick={() => handleShare("facebook")}
        className="p-2.5 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 hover:text-[#1877F2] text-gray-400 transition-all border border-white/5 hover:border-[#1877F2]/30 flex items-center justify-center group"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Copy Link */}
      <button 
        onClick={handleCopy}
        className="p-2.5 rounded-xl bg-white/5 hover:bg-green-500/20 hover:text-green-400 text-gray-400 transition-all border border-white/5 hover:border-green-500/30 flex items-center justify-center group relative"
        aria-label="Copy Link"
      >
        {copied ? <Check size={18} /> : <Link2 size={18} className="group-hover:scale-110 transition-transform" />}
        
        {/* Tooltip for Copy */}
        {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-green-500 text-black px-2 py-1 rounded font-bold">
                Copied!
            </span>
        )}
      </button>
    </div>
  );
}