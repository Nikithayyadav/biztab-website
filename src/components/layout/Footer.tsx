import Link from "next/link";
import Logo from "@/components/common/Logo";
import { navigation } from "@/data/navigation";

const group = (label: string) => navigation.find((n) => n.label === label)?.children ?? [];
const columns = [
  { title: "Consulting", links: group("Consulting") },
  { title: "Products", links: group("Products") },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Innovation Lab", href: "/#pillar-innovation-lab" },
      { label: "Corporate Training", href: "/#training" },
      { label: "Contact Us", href: "/#contact" },
    ],
  },
];
// Add official profiles only once verified, e.g. { label: "LinkedIn", href: "https://…" }. Nothing renders while empty.
const socials: { label: string; href: string }[] = [];

export default function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo variant="dark" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/80">
              BIZTAB.AI brings together technology consulting, enterprise products, innovation and corporate training for organizations preparing for the future.
            </p>
            <p className="mt-4 text-[0.95rem] font-medium text-sky">www.biztab.ai</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.label}><a href={s.href} className="rounded-full border border-white/30 px-3.5 py-1.5 text-sm text-white/80 hover:text-white">{s.label}</a></li>
                ))}
              </ul>
            )}
          </div>

          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="font-display text-base font-semibold">{c.title}</h2>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-[0.95rem] text-white/80 transition-colors hover:text-white">{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BIZTAB.AI. BIZTAB Consulting Services Pvt. Ltd. All rights reserved.</p>
          <ul className="flex gap-6">
            {/* TODO: replace "#" with real Privacy Policy and Terms pages. */}
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
