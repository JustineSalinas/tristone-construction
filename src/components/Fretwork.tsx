export function FretworkDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`fretwork-divider flex items-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current opacity-30" />
      <DiamondBullet className="shrink-0" />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}

export function DiamondBullet({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`inline-block h-2.5 w-2.5 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
    </svg>
  );
}
