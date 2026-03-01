import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Facebook, Linkedin } from "lucide-react";

// Import BOTH the data array and the TypeScript interface from the main gallery file
import { photographyData, PhotoItem } from "../page";

type Props = {
  params: { id: string };
};

// Apply the imported interface as the return type.
function getPhotoById(id: string): PhotoItem | null {
  for (const item of photographyData) {
    if (item.id === id) return item;
    if (item.isAlbum && item.album) {
      const innerMatch = item.album.find((a) => a.id === id);
      if (innerMatch) return innerMatch;
    }
  }
  return null;
}

// === UPDATED METADATA SECTION ===
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const photo = getPhotoById(params.id);

  if (!photo) {
    return {
      title: "Photograph Not Found",
    };
  }

  const siteUrl = "https://shakil.click";
  const pageUrl = `${siteUrl}/creative/photography/${photo.id}`;

  // Ensure the image URL is absolute for Facebook/Twitter to read properly
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
          width: 1200, // Important for Facebook large preview
          height: 630, // Important for Facebook large preview
          alt: photo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // Ensures large image on Twitter/X too
      title: photo.title,
      description: photo.description || defaultDesc,
      images: [imageUrl],
    },
  };
}

export default function DedicatedPhotoPage({ params }: Props) {
  const photo = getPhotoById(params.id);

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
