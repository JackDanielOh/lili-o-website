import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logos/logo.png";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Lili-o" className="h-8" />
          <span className="font-display text-xl font-bold">Lili-o</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="text-sm font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/data-generation"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="text-sm font-medium transition"
          >
            Data Generation
          </Link>
          <Link
            to="/data-quality"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="text-sm font-medium transition"
          >
            Data Quality
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="text-sm font-medium transition"
          >
            Contact
          </Link>
        </nav>

        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition hover:border-white/30 hover:bg-white/10"
        >
          Book a Demo <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-16">
      <div className="px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="Lili-o" className="h-7" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The training data platform powering the next generation of physical AI.
            </p>
            <a
              href="mailto:hello@lili-o.ai"
              className="mt-4 block text-sm text-muted-foreground transition hover:text-foreground"
            >
              hello@lili-o.ai
            </a>
          </div>

          {/* Products */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Products
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/data-generation" className="text-muted-foreground transition hover:text-foreground">
                  Data Generation
                </Link>
              </li>
              <li>
                <Link to="/data-quality" className="text-muted-foreground transition hover:text-foreground">
                  Data Quality
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Company
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="text-muted-foreground transition hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <a href="mailto:hello@lili-o.ai" className="text-muted-foreground transition hover:text-foreground">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/50 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Lili-o. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Paris, France</p>
        </div>
      </div>
    </footer>
  );
}
