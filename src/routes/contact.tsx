import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Pyramid } from "@/components/Pyramid";
import { submitContact } from "@/lib/submit-contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Request Access — Lili-o" },
      { name: "description", content: "Get in touch with the Lili-o team to request access to the Data Foundry." },
    ],
  }),
});

const BUDGETS = ["< $50K", "$50K – $300K", "$300K – $1M", "> $1M", "Not sure yet"];
const SERVICES = ["Data Providing", "Data Management", "Zero Shot Software"];

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
    <div className="theme-dark bg-ink text-paper min-h-screen">
      <SiteHeader variant="dark" />

      <section className="relative overflow-hidden border-b border-white/5">
        <Pyramid className="absolute -top-8 right-[-4rem] w-[280px] md:w-[360px] lg:right-0 lg:w-[420px] opacity-15 pointer-events-none" />
        <div className="container-x relative pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
            <div className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:max-w-md">
              <div className="eyebrow text-[var(--violet)] mb-3">// Get in touch</div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                Request access to the <span className="text-[var(--violet)]">Data Foundry</span>
              </h1>
              <p className="mt-4 text-base text-paper/70 leading-relaxed md:text-lg">
                Tell us about your robot, task, and data needs. We reply within 48 hours.
              </p>
              <p className="mt-4 text-sm text-paper/50 lg:mt-6">
                <span className="lg:hidden">↓ </span>
                Complete the form
                <span className="hidden lg:inline"> to get started</span>
                {" — or email "}
                <a href="mailto:hello@lili-o.com" className="text-[var(--violet)] hover:underline">
                  hello@lili-o.com
                </a>
                .
              </p>
            </div>

            <div id="contact-form" className="min-w-0">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!budget) { setError("Please select a project budget."); return; }
              if (services.length === 0) { setError("Please select at least one service."); return; }
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
            className="space-y-8 rounded-2xl border border-white/10 bg-[#141414] p-6 md:p-8 lg:p-10"
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center bg-[var(--violet)]">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold">Thanks — we'll be in touch.</h3>
                <p className="mt-3 text-paper/60">Expect a reply within 48 hours.</p>
              </div>
            ) : (
              <>
                <div className="border-b border-white/10 pb-6">
                  <h2 className="text-lg font-semibold tracking-tight">Request access</h2>
                  <p className="mt-1 text-sm text-paper/50">
                    Fill in your details below — all fields marked * are required.
                  </p>
                </div>

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
                  <p className="mb-3 text-sm font-medium eyebrow text-paper/60">Project budget *</p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b === budget ? "" : b)}
                        className={`rounded-lg border px-4 py-2 text-sm transition ${
                          budget === b
                            ? "border-[var(--violet)] bg-[var(--violet)]/10 text-[var(--violet)]"
                            : "border-white/10 text-paper/50 hover:border-white/30 hover:text-paper"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <p className="mb-3 text-sm font-medium eyebrow text-paper/60">What can we help with? *</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => {
                      const active = services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-lg border px-4 py-3 text-sm transition ${
                            active
                              ? "border-[var(--violet)] bg-[var(--violet)]/10 text-[var(--violet)]"
                              : "border-white/10 text-paper/50 hover:border-white/30 hover:text-paper"
                          }`}
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
                    Tell us more <span className="text-paper/40">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your robot, task, and data challenge…"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/30 focus:border-[var(--violet)]/60"
                  />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[var(--violet)] text-white px-8 py-4 font-medium hover:bg-[var(--violet-dark)] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending…" : "Request access →"}
                </button>
              </>
            )}
          </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-paper/80">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="mt-2 w-full border border-white/10 bg-ink px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/30 focus:border-[var(--violet)]/60"
      />
    </div>
  );
}
