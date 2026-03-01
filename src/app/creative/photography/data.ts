export interface PhotoItem {
  id: string;
  date?: string;
  isAlbum?: boolean;
  url: string;
  title: string;
  description?: string;
  album?: PhotoItem[];
}

export const photographyData: PhotoItem[] = [
  {
    id: "p1",
    date: "2026-02-26",
    isAlbum: true,
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
    title: "Neon Nights Series",
    description:
      "A cinematic exploration of cyberpunk aesthetics, capturing the vibrant neon glow and moody atmosphere of urban nights.",
    album: [
      {
        id: "a1_1",
        url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
        title: "Cyberpunk Alley",
      },
      {
        id: "a1_2",
        url: "https://images.unsplash.com/photo-1554629947-334ff61d85dc?auto=format&fit=crop&w=1200&q=80",
        title: "Neon Rain",
      },
      {
        id: "a1_3",
        url: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=1200&q=80",
        title: "Midnight Glow",
      },
      {
        id: "a1_4",
        url: "https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=1200&q=80",
        title: "City Grid",
      },
    ],
  },
  {
    id: "p2",
    date: "2026-02-24",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    title: "Urban Geometry",
  },
  {
    id: "p3",
    date: "2026-02-20",
    url: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=800&q=80",
    title: "Light and Shadow",
  },
  {
    id: "p4",
    date: "2026-02-18",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    title: "Natural Symmetry",
  },
  {
    id: "p5",
    date: "2026-02-15",
    isAlbum: true,
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
    title: "Nordic Landscapes",
    description:
      "Documenting the raw, untouched beauty of the northern wilderness. Emphasizing scale, natural light, and dramatic weather patterns.",
    album: [
      {
        id: "a2_1",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        title: "Mountain Peaks",
      },
      {
        id: "a2_2",
        url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80",
        title: "Hidden Valley",
      },
      {
        id: "a2_3",
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
        title: "Fjord Reflection",
      },
    ],
  },
  {
    id: "p6",
    date: "2026-02-10",
    url: "https://images.unsplash.com/photo-1470071131384-001b85755b96?auto=format&fit=crop&w=800&q=80",
    title: "Misty Morning",
  },
  {
    id: "p7",
    date: "2026-02-05",
    isAlbum: true,
    url: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=800&q=80",
    title: "Monochrome Architecture",
    description:
      "A study of brutalist and modern architecture, stripped of color to highlight structural geometry, leading lines, and deep contrast.",
    album: [
      {
        id: "a3_1",
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80",
        title: "Lines & Curves",
      },
      {
        id: "a3_2",
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
        title: "Brutalism",
      },
      {
        id: "a3_3",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        title: "Symmetry",
      },
    ],
  },
  {
    id: "p8",
    date: "2026-01-20",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Golden Hour",
  },
];
