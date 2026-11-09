"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroScreenshot } from "@/data/hero";

const pills = [
  { label: "Consulting", id: "consulting", pos: "left-[1%] top-[3%]" },
  { label: "Products", id: "products", pos: "left-[38%] top-0" },
  { label: "Innovation Lab", id: "innovation-lab", pos: "left-[32%] top-[91%]" },
  { label: "Corporate Training", id: "corporate-training", pos: "left-[60%] top-[86%]" },
];
const float = (duration: number, delay = 0) => ({
  animate: { y: [0, -6, 0] },
  transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
});
const card = "absolute z-20 rounded-xl bg-white p-3 shadow-[0_20px_40px_-18px_rgba(3,25,60,0.6)]";

function Concept() {
  return (
    <div aria-hidden className="grid h-[calc(100%-2rem)] grid-cols-[22%_1fr] gap-3 p-3">
      <div className="space-y-2">
        <div className="h-2 rounded bg-primary" />
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-2 rounded bg-pale" />)}
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-pale p-2"><div className="h-1.5 w-1/2 rounded bg-sky" /><div className="mt-2 h-3 w-2/3 rounded bg-primary/70" /></div>
          ))}
        </div>
        <div className="flex items-center">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center last:flex-none">
              <span className={`size-4 rounded-full border-2 ${i === 3 ? "border-brand bg-brand/20" : "border-primary bg-white"}`} />
              {i < 3 && <span className="h-px flex-1 bg-sky" />}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-pale" /><div className="h-2 w-4/5 rounded bg-pale" /><div className="h-2 w-3/5 rounded bg-sky/60" />
        </div>
      </div>
      <p className="absolute bottom-2 right-3 text-[10px] text-ink/45">Conceptual illustration</p>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-[620px]">
      <svg aria-hidden viewBox="0 0 600 500" className="absolute inset-0 h-full w-full">
        {[[67, 29], [273, 29], [271, 464], [461, 434]].map(([x, y]) => (
          <line key={`${x}-${y}`} x1={x} y1={y} x2={276} y2={250} stroke="#A9D8F5" strokeOpacity={0.4} />
        ))}
      </svg>

      <motion.div {...float(8)} className="absolute left-[12%] top-[20%] z-10 h-[58%] w-[68%] overflow-hidden rounded-2xl bg-white shadow-[0_32px_64px_-20px_rgba(3,25,60,0.65)]">
        <div aria-hidden className="flex h-8 items-center gap-1.5 border-b border-pale px-3">
          {[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-sky" />)}
        </div>
        {heroScreenshot ? (
          <div className="relative h-[calc(100%-2rem)]">
            <Image src={heroScreenshot} alt="iTASK dashboard" fill priority sizes="(min-width:1024px) 420px, 90vw" className="object-cover object-top" />
          </div>
        ) : (
          <Concept />
        )}
      </motion.div>

      <motion.div {...float(6.5, 0.6)} aria-hidden className={`${card} right-0 top-[8%] w-[34%]`}>
        <p className="text-[11px] font-semibold text-deep">AI insights</p>
        <svg viewBox="0 0 100 40" className="mt-2 h-auto w-full">
          <polyline points="0,32 18,26 34,30 52,16 70,20 98,6" fill="none" stroke="#0866B8" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={98} cy={6} r={3.5} fill="#F47732" />
        </svg>
      </motion.div>

      <motion.div {...float(7, 1.1)} aria-hidden className={`${card} bottom-[10%] left-0 w-[36%]`}>
        <p className="text-[11px] font-semibold text-deep">Integration</p>
        <svg viewBox="0 0 100 50" className="mt-2 h-auto w-full">
          {[8, 25, 42].map((y) => (<g key={y}><line x1={14} y1={y} x2={50} y2={25} stroke="#A9D8F5" /><line x1={50} y1={25} x2={86} y2={y} stroke="#A9D8F5" /><circle cx={10} cy={y} r={4} fill="#EAF4FC" stroke="#0866B8" /><circle cx={90} cy={y} r={4} fill="#EAF4FC" stroke={y === 42 ? "#F47732" : "#0866B8"} /></g>))}
          <circle cx={50} cy={25} r={7} fill="#0866B8" />
        </svg>
      </motion.div>

      {pills.map((p) => (
        <a
          key={p.id}
          href={`#pillar-${p.id}`}
          className={`absolute z-30 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-sky/50 bg-deep px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-white hover:text-deep sm:text-xs ${p.pos}`}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {p.label}
        </a>
      ))}
    </div>
  );
}
