import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pillarIcons } from "@/components/common/pillarIcons";
import { exploreProducts, exploreVerticals } from "@/data/explore";

export default function ExploreMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div id="explore-menu" className="absolute inset-x-0 top-full hidden border-b border-line bg-white text-ink shadow-[0_28px_48px_-28px_rgba(23,25,29,0.35)] xl:block">
      <div className="mx-auto grid max-w-7xl grid-cols-[1.7fr_1fr] gap-12 px-8 py-10">
        <div>
          <h2 className="font-display text-base font-semibold">Four business verticals</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {exploreVerticals.map((v) => {
              const Icon = pillarIcons[v.id];
              return (
                <li key={v.id}>
                  <Link href={v.href} onClick={onNavigate} className="group flex h-full gap-4 rounded-2xl border border-transparent p-4 transition-colors hover:border-line hover:bg-pale">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white"><Icon size={22} strokeWidth={1.75} aria-hidden /></span>
                    <span>
                      <span className="block font-display text-[0.98rem] font-semibold">{v.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink/65">{v.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-l border-line pl-12">
          <h2 className="font-display text-base font-semibold">Featured products</h2>
          <ul className="mt-5">
            {exploreProducts.map((p) => (
              <li key={p.id}>
                <Link href={p.href} onClick={onNavigate} className="group flex items-center justify-between gap-4 border-b border-line py-3">
                  <span>
                    <span className="block text-[0.95rem] font-semibold">{p.title}</span>
                    <span className="block text-sm text-ink/65">{p.description}</span>
                  </span>
                  <ArrowRight size={16} aria-hidden className="shrink-0 text-ink/40 transition group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#products" onClick={onNavigate} className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold">
            <span className="underline decoration-brand decoration-2 underline-offset-[6px]">See all products</span>
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
