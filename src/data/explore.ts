import { pillars } from "./pillars";
import { products } from "./products";

export const exploreVerticals = pillars.map((p) => ({ id: p.id, title: p.title, description: p.description, href: `/#pillar-${p.id}` }));
export const exploreProducts = products.map((p) => ({ id: p.id, title: p.name, description: p.descriptor, href: `/#${p.id}` }));
