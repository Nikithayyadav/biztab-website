export type NavItem = { label: string; href: string; status?: string };
export type NavGroup = { label: string; href: string; children?: NavItem[] };

// NOTE: links target homepage sections until internal pages exist. TODO(confirm): product names/availability are awaiting final company confirmation. Edit here.
export const navigation: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  {
    label: "Consulting",
    href: "/#pillar-consulting",
    children: [
      { label: "SAP Consulting", href: "/#pillar-consulting" },
      { label: "Full Stack & AI Consulting", href: "/#pillar-consulting" },
    ],
  },
  {
    label: "Products",
    href: "/#products",
    children: [
      { label: "iTASK", href: "/#itask" },
      { label: "Biztab HR", href: "/#biztab-hr" },
      { label: "iPlus", href: "/#iplus" },
      { label: "ePlus", href: "/#eplus" },
    ],
  },
  { label: "Innovation Lab", href: "/#pillar-innovation-lab" },
  { label: "Corporate Training", href: "/#training" },
  { label: "Contact Us", href: "/#contact" },
];

/** The last item is rendered as the orange call-to-action button. */
export const navCta = navigation[navigation.length - 1];
export const navLinks = navigation.slice(0, -1);
