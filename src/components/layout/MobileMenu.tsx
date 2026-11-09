"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Search, User, X } from "lucide-react";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { navCta, navLinks, type NavGroup } from "@/data/navigation";
import { exploreProducts, exploreVerticals } from "@/data/explore";

const items: NavGroup[] = [
  {
    label: "Explore BIZTAB",
    href: "/#",
    children: [...exploreVerticals, ...exploreProducts].map((c) => ({ label: c.title, href: c.href })),
  },
  ...navLinks,
];

export default function MobileMenu({ open, onClose, onSearch, onAccount }: { open: boolean; onClose: () => void; onSearch: () => void; onAccount: () => void }) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = { duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/60 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={t}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,92vw)] flex-col bg-deep text-white xl:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={t}
          >
            <div className="flex h-[76px] items-center justify-between px-5">
              <Logo variant="dark" />
              <button autoFocus type="button" aria-label="Close menu" onClick={onClose} className="inline-flex size-11 items-center justify-center rounded-md">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 px-5 pb-3">
              <button type="button" onClick={onSearch} className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-sm font-medium hover:bg-white/10"><Search size={18} />Search</button>
              <button type="button" onClick={onAccount} className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-sm font-medium hover:bg-white/10"><User size={18} />Account</button>
            </div>

            <ul className="flex-1 overflow-y-auto px-5 pb-6">
              {items.map((item) => (
                <li key={item.label} className="border-b border-white/10">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="flex w-full items-center justify-between py-4 text-left font-display text-xl font-semibold"
                      >
                        {item.label}
                        <ChevronDown size={20} className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {expanded === item.label && (
                        <ul className="pb-3 pl-1">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link href={c.href} onClick={onClose} className="flex items-center justify-between gap-3 py-2.5 text-[0.98rem] text-white/80 hover:text-white">
                                {c.label}
                                {c.status && <span className="rounded-full bg-sky/20 px-2 py-0.5 text-xs font-semibold text-sky">{c.status}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} onClick={onClose} className="block py-4 font-display text-xl font-semibold">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 p-5">
              <Button href={navCta.href} onClick={onClose} className="w-full">
                {navCta.label}
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
