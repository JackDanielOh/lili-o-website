import { Link, type LinkProps } from "@tanstack/react-router";
import { useState } from "react";
import logoImg from "@/assets/logos/Logo Primaire.svg";

const navLinkClass =
  "font-semibold opacity-80 hover:opacity-100 transition pb-1 border-b-2 border-transparent";
const navLinkActiveClass = "opacity-100 text-[var(--violet)] border-[var(--violet)]";

function NavLink({
  to,
  children,
  exact,
  onClick,
}: {
  to: LinkProps["to"];
  children: React.ReactNode;
  exact?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={exact ? { exact: true } : undefined}
      className={navLinkClass}
      activeProps={{ className: navLinkActiveClass }}
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
        isDark ? "bg-ink/70 text-paper border-b border-white/5" : "bg-background/80 text-foreground border-b border-border"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Lili-o" className="h-9 w-auto brightness-0 invert" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/product">Product</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/recruitment">Careers</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-lg bg-[var(--violet)] text-white px-4 py-2 text-sm font-medium hover:bg-[var(--violet-dark)] transition"
        >
          Book Demo
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
        <div className={`md:hidden ${isDark ? "bg-ink" : "bg-background"} border-t border-white/5 px-6 py-6 flex flex-col gap-4 font-semibold`}>
          <NavLink to="/" exact onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/product" onClick={() => setOpen(false)}>
            Product
          </NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/recruitment" onClick={() => setOpen(false)}>
            Careers
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          <Link to="/contact" onClick={() => setOpen(false)} className="bg-[var(--violet)] text-white px-4 py-2 text-sm font-medium w-fit">
            Book Demo
          </Link>
        </div>
      )}
    </header>
  );
}
