"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const API_BASE = "https://api.lili-o.com";
const LOGO_SRC = "/logos/logo-primaire.svg";

async function apiFetch<T = unknown>(
  path: string,
  opts: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers ?? {}),
    },
  });
  if (res.status === 204) return undefined as T;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.detail ?? `HTTP ${res.status}`);
  return json as T;
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset link. Please request a new one.");
  }, [token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen flex flex-col" style={{ fontFamily: "var(--font-sans, sans-serif)" }}>
      <div className="border-b border-white/8 h-14 flex items-center justify-between px-8 shrink-0">
        <Link href="/">
          <img src={LOGO_SRC} alt="Lili-o" className="h-7 w-auto brightness-0 invert opacity-80" />
        </Link>
        <Link href="/dashboard" className="text-xs text-paper/40 hover:text-paper/70 transition">
          ← Back to sign in
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          {done ? (
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-10 flex flex-col items-center gap-5 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Password updated</h2>
                <p className="text-sm text-paper/50 leading-relaxed">
                  Your password has been reset. You can now sign in with your new password.
                </p>
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-1 w-full py-2.5 rounded-lg bg-[var(--violet)] text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
              >
                Go to sign in
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--violet)] mb-3">Robot API</p>
                <h1 className="text-2xl font-bold tracking-tight">Set a new password</h1>
                <p className="mt-2 text-sm text-paper/40">Choose a strong password for your account.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141414] p-8">
                {error && (
                  <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {!token ? null : (
                  <form onSubmit={submit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs text-paper/40 mb-1.5 font-medium tracking-wide">New password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/25 outline-none focus:border-[var(--violet)] focus:ring-1 focus:ring-[var(--violet)] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-paper/40 mb-1.5 font-medium tracking-wide">Confirm password</label>
                      <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Repeat your password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/25 outline-none focus:border-[var(--violet)] focus:ring-1 focus:ring-[var(--violet)] transition"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-1 py-2.5 rounded-lg bg-[var(--violet)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition cursor-pointer"
                    >
                      {loading ? "Updating…" : "Set new password"}
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
