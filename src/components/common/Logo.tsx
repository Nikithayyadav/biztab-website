import Link from "next/link";

type Props = { variant?: "light" | "dark"; className?: string };

/** variant="dark": for dark backgrounds (white wordmark). variant="light": for light backgrounds (ink wordmark). Dot is always orange. */
export default function Logo({ variant = "dark", className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="BIZTAB. home"
      className={`font-display text-[1.6rem] font-bold leading-none tracking-tight transition-colors ${
        variant === "dark" ? "text-white" : "text-ink"
      } ${className}`}
    >
      BIZTAB<span className="text-brand">.</span>
    </Link>
  );
}
