import { Cloud, Code2, Cpu, Sparkles, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Motion";
import { techGroups } from "@/data/technology";

const icons: Record<string, LucideIcon> = { sap: Cpu, code: Code2, ai: Sparkles, cloud: Cloud };

export default function Technology() {
  return (
    <Section id="technology" tone="white">
      <SectionHeading id="technology" title="Powered by Technology. Driven by Innovation." text="The engineering foundations behind our consulting, products and innovation work." />
      <div className="relative mt-14">
        {/* Connection lines and hub between the four capability panels (large screens) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <span className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-line" />
          <span className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-line" />
          <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink font-display text-[0.7rem] font-bold text-white">
            BIZTAB<span className="text-brand">.</span>
          </span>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
          {techGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <Reveal key={g.title} delay={(i % 2) * 0.08} className="h-full">
                <article className="relative h-full rounded-3xl border border-line bg-mist p-7 transition duration-300 hover:-translate-y-1 hover:border-ink/25 sm:p-9">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-sky"><Icon size={24} strokeWidth={1.75} aria-hidden /></span>
                    <h3 className="font-display text-xl font-semibold leading-snug">{g.title}</h3>
                  </div>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">{g.statement}</p>
                  <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
                    {g.items.map((t) => (
                      <li key={t} className="flex items-baseline gap-3 border-t border-ink/12 py-2.5 text-[0.95rem] font-medium">
                        <span aria-hidden className="size-1.5 shrink-0 -translate-y-px rounded-full bg-brand" />{t}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
