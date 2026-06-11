"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const API_BASE = "https://api.lili-o.com";
const LOGO_SRC = "/logos/logo-primaire.svg";

/* ── api ─────────────────────────────────────────────────── */

async function apiFetch<T = unknown>(
  path: string,
  opts: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, ...init } = opts;
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });
  if (res.status === 204) return undefined as T;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.detail ?? `HTTP ${res.status}`);
  return json as T;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

/* ── types ───────────────────────────────────────────────── */

type Phase = { id: "loading" } | { id: "auth" } | { id: "ready"; jwt: string; email: string };

type DashTab = "docs" | "tech" | "skills" | "keys" | "license";

interface ApiKeyMeta {
  id: string;
  name: string;
  created_at: string;
}

interface Skill {
  name: string;
  created_at: string;
}

/* ── primitives ──────────────────────────────────────────── */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-paper placeholder-paper/30 outline-none focus:border-[var(--violet)] transition ${props.className ?? ""}`}
    />
  );
}

function Btn({
  variant = "primary",
  loading,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
}) {
  const base =
    "rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-[var(--violet)] text-white hover:bg-[var(--violet-dark)]",
    ghost: "border border-white/15 text-paper/70 hover:border-white/30 hover:text-paper",
    danger: "border border-red-500/30 text-red-400 hover:border-red-500/60",
  };
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`${base} ${styles[variant]} ${props.className ?? ""}`}
    >
      {loading ? <span className="opacity-50">…</span> : children}
    </button>
  );
}

function Alert({ type, children }: { type: "error" | "success"; children: React.ReactNode }) {
  const s =
    type === "error"
      ? "bg-red-500/10 border-red-500/20 text-red-400"
      : "bg-green-500/10 border-green-500/20 text-green-400";
  return <div className={`rounded-lg border px-4 py-3 text-sm ${s}`}>{children}</div>;
}

/* ── auth page ───────────────────────────────────────────── */

function AuthPage({ onLogin }: { onLogin: (jwt: string, email: string) => void }) {
  const [tab, setTab] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  function reset(t: "login" | "register" | "forgot") {
    setTab(t);
    setError(null);
    setNotice(null);
  }

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      if (tab === "forgot") {
        await apiFetch("/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        setNotice("If this email exists, a reset link has been sent.");
      } else if (tab === "register") {
        await apiFetch("/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        setRegistered(true);
        setPassword("");
      } else {
        const data = await apiFetch<{ access_token: string }>("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        onLogin(data.access_token, email);
      }
    } catch (err) {
      console.error("[login error]", err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const isForgot = tab === "forgot";

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen flex flex-col">
      <div className="border-b border-white/8 h-14 flex items-center justify-between px-8 shrink-0">
        <Link href="/">
          <img src={LOGO_SRC} alt="Lili-o" className="h-7 w-auto brightness-0 invert opacity-80" />
        </Link>
        <Link href="/" className="text-xs text-paper/40 hover:text-paper/70 transition">
          ← Back to site
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        {registered ? (
          <div className="w-full max-w-[400px] text-center">
            <div className="rounded-2xl border border-white/10 bg-[#141414] p-10 flex flex-col items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Check your inbox</h2>
                <p className="text-sm text-paper/50 leading-relaxed">
                  We sent a confirmation link to{" "}
                  <span className="text-paper/80 font-medium">{email}</span>.
                  <br />
                  Please verify your email before signing in.
                </p>
              </div>
              <p className="text-xs text-paper/30 border border-white/8 rounded-lg px-4 py-3 bg-white/3 w-full text-left leading-relaxed">
                <span className="text-paper/50 font-medium">Note:</span> You won&apos;t be able to
                log in until you click the link in the email.
              </p>
              <button
                onClick={() => {
                  setRegistered(false);
                  reset("login");
                }}
                className="mt-1 text-sm text-[var(--violet)] hover:text-paper transition cursor-pointer"
              >
                Back to sign in →
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[400px]">
            <div className="mb-8 text-center">
              <p className="eyebrow text-[var(--violet)] mb-3">Robot API</p>
              <h1 className="text-2xl font-bold tracking-tight">
                {isForgot
                  ? "Reset your password"
                  : tab === "login"
                    ? "Sign in"
                    : "Create an account"}
              </h1>
              <p className="mt-2 text-sm text-paper/40">
                {isForgot
                  ? "We'll send a reset link to your email."
                  : tab === "login"
                    ? "Access your skills and API keys."
                    : "Get started with the Lili-o Robot API."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#141414] p-8">
              {!isForgot && (
                <>
                  {/* tab switcher */}
                  <div className="flex mb-6 rounded-lg bg-white/5 p-1 gap-1">
                    {(["login", "register"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => reset(t)}
                        className={`flex-1 py-1.5 rounded-md text-sm font-medium transition cursor-pointer ${
                          tab === t
                            ? "bg-[var(--violet)] text-white"
                            : "text-paper/40 hover:text-paper"
                        }`}
                      >
                        {t === "login" ? "Sign in" : "Register"}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {isForgot && (
                <button
                  onClick={() => reset("login")}
                  className="flex items-center gap-1.5 text-xs text-paper/35 hover:text-paper/70 transition cursor-pointer mb-6"
                >
                  ← Back to sign in
                </button>
              )}

              {notice && (
                <div className="mb-5">
                  <Alert type="success">{notice}</Alert>
                </div>
              )}
              {error && (
                <div className="mb-5">
                  <Alert type="error">{error}</Alert>
                </div>
              )}

              <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-paper/40 mb-1.5 font-medium tracking-wide">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
                {!isForgot && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-paper/40 font-medium tracking-wide">
                        Password
                      </label>
                      {tab === "login" && (
                        <button
                          type="button"
                          onClick={() => reset("forgot")}
                          className="text-xs text-paper/35 hover:text-paper/70 transition cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={tab === "register" ? "Min. 8 characters" : "••••••••"}
                      required
                      minLength={8}
                      autoComplete={tab === "login" ? "current-password" : "new-password"}
                    />
                  </div>
                )}
                <Btn type="submit" loading={loading} className="w-full mt-1 py-2.5">
                  {isForgot ? "Send reset link" : tab === "login" ? "Sign in" : "Create account"}
                </Btn>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── tech tab ────────────────────────────────────────────── */

const TECH_SECTIONS = [
  { id: "problem", label: "Problem formulation" },
  { id: "motivation", label: "Motivation" },
  { id: "approach", label: "Proposed approach" },
  { id: "demo", label: "Demo phase" },
  { id: "inference", label: "Inference phase" },
  { id: "future", label: "Future directions" },
  { id: "references", label: "References" },
];

const REFS: {
  id: number;
  authors: string;
  title: string;
  venue: string;
  year: number;
  href: string;
}[] = [
  {
    id: 1,
    authors: "Dreczkowski K., Vitiello P., Vosylius V. et al.",
    title: "Learning a Thousand Tasks in a Day",
    venue: "7th Robot Learning Workshop, NeurIPS",
    year: 2024,
    href: "https://arxiv.org/abs/2511.10110",
  },
  {
    id: 2,
    authors: "Florence P.R., Manuelli L., Tedrake R.",
    title:
      "Dense Object Nets: Learning Dense Visual Object Descriptors by and for Robotic Manipulation",
    venue: "CoRL",
    year: 2018,
    href: "https://arxiv.org/abs/1806.08756",
  },
  {
    id: 3,
    authors: "Simeonov A., Du Y., Tagliasacchi A. et al.",
    title: "Neural Descriptor Fields: SE(3)-Equivariant Object Representations for Manipulation",
    venue: "ICRA",
    year: 2022,
    href: "https://arxiv.org/abs/2112.05124",
  },
  {
    id: 4,
    authors: "Zhang J., Herrmann C., Hur J. et al.",
    title:
      "A Tale of Two Features: Stable Diffusion Complements DINO for Zero-Shot Semantic Correspondence",
    venue: "NeurIPS",
    year: 2023,
    href: "https://arxiv.org/abs/2305.15347",
  },
  {
    id: 5,
    authors: "Zhou C., Zhu C., Xiong Y. et al.",
    title: "EdgeTAM: On-Device Track Anything Model",
    venue: "CVPR",
    year: 2025,
    href: "https://arxiv.org/abs/2501.07256",
  },
  {
    id: 6,
    authors: "Wen B., Trepte M., Aribido J. et al.",
    title: "FoundationStereo: Zero-Shot Stereo Matching",
    venue: "CVPR",
    year: 2025,
    href: "https://arxiv.org/abs/2501.09898",
  },
  {
    id: 7,
    authors: "Vitiello P., Dreczkowski K., Johns E.",
    title: "One-Shot Imitation Learning: A Pose Estimation Perspective",
    venue: "arXiv",
    year: 2023,
    href: "https://arxiv.org/abs/2310.12077",
  },
  {
    id: 8,
    authors: "Wang Y., Johns E.",
    title: "One-Shot Dual-Arm Imitation Learning",
    venue: "arXiv",
    year: 2025,
    href: "https://arxiv.org/abs/2503.06831",
  },
  {
    id: 9,
    authors: "Di Palo N., Johns E.",
    title: "DINOBot: Robot Manipulation via Retrieval and Alignment with Vision Foundation Models",
    venue: "ICRA",
    year: 2024,
    href: "https://arxiv.org/abs/2402.13181",
  },
  {
    id: 10,
    authors: "Heppert N., Argus M., Welschehold T. et al.",
    title: "DITTO: Demonstration Imitation by Trajectory Transformation",
    venue: "IROS",
    year: 2024,
    href: "https://arxiv.org/abs/2403.15203",
  },
  {
    id: 11,
    authors: "Rusu R.B., Blodow N., Beetz M.",
    title: "Fast Point Feature Histograms (FPFH) for 3D Registration",
    venue: "ICRA",
    year: 2009,
    href: "https://open3d.org/docs/latest/tutorial/pipelines/global_registration.html",
  },
  {
    id: 12,
    authors: "Segal A., Haehnel D., Thrun S.",
    title: "Generalized-ICP",
    venue: "Robotics: Science and Systems",
    year: 2009,
    href: "https://www.roboticsproceedings.org/rss05/p21.pdf",
  },
];

function Ref({ ids }: { ids: number[] }) {
  return (
    <sup className="font-mono text-[10px] ml-0.5">
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && <span className="text-paper/30">,</span>}
          <a
            href={`#ref-${id}`}
            className="text-[var(--violet)] hover:underline"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(`ref-${id}`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            [{id}]
          </a>
        </span>
      ))}
    </sup>
  );
}

function TechTab() {
  const [activeSection, setActiveSection] = useState("problem");

  function scrollTo(id: string) {
    setActiveSection(id);
    document.getElementById(`tech-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex gap-8">
      {/* left nav */}
      <aside className="w-44 shrink-0 hidden md:block">
        <div className="sticky top-0 flex flex-col gap-0.5 pt-1">
          <p className="text-xs uppercase tracking-widest text-paper/25 font-medium px-2 mb-2">
            On this page
          </p>
          {TECH_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-left px-2 py-1.5 rounded text-sm transition cursor-pointer ${
                activeSection === s.id
                  ? "text-paper font-medium"
                  : "text-paper/35 hover:text-paper/70"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </aside>

      {/* content */}
      <div className="flex-1 flex flex-col gap-14 min-w-0">
        {/* ── YouTube ────────────────────────────────────────── */}
        <div className="rounded-xl border border-white/8 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8 bg-white/2 flex items-center justify-between">
            <p className="text-xs text-paper/30 font-medium uppercase tracking-widest">
              Watch it in action
            </p>
            <a
              href="https://www.youtube.com/@lili-o-robotic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-paper/40 hover:text-paper/70 transition"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              @lili-o-robotic
            </a>
          </div>
          <div className="aspect-video bg-black">
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=lili-o-robotic"
              title="Lili-o — robot in action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* ── 1. Problem formulation ─────────────────────────── */}
        <section id="tech-problem" className="flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--violet)] font-medium mb-3">
              Technical overview
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Towards an adaptive robotic manipulator
            </h2>
          </div>

          <p className="text-sm text-paper/55 leading-relaxed">
            We consider a robotic arm equipped with exteroceptive sensors — a calibrated stereo
            camera pair — that must be capable of manipulating objects of arbitrary shape in
            uncontrolled environments. The system is designed to handle domestic, industrial, and
            exhibition settings without environment-specific retraining.
          </p>

          <p className="text-sm text-paper/55 leading-relaxed">
            Manipulation of this nature is a complex task conditioned on physical characteristics
            (mass, centre of gravity, geometry, material, graspable surface) that vary across
            objects. A viable system must generalise across object instances, poses, and scene
            compositions, while remaining economical in demonstration effort.
          </p>

          <p className="text-sm text-paper/55 leading-relaxed">
            Formally, we seek a policy <em>π</em> that, given a single expert demonstration of a
            task on object <em>o</em> at pose <em>p</em>
            <sub>demo</sub>, can reproduce the task on any semantically similar object at an
            arbitrary pose <em>p</em>
            <sub>inf</sub> — without additional demonstrations.
          </p>
        </section>

        {/* ── 2. Motivation ──────────────────────────────────── */}
        <section id="tech-motivation" className="flex flex-col gap-5">
          <h2 className="text-lg font-bold">Motivation — why not end-to-end learning?</h2>
          <p className="text-sm text-paper/55 leading-relaxed">
            Three families of methods currently dominate robotic manipulation. We evaluated each
            against our constraints of data scarcity, deployment flexibility, and
            out-of-distribution generalisation.
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                name: "Imitation Learning (IL) / Behavioural Cloning",
                verdict: "Rejected",
                color: "text-red-400 bg-red-400/8 border-red-400/15",
                body: (
                  <p className="text-sm text-paper/45 leading-relaxed">
                    IL methods such as Diffusion Policy require 300–8,000 demonstrations per task to
                    obtain a stable, generalisable policy. Generalisation is strictly local to the
                    training distribution; changes in robot pose, object appearance, or environment
                    structure lead to policy collapse. The data collection burden and the absence of
                    cross-distribution generalisation make IL impractical for our deployment
                    constraints.
                  </p>
                ),
              },
              {
                name: "Vision-Language-Action Models (VLA)",
                verdict: "Rejected",
                color: "text-red-400 bg-red-400/8 border-red-400/15",
                body: (
                  <p className="text-sm text-paper/45 leading-relaxed">
                    VLAs extend IL with a language backbone to improve generalisation. However,
                    state-of-the-art models (e.g. GEN-0) require upwards of 270,000 hours of
                    demonstration data for pre-training. While zero-shot transfer is theoretically
                    possible, empirical evidence of robust out-of-distribution performance on
                    dexterous tasks remains limited. The computational and data infrastructure
                    required is prohibitive for our use case.
                  </p>
                ),
              },
              {
                name: "Reinforcement Learning (RL)",
                verdict: "Insufficient",
                color: "text-yellow-400 bg-yellow-400/8 border-yellow-400/15",
                body: (
                  <p className="text-sm text-paper/45 leading-relaxed">
                    Sim-to-real RL can produce robust and high-performance controllers for fixed
                    tasks. However, training a separate policy per object is computationally
                    intractable given the open-ended object space we target. An end-to-end approach
                    (RGBD → action) would require capturing data for every distinct object, and
                    tasks requiring long sequential memory (e.g. surface cleaning) further
                    complicate reward design.
                  </p>
                ),
              },
            ].map((a) => (
              <div key={a.name} className="rounded-xl border border-white/8 overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/8 bg-white/2">
                  <h3 className="text-sm font-semibold text-paper/85">{a.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded border ${a.color}`}>
                    {a.verdict}
                  </span>
                </div>
                <div className="px-5 py-4">{a.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Proposed approach ───────────────────────────── */}
        <section id="tech-approach" className="flex flex-col gap-5">
          <h2 className="text-lg font-bold">Proposed approach</h2>

          <p className="text-sm text-paper/55 leading-relaxed">
            We propose a{" "}
            <strong className="text-paper/80">one-shot imitation learning system</strong> that
            decouples perception from action by reformulating manipulation as a{" "}
            <em>gripper–robot–object alignment problem</em>. The approach is directly inspired by
            work at the Robot Learning Lab, Imperial College London
            <Ref ids={[7, 8, 9]} /> and extended with recent advances in dense visual descriptors.
            <Ref ids={[2, 3, 4]} />
          </p>

          <p className="text-sm text-paper/55 leading-relaxed">
            The core insight, formalised in <em>MT3</em> (Multi-Task Trajectory Transfer)
            <Ref ids={[1]} />, is that manipulation can be decomposed into two independent phases:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/8 p-5 flex flex-col gap-2">
              <span className="text-xs font-mono text-[var(--violet)] font-semibold">
                Phase 1 — Alignment
              </span>
              <p className="text-sm text-paper/45 leading-relaxed">
                Estimate the 6-DoF pose of the target object relative to its pose during the
                demonstration. This phase is purely geometric and requires no learned policy.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 p-5 flex flex-col gap-2">
              <span className="text-xs font-mono text-[var(--violet)] font-semibold">
                Phase 2 — Interaction
              </span>
              <p className="text-sm text-paper/45 leading-relaxed">
                Apply the estimated pose delta to the stored demonstration trajectory, then execute
                the adapted waypoints using an inverse kinematics solver.
              </p>
            </div>
          </div>

          <p className="text-sm text-paper/55 leading-relaxed">
            This decomposition yields an{" "}
            <strong className="text-paper/80">
              order-of-magnitude improvement in data efficiency
            </strong>
            : a single demonstration is sufficient to generate a repeatable, robust expert
            trajectory. The method requires only an embedded GPU or DNN accelerator for the
            perception stack and a standard CPU for trajectory execution — making it significantly
            more cost-effective and deployable than VLA or end-to-end IL approaches.
          </p>

          <p className="text-sm text-paper/55 leading-relaxed">
            To generalise across semantically similar objects (e.g. transferring a skill learned on
            one mug to a different mug), we couple the alignment module with{" "}
            <strong className="text-paper/80">dense descriptor matching</strong>
            <Ref ids={[2, 3, 4]} /> — a visual encoder that assigns a feature vector to every image
            pixel, enabling robust correspondence estimation between the demo template and a new
            object instance without retraining or text prompting.
          </p>
        </section>

        {/* ── 4. Demo phase ──────────────────────────────────── */}
        <section id="tech-demo" className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold">Demo phase</h2>
            <p className="text-sm text-paper/45 mt-1 leading-relaxed">
              The goal of the demo phase is to build a 3D representation of the scene and the target
              object, then anchor the recorded robot trajectory to that representation. This is
              executed once per skill.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                step: "1",
                title: "Stereo depth estimation",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      The left and right camera frames are processed by a deep stereo matching
                      network
                      <Ref ids={[6]} /> to produce a dense disparity map <em>D</em> ∈ ℝ
                      <sup>H×W</sup>. Metric depth is recovered from disparity using the known
                      stereo baseline <em>b</em>
                      and focal length <em>f</em>:
                    </p>
                    <div className="rounded-lg bg-[#0d0d0d] border border-white/8 px-4 py-3 font-mono text-sm text-paper/60 my-1">
                      Z(u,v) = b · f / D(u,v)
                    </div>
                    <p className="text-sm text-paper/40 leading-relaxed">
                      The quality of this depth estimate is critical — the system must remain robust
                      to variations in texture, reflectance, and scene geometry.
                    </p>
                  </>
                ),
              },
              {
                step: "2",
                title: "Object segmentation — EdgeTAM",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      The user-defined bounding box is passed to{" "}
                      <strong className="text-paper/70">EdgeTAM</strong>
                      <Ref ids={[5]} />, an on-device variant of the Segment Anything Model
                      optimised for edge deployment. It produces a pixel-accurate binary mask{" "}
                      <em>M</em> ∈ {"{0,1}"}
                      <sup>H×W</sup> of the target object. This mask isolates the object&apos;s
                      depth values from the full disparity map, yielding a masked disparity map{" "}
                      <em>D̃ = D ⊙ M</em>.
                    </p>
                  </>
                ),
              },
              {
                step: "3",
                title: "Point cloud construction",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      Two pointclouds are reconstructed by back-projecting pixel coordinates and
                      their associated depth values into 3D using the camera intrinsic matrix{" "}
                      <em>K</em> and the extrinsic transform <em>T</em>
                      <sub>cam→base</sub> from the stereo calibration:
                    </p>
                    <div className="rounded-lg bg-[#0d0d0d] border border-white/8 px-4 py-3 font-mono text-sm text-paper/60 my-1">
                      P = T<sub>cam→base</sub> · K<sup>-1</sup> · [u · Z, v · Z, Z, 1]<sup>T</sup>
                    </div>
                    <p className="text-sm text-paper/40 leading-relaxed">
                      The <strong className="text-paper/65">full scene pointcloud</strong>{" "}
                      <em>𝒫</em>
                      <sub>scene</sub> uses the complete disparity map; the{" "}
                      <strong className="text-paper/65">object pointcloud</strong> <em>𝒫</em>
                      <sub>obj</sub> uses only the masked region. Both are expressed in the robot
                      base frame.
                    </p>
                  </>
                ),
              },
              {
                step: "4",
                title: "Trajectory recording and anchoring",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      During kinesthetic or teleoperated demonstration, the 6-DoF gripper trajectory
                      is recorded as a sequence of homogeneous transforms <em>{"{"}</em>W
                      <sub>i</sub> ∈ SE(3)<em>{"}"}</em> expressed in the robot base frame
                      (recovered via forward kinematics and joint proprioception). The trajectory is
                      stored alongside <em>𝒫</em>
                      <sub>obj</sub> and the template image <em>I</em>
                      <sub>demo</sub>. Each atomic interaction should constitute a separate
                      demonstration — composite tasks decompose into a sequence of independently
                      learned skills.
                    </p>
                  </>
                ),
              },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-white/8 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/8 bg-white/2">
                  <span className="text-xs font-mono text-[var(--violet)] font-semibold w-4">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-semibold text-paper/90">{s.title}</h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">{s.content}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/8 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/8 bg-white/2">
              <p className="text-xs text-paper/30 font-medium uppercase tracking-widest">
                Figure 1 — Demo phase pipeline
              </p>
            </div>
            <div className="p-4 bg-white/[0.02]">
              <img
                src="/pipeline-demo.png"
                alt="Demo phase pipeline"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* ── 5. Inference phase ─────────────────────────────── */}
        <section id="tech-inference" className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold">Inference phase</h2>
            <p className="text-sm text-paper/45 mt-1 leading-relaxed">
              At inference time, the system estimates the relative 6-DoF pose <em>T</em>
              <sub>Δ</sub> between the demo object pose and its current pose, then applies this
              transform to the stored trajectory. No retraining or additional demonstrations are
              required.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                step: "1",
                title: "Stereo depth estimation",
                content: (
                  <p className="text-sm text-paper/45 leading-relaxed">
                    The stereo depth pipeline (Section 4, Step 1) runs identically on the new stereo
                    pair, yielding an inference disparity map <em>D</em>
                    <sub>inf</sub> and the corresponding scene pointcloud <em>𝒫</em>
                    <sub>inf,scene</sub>.
                  </p>
                ),
              },
              {
                step: "2",
                title: "Object re-localisation via dense descriptor matching",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      Rather than relying on sparse keypoint detectors (e.g. SIFT/ORB), which
                      degrade on textureless or reflective surfaces, the system employs{" "}
                      <strong className="text-paper/70">dense visual descriptors</strong>
                      <Ref ids={[2, 3, 4]} />: a deep encoder assigns a feature vector{" "}
                      <em>φ(u,v)</em> ∈ ℝ<sup>d</sup> to every pixel of both the demo template{" "}
                      <em>I</em>
                      <sub>demo</sub> and the new inference frame <em>I</em>
                      <sub>inf</sub>.
                    </p>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      The matcher finds the bounding box in <em>I</em>
                      <sub>inf</sub> whose descriptor distribution best aligns with the object
                      region in <em>I</em>
                      <sub>demo</sub>, without any text prompt or task-specific fine-tuning. This is
                      an extension of the retrieval-based alignment approach introduced in MT3
                      <Ref ids={[1]} /> and further developed in DINOBot
                      <Ref ids={[9]} />.
                    </p>
                    <div className="flex flex-wrap gap-6 text-xs text-paper/35 mt-1 font-mono">
                      <span>
                        Input → I<sub>demo</sub>, I<sub>inf</sub>
                      </span>
                      <span className="text-paper/20">·</span>
                      <span>
                        Output → bounding box [x1,y1,x2,y2]<sub>inf</sub>
                      </span>
                    </div>
                  </>
                ),
              },
              {
                step: "3",
                title: "Re-segmentation and inference pointcloud",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      EdgeTAM
                      <Ref ids={[5]} /> segments the detected bounding box in <em>I</em>
                      <sub>inf</sub>, producing mask <em>M</em>
                      <sub>inf</sub>. Applied to <em>D</em>
                      <sub>inf</sub> and back-projected using the calibration, this yields the
                      inference object pointcloud <em>𝒫</em>
                      <sub>inf,obj</sub> — the 3D shape of the object at its current position in the
                      robot base frame.
                    </p>
                  </>
                ),
              },
              {
                step: "4",
                title: "Coarse registration — FPFH + RANSAC",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      <strong className="text-paper/70">
                        Fast Point Feature Histograms (FPFH)
                      </strong>
                      <Ref ids={[11]} /> compute a 33-dimensional local geometry descriptor at each
                      point in <em>𝒫</em>
                      <sub>obj</sub> and <em>𝒫</em>
                      <sub>inf,obj</sub>, encoding the angular relationships between point normals
                      in the neighbourhood. RANSAC samples sets of FPFH correspondences and
                      estimates the coarse rigid transform <em>T</em>
                      <sub>coarse</sub> ∈ SE(3) by rejecting outlier matches.
                    </p>
                    <div className="flex flex-wrap gap-6 text-xs text-paper/35 mt-1 font-mono">
                      <span>
                        Input → 𝒫<sub>obj</sub>, 𝒫<sub>inf,obj</sub>
                      </span>
                      <span className="text-paper/20">·</span>
                      <span>
                        Output → T<sub>coarse</sub> ∈ SE(3)
                      </span>
                    </div>
                  </>
                ),
              },
              {
                step: "5",
                title: "Fine registration — Generalised ICP",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      <strong className="text-paper/70">Generalised ICP (G-ICP)</strong>
                      <Ref ids={[12]} />
                      takes <em>T</em>
                      <sub>coarse</sub> as initialisation and minimises a point-to-plane objective
                      that models local surface covariance at each point. This yields the refined
                      pose delta <em>T</em>
                      <sub>Δ</sub> ∈ SE(3), representing the full 6-DoF transform from the demo
                      object frame to the current object frame.
                    </p>
                    <div className="flex flex-wrap gap-6 text-xs text-paper/35 mt-1 font-mono">
                      <span>
                        Input → T<sub>coarse</sub>, 𝒫<sub>obj</sub>, 𝒫<sub>inf,obj</sub>
                      </span>
                      <span className="text-paper/20">·</span>
                      <span>
                        Output → T<sub>Δ</sub> ∈ SE(3)
                      </span>
                    </div>
                  </>
                ),
              },
              {
                step: "6",
                title: "Trajectory adaptation and execution",
                content: (
                  <>
                    <p className="text-sm text-paper/45 leading-relaxed">
                      Each waypoint W<sub>i</sub> ∈ SE(3) in the stored trajectory is transformed by
                      left-multiplying with the pose delta:
                    </p>
                    <div className="rounded-lg bg-[#0d0d0d] border border-white/8 px-4 py-3 font-mono text-sm text-paper/60 my-1">
                      W′<sub>i</sub> = T<sub>Δ</sub> · W<sub>i</sub>, &nbsp; ∀i ∈ [1, N]
                    </div>
                    <p className="text-sm text-paper/40 leading-relaxed">
                      The adapted sequence {"{"}
                      <em>
                        W′<sub>i</sub>
                      </em>
                      {"}"} is returned as the action plan. Trajectory execution uses an inverse
                      kinematics solver in Cartesian space. The current implementation operates
                      open-loop — sensor feedback during execution is a planned extension (see
                      Future directions). If alignment fails or the object is not detected, the plan
                      is empty.
                    </p>
                  </>
                ),
              },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-white/8 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/8 bg-white/2">
                  <span className="text-xs font-mono text-[var(--violet)] font-semibold w-4">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-semibold text-paper/90">{s.title}</h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">{s.content}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/8 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/8 bg-white/2">
              <p className="text-xs text-paper/30 font-medium uppercase tracking-widest">
                Figure 2 — Inference phase pipeline
              </p>
            </div>
            <div className="p-4 bg-white/[0.02]">
              <img
                src="/pipeline-inference.png"
                alt="Inference phase pipeline"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* ── 6. Future directions ───────────────────────────── */}
        <section id="tech-future" className="flex flex-col gap-5">
          <h2 className="text-lg font-bold">Future directions</h2>
          <p className="text-sm text-paper/55 leading-relaxed">
            The current system is sufficient for repetitive manipulation tasks in structured
            environments. Several extensions are planned to improve generalisation and robustness.
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                title: "Part-level dense correspondence",
                body: "To generalise across objects with shared functional parts (e.g. grasping the handle of any mug), we plan to focus the alignment module on task-relevant sub-regions using 3D descriptors or VLM attention. This shifts alignment from global object shape to the locally relevant geometry, improving generalisation to out-of-distribution instances.",
              },
              {
                title: "Closed-loop execution with tactile feedback",
                body: "The current trajectory execution is open-loop. Adding tactile or force-torque feedback during the interaction phase would allow the controller to modulate grasp pressure and gripper attitude in response to contact, improving success rate on deformable or fragile objects.",
              },
              {
                title: "Mobile manipulation and navigation",
                body: "Extending to a mobile base requires integrating scene-wide OctoMap reconstruction from the full pointcloud alongside object-level alignment. Navigation in cluttered human environments and manipulation of deformable objects remain open challenges beyond the scope of the current system.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/8 p-5 flex flex-col gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--violet)] mb-1" />
                <h3 className="text-sm font-semibold text-paper/90">{f.title}</h3>
                <p className="text-sm text-paper/40 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. References ──────────────────────────────────── */}
        <section id="tech-references" className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">References</h2>
          <div className="flex flex-col gap-2">
            {REFS.map((r) => (
              <div
                key={r.id}
                id={`ref-${r.id}`}
                className="flex gap-4 text-sm text-paper/45 leading-relaxed scroll-mt-4 rounded-lg px-3 py-2 hover:bg-white/3 transition"
              >
                <span className="font-mono text-paper/25 shrink-0 w-6 text-right">[{r.id}]</span>
                <span>
                  {r.authors}{" "}
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="italic text-paper/65 hover:text-[var(--violet)] transition"
                  >
                    {r.title}
                  </a>
                  {". "}
                  <span className="text-paper/30">
                    {r.venue}, {r.year}.
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── docs tab ────────────────────────────────────────────── */

const ENDPOINTS: {
  method: "GET" | "POST" | "DELETE";
  path: string;
  description: string;
  body?: { field: string; type: string; note: string }[];
  returns?: string;
  sdkExample?: string;
}[] = [
  {
    method: "POST",
    path: "/session",
    description:
      "Opens a new robot session. Each session holds an independent depth model initialised with the camera calibration. Returns a session_id used in all subsequent robot calls.",
    body: [
      {
        field: "camera_calibration",
        type: "object",
        note: "The camera_calibration object from your camera config JSON — pass it as-is.",
      },
    ],
    returns: "{ session_id: string }",
    sdkExample: `import json\nfrom lilio import LilioClient\n\nclient = LilioClient(api_key="lilio_sk_...")\n\nwith open("config_vision_QM.json") as f:\n    calib = json.load(f)["camera_calibration"]\n\nwith client.session(calib) as session:\n    ...  # session closes automatically`,
  },
  {
    method: "DELETE",
    path: "/session/{session_id}",
    description:
      "Closes a session and frees its server resources. Called automatically when using the SDK context manager.",
    returns: "{ info: string }",
  },
  {
    method: "POST",
    path: "/robot/roi",
    description:
      "Demo phase — step 1. Send a stereo image pair and a bounding box around the object of interest. The server runs S2M2 stereo depth estimation, EdgeTAM segmentation, and constructs the object pointcloud. Must be called before /robot/save_skill.",
    body: [
      { field: "left_image", type: "string", note: "Base64-encoded PNG of the left camera frame." },
      {
        field: "right_image",
        type: "string",
        note: "Base64-encoded PNG of the right camera frame.",
      },
      {
        field: "box",
        type: "[x1, y1, x2, y2]",
        note: "Bounding box in pixel coordinates — top-left to bottom-right.",
      },
    ],
    returns: '{ roi: [x1, y1, x2, y2], info: "demo state ready" }',
    sdkExample: `import cv2\n\nimg_left  = cv2.cvtColor(cv2.imread("left_0000.png"),  cv2.COLOR_BGR2RGB)\nimg_right = cv2.cvtColor(cv2.imread("right_0000.png"), cv2.COLOR_BGR2RGB)\n\nsession.set_roi(img_left, img_right, box=[640, 150, 1060, 680])`,
  },
  {
    method: "POST",
    path: "/robot/save_skill",
    description:
      "Demo phase — step 2. Attaches a robot trajectory to the demo state captured by /robot/roi and saves the skill to your account. Requires /robot/roi to have been called first in the same session.",
    body: [
      { field: "skill_name", type: "string", note: "Name of the skill to save." },
      {
        field: "trajectories",
        type: "array",
        note: 'Array of waypoints. Each has: arm ("left"|"right"), TL (4×4 float), TR (4×4 float), gl (float, left gripper 0=closed), gr (float, right gripper).',
      },
    ],
    returns: "{ info: \"'<skill_name>' saved.\" }",
    sdkExample: `import numpy as np\n\ntraj = np.load("trajectory.npy", allow_pickle=True)\nsession.save_skill("open_coffee_machine", traj)`,
  },
  {
    method: "GET",
    path: "/robot/action_plan",
    description: "Lists all skills saved by the authenticated user.",
    returns: "[{ name: string, created_at: string }]",
    sdkExample: `skills = client.list_skills()\nfor s in skills:\n    print(s["name"], s["created_at"])`,
  },
  {
    method: "POST",
    path: "/robot/action_plans_stream",
    description:
      "Inference phase. Send a new stereo image pair — the server runs UMatcher dense descriptor matching, re-segments the object, estimates the 6-DoF pose shift via FPFH+RANSAC+G-ICP, and returns the adapted trajectory. Returns null if the object was not detected.",
    body: [
      { field: "skill_name", type: "string", note: "Name of the skill to run." },
      { field: "left_image", type: "string", note: "Base64-encoded PNG of the left camera frame." },
      {
        field: "right_image",
        type: "string",
        note: "Base64-encoded PNG of the right camera frame.",
      },
    ],
    returns: "{ plan: array | null }",
    sdkExample: `img_left  = cv2.cvtColor(cv2.imread("left_0001.png"),  cv2.COLOR_BGR2RGB)\nimg_right = cv2.cvtColor(cv2.imread("right_0001.png"), cv2.COLOR_BGR2RGB)\n\nplan = session.get_action_plan("open_coffee_machine", img_left, img_right)\nif plan:\n    print("bottleneck pose:", plan[0])\nelse:\n    print("object not detected")`,
  },
];

const METHOD_COLOR: Record<string, string> = {
  GET: "text-green-400  bg-green-400/10  border-green-400/20",
  POST: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  DELETE: "text-red-400    bg-red-400/10    border-red-400/20",
};

const DOC_SECTIONS = [
  { id: "quickstart", label: "Quick start" },
  { id: "auth", label: "Authentication" },
  { id: "sessions", label: "Sessions" },
  { id: "demo-guide", label: "Recording a skill" },
  { id: "endpoints", label: "Endpoints" },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="relative group rounded-lg bg-[#0d0d0d] border border-white/8 overflow-hidden">
      <pre className="text-xs font-mono text-paper/60 p-4 overflow-x-auto leading-relaxed">
        {code}
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 text-xs text-paper/25 hover:text-paper/70 transition cursor-pointer opacity-0 group-hover:opacity-100"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function DocsTab() {
  const [activeSection, setActiveSection] = useState("quickstart");

  function scrollTo(id: string) {
    setActiveSection(id);
    document.getElementById(`doc-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex gap-8">
      {/* left nav */}
      <aside className="w-40 shrink-0 hidden md:block">
        <div className="sticky top-0 flex flex-col gap-0.5 pt-1">
          <p className="text-xs uppercase tracking-widest text-paper/25 font-medium px-2 mb-2">
            On this page
          </p>
          {DOC_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`text-left px-2 py-1.5 rounded text-sm transition cursor-pointer ${
                activeSection === s.id
                  ? "text-paper font-medium"
                  : "text-paper/35 hover:text-paper/70"
              }`}
            >
              {s.label}
            </button>
          ))}
          <div className="mt-4 border-t border-white/8 pt-4 flex flex-col gap-0.5">
            <p className="text-xs uppercase tracking-widest text-paper/25 font-medium px-2 mb-2">
              Links
            </p>
            <a
              href="https://github.com/plume2109/lilio-sdk-python"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1.5 text-sm text-paper/35 hover:text-paper/70 transition flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                <path
                  d="M7.5.85a6.65 6.65 0 0 0-2.102 12.953c.332.06.454-.144.454-.32v-1.123c-1.851.402-2.241-.893-2.241-.893-.303-.77-.739-.975-.739-.975-.604-.413.046-.405.046-.405.668.047 1.02.687 1.02.687.594 1.018 1.558.724 1.938.553.06-.43.232-.724.422-.89-1.478-.168-3.03-.739-3.03-3.288 0-.727.26-1.32.687-1.786-.069-.168-.298-.845.065-1.762 0 0 .56-.18 1.835.684a6.386 6.386 0 0 1 1.667-.224c.566.003 1.136.076 1.668.224 1.273-.864 1.832-.684 1.832-.684.364.917.135 1.594.066 1.762.428.466.686 1.06.686 1.786 0 2.556-1.555 3.118-3.037 3.283.239.206.451.61.451 1.23v1.824c0 .178.12.384.457.319A6.651 6.651 0 0 0 7.5.85z"
                  fill="currentColor"
                />
              </svg>
              SDK
            </a>
            <a
              href="https://github.com/Lili-0-FR/example_lili-o_think"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1.5 text-sm text-paper/35 hover:text-paper/70 transition flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                <path
                  d="M7.5.85a6.65 6.65 0 0 0-2.102 12.953c.332.06.454-.144.454-.32v-1.123c-1.851.402-2.241-.893-2.241-.893-.303-.77-.739-.975-.739-.975-.604-.413.046-.405.046-.405.668.047 1.02.687 1.02.687.594 1.018 1.558.724 1.938.553.06-.43.232-.724.422-.89-1.478-.168-3.03-.739-3.03-3.288 0-.727.26-1.32.687-1.786-.069-.168-.298-.845.065-1.762 0 0 .56-.18 1.835.684a6.386 6.386 0 0 1 1.667-.224c.566.003 1.136.076 1.668.224 1.273-.864 1.832-.684 1.832-.684.364.917.135 1.594.066 1.762.428.466.686 1.06.686 1.786 0 2.556-1.555 3.118-3.037 3.283.239.206.451.61.451 1.23v1.824c0 .178.12.384.457.319A6.651 6.651 0 0 0 7.5.85z"
                  fill="currentColor"
                />
              </svg>
              Example
            </a>
          </div>
        </div>
      </aside>

      {/* content */}
      <div className="flex-1 flex flex-col gap-14 min-w-0">
        {/* quick start */}
        <section id="doc-quickstart" className="flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-bold">Quick start</h2>
            <p className="text-sm text-paper/45 mt-1">
              Install the SDK and run your first skill in minutes.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs text-paper/40 font-medium uppercase tracking-widest">Install</p>
            <CodeBlock
              code={`git clone https://github.com/plume2109/lilio-sdk-python.git\ncd lilio-sdk-python\npip install -e .`}
            />
            <p className="text-xs text-paper/40 font-medium uppercase tracking-widest mt-2">
              Full example
            </p>
            <CodeBlock
              code={`import json, cv2, numpy as np\nfrom lilio import LilioClient\n\nclient = LilioClient(api_key="lilio_sk_...", base_url="http://localhost:8000")\n\nwith open("config_vision_QM.json") as f:\n    calib = json.load(f)["camera_calibration"]\n\nimg_demo_left  = cv2.cvtColor(cv2.imread("left_0000.png"),  cv2.COLOR_BGR2RGB)\nimg_demo_right = cv2.cvtColor(cv2.imread("right_0000.png"), cv2.COLOR_BGR2RGB)\nimg_inf_left   = cv2.cvtColor(cv2.imread("left_0001.png"),  cv2.COLOR_BGR2RGB)\nimg_inf_right  = cv2.cvtColor(cv2.imread("right_0001.png"), cv2.COLOR_BGR2RGB)\ntraj = np.load("trajectory.npy", allow_pickle=True)\n\nwith client.session(calib) as session:\n    # Demo phase\n    session.set_roi(img_demo_left, img_demo_right, box=[640, 150, 1060, 680])\n    session.save_skill("open_coffee_machine", traj)\n\n    # Inference phase\n    plan = session.get_action_plan("open_coffee_machine", img_inf_left, img_inf_right)\n    if plan:\n        print("bottleneck pose:", plan[0])\n    else:\n        print("object not detected")`}
            />
          </div>
        </section>

        {/* authentication */}
        <section id="doc-auth" className="flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-bold">Authentication</h2>
            <p className="text-sm text-paper/45 mt-1">
              All requests require a Bearer token. Generate an API key in the{" "}
              <button
                onClick={() => {}}
                className="text-[var(--violet)] hover:underline cursor-pointer"
              >
                API Keys
              </button>{" "}
              tab.
            </p>
          </div>
          <div className="rounded-xl border border-white/8 divide-y divide-white/8">
            <div className="px-5 py-4 flex flex-col gap-1">
              <p className="text-xs text-paper/30 uppercase tracking-widest font-medium">
                HTTP header
              </p>
              <CodeBlock code={`Authorization: Bearer lilio_sk_...`} />
            </div>
            <div className="px-5 py-4 flex flex-col gap-1">
              <p className="text-xs text-paper/30 uppercase tracking-widest font-medium">
                Python SDK
              </p>
              <CodeBlock
                code={`from lilio import LilioClient\n\nclient = LilioClient(api_key="lilio_sk_...")`}
              />
            </div>
          </div>
        </section>

        {/* sessions */}
        <section id="doc-sessions" className="flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-bold">Sessions</h2>
            <p className="text-sm text-paper/45 mt-1">
              Every robot run requires an open session. A session holds the depth model initialised
              with your camera calibration and the intermediate demo state. Skills are persisted to
              your account and survive beyond the session.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                label: "Open",
                code: "POST /session",
                note: "Pass camera_calibration from your config JSON.",
              },
              {
                label: "Close",
                code: "DELETE /session/{id}",
                note: "Always close when the run is finished. SDK handles this automatically.",
              },
            ].map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-white/8 p-5 flex flex-col gap-2"
              >
                <p className="text-xs text-paper/30 uppercase tracking-widest font-medium">
                  {r.label}
                </p>
                <code className="text-sm font-mono text-paper/75">{r.code}</code>
                <p className="text-xs text-paper/40">{r.note}</p>
              </div>
            ))}
          </div>
          <CodeBlock
            code={`with client.session(camera_calibration) as session:\n    ...  # session closes automatically, even on error`}
          />
        </section>

        {/* recording a skill */}
        <section id="doc-demo-guide" className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold">Recording a skill</h2>
            <p className="text-sm text-paper/45 mt-1 leading-relaxed">
              A skill is recorded in three sequential steps: capture the ROI, align the robot, then
              record the trajectory. The order matters — and the object must not move between any of
              these steps.
            </p>
          </div>

          {/* critical warning */}
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-5 py-4 flex gap-3">
            <svg
              className="shrink-0 mt-0.5 text-amber-400"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608765L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18779 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98079 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08568 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08568 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-amber-400">
                Do not move the object between steps
              </p>
              <p className="text-sm text-amber-400/70 leading-relaxed">
                The system anchors the trajectory to the object&apos;s visual features at its exact
                3D Cartesian position in the robot frame. Moving the object after capturing the ROI
                will corrupt the geometric anchor and produce incorrect trajectories at inference
                time.
              </p>
            </div>
          </div>

          {/* steps */}
          <div className="flex flex-col gap-3">
            {[
              {
                step: "1",
                label: "Place the object",
                desc: "Position the target object in the robot's workspace where it will be during real use. This position will become the reference pose — all future inference runs adapt the trajectory relative to it.",
                code: null,
              },
              {
                step: "2",
                label: "Capture the ROI",
                desc: "Draw a bounding box around the object in the left camera frame. The server runs stereo depth estimation and EdgeTAM segmentation to build the object's 3D pointcloud at its current Cartesian position. This is the geometric anchor for the skill.",
                code: `session.set_roi(img_left, img_right, box=[x1, y1, x2, y2])`,
              },
              {
                step: "3",
                label: "Align and record the trajectory",
                desc: "Move the robot into starting position for the task — the object must remain stationary. Perform the task kinesthetically or via teleop. The 6-DoF gripper trajectory is recorded as a sequence of SE(3) waypoints in the robot base frame.",
                code: null,
              },
              {
                step: "4",
                label: "Save the skill",
                desc: "Attach the recorded trajectory to the ROI state and save it to your account. The skill is now available for inference from any object placement.",
                code: `session.save_skill("skill_name", trajectory)`,
              },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border border-white/8 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/8 bg-white/2">
                  <span className="text-xs font-mono text-[var(--violet)] font-semibold w-4 shrink-0">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-semibold text-paper/90">{s.label}</h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  <p className="text-sm text-paper/45 leading-relaxed">{s.desc}</p>
                  {s.code && <CodeBlock code={s.code} />}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/8 px-5 py-4 flex gap-3 items-start">
            <svg
              className="shrink-0 mt-0.5 text-paper/30"
              width="14"
              height="14"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M7.5 1a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 7.5 1zM0 7.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0zm6.5-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm.5 2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V7.5a.5.5 0 0 1 .5-.5z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm text-paper/40 leading-relaxed">
              Each atomic interaction should be its own skill. Composite tasks — e.g. picking an
              object then placing it — should be recorded as two separate skills and executed
              sequentially.
            </p>
          </div>
        </section>

        {/* endpoints */}
        <section id="doc-endpoints" className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold">Endpoints</h2>
            <p className="text-sm text-paper/45 mt-1">
              Base URL: <code className="font-mono text-paper/70">https://api.lili-o.com</code>
            </p>
          </div>

          {ENDPOINTS.map((ep) => (
            <div key={ep.path} className="rounded-xl border border-white/8 overflow-hidden">
              {/* title row */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/8 bg-white/2">
                <span
                  className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border shrink-0 ${METHOD_COLOR[ep.method]}`}
                >
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-paper/80">{ep.path}</code>
              </div>

              <div className="px-5 py-5 flex flex-col gap-5">
                <p className="text-sm text-paper/50 leading-relaxed">{ep.description}</p>

                {ep.body && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-paper/25 font-medium mb-3">
                      Request body
                    </p>
                    <div className="rounded-lg border border-white/8 divide-y divide-white/5 overflow-hidden">
                      {ep.body.map((f) => (
                        <div
                          key={f.field}
                          className="grid grid-cols-[140px_100px_1fr] gap-3 px-4 py-3 text-sm items-start"
                        >
                          <code className="font-mono text-paper/75 text-xs">{f.field}</code>
                          <span className="text-paper/30 text-xs">{f.type}</span>
                          <span className="text-paper/40 text-xs">{f.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ep.returns && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-paper/25 font-medium mb-2">
                      Returns
                    </p>
                    <code className="text-xs font-mono text-paper/50">{ep.returns}</code>
                  </div>
                )}

                {ep.sdkExample && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-paper/25 font-medium mb-2">
                      SDK example
                    </p>
                    <CodeBlock code={ep.sdkExample} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

/* ── skills tab ──────────────────────────────────────────── */

function SkillsTab({ jwt, onExpired }: { jwt: string; onExpired: () => void }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Skill[]>("/robot/action_plan", { token: jwt })
      .then(setSkills)
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "";
        if (msg.includes("401") || msg.toLowerCase().includes("unauthorized")) {
          onExpired();
        } else {
          setError(msg || "Failed to load skills.");
        }
      })
      .finally(() => setLoading(false));
  }, [jwt, onExpired]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-base font-semibold">Skills</h2>
        <p className="text-sm text-paper/40 mt-0.5">
          Robot skills saved via <code className="font-mono text-paper/60">/robot/roi</code> +{" "}
          <code className="font-mono text-paper/60">/robot/save_skill</code>.
        </p>
      </div>

      {error && <Alert type="error">{error}</Alert>}

      {loading ? (
        <p className="text-sm text-paper/25">Loading…</p>
      ) : skills.length === 0 ? (
        <div className="rounded-xl border border-white/8 px-6 py-14 text-center">
          <p className="text-sm text-paper/30">No skills saved yet.</p>
          <p className="mt-1.5 text-xs text-paper/20">
            Skills appear here once recorded from your robot.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/2">
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider">
                  Skill name
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider hidden sm:table-cell">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {skills.map((s) => (
                <tr key={s.name} className="hover:bg-white/2 transition">
                  <td className="px-5 py-4 font-mono text-paper/75">{s.name}</td>
                  <td className="px-5 py-4 text-paper/35 hidden sm:table-cell">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── keys tab ────────────────────────────────────────────── */

function KeysTab({
  jwt: initialJwt,
  email,
  onJwtRefresh,
}: {
  jwt: string;
  email: string;
  onJwtRefresh: (jwt: string) => void;
}) {
  const [jwt, setJwt] = useState(initialJwt);
  const [needsReauth, setNeedsReauth] = useState(false);
  const [reauthPassword, setReauthPassword] = useState("");
  const [reauthLoading, setReauthLoading] = useState(false);
  const [reauthError, setReauthError] = useState<string | null>(null);

  const [keys, setKeys] = useState<ApiKeyMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<ApiKeyMeta[]>("/auth/tokens", { token });
      setKeys(data);
      setNeedsReauth(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("401") || msg.toLowerCase().includes("unauthorized")) {
        setNeedsReauth(true);
      } else {
        setError(msg || "Failed to load keys.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(jwt);
  }, [load, jwt]);

  async function reauth(e: { preventDefault(): void }) {
    e.preventDefault();
    setReauthLoading(true);
    setReauthError(null);
    try {
      const data = await apiFetch<{ access_token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: reauthPassword }),
      });
      const newJwt = data.access_token;
      setJwt(newJwt);
      onJwtRefresh(newJwt);
      setReauthPassword("");
      setNeedsReauth(false);
      await load(newJwt);
    } catch (err) {
      setReauthError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setReauthLoading(false);
    }
  }

  async function createKey(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const data = await apiFetch<{ api_key: string }>("/auth/token", {
        method: "POST",
        token: jwt,
        body: JSON.stringify({ name: newName.trim() }),
      });
      setCreatedKey(data.api_key);
      setNewName("");
      await load(jwt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create key.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteKey(id: string) {
    try {
      await apiFetch(`/auth/token/${id}`, { method: "DELETE", token: jwt });
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete key.");
    }
  }

  function copy() {
    if (!createdKey) return;
    copyToClipboard(createdKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (needsReauth) {
    return (
      <div className="max-w-sm flex flex-col gap-6">
        <div>
          <h2 className="text-base font-semibold">Session expired</h2>
          <p className="text-sm text-paper/40 mt-0.5">Re-enter your password to manage keys.</p>
        </div>
        {reauthError && <Alert type="error">{reauthError}</Alert>}
        <form onSubmit={reauth} className="flex flex-col gap-3">
          <Input
            type="password"
            value={reauthPassword}
            onChange={(e) => setReauthPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <Btn type="submit" loading={reauthLoading} className="w-fit">
            Confirm
          </Btn>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-base font-semibold">API Keys</h2>
          <p className="text-sm text-paper/40 mt-0.5">
            Keys provide permanent access to the Robot API from your integration.
          </p>
        </div>
        <form onSubmit={createKey} className="flex gap-2 items-center shrink-0">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Key name"
            className="w-36"
            required
          />
          <Btn type="submit" loading={creating}>
            New key
          </Btn>
        </form>
      </div>

      {error && <Alert type="error">{error}</Alert>}

      {createdKey && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 flex flex-col gap-3">
          <p className="text-sm font-medium text-green-400">
            Key created — copy it now, it won&apos;t appear again.
          </p>
          <div className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-4 py-3">
            <code className="text-xs font-mono text-paper/70 break-all flex-1">{createdKey}</code>
            <button
              onClick={copy}
              className="shrink-0 text-xs text-paper/40 hover:text-paper transition cursor-pointer"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            onClick={() => setCreatedKey(null)}
            className="text-xs text-paper/25 hover:text-paper/50 transition self-start cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-paper/25">Loading…</p>
      ) : keys.length === 0 ? (
        <div className="rounded-xl border border-white/8 px-6 py-14 text-center">
          <p className="text-sm text-paper/30">No API keys yet.</p>
          <p className="mt-1.5 text-xs text-paper/20">Create one above to start integrating.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/2">
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider hidden sm:table-cell">
                  Created
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-white/2 transition">
                  <td className="px-5 py-4 font-mono text-paper/75 text-sm">{k.name}</td>
                  <td className="px-5 py-4 text-paper/35 text-sm hidden sm:table-cell">
                    {new Date(k.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => deleteKey(k.id)}
                      className="text-xs text-red-400/50 hover:text-red-400 transition cursor-pointer"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── license tab ─────────────────────────────────────────── */

const LICENSE_FEATURES = [
  {
    title: "Runs fully on-device",
    description:
      "The model and inference engine run entirely on your hardware — no cloud dependency, no latency, no data leaves your site.",
  },
  {
    title: "Exhibition-ready",
    description:
      "Designed for live demos in noisy, public environments. Works reliably without a stable internet connection.",
  },
  {
    title: "Custom skill library",
    description:
      "Ship with a pre-loaded set of skills tuned for your specific robot and task — ready to run out of the box.",
  },
  {
    title: "Dedicated support",
    description:
      "Direct line to our engineering team for integration, calibration, and on-site troubleshooting.",
  },
];

function LicenseTab() {
  return (
    <div className="flex flex-col gap-10">
      {/* hero */}
      <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-[var(--violet-deep)]/20 via-transparent to-transparent p-8 flex flex-col gap-5">
        <div>
          <p className="eyebrow text-[var(--violet)] mb-3">On-Edge License</p>
          <h2 className="text-2xl font-bold tracking-tight leading-snug">
            Deploy Lili-o directly
            <br />
            on your hardware.
          </h2>
        </div>
        <p className="text-sm text-paper/50 leading-relaxed max-w-lg">
          The cloud API is great for development and testing. When you need the full system running
          autonomously on your robot — at an exhibition, on a production line, or in the field — an
          on-edge license is what you need.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href="/contact"
            className="inline-flex items-center rounded-lg bg-[var(--violet)] text-white px-5 py-2.5 text-sm font-medium hover:bg-[var(--violet-dark)] transition"
          >
            Talk to our team →
          </a>
          <a
            href="mailto:hello@lili-o.com"
            className="inline-flex items-center rounded-lg border border-white/15 text-paper/70 px-5 py-2.5 text-sm font-medium hover:border-white/30 hover:text-paper transition"
          >
            hello@lili-o.com
          </a>
        </div>
      </div>

      {/* features */}
      <div className="grid sm:grid-cols-2 gap-4">
        {LICENSE_FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl border border-white/8 p-6 flex flex-col gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--violet)] mb-1" />
            <h3 className="text-sm font-semibold text-paper/90">{f.title}</h3>
            <p className="text-sm text-paper/40 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>

      {/* cta strip */}
      <div className="rounded-xl border border-white/8 px-6 py-5 flex items-center justify-between gap-6 flex-wrap">
        <p className="text-sm text-paper/50">
          Pricing is tailored to your robot platform and deployment scope.
          <br />
          <span className="text-paper/30">
            Reach out to get a quote or schedule a technical call.
          </span>
        </p>
        <a
          href="/contact"
          className="shrink-0 inline-flex items-center rounded-lg bg-[var(--violet)] text-white px-5 py-2.5 text-sm font-medium hover:bg-[var(--violet-dark)] transition"
        >
          Request a quote →
        </a>
      </div>
    </div>
  );
}

/* ── dashboard shell ─────────────────────────────────────── */

const NAV: { id: DashTab; label: string; icon: React.ReactNode }[] = [
  // {
  //   id: "tech",
  //   label: "How it works",
  //   icon: (
  //     <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
  //       <path d="M7.5 1a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 7.5 1zM0 7.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0zm6.5-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm.5 2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V7.5a.5.5 0 0 1 .5-.5z" fill="currentColor" />
  //     </svg>
  //   ),
  // },
  {
    id: "docs",
    label: "Documentation",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M2 3.5A1.5 1.5 0 0 1 3.5 2h8A1.5 1.5 0 0 1 13 3.5v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 11.5v-8zM3.5 3a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-8zM5 6.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zM5.5 4a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M3 3.5A.5.5 0 0 1 3.5 3h8a.5.5 0 0 1 0 1h-8A.5.5 0 0 1 3 3.5zm0 3A.5.5 0 0 1 3.5 6h8a.5.5 0 0 1 0 1h-8A.5.5 0 0 1 3 6.5zm0 3A.5.5 0 0 1 3.5 9h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 3 9.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "keys",
    label: "API Keys",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M9 2C6.79 2 5 3.79 5 6c0 .73.21 1.41.57 2L2 11.58V13h1.5l.92-.92V11h1v-1h1l.58-.58C7.41 9.79 8.27 10 9 10c2.21 0 4-1.79 4-4S11.21 2 9 2zm0 6.5c-1.38 0-2.5-1.12-2.5-2.5S7.62 3.5 9 3.5 11.5 4.62 11.5 6 10.38 8.5 9 8.5zm1-3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "license",
    label: "License",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M7.5 1a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 7.5 1zM0 7.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0zm7.5-3a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708l-2-2A.5.5 0 0 1 7 9.5V5a.5.5 0 0 1 .5-.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

function DashboardShell({
  jwt,
  email,
  onLogout,
  onExpired,
  onJwtRefresh,
}: {
  jwt: string;
  email: string;
  onLogout: () => void;
  onExpired: () => void;
  onJwtRefresh: (jwt: string) => void;
}) {
  const [tab, setTab] = useState<DashTab>("docs");

  return (
    <div className="theme-dark bg-ink text-paper min-h-screen flex flex-col">
      {/* top bar */}
      <header className="border-b border-white/8 h-14 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-5">
          <Link href="/">
            <img
              src={LOGO_SRC}
              alt="Lili-o"
              className="h-7 w-auto brightness-0 invert opacity-80"
            />
          </Link>
          <span className="text-white/15 text-lg font-light select-none">/</span>
          <span className="text-sm font-medium text-paper/50">Dashboard</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-paper/30 hidden sm:block">{email}</span>
          <button
            onClick={onLogout}
            className="text-xs text-paper/40 hover:text-paper/80 transition cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
        <aside className="w-52 shrink-0 border-r border-white/8 flex flex-col py-5 px-3">
          <nav className="flex flex-col gap-0.5">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition cursor-pointer ${
                  tab === n.id
                    ? "bg-white/8 text-paper"
                    : "text-paper/40 hover:text-paper/70 hover:bg-white/4"
                }`}
              >
                <span className="shrink-0 opacity-70">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* main */}
        <main className="flex-1 overflow-y-auto">
          <div
            className={`mx-auto px-8 py-10 ${tab === "docs" || tab === "tech" ? "max-w-5xl" : "max-w-3xl"}`}
          >
            {tab === "tech" && <TechTab />}
            {tab === "docs" && <DocsTab />}
            {tab === "skills" && <SkillsTab jwt={jwt} onExpired={onExpired} />}
            {tab === "keys" && <KeysTab jwt={jwt} email={email} onJwtRefresh={onJwtRefresh} />}
            {tab === "license" && <LicenseTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── root ────────────────────────────────────────────────── */

export function DashboardPage() {
  const [phase, setPhase] = useState<Phase>({ id: "loading" });

  useEffect(() => {
    const jwt = localStorage.getItem("lilio_jwt");
    const email = localStorage.getItem("lilio_email");
    if (!jwt || !email) {
      setPhase({ id: "auth" });
      return;
    }
    apiFetch("/robot/action_plan", { token: jwt })
      .then(() => setPhase({ id: "ready", jwt, email }))
      .catch(() => {
        localStorage.removeItem("lilio_jwt");
        localStorage.removeItem("lilio_email");
        setPhase({ id: "auth" });
      });
  }, []);

  function handleLogin(jwt: string, email: string) {
    localStorage.setItem("lilio_jwt", jwt);
    localStorage.setItem("lilio_email", email);
    setPhase({ id: "ready", jwt, email });
  }

  function handleLogout() {
    localStorage.removeItem("lilio_jwt");
    localStorage.removeItem("lilio_email");
    setPhase({ id: "auth" });
  }

  function handleJwtRefresh(jwt: string) {
    localStorage.setItem("lilio_jwt", jwt);
    if (phase.id === "ready") setPhase({ ...phase, jwt });
  }

  function handleExpired() {
    localStorage.removeItem("lilio_jwt");
    localStorage.removeItem("lilio_email");
    setPhase({ id: "auth" });
  }

  if (phase.id === "loading") return null;
  if (phase.id === "auth") return <AuthPage onLogin={handleLogin} />;
  return (
    <DashboardShell
      jwt={phase.jwt}
      email={phase.email}
      onLogout={handleLogout}
      onExpired={handleExpired}
      onJwtRefresh={handleJwtRefresh}
    />
  );
}
