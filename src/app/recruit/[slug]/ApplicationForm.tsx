"use client";

import { useState } from "react";

type Props = { role: string; roleId: string };

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-paper/80">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-white/10 bg-ink px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/30 focus:border-[var(--violet)]/60"
      />
    </div>
  );
}

export function ApplicationForm({ role, roleId }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div id="apply" className="mt-16 border-t border-white/10 pt-12">
      <h2 className="text-2xl font-bold tracking-tight">Apply for this role</h2>
      <p className="mt-2 text-paper/60">
        Tell us about yourself — we review every application and reply within a week.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          const fd = new FormData(e.currentTarget);
          try {
            const res = await fetch("/api/apply", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: fd.get("name") as string,
                email: fd.get("email") as string,
                role,
                roleId,
                profile: (fd.get("profile") as string) ?? "",
                resume: (fd.get("resume") as string) ?? "",
                note: (fd.get("note") as string) ?? "",
              }),
            });
            const result = await res.json();
            if (result.ok) {
              setSubmitted(true);
            } else {
              setError("Something went wrong. Please try again or email careers@lili-o.com.");
            }
          } catch {
            setError("Something went wrong. Please try again or email careers@lili-o.com.");
          } finally {
            setLoading(false);
          }
        }}
        className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-[#141414] p-6 md:p-8"
      >
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center bg-[var(--violet)]">
              <span className="text-2xl text-white">✓</span>
            </div>
            <h3 className="text-2xl font-bold">Application received.</h3>
            <p className="mt-3 text-paper/60">Thanks for applying — we&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name *" name="name" required />
              <Field label="Email *" name="email" type="email" required />
            </div>
            <Field label="LinkedIn / portfolio" name="profile" placeholder="linkedin.com/in/you" />
            <Field
              label="Resume / CV link"
              name="resume"
              placeholder="Link to your CV (Drive, Dropbox, …)"
            />
            <div>
              <label className="text-sm font-medium text-paper/80">
                Cover note <span className="text-paper/40">(optional)</span>
              </label>
              <textarea
                name="note"
                rows={4}
                placeholder="Why this role? Anything you'd like us to know…"
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-paper outline-none transition placeholder:text-paper/30 focus:border-[var(--violet)]/60"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[var(--violet)] px-8 py-4 font-medium text-white transition hover:bg-[var(--violet-dark)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending…" : "Submit application →"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
