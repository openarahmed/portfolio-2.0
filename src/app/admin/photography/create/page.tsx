"use client";

import React, { useState, useEffect } from "react";
import { db, storage } from "../../../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  Layout,
  Calendar,
  Plus,
  Trash2,
  Layers,
  UploadCloud,
  Link as LinkIcon,
} from "lucide-react";

export default function CreatePhotographyPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState(""); // ম্যানুয়াল লিংক বা আপলোড হওয়া লিংক এখানেই থাকবে
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isAlbum, setIsAlbum] = useState(false);

  const [albumImages, setAlbumImages] = useState([
    { id: Date.now().toString(), url: "", title: "", isUploading: false },
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [mainUploadProgress, setMainUploadProgress] = useState(0);
  const [uploadingMain, setUploadingMain] = useState(false);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Main Image Upload Function
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    const storageRef = ref(storage, `photography/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setMainUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploadingMain(false);
        alert("Image upload failed!");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL); // আপলোড শেষে বক্সে লিংক বসে যাবে
        setUploadingMain(false);
        setMainUploadProgress(0);
      },
    );
  };

  // Album Image Upload Function
  const handleAlbumImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAlbumImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, isUploading: true } : img)),
    );

    const storageRef = ref(
      storage,
      `photography/albums/${Date.now()}_${file.name}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        setAlbumImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, isUploading: false } : img,
          ),
        );
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setAlbumImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, url: downloadURL, isUploading: false }
              : img,
          ),
        );
      },
    );
  };

  const handleAddAlbumImage = () => {
    setAlbumImages([
      ...albumImages,
      { id: Date.now().toString(), url: "", title: "", isUploading: false },
    ]);
  };
  const handleRemoveAlbumImage = (id: string) => {
    setAlbumImages(albumImages.filter((img) => img.id !== id));
  };
  const handleAlbumChange = (
    id: string,
    field: "title" | "url",
    value: string,
  ) => {
    setAlbumImages(
      albumImages.map((img) =>
        img.id === id ? { ...img, [field]: value } : img,
      ),
    );
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url)
      return alert("Please provide an image URL or upload an image first!");

    setLoading(true);
    setSuccess(false);
    try {
      const finalAlbum = isAlbum
        ? albumImages
            .filter((img) => img.url.trim() !== "")
            .map((img, i) => ({
              id: `a_${Date.now()}_${i}`,
              url: img.url,
              title: img.title || "",
            }))
        : [];
      await addDoc(collection(db, "photography"), {
        title,
        url,
        description: description || null,
        date,
        isAlbum,
        album: finalAlbum,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => {
        setTitle("");
        setUrl("");
        setDescription("");
        setIsAlbum(false);
        setAlbumImages([
          { id: Date.now().toString(), url: "", title: "", isUploading: false },
        ]);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error publishing photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4 mt-8">
        <div>
          <Link
            href="/admin/photography"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-400 transition-colors mb-4 text-sm font-bold uppercase tracking-wider group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to Gallery
          </Link>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white leading-none">
            Add New <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 filter drop-shadow-lg">
              Photography
            </span>
          </h1>
        </div>
      </div>

      <div className="relative w-full bg-[#131620]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />

        <form
          onSubmit={handlePublish}
          className="flex flex-col gap-8 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Neon Nights Series"
                  className="w-full bg-[#050511] border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-white placeholder-gray-700 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-bold shadow-inner"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Sparkles
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-3 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"
                  size={18}
                />
                <input
                  type="date"
                  className="w-full bg-[#050511] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm shadow-inner cursor-pointer"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* ✅ HYBRID COVER IMAGE SECTION (Link + Upload) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-teal-400 transition-colors">
                Main Image URL or Upload
              </label>
              <div className="flex gap-2 relative">
                {/* Text Input for URL */}
                <div className="relative flex-1">
                  <LinkIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Paste link or upload..."
                    className="w-full bg-[#050511] border border-white/10 rounded-xl py-4 pl-10 pr-4 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all font-mono text-sm shadow-inner"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>

                {/* Upload Button */}
                <input
                  type="file"
                  accept="image/*"
                  id="mainImage"
                  className="hidden"
                  onChange={handleMainImageUpload}
                />
                <label
                  htmlFor="mainImage"
                  className="flex items-center justify-center bg-teal-600/10 hover:bg-teal-600/20 border border-teal-500/30 rounded-xl px-5 cursor-pointer transition-colors"
                  title="Upload from Device"
                >
                  {uploadingMain ? (
                    <Loader2 className="animate-spin text-teal-400" size={20} />
                  ) : (
                    <UploadCloud className="text-teal-400" size={20} />
                  )}
                </label>
              </div>

              {uploadingMain && (
                <div className="w-full bg-gray-800 h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full transition-all duration-300"
                    style={{ width: `${mainUploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Preview Box */}
            <div className="relative h-[100px] lg:h-auto rounded-2xl overflow-hidden bg-[#050511] border border-white/10 flex items-center justify-center shadow-inner">
              {url ? (
                <Image src={url} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-700">
                  <ImageIcon size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Preview
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-cyan-400 transition-colors">
              Description
            </label>
            <div className="relative">
              <Layout
                className="absolute left-5 top-5 text-gray-600"
                size={18}
              />
              <textarea
                placeholder="Story behind the shot..."
                className="w-full h-24 bg-[#050511] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-gray-300 placeholder-gray-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none text-sm shadow-inner custom-scrollbar"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div
            className="p-5 border border-white/10 bg-white/5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => setIsAlbum(!isAlbum)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${isAlbum ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-800 text-gray-400"}`}
              >
                <Layers size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold">
                  This is an Album (Series)
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Add multiple photos under this collection
                </p>
              </div>
            </div>
            <div
              className={`w-14 h-7 rounded-full p-1 transition-colors ${isAlbum ? "bg-emerald-500" : "bg-gray-700"}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${isAlbum ? "translate-x-7" : "translate-x-0"}`}
              />
            </div>
          </div>

          {/* ✅ HYBRID ALBUM IMAGES UPLOAD SECTION */}
          {isAlbum && (
            <div className="space-y-4 p-6 border border-emerald-500/20 bg-emerald-900/5 rounded-2xl">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-3">
                Album Photos
              </h3>
              {albumImages.map((img, index) => (
                <div
                  key={img.id}
                  className="flex flex-col sm:flex-row gap-3 items-center bg-[#050511] p-3 rounded-xl border border-white/5"
                >
                  <span className="text-gray-500 font-mono text-xs font-bold w-6 text-center">
                    {index + 1}
                  </span>

                  {/* Hybrid Album Upload Field */}
                  <div className="flex-1 w-full flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste URL..."
                      className="flex-1 bg-transparent border border-white/10 rounded-lg p-2.5 text-sm text-gray-300 focus:border-emerald-500 outline-none font-mono"
                      value={img.url}
                      onChange={(e) =>
                        handleAlbumChange(img.id, "url", e.target.value)
                      }
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id={`album-${img.id}`}
                      className="hidden"
                      onChange={(e) => handleAlbumImageUpload(img.id, e)}
                    />
                    <label
                      htmlFor={`album-${img.id}`}
                      className="p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg cursor-pointer transition-colors flex items-center justify-center"
                    >
                      {img.isUploading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <UploadCloud size={18} />
                      )}
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Title (Optional)"
                    className="w-full sm:w-1/3 bg-transparent border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-emerald-500 outline-none"
                    value={img.title}
                    onChange={(e) =>
                      handleAlbumChange(img.id, "title", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAlbumImage(img.id)}
                    className="p-3 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAlbumImage}
                className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1 hover:text-emerald-300 mt-2 px-3 py-2 rounded-lg hover:bg-emerald-500/10 transition-colors w-max"
              >
                <Plus size={16} /> Add Another Photo
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            {success ? (
              <div className="flex items-center gap-2 text-emerald-400 animate-pulse">
                <CheckCircle2 size={18} />
                <span className="text-sm font-bold">Added Successfully!</span>
              </div>
            ) : (
              <span className="text-gray-600 text-xs font-medium">
                Ready to showcase?
              </span>
            )}
            <button
              disabled={loading || uploadingMain}
              className="relative overflow-hidden group px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {loading ? "Saving..." : "Add to Gallery"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
