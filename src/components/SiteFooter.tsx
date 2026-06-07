import Link from "next/link";
const LOGO_SRC = "/logos/logo-primaire.svg";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink text-paper border-t border-white/5">
      <div className="container-x py-20 grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="mb-6">
            <img src={LOGO_SRC} alt="Lili-o" className="h-10 w-auto brightness-0 invert" />
          </div>
          <p className="text-paper/60 max-w-md text-sm leading-relaxed">
            The autonomous Data Foundry for Physical AI.
            <br />
            Built in the EU. AI Act compliant.
          </p>
        </div>
        <div>
          <div className="eyebrow text-paper/40 mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[var(--violet)]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/product" className="hover:text-[var(--violet)]">
                Product
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[var(--violet)]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/recruitment" className="hover:text-[var(--violet)]">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-paper/40 mb-4">Contact</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:hello@lili-o.com" className="hover:text-[var(--violet)]">
                hello@lili-o.com
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--violet)]">
                Book a demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x py-6 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-paper/40">
        <span>© {new Date().getFullYear()} Lili-o. All rights reserved.</span>
        <span>Made for the next era of robotics.</span>
      </div>
    </footer>
  );
}
