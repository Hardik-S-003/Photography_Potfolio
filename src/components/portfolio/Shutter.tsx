import type { KeyboardEvent } from "react";

export type Page = "home" | "gallery" | "about" | "contact";

const LABELS = [
  { id: "gallery", label: "GALLERY", mid: -90 },
  { id: "about", label: "ABOUT", mid: 30 },
  { id: "contact", label: "CONTACT", mid: 150 },
] as const;

const R_HOUSE = 222;
const R_RING_OUT = 204;
const R_RING_IN = 166;
const R_APERTURE = 162;

/** Blade pivot in blade-local space. Rotating the blade around it sweeps the inner edge across the optical axis. */
export const BLADE_PIVOT = [-170, -75] as const;
/** Blade rotation (deg) at which the iris is nearly closed. */
export const BLADE_CLOSED = 21;

const r2 = (n: number) => Math.round(n * 100) / 100;
const pt = (r: number, a: number) => {
  const t = (a * Math.PI) / 180;
  return [r2(r * Math.cos(t)), r2(r * Math.sin(t))] as const;
};

function band(a0: number, a1: number) {
  const [x0, y0] = pt(R_RING_OUT, a0);
  const [x1, y1] = pt(R_RING_OUT, a1);
  const [x2, y2] = pt(R_RING_IN, a1);
  const [x3, y3] = pt(R_RING_IN, a0);
  return `M${x0} ${y0} A${R_RING_OUT} ${R_RING_OUT} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R_RING_IN} ${R_RING_IN} 0 0 0 ${x3} ${y3}Z`;
}

function labelArc(r: number, a0: number, a1: number, flip: boolean) {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  return flip ? `M${x1} ${y1} A${r} ${r} 0 0 0 ${x0} ${y0}` : `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`;
}

// curved iris blade: concave inner cutting edge, body extends beyond the aperture clip
const [PX, PY] = BLADE_PIVOT;
const BLADE = `M${PX - 40} ${PY + 4} C -60 ${PY + 20}, 90 ${PY + 18}, 260 ${PY - 30} L 250 -300 L ${PX - 120} -300 Z`;
const BLADE_EDGE = `M${PX - 40} ${PY + 4} C -60 ${PY + 20}, 90 ${PY + 18}, 260 ${PY - 30}`;

const activate = (fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

export function Shutter({ active, onSelect }: { active: Page; onSelect: (p: Page) => void }) {
  const activeMid = LABELS.find((l) => l.id === active)?.mid;
  return (
    <svg viewBox="-235 -235 470 470" className="shutter-svg block h-full w-full overflow-visible" role="navigation" aria-label="Main navigation">
      <defs>
        <radialGradient id="housing" cx="40%" cy="30%" r="80%">
          <stop offset="0%" style={{ stopColor: "var(--metal-hi)" }} />
          <stop offset="100%" style={{ stopColor: "var(--lens)" }} />
        </radialGradient>
        <linearGradient id="blade" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--metal-lo)" }} />
          <stop offset="70%" style={{ stopColor: "var(--metal-hi)" }} />
          <stop offset="100%" style={{ stopColor: "var(--metal-active-lo)" }} />
        </linearGradient>
        <radialGradient id="glass" cx="38%" cy="32%" r="75%">
          <stop offset="0%" style={{ stopColor: "var(--metal-hi)" }} />
          <stop offset="55%" style={{ stopColor: "var(--lens)" }} />
          <stop offset="100%" style={{ stopColor: "var(--lens)" }} />
        </radialGradient>
        <filter id="blade-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.7" />
        </filter>
        <clipPath id="aperture-clip">
          <circle r={R_APERTURE} />
        </clipPath>
      </defs>

      {/* housing */}
      <circle r={R_HOUSE} pointerEvents="none" fill="url(#housing)" style={{ stroke: "var(--metal-line)" }} strokeWidth={1} />
      <circle r={R_HOUSE + 8} fill="none" style={{ stroke: "var(--metal-line)" }} strokeWidth={0.5} strokeDasharray="1 5" />
      {/* lens ring */}
      <circle r={R_RING_OUT} fill="none" style={{ stroke: "var(--metal-edge)" }} strokeWidth={0.75} />
      <circle r={R_RING_IN} fill="none" style={{ stroke: "var(--metal-edge)" }} strokeWidth={0.75} />
      {Array.from({ length: 90 }, (_, i) => {
        const a = i * 4;
        const long = i % 5 === 0;
        const [x0, y0] = pt(R_RING_OUT - 1, a);
        const [x1, y1] = pt(R_RING_OUT - (long ? 7 : 4), a);
        return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} style={{ stroke: "var(--metal-line)" }} strokeWidth={0.75} />;
      })}

      {/* aperture mechanism */}
      <g clipPath="url(#aperture-clip)" pointerEvents="none">
        <circle r={R_APERTURE} fill="url(#glass)" />
        <g className="iris-rot">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`rotate(${i * 120})`}>
              <g className="blade" transform={`rotate(0 ${PX} ${PY})`} filter="url(#blade-shadow)">
                <path d={BLADE} fill="url(#blade)" style={{ stroke: "var(--metal-edge)" }} strokeWidth={0.75} />
                <path d={BLADE_EDGE} fill="none" style={{ stroke: "var(--metal-active-hi)" }} strokeWidth={1.2} opacity={0.6} />
                <circle cx={PX} cy={PY - 40} r={3} style={{ fill: "var(--lens)", stroke: "var(--metal-edge)" }} strokeWidth={0.5} />
              </g>
            </g>
          ))}
        </g>
      </g>
      <circle r={R_APERTURE} fill="none" style={{ stroke: "var(--lens)" }} strokeWidth={4} />

      {/* aperture index mark */}
      <g
        className="index-mark"
        style={{
          transform: `rotate(${(activeMid ?? -90) + 90}deg)`,
          opacity: activeMid === undefined ? 0 : 1,
          transition: "transform 1s cubic-bezier(.65,0,.35,1), opacity .5s",
        }}
      >
        <path d={`M0 ${-R_HOUSE + 2} l-4 -7 h8z`} style={{ fill: "var(--foreground)" }} />
      </g>

      {/* engraved labels on the lens ring */}
      {LABELS.map((s) => {
        const a0 = s.mid - 55;
        const a1 = s.mid + 55;
        const isActive = active === s.id;
        const flip = s.mid > 0 && s.mid < 180;
        const select = () => onSelect(s.id);
        return (
          <g
            key={s.id}
            className="shutter-seg cursor-pointer"
            data-id={s.id}
            role="button"
            tabIndex={0}
            aria-label={s.label}
            aria-current={isActive ? "page" : undefined}
            onClick={select}
            onKeyDown={activate(select)}
          >
            <path className="seg-face ring-hit" d={band(a0, a1)} />
            <path id={`arc-${s.id}`} d={labelArc(flip ? 189 : 181, a0, a1, flip)} fill="none" />
            <text fontSize={12} letterSpacing={6} fontFamily="var(--font-sans)" style={{ fill: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}>
              <textPath href={`#arc-${s.id}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                {s.label}
              </textPath>
            </text>
          </g>
        );
      })}

      {/* HOME — optical centre */}
      <g
        className="shutter-seg home-btn cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="HOME"
        aria-current={active === "home" ? "page" : undefined}
        onClick={() => onSelect("home")}
        onKeyDown={activate(() => onSelect("home"))}
      >
        <circle className="seg-face home-glass" r={52} />
        <circle r={44} fill="none" style={{ stroke: "var(--metal-line)" }} strokeWidth={0.5} />
        <text
          className="home-label"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          letterSpacing={5}
          fontFamily="var(--font-sans)"
          style={{ fill: active === "home" ? "var(--foreground)" : "var(--subtle)" }}
          dx={2.5}
        >
          HOME
        </text>
      </g>
    </svg>
  );
}
