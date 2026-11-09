"use client";

import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, X } from "lucide-react";
import { useDialog } from "@/components/layout/useDialog";

/**
 * Authentication is not implemented yet. When it is, set these to the provider's URLs
 * (or replace the links with a sign-in handler and show a loading state while the real request runs).
 */
const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;
const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER_URL;
const pending = !LOGIN_URL || !REGISTER_URL;

const primary = "inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-[#ff8a4c]";
const secondary = "inline-flex min-h-11 w-full items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-[0.95rem] font-semibold text-primary transition-colors hover:border-primary hover:bg-pale";

function Inner({ onClose }: { onClose: () => void }) {
  useDialog(onClose);
  const action = (url: string | undefined, label: string, cls: string) =>
    url ? (
      <a href={url} className={cls}>{label}</a>
    ) : (
      <button type="button" aria-disabled="true" aria-describedby="account-status" onClick={(e: MouseEvent) => e.preventDefault()} className={`${cls} cursor-default`}>
        {label}
      </button>
    );

  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-ink/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-7 text-ink shadow-[0_32px_64px_-24px_rgba(7,80,157,0.5)] sm:p-9"
        initial={{ y: 18, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
        <button type="button" aria-label="Close account panel" onClick={onClose} className="absolute right-4 top-5 inline-flex size-11 items-center justify-center rounded-full hover:bg-pale hover:text-primary">
          <X size={22} />
        </button>
        <span className="mt-2 inline-flex size-12 items-center justify-center rounded-xl bg-pale text-primary"><User size={24} strokeWidth={1.75} aria-hidden /></span>
        <h2 id="account-title" className="mt-6 font-display text-2xl font-semibold tracking-tight text-deep">Welcome to BIZTAB.AI</h2>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/70">Access your BIZTAB account or create an account to explore our products and services.</p>
        <div className="mt-7 space-y-3">
          {action(LOGIN_URL, "Login to BIZTAB", primary)}
          {action(REGISTER_URL, "Create an Account", secondary)}
        </div>
        {pending && <p id="account-status" className="mt-5 text-center text-sm text-ink/60">Account access coming soon</p>}
      </motion.div>
    </motion.div>
  );
}

export default function AccountPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <Inner onClose={onClose} />}</AnimatePresence>;
}
