import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";

interface SubPageProps {
  eyebrow: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  features: { title: string; desc: string }[];
  backTo: "/data-generation" | "/data-quality";
  backLabel: string;
}

export function SubPage(props: SubPageProps) {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <section className="relative isolate overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 -z-10">
          <img src={props.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-hero-glow" />
        </div>
        <div className="px-6">
          <Link
            to={props.backTo}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {props.backLabel}
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">{props.eyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[1.05] text-gradient md:text-7xl">{props.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{props.description}</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <img src={props.image} alt={props.title} className="aspect-[16/9] w-full object-cover" />
        </div>
      </section>

      <section className="px-6 pb-24">
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{props.longDescription}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {props.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-card p-6">
              <h3 className="text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-12 text-center">
          <div className="absolute inset-0 -z-10 bg-hero-glow opacity-80" />
          <h2 className="text-3xl md:text-5xl">Ready to power your robot with real data?</h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-purple px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
          >
            Book a Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

interface CategoryPageProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  chips: { label: string; to: string; desc: string }[];
}

export function CategoryPage(props: CategoryPageProps) {
  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <section className="relative isolate overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 -z-10">
          <img src={props.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-hero-glow" />
        </div>
        <div className="px-6">
          <Link to="/" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">{props.eyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[1.05] text-gradient md:text-7xl">{props.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{props.description}</p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {props.chips.map((c) => (
            <a
              key={c.label}
              href={c.to}
              className="group rounded-2xl border border-white/10 bg-card p-8 transition hover:border-secondary/40 hover:bg-secondary/5"
            >
              <h3 className="text-2xl">{c.label}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-secondary">
                Discover <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
