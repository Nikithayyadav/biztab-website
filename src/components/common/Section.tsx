import type { ReactNode } from "react";
import { Reveal } from "@/components/common/Motion";

export type Tone = "white" | "mist" | "dark";
const bg: Record<Tone, string> = { white: "bg-white text-ink", mist: "bg-mist text-ink", dark: "bg-ink text-white" };

export function Section({ id, tone = "white", children }: { id: string; tone?: Tone; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 py-20 sm:py-28 ${bg[tone]}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ id, title, text, tone = "white", className = "" }: { id: string; title: string; text?: string; tone?: Tone; className?: string }) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <h2 id={`${id}-title`} className="text-balance font-display text-[clamp(1.9rem,3.8vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
        {title}
      </h2>
      {text && <p className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-white/70" : "text-ink/70"}`}>{text}</p>}
    </Reveal>
  );
}
