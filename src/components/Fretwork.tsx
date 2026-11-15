export function FretworkDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 28"
      preserveAspectRatio="none"
      className={`fretwork-divider ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 14 Q10 2 20 14 T40 14 T60 14 T80 14 T100 14 T120 14 T140 14 T160 14 T180 14 T200 14 T220 14 T240 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {Array.from({ length: 13 }).map((_, i) => (
        <circle key={i} cx={i * 20} cy={14} r={2.5} fill="currentColor" />
      ))}
    </svg>
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
