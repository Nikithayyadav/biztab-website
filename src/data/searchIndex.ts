import { products } from "./products";
import { trainingCategories } from "./training";
import { aboutPoints } from "./about";

export type SearchCategory = "Consulting" | "Products" | "Innovation Lab" | "Corporate Training" | "Company";
export type SearchItem = { title: string; description: string; href: string; category: SearchCategory; keywords: string };

export const categoryOrder: SearchCategory[] = ["Consulting", "Products", "Innovation Lab", "Corporate Training", "Company"];
// To extend search: add an entry to `items` below (title, description, href, category, keywords). Page content is searched automatically.
export const suggestions = ["SAP", "iTASK", "Generative AI", "Integration", "HR", "Training"];

const items: SearchItem[] = [
  ...products.map((p): SearchItem => ({ title: p.name, description: p.descriptor, href: `/#${p.id}`, category: "Products", keywords: `${p.intro} ${p.features.join(" ")}` })),
  { title: "SAP Consulting", description: "Enterprise technology consulting on the SAP ecosystem.", href: "/#pillar-consulting", category: "Consulting", keywords: "SAP ABAP Fiori UI5 RAP CAP BTP Integration Suite Data Analytics digital transformation" },
  { title: "Full Stack & AI Consulting", description: "Full stack engineering and AI application development.", href: "/#pillar-consulting", category: "Consulting", keywords: "Full Stack Development Next.js React Python FastAPI AI Application Development Generative AI AI Agent Development" },
  { title: "Technology capabilities", description: "SAP, full stack, AI, cloud and integration expertise.", href: "/#technology", category: "Consulting", keywords: "technology engineering PostgreSQL cloud enterprise integration data analytics" },
  { title: "BIZTAB Innovation Lab", description: "Research, experiment, innovate and build next-generation AI solutions.", href: "/#pillar-innovation-lab", category: "Innovation Lab", keywords: "AI Generative AI research agents proof of concepts product innovation industry-specific emerging technology" },
  ...trainingCategories.map((c): SearchItem => ({ title: c.title, description: "Corporate training programs.", href: "/#training", category: "Corporate Training", keywords: c.items.join(" ") })),
  { title: "AI Research", description: "AI and Generative AI research and experimentation.", href: "/#pillar-innovation-lab", category: "Innovation Lab", keywords: "AI Generative AI research experiment emerging technology" },
  { title: "AI Agent Development", description: "AI agent development across consulting and the Innovation Lab.", href: "/#pillar-innovation-lab", category: "Innovation Lab", keywords: "AI agents agent development generative AI" },
  { title: "SAP ABAP, RAP, CAP and BTP", description: "SAP training programs.", href: "/#training", category: "Corporate Training", keywords: "SAP ABAP RAP CAP BTP training" },
  { title: "Corporate Training", description: "Future-ready technology skills for professionals and organizations.", href: "/#training", category: "Corporate Training", keywords: "upskilling workshops instructor-led project-based customized learning courses" },
  { title: "About BIZTAB", description: "Who we are, what we do, our vision and our approach.", href: "/#about", category: "Company", keywords: aboutPoints.map((p) => p.title).join(" ") + " company" },
  { title: "Contact Us", description: "Send a business enquiry to BIZTAB.", href: "/#contact", category: "Company", keywords: "contact us enquiry business form message talk" },
];

export type SearchGroup = { category: SearchCategory; items: SearchItem[] };

export function search(query: string, category: SearchCategory | null = null): SearchGroup[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length && !category) return [];
  const hits = items
    .filter((i) => {
      if (category && i.category !== category) return false;
      const hay = `${i.title} ${i.description} ${i.keywords}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    })
    .sort((a, b) => Number(tokens.every((t) => b.title.toLowerCase().includes(t))) - Number(tokens.every((t) => a.title.toLowerCase().includes(t))));
  return categoryOrder.map((category) => ({ category, items: hits.filter((i) => i.category === category) })).filter((g) => g.items.length);
}
