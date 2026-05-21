export function Pyramid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#A640E3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5E1AB2" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polygon points="100,15 185,175 15,175" fill="url(#pg)" />
      <polygon points="100,15 100,175 15,175" fill="#1E1E1E" fillOpacity="0.35" />
    </svg>
  );
}
