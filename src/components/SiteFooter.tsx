import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logos/Logo Primaire.svg";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink text-paper border-t border-white/5">
      <div className="container-x py-20 grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="mb-6">
            <img src={logoImg} alt="Lili-o" className="h-10 w-auto brightness-0 invert" />
          </div>
          <p className="text-paper/60 max-w-md text-sm leading-relaxed">
            The autonomous Data Foundry for Physical AI. Built in the EU. AI Act compliant.
          </p>
        </div>
        <div>
          <div className="eyebrow text-paper/40 mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[var(--violet)]">Home</Link></li>
            <li><Link to="/product" className="hover:text-[var(--violet)]">Product</Link></li>
            <li><Link to="/blog" className="hover:text-[var(--violet)]">Blog</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-paper/40 mb-4">Contact</div>
          <a href="mailto:hello@lili-o.com" className="text-sm hover:text-[var(--violet)] block">hello@lili-o.com</a>
          <a href="mailto:hello@lili-o.com" className="mt-6 inline-flex rounded-lg bg-[var(--violet)] text-white px-4 py-2 text-sm font-medium hover:bg-[var(--violet-dark)] transition">
            Request access
          </a>
        </div>
      </div>
      <div className="container-x py-6 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-paper/40">
        <span>© {new Date().getFullYear()} Lili-o. All rights reserved.</span>
        <span>Made for the next era of robotics.</span>
      </div>
    </footer>
  );
}
