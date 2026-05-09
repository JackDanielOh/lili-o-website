import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Book a Demo — Lili-o" },
      { name: "description", content: "Get in touch with the Lili-o team to book a demo." },
    ],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <section className="relative isolate overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 -z-10 bg-hero-glow" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Get in Touch</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] text-gradient md:text-7xl">
            Let's accelerate your <span className="text-gradient-purple">robotic deployment</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Tell us about your robot, your task and your data needs. We'll get back to you within 48 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-12 md:grid-cols-5">
          <aside className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Email</h3>
              <a href="mailto:hello@lili-o.ai" className="mt-2 flex items-center gap-2 text-lg hover:text-secondary">
                <Mail className="h-4 w-4" /> hello@lili-o.ai
              </a>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">HQ</h3>
              <p className="mt-2 flex items-center gap-2 text-lg">
                <MapPin className="h-4 w-4" /> Paris, France
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Press</h3>
              <a href="mailto:press@lili-o.ai" className="mt-2 block text-lg hover:text-secondary">
                press@lili-o.ai
              </a>
            </div>
          </aside>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="md:col-span-3 space-y-5 rounded-3xl border border-white/10 bg-card p-8"
          >
            {submitted ? (
              <div className="py-12 text-center">
                <h3 className="text-2xl">Thanks — we'll be in touch.</h3>
                <p className="mt-3 text-muted-foreground">Expect a reply within 48 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="First name" name="firstName" />
                  <Field label="Last name" name="lastName" />
                </div>
                <Field label="Work email" name="email" type="email" />
                <Field label="Company" name="company" />
                <Field label="Role" name="role" />
                <div>
                  <label className="text-sm text-muted-foreground">How can we help?</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-foreground outline-none transition focus:border-secondary/60"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-purple px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                >
                  Book a Demo <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="mt-2 w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-foreground outline-none transition focus:border-secondary/60"
      />
    </div>
  );
}
