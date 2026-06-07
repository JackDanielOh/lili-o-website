"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const API_BASE = "http://localhost:8000";
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

type Phase =
  | { id: "auth" }
  | { id: "ready"; jwt: string; email: string };

type DashTab = "docs" | "skills" | "keys" | "license";

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
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      if (tab === "register") {
        await apiFetch("/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        setNotice("Account created. Check your email to confirm, then sign in.");
        setTab("login");
        setPassword("");
      } else {
        const data = await apiFetch<{ access_token: string }>("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        onLogin(data.access_token, email);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

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
        <div className="w-full max-w-[400px]">
          <div className="mb-8 text-center">
            <p className="eyebrow text-[var(--violet)] mb-3">Robot API</p>
            <h1 className="text-2xl font-bold tracking-tight">
              {tab === "login" ? "Sign in" : "Create an account"}
            </h1>
            <p className="mt-2 text-sm text-paper/40">
              {tab === "login"
                ? "Access your skills and API keys."
                : "Get started with the Lili-o Robot API."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#141414] p-8">
            <div className="flex mb-7 rounded-lg bg-white/5 p-1 gap-1">
              {(["login", "register"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(null); setNotice(null); }}
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition cursor-pointer ${
                    tab === t ? "bg-[var(--violet)] text-white" : "text-paper/40 hover:text-paper"
                  }`}
                >
                  {t === "login" ? "Sign in" : "Register"}
                </button>
              ))}
            </div>

            {notice && <div className="mb-5"><Alert type="success">{notice}</Alert></div>}
            {error && <div className="mb-5"><Alert type="error">{error}</Alert></div>}

            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-paper/40 mb-1.5 font-medium tracking-wide">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
              </div>
              <div>
                <label className="block text-xs text-paper/40 mb-1.5 font-medium tracking-wide">Password</label>
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
              <Btn type="submit" loading={loading} className="w-full mt-1 py-2.5">
                {tab === "login" ? "Sign in" : "Create account"}
              </Btn>
            </form>
          </div>
        </div>
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
}[] = [
  {
    method: "POST",
    path: "/session",
    description:
      "Opens a new robot session. Each session holds an independent depth model initialised with the camera calibration. Returns a session_id used in all subsequent robot calls.",
    body: [
      { field: "camera_calibration", type: "object", note: "The camera_calibration object from your camera config JSON — pass it as-is." },
    ],
    returns: "{ session_id: string }",
  },
  {
    method: "DELETE",
    path: "/session/{session_id}",
    description: "Closes a session and frees its server resources. Always call this when your robot run is finished.",
    returns: "{ info: string }",
  },
  {
    method: "POST",
    path: "/robot/roi",
    description:
      "Demo phase — step 1. Send a stereo image pair and a bounding box around the object of interest. The server computes depth and stores the demo state in the session. Must be called before /robot/save_skill.",
    body: [
      { field: "left_image",  type: "string", note: "Base64-encoded PNG of the left camera frame." },
      { field: "right_image", type: "string", note: "Base64-encoded PNG of the right camera frame." },
      { field: "box",         type: "[x1, y1, x2, y2]", note: "Bounding box in pixel coordinates — top-left to bottom-right." },
    ],
    returns: '{ roi: [x1, y1, x2, y2], info: "demo state ready" }',
  },
  {
    method: "POST",
    path: "/robot/save_skill",
    description:
      "Demo phase — step 2. Attaches a robot trajectory to the demo state captured by /robot/roi and saves the skill. Requires /robot/roi to have been called first in the same session.",
    body: [
      { field: "skill_name",    type: "string",   note: "Name of the skill to save." },
      { field: "trajectories",  type: "array",    note: "Array of waypoints. Each has: arm (\"left\"|\"right\"), TL (4×4 float), TR (4×4 float), gl (float, left gripper 0=closed), gr (float, right gripper)." },
    ],
    returns: '{ info: "\'<skill_name>\' saved." }',
  },
  {
    method: "GET",
    path: "/robot/action_plan",
    description: "Lists all skills saved by the authenticated user.",
    returns: "[{ name: string, created_at: string }]",
  },
  {
    method: "POST",
    path: "/robot/action_plans_stream",
    description:
      "Inference phase. Send a new stereo image pair — the server localises the object and returns the adapted action plan for the requested skill. plan is null or empty if the object was not detected.",
    body: [
      { field: "skill_name",  type: "string", note: "Name of the skill to run." },
      { field: "left_image",  type: "string", note: "Base64-encoded PNG of the left camera frame." },
      { field: "right_image", type: "string", note: "Base64-encoded PNG of the right camera frame." },
    ],
    returns: "{ plan: array | null }",
  },
];

const METHOD_COLOR: Record<string, string> = {
  GET:    "text-green-400  bg-green-400/10  border-green-400/20",
  POST:   "text-violet-400 bg-violet-400/10 border-violet-400/20",
  DELETE: "text-red-400    bg-red-400/10    border-red-400/20",
};

function DocsTab() {
  return (
    <div className="flex flex-col gap-10">
      {/* header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-base font-semibold">API Reference</h2>
          <p className="text-sm text-paper/40 mt-0.5">
            Base URL: <code className="font-mono text-paper/60">http://localhost:8000</code>
            &nbsp;·&nbsp; Auth: <code className="font-mono text-paper/60">Authorization: Bearer lilio_sk_...</code>
          </p>
        </div>
        <a
          href="https://github.com/Lili-0-FR/example_lili-o_think"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-paper/60 hover:border-white/25 hover:text-paper transition shrink-0"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5.85a6.65 6.65 0 0 0-2.102 12.953c.332.06.454-.144.454-.32v-1.123c-1.851.402-2.241-.893-2.241-.893-.303-.77-.739-.975-.739-.975-.604-.413.046-.405.046-.405.668.047 1.02.687 1.02.687.594 1.018 1.558.724 1.938.553.06-.43.232-.724.422-.89-1.478-.168-3.03-.739-3.03-3.288 0-.727.26-1.32.687-1.786-.069-.168-.298-.845.065-1.762 0 0 .56-.18 1.835.684a6.386 6.386 0 0 1 1.667-.224c.566.003 1.136.076 1.668.224 1.273-.864 1.832-.684 1.832-.684.364.917.135 1.594.066 1.762.428.466.686 1.06.686 1.786 0 2.556-1.555 3.118-3.037 3.283.239.206.451.61.451 1.23v1.824c0 .178.12.384.457.319A6.651 6.651 0 0 0 7.5.85z" fill="currentColor" />
          </svg>
          Example on GitHub
        </a>
      </div>

      {/* endpoint cards */}
      <div className="flex flex-col gap-4">
        {ENDPOINTS.map((ep) => (
          <div key={ep.path} className="rounded-xl border border-white/8 overflow-hidden">
            {/* endpoint title row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-white/2">
              <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${METHOD_COLOR[ep.method]}`}>
                {ep.method}
              </span>
              <code className="text-sm font-mono text-paper/80">{ep.path}</code>
            </div>

            {/* description + body + returns */}
            <div className="px-5 py-4 flex flex-col gap-4">
              <p className="text-sm text-paper/50 leading-relaxed">{ep.description}</p>

              {ep.body && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-paper/25 font-medium mb-2">Body</p>
                  <div className="flex flex-col gap-1.5">
                    {ep.body.map((f) => (
                      <div key={f.field} className="flex gap-3 text-sm">
                        <code className="font-mono text-paper/70 shrink-0">{f.field}</code>
                        <span className="text-paper/25 shrink-0">{f.type}</span>
                        <span className="text-paper/40">{f.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {ep.returns && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-paper/25 font-medium mb-2">Returns</p>
                  <code className="text-xs font-mono text-paper/50">{ep.returns}</code>
                </div>
              )}
            </div>
          </div>
        ))}
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
          Robot skills saved via{" "}
          <code className="font-mono text-paper/60">/robot/roi</code> +{" "}
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
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider">Skill name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider hidden sm:table-cell">Created</th>
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

  useEffect(() => { load(jwt); }, [load, jwt]);

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
          <Input type="password" value={reauthPassword} onChange={(e) => setReauthPassword(e.target.value)} placeholder="Password" required autoComplete="current-password" />
          <Btn type="submit" loading={reauthLoading} className="w-fit">Confirm</Btn>
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
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Key name" className="w-36" required />
          <Btn type="submit" loading={creating}>New key</Btn>
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
            <button onClick={copy} className="shrink-0 text-xs text-paper/40 hover:text-paper transition cursor-pointer">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button onClick={() => setCreatedKey(null)} className="text-xs text-paper/25 hover:text-paper/50 transition self-start cursor-pointer">
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
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-paper/35 uppercase tracking-wider hidden sm:table-cell">Created</th>
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
                    <button onClick={() => deleteKey(k.id)} className="text-xs text-red-400/50 hover:text-red-400 transition cursor-pointer">
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
            Deploy Lili-o directly<br />on your hardware.
          </h2>
        </div>
        <p className="text-sm text-paper/50 leading-relaxed max-w-lg">
          The cloud API is great for development and testing. When you need the full
          system running autonomously on your robot — at an exhibition, on a production
          line, or in the field — an on-edge license is what you need.
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
          <span className="text-paper/30">Reach out to get a quote or schedule a technical call.</span>
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
  {
    id: "docs",
    label: "Documentation",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h8A1.5 1.5 0 0 1 13 3.5v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 11.5v-8zM3.5 3a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-8zM5 6.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zM5.5 4a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M3 3.5A.5.5 0 0 1 3.5 3h8a.5.5 0 0 1 0 1h-8A.5.5 0 0 1 3 3.5zm0 3A.5.5 0 0 1 3.5 6h8a.5.5 0 0 1 0 1h-8A.5.5 0 0 1 3 6.5zm0 3A.5.5 0 0 1 3.5 9h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 3 9.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "keys",
    label: "API Keys",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M9 2C6.79 2 5 3.79 5 6c0 .73.21 1.41.57 2L2 11.58V13h1.5l.92-.92V11h1v-1h1l.58-.58C7.41 9.79 8.27 10 9 10c2.21 0 4-1.79 4-4S11.21 2 9 2zm0 6.5c-1.38 0-2.5-1.12-2.5-2.5S7.62 3.5 9 3.5 11.5 4.62 11.5 6 10.38 8.5 9 8.5zm1-3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "license",
    label: "License",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1a6.5 6.5 0 1 0 0 13A6.5 6.5 0 0 0 7.5 1zM0 7.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0zm7.5-3a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708l-2-2A.5.5 0 0 1 7 9.5V5a.5.5 0 0 1 .5-.5z" fill="currentColor" />
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
            <img src={LOGO_SRC} alt="Lili-o" className="h-7 w-auto brightness-0 invert opacity-80" />
          </Link>
          <span className="text-white/15 text-lg font-light select-none">/</span>
          <span className="text-sm font-medium text-paper/50">Dashboard</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-paper/30 hidden sm:block">{email}</span>
          <button onClick={onLogout} className="text-xs text-paper/40 hover:text-paper/80 transition cursor-pointer">
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
          <div className="max-w-3xl mx-auto px-8 py-10">
            {tab === "docs" && <DocsTab />}
            {tab === "skills" && <SkillsTab jwt={jwt} onExpired={onExpired} />}
            {tab === "keys" && (
              <KeysTab jwt={jwt} email={email} onJwtRefresh={onJwtRefresh} />
            )}
            {tab === "license" && <LicenseTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── root ────────────────────────────────────────────────── */

export function DashboardPage() {
  const [phase, setPhase] = useState<Phase>({ id: "auth" });

  useEffect(() => {
    const jwt = localStorage.getItem("lilio_jwt");
    const email = localStorage.getItem("lilio_email");
    if (jwt && email) setPhase({ id: "ready", jwt, email });
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
