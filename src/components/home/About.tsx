import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Motion";
import { aboutIntro, aboutPoints } from "@/data/about";

function AboutVisual() {
  // Original illustration: stacked platform layers joined by connection lines, with one orange core.
  const layer = (y: number) => `200,${y + 40} 340,${y + 110} 200,${y + 180} 60,${y + 110}`;
  return (
    <svg viewBox="0 0 400 340" aria-hidden className="mx-auto h-auto w-full max-w-md">
      {[2, 1, 0].map((i) => (
        <polygon key={i} points={layer(i * 62)} fill="#A9D8F5" fillOpacity={0.04 + (2 - i) * 0.05} stroke="#A9D8F5" strokeOpacity={0.35 + (2 - i) * 0.2} />
      ))}
      {[[200, 40], [340, 110], [200, 180], [60, 110]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line x1={x} y1={y} x2={x} y2={y + 124} stroke="#A9D8F5" strokeOpacity={0.3} strokeDasharray="3 5" />
          <circle cx={x} cy={y} r={4.5} fill="#17191D" stroke="#A9D8F5" strokeWidth={1.5} />
        </g>
      ))}
      <line x1={60} y1={110} x2={340} y2={110} stroke="#A9D8F5" strokeOpacity={0.3} />
      <line x1={200} y1={40} x2={200} y2={180} stroke="#A9D8F5" strokeOpacity={0.3} />
      <circle cx={200} cy={110} r={16} fill="none" stroke="#F47732" strokeOpacity={0.5} />
      <circle cx={200} cy={110} r={7} fill="#F47732" />
    </svg>
  );
}

export default function About() {
  return (
    <Section id="about" tone="mist">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="about" title="Technology That Moves Business Forward." />
          <Reveal delay={0.05}>
            {aboutIntro.map((t) => (
              <p key={t} className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-[1.05rem]">{t}</p>
            ))}
            <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {aboutPoints.map((p) => (
                <div key={p.title} className="border-t border-ink/15 pt-4">
                  <dt className="font-display text-base font-semibold">{p.title}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/70">{p.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-ink p-6 sm:p-10">
            <AboutVisual />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
