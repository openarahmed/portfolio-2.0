import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Facebook, Linkedin } from "lucide-react";

// Import data and interface
import { graphicData, type GraphicProject } from "../data";

// ✅ FIX 1: Compatible with both Next.js 14 and 15
type Props = {
  params: Promise<{ id: string }> | { id: string };
};

// Helper function to find the exact design or a sub-image
function getDesignById(
  id: string,
): { title: string; description?: string; url: string; id: string } | null {
  for (const item of graphicData) {
    if (item.id === id) return item;

    if (item.richContent?.extraImages) {
      // ✅ FIX 2: Explicitly typed 'img' to solve the 'any' type error
      const innerMatch = item.richContent.extraImages.find(
        (img: { id: string; url: string; title: string }) => img.id === id,
      );
      if (innerMatch) {
        return { ...innerMatch, description: item.description };
      }
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ✅ FIX 3: Safely resolve params to prevent 500 Server Error
  const resolvedParams = await Promise.resolve(params);
  const design = getDesignById(resolvedParams.id);

  if (!design) {
    return {
      title: "Design Not Found",
    };
  }

  const siteUrl = "https://shakil.click";
  const pageUrl = `${siteUrl}/creative/graphic-design/${design.id}`;

  const imageUrl = design.url.startsWith("http")
    ? design.url
    : `${siteUrl}${design.url}`;

  const defaultDesc =
    "A visual design exploration from the Beyond Code portfolio.";

  return {
    title: `${design.title} | Beyond Code`,
    description: design.description || defaultDesc,
    openGraph: {
      title: design.title,
      description: design.description || defaultDesc,
      url: pageUrl,
      siteName: "Shakil Ahmed Portfolio",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: design.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: design.title,
      description: design.description || defaultDesc,
      images: [imageUrl],
    },
  };
}

export default async function DedicatedDesignPage({ params }: Props) {
  // ✅ FIX 3: Safely resolve params to prevent 500 Server Error
  const resolvedParams = await Promise.resolve(params);
  const design = getDesignById(resolvedParams.id);

  if (!design) {
    notFound();
  }

  const siteUrl = "https://shakil.click";
  const pageUrl = `${siteUrl}/creative/graphic-design/${design.id}`;
  const encodedUrl = encodeURIComponent(pageUrl);

  return (
    <main className="min-h-screen bg-[#050511] text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-center z-10 mt-10">
        <Link
          href={`/creative/graphic-design?design=${design.id}`}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
          <span className="text-xs font-bold tracking-widest uppercase">
            Return to Design Gallery
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
          src={design.url}
          alt={design.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-5xl w-full mt-8 text-center">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 drop-shadow-lg">
          {design.title}
        </h1>
        {design.description && (
          <p className="text-gray-400 max-w-2xl mx-auto font-medium">
            {design.description}
          </p>
        )}
      </div>
    </main>
  );
}
