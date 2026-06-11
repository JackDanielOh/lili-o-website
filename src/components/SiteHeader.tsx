"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const LOGO_SRC = "/logos/logo-primaire.svg";
const LINKEDIN_URL = "https://www.linkedin.com/in/jiseongoh/";
const ctaButtonClass =
  "inline-flex items-center rounded-lg bg-[var(--violet)] text-white px-4 py-2 text-sm font-medium hover:bg-[var(--violet-dark)] transition";

const navLinkClass =
  "font-semibold opacity-80 hover:opacity-100 transition pb-1 border-b-2 border-transparent";
const navLinkActiveClass = "opacity-100 text-[var(--violet)] border-[var(--violet)]";

function NavLink({
  href,
  children,
  exact,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${navLinkClass} ${isActive ? navLinkActiveClass : ""}`}
    >
      {children}
    </Link>
  );
}

export function SiteHeader({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isDark
          ? "bg-ink/70 text-paper border-b border-white/5"
          : "bg-background/80 text-foreground border-b border-border"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src={LOGO_SRC} alt="Lili-o" className="h-9 w-auto brightness-0 invert" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink href="/" exact>
            Home
          </NavLink>
          <NavLink href="/product">Product</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/recruit">Careers</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
        <div className="hidden md:flex items-center">
          {/* <Link href="/dashboard" className={ctaButtonClass}>
            Test it →
          </Link> */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaButtonClass}
          >
            Say Hello →
          </a>
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block h-px w-6 ${isDark ? "bg-paper" : "bg-ink"}`} />
          <span className={`block h-px w-6 ${isDark ? "bg-paper" : "bg-ink"}`} />
        </button>
      </div>
      {open && (
        <div
          className={`md:hidden ${isDark ? "bg-ink" : "bg-background"} border-t border-white/5 px-6 py-6 flex flex-col gap-4 font-semibold`}
        >
          <NavLink href="/" exact onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink href="/product" onClick={() => setOpen(false)}>
            Product
          </NavLink>
          <NavLink href="/blog" onClick={() => setOpen(false)}>
            Blog
          </NavLink>
          <NavLink href="/recruit" onClick={() => setOpen(false)}>
            Careers
          </NavLink>
          <NavLink href="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {/* <Link href="/dashboard" onClick={() => setOpen(false)} className={`${ctaButtonClass} w-fit`}>
            Test it →
          </Link> */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={`${ctaButtonClass} w-fit`}
          >
            Say Hello → →
          </a>
        </div>
      )}
    </header>
  );
}
