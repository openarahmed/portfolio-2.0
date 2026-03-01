export interface GraphicProject {
  id: string;
  date: string;
  type: "case-study" | "standalone";
  title: string;
  category: string;
  description?: string;
  url: string;
  tags?: string[];
  gridSpan?: string;
  richContent?: {
    role: string;
    challenge: string;
    solution: string;
    extraImages?: { id: string; url: string; title: string }[];
  };
}

export const graphicData: GraphicProject[] = [
  {
    id: "gd1",
    date: "2026-02-25",
    type: "case-study",
    title: "Premium Product Packaging",
    category: "Branding & Print",
    description:
      "A complete label and packaging design system emphasizing organic ingredients and premium market positioning.",
    url: "https://i.postimg.cc/MG0BZPrX/Label-for-holuder-copy.jpg",
    tags: ["Packaging", "Print Design", "Typography", "Photoshop"],
    richContent: {
      role: "Lead Visual Designer",
      challenge:
        "The market for organic spices is heavily saturated. The client needed a packaging design that felt both traditional/authentic and premium/modern to stand out on supermarket shelves.",
      solution:
        "I utilized a warm, earthy color palette combined with clean, modern typography. The focal point is a custom vector illustration that instantly communicates the product's core ingredient. The layout was carefully structured to ensure all regulatory information was readable without cluttering the visual hierarchy.",
    },
  },
  {
    id: "gd2",
    date: "2026-02-15",
    type: "case-study",
    title: "University Webinar Banner",
    category: "Digital Marketing",
    description:
      "A high-conversion digital banner designed for Northern University Bangladesh to promote an upcoming creative webinar.",
    url: "https://i.postimg.cc/2j04Btkt/nub-WEBINAR-(1).jpg",
    tags: ["Digital Banner", "Typography", "Marketing Asset", "Illustrator"],
    richContent: {
      role: "Graphic Designer",
      challenge:
        "Capturing the attention of students scrolling rapidly through social media feeds, requiring clear communication of the webinar's value proposition, date, and key speakers in a limited visual space.",
      solution:
        "Implemented a high-contrast color scheme aligned with NUB's brand identity. I used bold, hierarchical typography to make the key information pop, ensuring the call-to-action was immediately visible and legible on both desktop and mobile screens.",
    },
  },
  {
    id: "gd3",
    date: "2026-02-10",
    type: "case-study",
    title: "Social Media Campaign",
    category: "Brand Awareness",
    description:
      "A cohesive visual asset crafted for a targeted social media marketing campaign, focusing on audience engagement.",
    url: "https://i.postimg.cc/qRXTgn8k/graphics_design.jpg",
    tags: ["Social Media", "Campaign Design", "Layout", "Photoshop"],
    richContent: {
      role: "Content Designer",
      challenge:
        "Creating a visual language that felt fresh and engaging for a younger demographic while maintaining professional brand consistency across multiple digital platforms.",
      solution:
        "Developed a precise design system using dynamic layouts, modern gradient overlays, and strong focal imagery. The structured grid approach allowed the visual to communicate complex information cleanly without feeling cluttered.",
    },
  },
];
