"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, User } from "lucide-react";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import ExploreMenu from "@/components/layout/ExploreMenu";
import SearchOverlay from "@/components/layout/SearchOverlay";
import AccountPanel from "@/components/layout/AccountPanel";
import { navCta, navLinks } from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Transparent only over the dark home hero; solid everywhere else.
  const solid = scrolled || pathname !== "/" || open !== null || searchOpen;
  const iconBtn = `inline-flex size-11 items-center justify-center rounded-full transition-colors ${solid ? "text-ink hover:bg-pale hover:text-primary" : "text-white hover:bg-white/15"}`;
  const bar = "relative after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand after:transition-transform after:duration-200 hover:after:scale-x-100";
  const link = solid ? "text-ink/80 hover:text-primary" : "text-white/85 hover:text-white";

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        solid ? "border-b border-line bg-white/95 backdrop-blur" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav ref={navRef} aria-label="Primary" className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo variant={solid ? "light" : "dark"} />

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpen(item.label)}
              onMouseLeave={() => item.children && setOpen(null)}
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={() => setOpen(null)}
                  className={`${bar} after:scale-x-0 rounded-md py-2 pl-3 text-[0.95rem] font-medium transition-colors ${item.children ? "pr-0.5" : "pr-3"} ${link}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label={`${item.label} menu`}
                    aria-haspopup="true"
                    aria-expanded={open === item.label}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    className={`rounded-md py-2 pl-0.5 pr-2 transition-colors ${link}`}
                  >
                    <ChevronDown size={16} className={`transition-transform ${open === item.label ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {item.children && open === item.label && (
                <div className="absolute left-0 top-full pt-2">
                  <ul className="w-72 rounded-xl border border-line bg-white p-2 shadow-[0_18px_40px_-18px_rgba(23,25,29,0.3)]">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(null)}
                          className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[0.92rem] font-medium text-ink transition-colors hover:bg-pale"
                        >
                          {c.label}
                          {c.status && (
                            <span className="shrink-0 rounded-full bg-sky/40 px-2 py-0.5 text-xs font-semibold text-ink">{c.status}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={open === "explore"}
            aria-controls="explore-menu"
            onClick={() => setOpen(open === "explore" ? null : "explore")}
            className={`${bar} ${open === "explore" ? "after:scale-x-100" : "after:scale-x-0"} hidden items-center gap-1.5 rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors xl:inline-flex ${link}`}
          >
            Explore BIZTAB
            <ChevronDown size={16} className={`transition-transform ${open === "explore" ? "rotate-180" : ""}`} />
          </button>
          <button type="button" aria-label="Search" onClick={() => { setOpen(null); setSearchOpen(true); }} className={iconBtn}>
            <Search size={20} />
          </button>
          <button type="button" aria-label="Account" onClick={() => { setOpen(null); setAccountOpen(true); }} className={iconBtn}>
            <User size={20} />
          </button>
          <Button href={navCta.href} className="ml-1 hidden !px-5 !py-2.5 sm:inline-flex">
            {navCta.label}
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={`${iconBtn} xl:hidden`}
          >
            <Menu size={24} />
          </button>
        </div>
        {open === "explore" && <ExploreMenu onNavigate={() => setOpen(null)} />}
      </nav>
    </header>
    {/* Outside <header>: backdrop-filter on the header would trap the fixed drawer. */}
    <MobileMenu
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      onSearch={() => { setMobileOpen(false); setSearchOpen(true); }}
      onAccount={() => { setMobileOpen(false); setAccountOpen(true); }}
    />
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    <AccountPanel open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}
