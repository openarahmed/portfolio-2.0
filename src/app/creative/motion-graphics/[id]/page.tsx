import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Facebook, Linkedin, Play } from "lucide-react";

// Import data and interface
import { motionData, type MotionProject } from "../data";

// Compatible with both Next.js 14 and 15
type Props = {
  params: Promise<{ id: string }> | { id: string };
};

// Helper function to find the exact video
function getVideoById(id: string): MotionProject | null {
  return motionData.find((item) => item.id === id) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Safely resolve params to prevent 500 Server Error
  const resolvedParams = await Promise.resolve(params);
  const video = getVideoById(resolvedParams.id);

  if (!video) {
    return {
      title: "Video Not Found",
    };
  }

  const siteUrl = "https://shakil.click";
  const pageUrl = `${siteUrl}/creative/motion-graphics/${video.id}`;

  // Using thumbnailUrl for the social media preview image
  const imageUrl = video.thumbnailUrl.startsWith("http")
    ? video.thumbnailUrl
    : `${siteUrl}${video.thumbnailUrl}`;

  const defaultDesc =
    "A cinematic motion graphics project from the Beyond Code portfolio.";

  return {
    title: `${video.title} | Beyond Code`,
    description: video.description || defaultDesc,
    openGraph: {
      title: video.title,
      description: video.description || defaultDesc,
      url: pageUrl,
      siteName: "Shakil Ahmed Portfolio",
      type: "video.other",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: video.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description || defaultDesc,
      images: [imageUrl],
    },
  };
}

export default async function DedicatedMotionPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const video = getVideoById(resolvedParams.id);

  if (!video) {
    notFound();
  }

  const siteUrl = "https://shakil.click";
  const pageUrl = `${siteUrl}/creative/motion-graphics/${video.id}`;
  const encodedUrl = encodeURIComponent(pageUrl);

  return (
    <main className="min-h-screen bg-[#050511] text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-center z-10 mt-10">
        <Link
          href={`/creative/motion-graphics?video=${video.id}`}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
          <span className="text-xs font-bold tracking-widest uppercase">
            Return to Video Gallery
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

      <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.3)] bg-black group">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          priority
        />

        <Link
          href={`/creative/motion-graphics?video=${video.id}`}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500 mb-4">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1 md:ml-2" />
          </div>
          <span className="text-white font-bold tracking-widest text-xs md:text-sm uppercase bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            Click to Watch
          </span>
        </Link>
      </div>

      <div className="max-w-5xl w-full mt-8 text-center">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 drop-shadow-lg">
          {video.title}
        </h1>
        {video.description && (
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            {video.description}
          </p>
        )}
      </div>
    </main>
  );
}
