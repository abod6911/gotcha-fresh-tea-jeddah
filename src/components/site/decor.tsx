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

/** Tabebuia rosea (pink trumpet tree) — vibrant sakura bloom illustration. */
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
    { cx: 100, cy: 60, r: 48, color: "#E86A92" },
    { cx: 58, cy: 88, r: 36, color: "#D81B60" },
    { cx: 145, cy: 86, r: 38, color: "#F48FB1" },
    { cx: 78, cy: 46, r: 28, color: "#EC407A" },
    { cx: 128, cy: 44, r: 26, color: "#F06292" },
    { cx: 100, cy: 104, r: 32, color: "#C2185B" },
    { cx: 40, cy: 60, r: 22, color: "#FF80AB" },
    { cx: 162, cy: 58, r: 20, color: "#FF4081" },
  ];

  return (
    <svg
      viewBox="0 0 200 260"
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className ?? ""}`}
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g className="animate-sway" style={{ transformOrigin: "100px 240px" }}>
        {/* Tree Trunk & Branches */}
        <path
          d="M96 260 L96 150 C96 132 78 124 62 112 M104 260 L104 140 C104 120 124 112 140 98 M100 176 C100 164 88 156 74 148"
          stroke="#8D435E"
          strokeWidth="7"
          strokeLinecap="round"
          opacity={0.9}
          fill="none"
        />
        <path
          d="M97 260 L97 150 C97 132 79 124 63 112 M103 260 L103 140 C103 120 123 112 139 98"
          stroke="#C86D8B"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.95}
          fill="none"
        />

        {/* Blossom Clusters */}
        {blooms.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill={b.color}
            opacity={0.85}
          />
        ))}
        {blooms.map((b, i) => (
          <circle
            key={`h${i}`}
            cx={b.cx - 6}
            cy={b.cy - 6}
            r={b.r * 0.45}
            fill="#FFF0F5"
            opacity={0.7}
          />
        ))}
      </g>
    </svg>
  );
}

