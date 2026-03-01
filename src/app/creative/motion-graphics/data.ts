export interface MotionProject {
  id: string;
  date: string;
  type: "case-study" | "standalone";
  title: string;
  category: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags?: string[];
  gridSpan?: string;
  richContent?: {
    role: string;
    challenge: string;
    solution: string;
  };
}

export const motionData: MotionProject[] = [
  {
    id: "mg1",
    date: "2026-02-28",
    type: "case-study",
    title: "NUB Creative Platform Trailer",
    category: "Cinematic Trailer",
    description:
      "A high-impact cinematic trailer designed to launch the new creative platform for Northern University Bangladesh, inspiring students to explore their creative potential.",
    thumbnailUrl: "https://i.postimg.cc/GtL1D2Q3/portfolio_video_banner_1.png",
    videoUrl: "https://www.youtube.com/embed/xwseky2ZxYA",
    tags: ["Premiere Pro", "After Effects", "Sound Design", "Cinematography"],
    richContent: {
      role: "Video Editor & Motion Designer",
      challenge:
        "Northern University Bangladesh needed a compelling visual narrative to launch their new creative platform. The trailer had to feel energetic, modern, and deeply inspiring to capture the attention of a young, dynamic student body.",
      solution:
        "I crafted a fast-paced cinematic sequence using dynamic cuts, kinetic typography, and a highly immersive audio landscape. The visual pacing was designed to build anticipation and clearly communicate the platform's core vision of empowering student creativity.",
    },
  },
  {
    id: "mg2",
    date: "2026-02-20",
    type: "case-study",
    title: "Codermat Service Promo",
    category: "B2B Advertising",
    description:
      "A targeted advertising video for Codermat, highlighting their premium web development services and technical expertise to potential business clients.",
    thumbnailUrl: "https://i.postimg.cc/kXXzCLGX/portfolio-video-banner-3.png",
    videoUrl: "https://www.youtube.com/embed/tclP9A2ze64",
    tags: ["Motion Graphics", "Premiere Pro", "B2B Marketing", "Tech Visuals"],
    richContent: {
      role: "Content Creator & Editor",
      challenge:
        "Codermat needed an engaging way to showcase their complex web development services to business owners who might lack technical expertise, without losing their attention in a crowded digital ad space.",
      solution:
        "I translated their technical offerings into sleek, easy-to-understand motion graphics and UI animations. Paired with a strong hook and a clear, benefit-driven narrative, the video acts as a highly effective conversion tool tailored for targeted digital campaigns.",
    },
  },
  {
    id: "mg3",
    date: "2026-02-15",
    type: "case-study",
    title: "Codermat Social Campaign",
    category: "Social Media Advertising",
    description:
      "A fast-paced, vertical-optimized short-form video advertisement designed to drive conversion for Codermat's web development services on social platforms.",
    thumbnailUrl: "https://i.postimg.cc/6qWNZ3hD/portfolio_video_banner.png",
    videoUrl: "https://www.youtube.com/embed/-HT9K-u4afY",
    tags: ["Short Form Content", "Social Media", "After Effects", "Engagement"],
    richContent: {
      role: "Video Editor",
      challenge:
        "Capturing the attention of scrolling users on platforms like Instagram and TikTok requires the core value proposition of Codermat's development services to be delivered within the first three seconds.",
      solution:
        "Engineered a high-retention vertical video utilizing rapid visual hooks, bold typography, and modern transition effects. The visual hierarchy was specifically optimized for mobile screens to quickly communicate expertise and drive immediate click-throughs.",
    },
  },
];
