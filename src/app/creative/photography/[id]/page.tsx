import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Facebook, Linkedin } from "lucide-react";
import { db } from "../../../../../lib/firebase"; // ✅ Firebase import (পাথ চেক করে নিও)
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// `page.tsx` থেকে PhotoItem ইন্টারফেসটি ইমপোর্ট করে নাও (যেহেতু ওটা export করা আছে)
import type { PhotoItem } from "../page";

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

// ✅ ফায়ারবেস থেকে সরাসরি ডেটা খোঁজার ফাংশন
async function getPhotoByIdFromFirestore(
  id: string,
): Promise<PhotoItem | null> {
  try {
    // ১. প্রথমে সরাসরি Document ID হিসেবে খোঁজার চেষ্টা করবে (মেইন ইমেজ বা অ্যালবাম কভার)
    const docRef = doc(db, "photography", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PhotoItem;
    }

    // ২. যদি না পায়, তার মানে হয়তো এটা অ্যালবামের ভেতরের কোনো ছবি। তাই সব অ্যালবাম চেক করবে।
    const querySnapshot = await getDocs(collection(db, "photography"));
    for (const document of querySnapshot.docs) {
      const data = document.data();
      if (data.isAlbum && data.album) {
        const innerMatch = data.album.find((a: any) => a.id === id);
        if (innerMatch) {
          // অ্যালবামের ভেতরের ছবি হলে, মেইন অ্যালবামের description টা ধার করে দিয়ে দিচ্ছি মেটা ট্যাগের জন্য
          return { ...innerMatch, description: data.description } as PhotoItem;
        }
      }
    }
  } catch (error) {
    console.error("Error fetching photo from Firebase:", error);
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const photo = await getPhotoByIdFromFirestore(resolvedParams.id);

  if (!photo) {
    return {
      title: "Photograph Not Found",
    };
  }

  const siteUrl = "https://shakil.click";
  const pageUrl = `${siteUrl}/creative/photography/${photo.id}`;

  const imageUrl = photo.url.startsWith("http")
    ? photo.url
    : `${siteUrl}${photo.url}`;

  const defaultDesc = "A visual exploration from the Beyond Code portfolio.";

  return {
    title: `${photo.title} | Beyond Code`,
    description: photo.description || defaultDesc,
    openGraph: {
      title: photo.title,
      description: photo.description || defaultDesc,
      url: pageUrl,
      siteName: "Shakil Ahmed Portfolio",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: photo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: photo.title,
      description: photo.description || defaultDesc,
      images: [imageUrl],
    },
  };
}

export default async function DedicatedPhotoPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const photo = await getPhotoByIdFromFirestore(resolvedParams.id);

  if (!photo) {
    notFound();
  }

  const siteUrl = "https://shakil.click";
  const pageUrl = `${siteUrl}/creative/photography/${photo.id}`;
  const encodedUrl = encodeURIComponent(pageUrl);

  return (
    <main className="min-h-screen bg-[#050511] text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-center z-10 mt-10">
        <Link
          href={`/creative/photography?photo=${photo.id}`}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
          <span className="text-xs font-bold tracking-widest uppercase">
            Return to Full Gallery
          </span>
        </Link>

        <div className="flex gap-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-[#1877F2] transition-colors border border-[#1877F2]/30"
            title="Share on Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#0A66C2]/20 hover:bg-[#0A66C2]/40 text-[#0A66C2] transition-colors border border-[#0A66C2]/30"
            title="Share on LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>

      <div className="relative w-full max-w-5xl h-[65vh] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#0b0f19]">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-5xl w-full mt-8 text-center">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 drop-shadow-lg">
          {photo.title}
        </h1>
        {photo.description && (
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            {photo.description}
          </p>
        )}
      </div>
    </main>
  );
}
