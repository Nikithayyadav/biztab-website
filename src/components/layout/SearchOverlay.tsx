"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useDialog } from "@/components/layout/useDialog";
import { categoryOrder, search, suggestions, type SearchCategory } from "@/data/searchIndex";

const chip = "rounded-full border px-4 py-2 text-sm font-medium transition-colors";

function Inner({ onClose }: { onClose: () => void }) {
  useDialog(onClose);
  const router = useRouter();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<SearchCategory | null>(null);
  const [idx, setIdx] = useState(0);
  const groups = useMemo(() => search(q, cat), [q, cat]);
  const flat = groups.flatMap((g) => g.items);
  const go = (href: string) => {
    onClose();
    router.push(href);
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!flat.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => (i + 1) % flat.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => (i - 1 + flat.length) % flat.length); }
    if (e.key === "Enter") { e.preventDefault(); go(flat[idx].href); }
  };
  let n = -1;
  const active = q.trim() || cat;

  return (
    <>
      {/* Both layers start below the 76px navbar so it stays visible and unchanged. */}
      <motion.div className="fixed inset-x-0 bottom-0 top-[76px] z-40 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search BIZTAB.AI"
        className="fixed inset-x-0 top-[76px] z-40 max-h-[calc(100svh-76px)] overflow-y-auto border-t border-line bg-white text-ink shadow-[0_28px_48px_-24px_rgba(7,80,157,0.35)]"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-3xl px-5 pb-9 pt-6 sm:px-8 sm:pt-8">
          <div className="flex items-center gap-3 border-b-2 border-primary pb-3">
            <Search size={24} aria-hidden className="shrink-0 text-primary" />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => { setQ(e.target.value); setIdx(0); }}
              onKeyDown={onKey}
              placeholder="Search BIZTAB.AI"
              aria-label="Search BIZTAB.AI"
              className="min-w-0 flex-1 bg-transparent font-display text-xl outline-none placeholder:text-ink/35 sm:text-2xl [&::-webkit-search-cancel-button]:hidden"
            />
            <button type="button" aria-label="Close search" onClick={onClose} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-pale hover:text-primary">
              <X size={24} />
            </button>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Filter by category">
            {categoryOrder.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => { setCat(cat === c ? null : c); setIdx(0); }}
                  className={`${chip} ${cat === c ? "border-primary bg-primary text-white" : "border-line bg-pale text-deep hover:border-primary"}`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>

          <div aria-live="polite" className="mt-6">
            {!active && (
              <div>
                <p className="font-display text-base font-semibold">Suggested searches</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <li key={s}><button type="button" onClick={() => { setQ(s); setIdx(0); }} className={`${chip} border-line hover:border-primary hover:text-primary`}>{s}</button></li>
                  ))}
                </ul>
              </div>
            )}
            {active && !flat.length && <p className="text-base text-ink/70">No results found{q.trim() ? ` for “${q.trim()}”` : ""}. Try SAP, AI, HR or training.</p>}
            {groups.map((g) => (
              <section key={g.category} className="mb-6 last:mb-0">
                <h2 className="font-display text-base font-semibold text-deep">{g.category}</h2>
                <ul className="mt-2">
                  {g.items.map((it) => {
                    const mine = ++n;
                    return (
                      <li key={`${it.title}-${it.href}`}>
                        <Link
                          href={it.href}
                          onClick={onClose}
                          onMouseEnter={() => setIdx(mine)}
                          className={`block rounded-xl border-l-4 px-4 py-3 transition-colors ${mine === idx ? "border-primary bg-pale" : "border-transparent"}`}
                        >
                          <span className="block font-medium">{it.title}</span>
                          <span className="block text-sm text-ink/65">{it.description}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
          {flat.length > 0 && <p className="mt-5 hidden text-sm text-ink/55 sm:block">Arrow keys to move, Enter to open, Esc to close.</p>}
        </div>
      </motion.div>
    </>
  );
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Inner onClose={onClose} />}</AnimatePresence>;
}
