import Image from "next/image";
import { Building2, Check, ListChecks, Network, Users, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Motion";
import Button from "@/components/common/Button";
import { products, type Product } from "@/data/products";

const icons: Record<Product["icon"], LucideIcon> = { tasks: ListChecks, hr: Users, integration: Network, enterprise: Building2 };
const accents: Record<Product["icon"], { tile: string; fill: string }> = {
  tasks: { tile: "bg-brand text-ink", fill: "bg-brand/80" },
  hr: { tile: "bg-sky text-ink", fill: "bg-sky/70" },
  integration: { tile: "bg-brand text-ink", fill: "bg-brand/80" },
  enterprise: { tile: "bg-sky text-ink", fill: "bg-sky/70" },
};
const bar = "rounded bg-white/10";
const tile = "rounded-lg bg-white/[0.07]";

/** Abstract preview, different for each product's purpose. Replaced by a real screenshot when one is supplied. */
function Wireframe({ kind }: { kind: Product["icon"] }) {
  const fill = accents[kind].fill;
  if (kind === "tasks")
    return (
      <div className="grid h-full grid-cols-3 gap-3 p-5">
        {[3, 2, 2].map((n, c) => (
          <div key={c} className="space-y-2.5">
            <div className={`h-3 w-2/3 ${bar}`} />
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className={`${tile} p-2.5 ${c === 0 && i === 0 ? `border-l-4 border-brand` : ""}`}>
                <div className={`h-2 w-4/5 ${bar}`} />
                <div className={`mt-2 h-2 w-1/2 ${bar}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  if (kind === "hr")
    return (
      <div className="grid h-full grid-cols-[1.3fr_1fr] gap-4 p-5">
        <div className="space-y-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`flex items-center gap-3 ${tile} p-2.5`}>
              <span className={`size-8 rounded-full ${i === 1 ? fill : "bg-white/15"}`} />
              <div className="flex-1 space-y-1.5"><div className={`h-2 w-1/2 ${bar}`} /><div className={`h-2 w-3/4 ${bar}`} /></div>
            </div>
          ))}
        </div>
        <div className={`${tile} flex flex-col items-center gap-3 p-4`}>
          <span className={`size-14 rounded-full ${fill}`} />
          <div className={`h-2.5 w-2/3 ${bar}`} />
          <div className={`h-2 w-1/2 ${bar}`} />
          <div className="mt-2 flex gap-2"><span className="h-5 w-12 rounded-full bg-white/10" /><span className="h-5 w-12 rounded-full bg-white/10" /></div>
        </div>
      </div>
    );
  if (kind === "integration")
    return (
      <svg viewBox="0 0 400 250" className="h-full w-full p-3" aria-hidden>
        {[50, 125, 200].map((y) => (<g key={y}><line x1={70} y1={y} x2={200} y2={125} stroke="#A9D8F5" strokeOpacity={0.35} /><line x1={200} y1={125} x2={330} y2={y} stroke={y === 200 ? "#F47732" : "#A9D8F5"} strokeOpacity={y === 200 ? 0.9 : 0.35} strokeDasharray={y === 200 ? "5 5" : undefined} /></g>))}
        {[50, 125, 200].map((y) => (<g key={`n${y}`}><rect x={30} y={y - 14} width={44} height={28} rx={8} fill="#22252B" stroke="#A9D8F5" strokeOpacity={0.5} /><rect x={326} y={y - 14} width={44} height={28} rx={8} fill="#22252B" stroke={y === 200 ? "#F47732" : "#A9D8F5"} strokeOpacity={0.6} /></g>))}
        <circle cx={200} cy={125} r={30} fill="#22252B" stroke="#A9D8F5" strokeOpacity={0.8} />
        <circle cx={200} cy={125} r={9} fill="#A9D8F5" />
        <circle cx={348} cy={200} r={4} fill="#F47732" />
      </svg>
    );
  return (
    <div className="space-y-4 p-5">
      <div className="flex items-center">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <span className={`grid size-12 place-items-center ${tile} ${i === 0 ? `${fill}` : ""}`}><span className={`size-4 rounded ${i === 0 ? "bg-ink/70" : "bg-white/20"}`} /></span>
            {i < 3 && <span className="h-px flex-1 bg-white/20" />}
          </div>
        ))}
      </div>
      <div className={`${tile} p-3`}>
        <div className="mb-3 grid grid-cols-4 gap-3">{[0, 1, 2, 3].map((i) => <div key={i} className={`h-2.5 ${bar}`} />)}</div>
        {[0, 1, 2, 3].map((r) => (<div key={r} className="grid grid-cols-4 gap-3 border-t border-white/10 py-2.5">{[0, 1, 2, 3].map((i) => <div key={i} className={`h-2 ${i === 0 ? "bg-white/20 rounded" : bar}`} />)}</div>))}
      </div>
    </div>
  );
}

function Mockup({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/15 bg-ink-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span aria-hidden className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-white/25" />)}</span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-white/[0.07] px-3 py-1 text-xs text-white/55">{product.name}</span>
      </div>
      <div className="relative aspect-[16/10]">
        {product.screenshot ? (
          <Image src={product.screenshot} alt={`${product.name} product screenshot`} fill sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
        ) : (
          <>
            <div aria-hidden className="h-full opacity-70"><Wireframe kind={product.icon} /></div>
            <p className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-ink/85 px-3.5 py-1.5 text-xs font-medium text-white/85">Product preview coming soon</p>
          </>
        )}
      </div>
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const Icon = icons[product.icon];
  const flip = index % 2 === 1;
  return (
    <article id={product.id} className="grid scroll-mt-24 items-center gap-10 border-t border-white/12 py-14 first:border-t-0 first:pt-4 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <span className={`inline-flex size-12 items-center justify-center rounded-xl ${accents[product.icon].tile}`}><Icon size={24} strokeWidth={1.75} aria-hidden /></span>
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-2 text-lg text-sky">{product.descriptor}</p>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">{product.intro}</p>
        <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-3 border-b border-white/12 py-2.5 text-[0.95rem]">
              <Check size={16} aria-hidden className="mt-1 shrink-0 text-sky" />{f}
            </li>
          ))}
        </ul>
        <Button href={product.href} className="mt-8">View Product</Button>
      </Reveal>
      <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}><Mockup product={product} /></Reveal>
    </article>
  );
}

export default function FeaturedProducts() {
  return (
    <Section id="products" tone="dark">
      <SectionHeading id="products" tone="dark" title="Technology Products Built for Business." text="Explore BIZTAB's growing portfolio of enterprise software and AI-powered SaaS solutions." />
      <div className="mt-12">{products.map((p, i) => <ProductRow key={p.id} product={p} index={i} />)}</div>
    </Section>
  );
}
