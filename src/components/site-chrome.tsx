import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-background/60 px-5 py-2.5 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-purple text-primary-foreground">
            <span className="h-2 w-2 rounded-full bg-current" />
          </span>
          <span className="font-display text-xl font-bold">Lili-o</span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          <Link
            to="/data-generation"
            activeProps={{ className: "bg-gradient-purple text-white shadow-[var(--shadow-glow)]" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition"
          >
            Data Generation
          </Link>
          <Link
            to="/data-quality"
            activeProps={{ className: "bg-gradient-purple text-white shadow-[var(--shadow-glow)]" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition"
          >
            Data Quality
          </Link>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          Book a Demo <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span className="font-display text-lg font-bold">Lili-o</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/data-generation" className="hover:text-foreground">Data Generation</Link>
          <Link to="/data-quality" className="hover:text-foreground">Data Quality</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Lili-o</p>
      </div>
    </footer>
  );
}
