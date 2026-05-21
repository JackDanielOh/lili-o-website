import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logoImg from "@/assets/logos/Logo Primaire.svg";

export function SiteHeader({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isDark ? "bg-ink/70 text-paper border-b border-white/5" : "bg-background/80 text-foreground border-b border-border"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Lili-o" className="h-9 w-auto brightness-0 invert" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/product" className="opacity-80 hover:opacity-100 transition" activeProps={{ className: "opacity-100 text-[var(--violet)]" }}>
            Product
          </Link>
          <Link to="/blog" className="opacity-80 hover:opacity-100 transition" activeProps={{ className: "opacity-100 text-[var(--violet)]" }}>
            Blog
          </Link>
          <Link to="/contact" className="opacity-80 hover:opacity-100 transition" activeProps={{ className: "opacity-100 text-[var(--violet)]" }}>Contact</Link>
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-lg bg-[var(--violet)] text-white px-4 py-2 text-sm font-medium hover:bg-[var(--violet-dark)] transition"
        >
          Request access
        </Link>
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
        <div className={`md:hidden ${isDark ? "bg-ink" : "bg-background"} border-t border-white/5 px-6 py-6 flex flex-col gap-4`}>
          <Link to="/product" onClick={() => setOpen(false)}>Product</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="bg-[var(--violet)] text-white px-4 py-2 text-sm font-medium w-fit">Request access</Link>
        </div>
      )}
    </header>
  );
}
