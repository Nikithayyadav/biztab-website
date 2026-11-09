export type Pillar = {
  id: "consulting" | "products" | "innovation-lab" | "corporate-training";
  title: string;
  description: string;
  /** Maximum three brief highlights. Detailed lists live in their own sections. */
  highlights: string[];
  cta: { label: string; href: string };
};

// Links target homepage sections until internal pages exist. Swap hrefs when those pages are built.
export const pillars: Pillar[] = [
  {
    id: "consulting",
    title: "Consulting",
    description: "Enterprise technology consulting and digital transformation.",
    highlights: ["SAP consulting", "Full stack and AI consulting", "Digital transformation"],
    cta: { label: "Explore Consulting", href: "#technology" },
  },
  {
    id: "products",
    title: "BIZTAB Products",
    description: "Our own portfolio of enterprise and AI-powered SaaS products.",
    highlights: ["Enterprise software", "AI-powered SaaS", "Our own portfolio"],
    cta: { label: "Explore Products", href: "#products" },
  },
  {
    id: "innovation-lab",
    title: "BIZTAB Innovation Lab",
    description: "Research, experiment, innovate and build next-generation AI solutions.",
    highlights: ["AI and Generative AI research", "Proof of concepts", "Industry-specific AI solutions"],
    cta: { label: "Explore Innovation", href: "#technology" },
  },
  {
    id: "corporate-training",
    title: "Corporate Training",
    description: "Empowering professionals and organizations with future-ready technology skills.",
    highlights: ["SAP and full stack skills", "AI and Generative AI", "For professionals and teams"],
    cta: { label: "Explore Training", href: "#training" },
  },
];
