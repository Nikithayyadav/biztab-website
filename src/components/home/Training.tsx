import { Building2, Code2, FolderKanban, Presentation, Sparkles, TrendingUp, Wrench, Cpu, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Motion";
import Button from "@/components/common/Button";
import { trainingCategories, trainingHighlights } from "@/data/training";

const icons: Record<string, LucideIcon> = {
  sap: Cpu, code: Code2, ai: Sparkles, custom: Building2, upskill: TrendingUp, project: FolderKanban, instructor: Presentation, workshop: Wrench,
};

export default function Training() {
  return (
    <Section id="training" tone="mist">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading id="training" title="Build Skills. Empower Innovation." text="Empowering professionals and organizations with future-ready technology skills, through technical upskilling and practical, project-based learning." />
        <Reveal><Button href="#contact" className="!px-8 !py-3.5 !text-base">Contact for Training</Button></Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
        {trainingCategories.map((c, i) => {
          const Icon = icons[c.icon];
          return (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <article className="h-full rounded-3xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(23,25,29,0.3)] sm:p-9">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sky text-ink"><Icon size={24} strokeWidth={1.75} aria-hidden /></span>
                <h3 className="mt-6 font-display text-xl font-semibold">{c.title}</h3>
                <ul className="mt-5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-baseline gap-3 border-b border-ink/12 py-2.5 text-[0.95rem] last:border-b-0">
                      <span aria-hidden className="size-1.5 shrink-0 -translate-y-px rounded-full bg-brand" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-6">
        <ul className="grid gap-5 rounded-3xl bg-ink p-6 text-white sm:grid-cols-2 sm:p-9 lg:grid-cols-5">
          {trainingHighlights.map((h) => {
            const Icon = icons[h.icon];
            return (
              <li key={h.label} className="flex items-center gap-3 text-[0.95rem] font-medium">
                <Icon size={22} strokeWidth={1.75} aria-hidden className="shrink-0 text-sky" />
                {h.label}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
