import { useMemo } from "react";

type PetalProps = { count?: number };

const COLORS = [
  "var(--pink)",
  "var(--lav)",
  "var(--pink-deep)",
  "var(--lav-deep)",
];

export function Petals({ count = 18 }: PetalProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const rnd = (n: number) => ((seed * (n + 7)) % 1000) / 1000;
        const size = 8 + rnd(1) * 10;
        return {
          id: i,
          size,
          left: rnd(2) * 90,
          bottom: 20 + rnd(3) * 40,
          duration: 10 + rnd(4) * 10,
          delay: rnd(5) * 10,
          color: COLORS[i % COLORS.length],
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute animate-drift opacity-80"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "60% 40% 60% 40%",
            background: p.color,
            insetInlineStart: `${p.left}%`,
            bottom: `-${p.bottom}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function FlowerDeco({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className ?? ""}`}
      style={style}
    >
      <ellipse cx="50" cy="30" rx="14" ry="24" fill="var(--pink)" />
      <ellipse cx="50" cy="30" rx="14" ry="24" fill="var(--lav)" transform="rotate(72 50 50)" />
      <ellipse cx="50" cy="30" rx="14" ry="24" fill="var(--pink-deep)" transform="rotate(144 50 50)" />
      <ellipse cx="50" cy="30" rx="14" ry="24" fill="var(--lav)" transform="rotate(216 50 50)" />
      <ellipse cx="50" cy="30" rx="14" ry="24" fill="var(--pink-deep)" transform="rotate(288 50 50)" />
      <circle cx="50" cy="50" r="9" fill="var(--neon)" />
    </svg>
  );
}

/** Tabebuia rosea (pink trumpet tree) — soft warm background silhouette. */
export function TabebuiaTree({
  className,
  style,
  flip = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}) {
  const blooms = [
    { cx: 100, cy: 60, r: 46 },
    { cx: 58, cy: 88, r: 34 },
    { cx: 145, cy: 86, r: 36 },
    { cx: 78, cy: 46, r: 26 },
    { cx: 128, cy: 44, r: 24 },
    { cx: 100, cy: 104, r: 30 },
    { cx: 40, cy: 60, r: 20 },
    { cx: 162, cy: 58, r: 18 },
  ];

  return (
    <svg
      viewBox="0 0 200 260"
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className ?? ""}`}
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g className="animate-sway" style={{ transformOrigin: "100px 240px" }}>
        <path
          d="M96 260 L96 150 C96 132 78 124 62 112 M104 260 L104 140 C104 120 124 112 140 98 M100 176 C100 164 88 156 74 148"
          stroke="#FFD1DC"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={0.6}
          fill="none"
        />
        {blooms.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill={i % 2 ? "var(--pink)" : "var(--pink-deep)"}
            opacity={0.55}
          />
        ))}
        {blooms.slice(0, 5).map((b, i) => (
          <circle
            key={`h${i}`}
            cx={b.cx - 8}
            cy={b.cy - 8}
            r={b.r * 0.5}
            fill="var(--pink-soft)"
            opacity={0.7}
          />
        ))}
      </g>
    </svg>
  );
}

