"use client";

import React, { useState, useRef, useEffect } from "react";
import { storage } from "../../../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  Download,
  UploadCloud,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";
import { toPng } from "html-to-image";

export default function GeneratePhotoCard() {
  const [caption, setCaption] = useState(
    "বিরোধীদল থাপ্পড় দিলো চুপ্পুর পাছায়; আউ করে উঠলো বিএনপি!",
  );
  const [postImage, setPostImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(
      now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    );
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);
    setPostImage(localPreviewUrl);

    setUploading(true);
    const storageRef = ref(storage, `photocards/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
        alert("Sir, the image upload failed. Please check your connection.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("Uploaded securely to Firebase:", downloadURL);
        setUploading(false);
        setUploadProgress(0);
      },
    );
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `social-card-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 pt-6 sm:pt-10 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 sm:mb-10 text-center xl:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-none">
          Generate <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 filter drop-shadow-lg">
            Photo Card
          </span>
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 sm:gap-10 items-center xl:items-start">
        {/* Admin Controls Section */}
        <div className="w-full xl:w-1/3 relative bg-[#131620]/60 backdrop-blur-2xl border border-white/5 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-emerald-600/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-5 sm:gap-6">
            <div className="space-y-2 sm:space-y-3 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                Card Caption
              </label>
              <textarea
                className="w-full h-28 sm:h-32 bg-[#050511] border border-white/10 rounded-xl sm:rounded-2xl py-3 px-4 sm:py-4 sm:px-5 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none text-sm shadow-inner custom-scrollbar"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write your thoughts here..."
              />
            </div>

            <div className="space-y-2 sm:space-y-3 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-teal-400 transition-colors">
                Card Image (Optional)
              </label>
              <div className="flex flex-col sm:flex-row gap-2 relative">
                <div className="relative flex-1">
                  <LinkIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Paste link or upload..."
                    className="w-full bg-[#050511] border border-white/10 rounded-xl py-3 sm:py-4 pl-10 pr-4 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all font-mono text-sm shadow-inner"
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                  />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="cardImage"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="cardImage"
                  className="flex items-center justify-center bg-teal-600/10 hover:bg-teal-600/20 border border-teal-500/30 rounded-xl py-3 px-5 sm:py-0 cursor-pointer transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="animate-spin text-teal-400" size={20} />
                  ) : (
                    <div className="flex items-center gap-2">
                      <UploadCloud className="text-teal-400" size={20} />
                      <span className="text-teal-400 text-sm font-bold sm:hidden">
                        Upload File
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {uploading && (
                <div className="w-full bg-gray-800 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={uploading}
              className="mt-2 sm:mt-4 relative overflow-hidden group w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Download size={18} />
                Download Final Card
              </span>
            </button>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="w-full xl:w-auto flex justify-center bg-[#1a1d27] p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white/10 overflow-hidden">
          {/* Responsive Card Container */}
          <div
            ref={cardRef}
            className="w-full max-w-[400px] aspect-[4/5] bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden font-sans mx-auto"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src="/shakil.jpg"
                  alt="Shakil Ahmed"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="flex flex-col">
                  <h3 className="font-bold text-gray-900 text-[14px] sm:text-base leading-tight whitespace-nowrap">
                    Shakil Ahmed
                  </h3>
                  <p className="text-gray-500 text-[11px] sm:text-sm whitespace-nowrap">
                    @communicate.shakil
                  </p>
                </div>
              </div>
              <button className="bg-[#0f1419] text-white px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap">
                Following
              </button>
            </div>

            {/* Dynamic Body Area */}
            <div className="px-3 sm:px-4 pb-2 flex-grow flex flex-col overflow-hidden">
              {postImage ? (
                <>
                  <p className="text-[#0f1419] text-[13px] sm:text-[15px] leading-normal mb-2 sm:mb-3 whitespace-pre-wrap shrink-0">
                    {caption}
                  </p>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex-grow min-h-0 relative">
                    <img
                      src={postImage}
                      alt="Post attachment"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden flex-grow min-h-0 relative bg-[#6B1A28] flex items-center justify-center p-4 sm:p-8 border border-transparent">
                    <p className="text-white text-[18px] sm:text-[28px] font-bold leading-snug text-center whitespace-pre-wrap drop-shadow-md">
                      {caption}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer Metrics */}
            <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm text-gray-500 border-b border-gray-100 shrink-0 whitespace-nowrap">
              <span className="whitespace-nowrap">{currentTime}</span>
              <span className="whitespace-nowrap">·</span>
              <span className="whitespace-nowrap">{currentDate}</span>
              <span className="whitespace-nowrap">·</span>
              <span className="font-bold text-gray-900 whitespace-nowrap">
                100K
              </span>
              <span className="whitespace-nowrap">Views</span>
            </div>

            {/* Footer Actions */}
            <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between text-gray-500 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[11px] sm:text-sm">312</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Repeat2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[11px] sm:text-sm">1.2K</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[11px] sm:text-sm">15.4K</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Share className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
