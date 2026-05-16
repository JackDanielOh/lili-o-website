import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { submitContact } from "@/lib/submit-contact";
import logoNvidia from "@/assets/logos/nvidia.svg";
import logoBpi from "@/assets/logos/bpifrance.svg";
import logoAtalian from "@/assets/logos/atalian.svg";

const TRUSTED = [
  { name: "NVIDIA", src: logoNvidia },
  { name: "BPIFrance", src: logoBpi },
  { name: "Atalian", src: logoAtalian },
];

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Book a Demo — Lili-o" },
      { name: "description", content: "Get in touch with the Lili-o team to book a demo." },
    ],
  }),
});

const BUDGETS = ["< $50K", "$50K – $300K", "$300K – $1M", "> $1M", "Not sure yet"];

const SERVICES = [
  "Data Providing",
  "Data Management",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [budget, setBudget] = useState("");
  const [services, setServices] = useState<string[]>([]);

  function toggleService(s: string) {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  return (
    <main className="relative overflow-x-clip">
      <SiteNav />

      <section className="relative isolate overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 -z-10 bg-hero-glow" />
        <div className="px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Get in Touch</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] text-gradient md:text-7xl">
            Let's accelerate your{" "}
            <span className="text-gradient-purple">robotic deployment</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Tell us about your robot, your task and your data needs. We'll get back to you within 48 hours.
          </p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-2xl">

          {/* Form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!budget) {
                setError("Please select a project budget.");
                return;
              }
              if (services.length === 0) {
                setError("Please select at least one service.");
                return;
              }
              setLoading(true);
              setError("");
              const fd = new FormData(e.currentTarget);
              try {
                const result = await submitContact({
                  data: {
                    firstName: fd.get("firstName") as string,
                    lastName: fd.get("lastName") as string,
                    email: fd.get("email") as string,
                    company: fd.get("company") as string,
                    role: fd.get("role") as string,
                    budget,
                    services,
                    message: fd.get("message") as string,
                  },
                });
                if (result.ok) {
                  setSubmitted(true);
                } else {
                  setError("Something went wrong. Please try again or email us directly.");
                }
              } catch {
                setError("Something went wrong. Please try again or email us directly.");
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-8 rounded-3xl border border-white/10 bg-card p-8 md:p-10"
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-gradient-purple shadow-[var(--shadow-glow)]">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl">Thanks — we'll be in touch.</h3>
                <p className="mt-3 text-muted-foreground">Expect a reply within 48 hours.</p>
              </div>
            ) : (
              <>
                {/* Name + Email */}
                <div className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="First name *" name="firstName" />
                    <Field label="Last name *" name="lastName" />
                  </div>
                  <Field label="Work email *" name="email" type="email" />
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Company *" name="company" />
                    <Field label="Role *" name="role" />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <p className="mb-3 text-sm font-medium">
                    Project budget *
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b === budget ? "" : b)}
                        className={[
                          "rounded-full border px-4 py-2 text-sm transition",
                          budget === b
                            ? "border-secondary bg-secondary/10 text-secondary"
                            : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground",
                        ].join(" ")}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <p className="mb-3 text-sm font-medium">
                    What can we help with? *
                  </p>
                  <div className="flex gap-2">
                    {SERVICES.map((s) => {
                      const active = services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={[
                            "rounded-xl border px-4 py-3 text-left text-sm transition",
                            active
                              ? "border-secondary bg-secondary/10 text-secondary"
                              : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground",
                          ].join(" ")}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium">
                    Tell us more{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your robot, task, and data challenge…"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-secondary/60"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-purple px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending…" : "Book a Demo"} <ArrowRight className="h-4 w-4" />
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

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/50 focus:border-secondary/60"
      />
    </div>
  );
}
