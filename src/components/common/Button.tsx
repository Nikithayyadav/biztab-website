import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  /** Background the button sits on. Affects the secondary style. */
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-colors duration-200 min-h-11";

export default function Button({ href, children, variant = "primary", tone = "dark", className = "", onClick }: Props) {
  const style =
    variant === "primary"
      ? "bg-brand text-ink hover:bg-[#ff8a4c]"
      : variant === "ghost"
        ? "text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-brand"
        : tone === "dark"
        ? "border border-white/35 text-white hover:border-white hover:bg-white/10"
        : "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5";
  return (
    <Link href={href} onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
    </Link>
  );
}
