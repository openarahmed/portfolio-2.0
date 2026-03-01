"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FileText, Camera, MonitorPlay, Palette, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    blogs: 0,
    photos: 0,
    graphics: 0,
    videos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const blogsSnap = await getDocs(collection(db, "posts"));
        const photosSnap = await getDocs(collection(db, "photography"));

        setStats({
          blogs: blogsSnap.size,
          photos: photosSnap.size,
          graphics: 0,
          videos: 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center text-blue-500">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 relative">
      <div className="mb-10 mt-8">
        <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
          Welcome Back
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          System Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <Link href="/admin/blogs">
          <StatCard
            title="Total Blogs"
            value={stats.blogs}
            icon={<FileText size={24} />}
            color="blue"
          />
        </Link>
        <Link href="/admin/photography">
          <StatCard
            title="Photography"
            value={stats.photos}
            icon={<Camera size={24} />}
            color="green"
          />
        </Link>
        <Link href="#">
          <StatCard
            title="Graphic Design"
            value={stats.graphics}
            icon={<Palette size={24} />}
            color="purple"
          />
        </Link>
        <Link href="#">
          <StatCard
            title="Motion Graphics"
            value={stats.videos}
            icon={<MonitorPlay size={24} />}
            color="pink"
          />
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const styles: any = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/50",
    green:
      "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/50",
    purple:
      "text-purple-400 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/50",
    pink: "text-pink-400 bg-pink-500/10 border-pink-500/20 group-hover:border-pink-500/50",
  };
  return (
    <div className="p-6 rounded-[24px] bg-[#131620]/60 backdrop-blur-xl border border-white/5 hover:-translate-y-1 transition-all group cursor-pointer h-full">
      <div
        className={`p-3 w-max rounded-xl border ${styles[color]} mb-4 transition-colors`}
      >
        {icon}
      </div>
      <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        {title}
      </p>
    </div>
  );
}
