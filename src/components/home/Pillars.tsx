"use client";

import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pillarIcons } from "@/components/common/pillarIcons";
import { pillars, type Pillar } from "@/data/pillars";

// Each vertical gets its own surface so the four read as distinct and equal.
const tones: Record<Pillar["id"], { panel: string; muted: string; icon: string; rule: string; dot: string; under: string }> = {
  consulting: { panel: "bg-mist text-ink", muted: "text-ink/70", icon: "bg-ink text-white", rule: "border-ink/12", dot: "bg-brand", under: "decoration-brand" },
  products: { panel: "bg-ink text-white", muted: "text-white/70", icon: "bg-brand text-ink", rule: "border-white/15", dot: "bg-brand", under: "decoration-brand" },
  "innovation-lab": { panel: "bg-sky text-ink", muted: "text-ink/85", icon: "bg-ink text-sky", rule: "border-ink/25", dot: "bg-ink", under: "decoration-ink" },
  "corporate-training": { panel: "bg-white text-ink border border-line", muted: "text-ink/70", icon: "bg-sky text-ink", rule: "border-ink/12", dot: "bg-brand", under: "decoration-brand" },
};

function Panel({ pillar }: { pillar: Pillar }) {
  const t = tones[pillar.id];
  const Icon = pillarIcons[pillar.id];
  return (
    <motion.article
      id={`pillar-${pillar.id}`}
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
      className={`group flex h-full scroll-mt-24 flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(23,25,29,0.4)] ${t.panel}`}
    >
      <span className={`inline-flex size-12 items-center justify-center rounded-xl ${t.icon}`}>
        <Icon size={24} strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-6 font-display text-[1.45rem] font-semibold leading-tight tracking-tight">{pillar.title}</h3>
      <p className={`mt-3 text-[0.95rem] leading-relaxed ${t.muted}`}>{pillar.description}</p>
      <ul className="mt-6">
        {pillar.highlights.map((h) => (
          <li key={h} className={`flex items-baseline gap-3 border-t py-2.5 text-[0.92rem] font-medium ${t.rule}`}>
            <span aria-hidden className={`size-1.5 shrink-0 -translate-y-px rounded-full ${t.dot}`} />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <Link href={pillar.cta.href} className="inline-flex items-center gap-2 font-display text-[0.95rem] font-semibold">
          <span className={`underline decoration-2 underline-offset-[6px] ${t.under}`}>{pillar.cta.label}</span>
          <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function Pillars() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="pillars" aria-labelledby="pillars-title" className="scroll-mt-16 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <h2 id="pillars-title" className="text-balance font-display text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              Four Pillars. One Technology Vision.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
              From enterprise consulting and intelligent software products to AI innovation and professional training,
              BIZTAB brings together the capabilities businesses need to move forward.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6"
          >
            {pillars.map((p) => <Panel key={p.id} pillar={p} />)}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
