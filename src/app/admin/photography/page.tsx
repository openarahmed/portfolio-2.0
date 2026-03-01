"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { db, storage } from "../../../../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import {
  Camera,
  Eye,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Loader2,
  AlertTriangle,
  X,
  Save,
  Layers,
  UploadCloud,
} from "lucide-react";

export default function AdminPhotographyDashboard() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editIsAlbum, setEditIsAlbum] = useState(false);
  const [editAlbumImages, setEditAlbumImages] = useState<any[]>([]);

  const [uploadingMain, setUploadingMain] = useState(false);

  useEffect(() => {
    fetchPhotos();
    setMounted(true);
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "photography"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setPhotoToDelete(id);
    setShowDeleteModal(true);
  };
  const handleDelete = async () => {
    if (!photoToDelete) return;
    try {
      await deleteDoc(doc(db, "photography", photoToDelete));
      setPhotos(photos.filter((p) => p.id !== photoToDelete));
      setShowDeleteModal(false);
      setPhotoToDelete(null);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const openEditModal = (photo: any) => {
    setEditingPhoto(photo);
    setEditTitle(photo.title || "");
    setEditUrl(photo.url || "");
    setEditDesc(photo.description || "");
    setEditDate(photo.date || "");
    setEditIsAlbum(photo.isAlbum || false);
    setEditAlbumImages(
      photo.album
        ? photo.album.map((img: any) => ({ ...img, isUploading: false }))
        : [],
    );
    setShowEditModal(true);
  };

  const handleEditMainImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    const storageRef = ref(storage, `photography/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error(error);
        setUploadingMain(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setEditUrl(downloadURL); // বক্সে লিংক বসবে
        setUploadingMain(false);
      },
    );
  };

  const handleEditAlbumImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEditAlbumImages((prev) =>
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
        console.error(error);
        setEditAlbumImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, isUploading: false } : img,
          ),
        );
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setEditAlbumImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, url: downloadURL, isUploading: false }
              : img,
          ),
        );
      },
    );
  };

  const handleAlbumChange = (id: string, field: string, value: string) => {
    setEditAlbumImages(
      editAlbumImages.map((img) =>
        img.id === id ? { ...img, [field]: value } : img,
      ),
    );
  };
  const handleAddAlbumImage = () => {
    setEditAlbumImages([
      ...editAlbumImages,
      { id: `new_${Date.now()}`, url: "", title: "", isUploading: false },
    ]);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    setEditLoading(true);
    try {
      const finalAlbum = editIsAlbum
        ? editAlbumImages
            .filter((img) => img.url.trim() !== "")
            .map(({ isUploading, ...rest }) => rest)
        : [];
      const updatedData = {
        title: editTitle,
        url: editUrl,
        description: editDesc,
        date: editDate,
        isAlbum: editIsAlbum,
        album: finalAlbum,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(doc(db, "photography", editingPhoto.id), updatedData);
      setPhotos(
        photos.map((p) =>
          p.id === editingPhoto.id ? { ...p, ...updatedData } : p,
        ),
      );
      setShowEditModal(false);
      setEditingPhoto(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update photo");
    } finally {
      setEditLoading(false);
    }
  };

  if (loading)
    return (
      <div className="h-[50vh] flex items-center justify-center text-emerald-500">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 relative px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6 md:gap-4 mt-8">
        <div>
          <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
            Overview
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Manage Photos
          </h1>
        </div>
        <Link href="/admin/photography/create" className="w-full md:w-auto">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95">
            <Plus size={18} /> Add Photo
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        <StatCard
          title="Total Items"
          value={photos.length}
          icon={<ImageIcon size={24} />}
          color="blue"
        />
        <StatCard
          title="Albums"
          value={photos.filter((p) => p.isAlbum).length}
          icon={<Layers size={24} />}
          color="green"
        />
        <StatCard
          title="Total Views"
          value="8,420"
          icon={<Eye size={24} />}
          color="purple"
        />
      </div>

      <div className="bg-[#131620]/60 backdrop-blur-xl border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Camera size={20} className="text-emerald-400" /> Gallery Archive
          </h3>
          <button
            onClick={fetchPhotos}
            className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-wider"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-gray-400 min-w-[600px]">
            <thead className="bg-[#0b0f19] text-xs uppercase font-bold text-gray-500">
              <tr>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {photos.map((photo) => (
                <tr
                  key={photo.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-3">
                    <div className="relative w-16 h-12 rounded-md overflow-hidden bg-black border border-white/10">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white max-w-[200px] truncate">
                    {photo.title}
                  </td>
                  <td className="px-6 py-4">
                    {photo.isAlbum ? (
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded uppercase font-bold">
                        Album ({photo.album?.length || 0})
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-[10px] rounded uppercase font-bold">
                        Single
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">{photo.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(photo)}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(photo.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-[#0b0f19] border border-white/10 w-full max-w-4xl h-[90vh] sm:h-[85vh] rounded-[30px] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-white/5 flex justify-between items-center bg-[#131620]/50 backdrop-blur-md z-20">
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase">
                  Edit <span className="text-emerald-400">Photo</span>
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar relative">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />
                <form
                  onSubmit={handleUpdate}
                  className="flex flex-col gap-6 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-[#050511] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500/50 outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full bg-[#050511] border border-white/10 rounded-xl p-4 text-gray-400 focus:border-emerald-500/50 outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* ✅ HYBRID EDIT Modal Main Image Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Update Main Image Link or Upload
                    </label>
                    <div className="flex gap-2 relative">
                      <input
                        type="text"
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="w-full bg-[#050511] border border-white/10 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:border-emerald-500/50 outline-none"
                        placeholder="Paste image URL here..."
                        required
                      />

                      <input
                        type="file"
                        accept="image/*"
                        id="editMainImage"
                        className="hidden"
                        onChange={handleEditMainImageUpload}
                      />
                      <label
                        htmlFor="editMainImage"
                        className="flex items-center justify-center bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 rounded-xl px-5 cursor-pointer transition-colors"
                        title="Upload New Image"
                      >
                        {uploadingMain ? (
                          <Loader2
                            className="animate-spin text-emerald-500"
                            size={20}
                          />
                        ) : (
                          <UploadCloud className="text-emerald-400" size={20} />
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Description (Optional)
                    </label>
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full h-24 bg-[#050511] border border-white/10 rounded-xl p-4 text-gray-300 focus:border-emerald-500/50 outline-none resize-none"
                    />
                  </div>

                  <div
                    className="p-4 border border-white/10 bg-white/5 rounded-xl flex items-center justify-between cursor-pointer"
                    onClick={() => setEditIsAlbum(!editIsAlbum)}
                  >
                    <span className="text-white font-bold text-sm">
                      This is an Album (Series)
                    </span>
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${editIsAlbum ? "bg-emerald-500" : "bg-gray-700"}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${editIsAlbum ? "translate-x-6" : "translate-x-0"}`}
                      />
                    </div>
                  </div>

                  {/* ✅ HYBRID Edit Modal Album Upload */}
                  {editIsAlbum && (
                    <div className="space-y-3 p-5 border border-emerald-500/20 bg-emerald-900/5 rounded-xl">
                      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2 mb-4">
                        Album Photos
                      </h3>
                      {editAlbumImages.map((img, index) => (
                        <div
                          key={img.id}
                          className="flex flex-col sm:flex-row gap-3 items-center bg-[#050511] p-3 rounded-lg border border-white/5"
                        >
                          <span className="text-xs text-gray-500 font-mono font-bold w-6 text-center">
                            {index + 1}
                          </span>

                          <div className="flex-1 w-full flex gap-2">
                            <input
                              type="text"
                              value={img.url}
                              onChange={(e) =>
                                handleAlbumChange(img.id, "url", e.target.value)
                              }
                              placeholder="Image URL"
                              className="flex-1 bg-transparent border border-white/10 rounded-md p-2.5 text-xs text-gray-300 outline-none focus:border-emerald-500"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              id={`edit-album-${img.id}`}
                              className="hidden"
                              onChange={(e) =>
                                handleEditAlbumImageUpload(img.id, e)
                              }
                            />
                            <label
                              htmlFor={`edit-album-${img.id}`}
                              className="p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-md cursor-pointer transition-colors flex items-center justify-center"
                            >
                              {img.isUploading ? (
                                <Loader2 className="animate-spin" size={16} />
                              ) : (
                                <UploadCloud size={16} />
                              )}
                            </label>
                          </div>

                          <input
                            type="text"
                            value={img.title}
                            onChange={(e) =>
                              handleAlbumChange(img.id, "title", e.target.value)
                            }
                            placeholder="Title (Optional)"
                            className="w-full sm:w-1/3 bg-transparent border border-white/10 rounded-md p-2.5 text-xs text-white outline-none focus:border-emerald-500"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setEditAlbumImages(
                                editAlbumImages.filter((i) => i.id !== img.id),
                              )
                            }
                            className="text-red-400 p-2.5 hover:bg-red-500/10 rounded-md transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddAlbumImage}
                        className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-4 flex items-center gap-1 hover:text-emerald-300"
                      >
                        <Plus size={14} /> Add Another Photo
                      </button>
                    </div>
                  )}
                </form>
              </div>
              <div className="p-6 border-t border-white/5 bg-[#131620]/50 backdrop-blur-md flex justify-end gap-4 z-20">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={editLoading || uploadingMain}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold uppercase tracking-widest disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {editLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}{" "}
                  Save Changes
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {showDeleteModal &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#0b0f19] border border-white/10 p-8 rounded-[30px] max-w-sm w-full shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Delete this photo?
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                This action cannot be undone. It will be permanently removed
                from your gallery.
              </p>
              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/20 transition-all"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const styles: any = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };
  return (
    <div className="p-6 rounded-[24px] bg-[#131620]/60 backdrop-blur-xl border border-white/5 hover:-translate-y-1 transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 w-max rounded-xl border ${styles[color]} mb-4`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        {title}
      </p>
    </div>
  );
}
