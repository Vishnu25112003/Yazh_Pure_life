"use client";

import { useMemo } from "react";
import { Link } from "react-router-dom";

const WATER_COLOR = "#3b9bd9";
const BG_COLOR = "#f4f8fc";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shade(hex: string, pct: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const k = pct / 100;
  const adj = (v: number) => Math.max(0, Math.min(255, Math.round(v + 255 * k)));
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(adj(r))}${toHex(adj(g))}${toHex(adj(b))}`;
}

function GooDefs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation={9} result="b" />
        <feColorMatrix
          in="b"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
          result="g"
        />
        <feComposite in="SourceGraphic" in2="g" operator="atop" />
      </filter>
      <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity={0.85} />
        <stop offset="100%" stopColor={color} stopOpacity={1} />
      </linearGradient>
      <radialGradient id={`${id}-drop`} cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.7} />
        <stop offset="35%" stopColor={color} stopOpacity={0.95} />
        <stop offset="100%" stopColor={color} stopOpacity={1} />
      </radialGradient>
    </defs>
  );
}

interface HeroMeetingProps {
  speed?: number;
  dropCount?: number;
  waterColor?: string;
  bgColor?: string;
}

export function HeroMeeting({
  speed = 1.18,
  dropCount = 52,
  waterColor = WATER_COLOR,
  bgColor = BG_COLOR,
}: HeroMeetingProps) {
  const W = 1440;
  const H = 900;
  const cx = W / 2;
  const cy = H * 0.46;
  const cycle = 7 / Math.max(0.01, speed);
  const rand = useMemo(() => mulberry32(7), []);

  const drops = useMemo(
    () =>
      Array.from({ length: dropCount }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const spread = side * (80 + rand() * 540) + (rand() - 0.5) * 160;
        const ex = Math.max(70, Math.min(W - 70, cx + spread));
        const ey = H - 64 - rand() * 86;
        const arcY = -180 - rand() * 190;
        const driftY = -24 + rand() * 70;
        const size = 4 + rand() * 10;
        const delay = rand() * 0.45;
        return { i, ex, ey, arcY, driftY, size, delay };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dropCount, cx, H]
  );

  const tail = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        i,
        off: i * 38,
        size: 6 + rand() * 8,
        drift: (rand() - 0.5) * 12,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const css = `
    @keyframes ymA-l {
      0%   { transform: translateX(-700px) scaleX(1.2); opacity: 0; }
      8%   { opacity: 1; }
      28%  { transform: translateX(0) scaleX(1); }
      32%  { transform: translateX(0) scaleX(0.55) scaleY(1.15); opacity: 1; }
      40%  { transform: translateX(40px) scaleX(0.2) scaleY(0.6); opacity: 0; }
      100% { transform: translateX(-700px); opacity: 0; }
    }
    @keyframes ymA-r {
      0%   { transform: translateX(700px) scaleX(1.2); opacity: 0; }
      8%   { opacity: 1; }
      28%  { transform: translateX(0) scaleX(1); }
      32%  { transform: translateX(0) scaleX(0.55) scaleY(1.15); opacity: 1; }
      40%  { transform: translateX(-40px) scaleX(0.2) scaleY(0.6); opacity: 0; }
      100% { transform: translateX(700px); opacity: 0; }
    }
    @keyframes ymA-burst {
      0%, 28%   { transform: scale(0); opacity: 0; }
      32%       { transform: scale(1.1); opacity: 1; }
      46%       { transform: scale(1.75); opacity: 0; }
      100%      { transform: scale(1.75); opacity: 0; }
    }
    @keyframes ymA-drop {
      0%, 30%  { transform: translate(0,0) scale(0.6); opacity: 0; }
      34%      { opacity: 1; transform: translate(calc(var(--ex)*0.18), calc(var(--arc)*1)) scale(1); }
      52%      { transform: translate(calc(var(--ex)*0.72), calc(var(--drift-y)*1)) scale(0.95); opacity: 1; }
      76%      { transform: translate(var(--ex), var(--ey)) scale(0.86); opacity: 1; }
      82%      { transform: translate(var(--ex), var(--ey)) scale(0.32); opacity: 0; }
      100%     { transform: translate(var(--ex), var(--ey)) scale(0); opacity: 0; }
    }
    @keyframes ymA-drop-splash {
      0%, 72%  { transform: scaleX(0.2); opacity: 0; }
      78%      { transform: scaleX(1); opacity: 0.48; }
      90%      { transform: scaleX(1.75); opacity: 0; }
      100%     { transform: scaleX(1.75); opacity: 0; }
    }
    @keyframes ymA-pool {
      0%, 54%  { transform: scaleX(0.05); opacity: 0; }
      68%      { transform: scaleX(0.74); opacity: 0.58; }
      82%      { transform: scaleX(1); opacity: 0.86; }
      92%      { transform: scaleX(1); opacity: 0.82; }
      100%     { transform: scaleX(1); opacity: 0; }
    }
    @keyframes ymA-ripple {
      0%, 66%  { transform: scale(0.3); opacity: 0; }
      76%      { opacity: 0.65; }
      96%      { transform: scale(2.1); opacity: 0; }
      100%     { transform: scale(2.1); opacity: 0; }
    }
    .ymA-l     { animation: ymA-l     ${cycle}s cubic-bezier(.55,.06,.32,1) infinite; transform-origin: ${cx}px ${cy}px; }
    .ymA-r     { animation: ymA-r     ${cycle}s cubic-bezier(.55,.06,.32,1) infinite; transform-origin: ${cx}px ${cy}px; }
    .ymA-burst { animation: ymA-burst ${cycle}s ease-out infinite; transform-origin: ${cx}px ${cy}px; transform-box: fill-box; }
    .ymA-drop  { animation: ymA-drop  ${cycle}s cubic-bezier(.45,.05,.55,.95) infinite; transform-origin: ${cx}px ${cy}px; }
    .ymA-drop-splash { animation: ymA-drop-splash ${cycle}s ease-out infinite; transform-origin: center; transform-box: fill-box; }
    .ymA-pool  { animation: ymA-pool  ${cycle}s ease-in-out infinite; transform-origin: ${cx}px ${H - 50}px; }
    .ymA-ripple{ animation: ymA-ripple ${cycle}s ease-out infinite; transform-origin: center; transform-box: fill-box; }
  `;

  return (
    <section
      className="home-hero"
      style={{
        background:
          "linear-gradient(180deg, var(--water-dark) 0%, var(--water-medium) 52%, var(--background) 100%)",
      }}
    >
      <style>{css}</style>

      {/* SVG canvas — full section width, maintains 1440×900 aspect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <GooDefs id="ymA-goo" color={waterColor} />
          <defs>
            <linearGradient id="ymA-bg-wash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="46%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ymA-bottom-wash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
            </linearGradient>
            <pattern id="ymA-water-lines" width="180" height="110" patternUnits="userSpaceOnUse">
              <path
                d="M -20 55 C 25 35, 65 35, 110 55 S 195 75, 225 55"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.08"
              />
            </pattern>
          </defs>

          <rect width={W} height={H} fill="url(#ymA-bg-wash)" />
          <rect width={W} height={H} fill="url(#ymA-water-lines)" opacity="0.7" />
          <path
            d={`M 0 ${H * 0.78} C ${W * 0.18} ${H * 0.7}, ${W * 0.32} ${
              H * 0.86
            }, ${W * 0.5} ${H * 0.78} S ${W * 0.82} ${H * 0.7}, ${W} ${
              H * 0.78
            } L ${W} ${H} L 0 ${H} Z`}
            fill="url(#ymA-bottom-wash)"
          />
          <path
            d={`M 0 ${H * 0.18} C ${W * 0.2} ${H * 0.11}, ${W * 0.34} ${
              H * 0.25
            }, ${W * 0.52} ${H * 0.18} S ${W * 0.82} ${H * 0.11}, ${W} ${
              H * 0.2
            }`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.25"
            strokeOpacity="0.12"
          />
          <path
            d={`M 0 ${H * 0.66} C ${W * 0.16} ${H * 0.6}, ${W * 0.34} ${
              H * 0.74
            }, ${W * 0.5} ${H * 0.66} S ${W * 0.84} ${H * 0.58}, ${W} ${
              H * 0.66
            }`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeOpacity="0.14"
          />

          {/* Settled pool */}
          <g className="ymA-pool" style={{ filter: "url(#ymA-goo)" }}>
            <path
              d={`M 0 ${H - 70} Q ${W * 0.15} ${H - 90}, ${W * 0.3} ${H - 70} T ${W * 0.6} ${H - 70} T ${W * 0.9} ${H - 70} T ${W} ${H - 70} L ${W} ${H} L 0 ${H} Z`}
              fill={`url(#ymA-goo-grad)`}
              opacity={0.92}
            />
          </g>

          {/* Pool ripples */}
          {[0, 0.18, 0.36].map((d, i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={H - 70}
              rx={130 + i * 38}
              ry={7 + i * 1.5}
              fill="none"
              stroke={waterColor}
              strokeWidth="1.2"
              opacity={0.5}
              className="ymA-ripple"
              style={{ animationDelay: `${d * cycle}s` }}
            />
          ))}

          {/* Streams + burst + droplets — goo group */}
          <g style={{ filter: "url(#ymA-goo)" }}>
            {/* Left stream */}
            <g className="ymA-l">
              <ellipse cx={cx - 220} cy={cy} rx="180" ry="34" fill={`url(#ymA-goo-grad)`} />
              {tail.map((t) => (
                <circle
                  key={`tl${t.i}`}
                  cx={cx - 220 - 200 - t.off}
                  cy={cy + t.drift}
                  r={t.size}
                  fill={waterColor}
                />
              ))}
              <ellipse cx={cx - 80} cy={cy} rx="50" ry="22" fill={waterColor} />
            </g>

            {/* Right stream */}
            <g className="ymA-r">
              <ellipse cx={cx + 220} cy={cy} rx="180" ry="34" fill={`url(#ymA-goo-grad)`} />
              {tail.map((t) => (
                <circle
                  key={`tr${t.i}`}
                  cx={cx + 220 + 200 + t.off}
                  cy={cy - t.drift}
                  r={t.size}
                  fill={waterColor}
                />
              ))}
              <ellipse cx={cx + 80} cy={cy} rx="50" ry="22" fill={waterColor} />
            </g>

            {/* Burst at impact */}
            <circle className="ymA-burst" cx={cx} cy={cy} r="60" fill={waterColor} />

            {/* Droplets */}
            {drops.map((d) => (
              <circle
                key={d.i}
                cx={cx}
                cy={cy}
                r={d.size}
                fill="url(#ymA-goo-drop)"
                className="ymA-drop"
                style={
                  {
                    "--ex": `${d.ex - cx}px`,
                    "--ey": `${d.ey - cy}px`,
                    "--arc": `${d.arcY}px`,
                    "--drift-y": `${d.driftY}px`,
                    animationDelay: `${d.delay}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </g>

          {/* Small bottom splashes when droplets reach the lower screen. */}
          <g>
            {drops.map((d) => (
              <ellipse
                key={`splash-${d.i}`}
                cx={d.ex}
                cy={d.ey + d.size * 0.6}
                rx={d.size * 2.4}
                ry={Math.max(1.4, d.size * 0.32)}
                fill="none"
                stroke={waterColor}
                strokeWidth="1.4"
                opacity={0.38}
                className="ymA-drop-splash"
                style={{ animationDelay: `${d.delay}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Hero content overlay */}
      <div
        className="home-hero__content"
        style={{
          pointerEvents: "none",
        }}
      >
        {/* Eyebrow */}
        <div
          className="home-hero__eyebrow"
          style={{
            fontFamily: '"Manrope", system-ui, sans-serif',
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 28,
              height: 1,
              background: "rgba(255,255,255,0.38)",
              verticalAlign: "middle",
            }}
          />
          Premium Water Purification
          <span
            style={{
              display: "inline-block",
              width: 28,
              height: 1,
              background: "rgba(255,255,255,0.38)",
              verticalAlign: "middle",
            }}
          />
        </div>

        {/* Heading */}
        <h1
          className="home-hero__title"
          style={{
            margin: 0,
            fontFamily: '"Cormorant Garamond", "Cormorant", serif',
            fontWeight: 400,
            lineHeight: 1,
            color: "#ffffff",
          }}
        >
          Pure to the<br />last drop.
        </h1>

        {/* Subheading */}
        <p
          className="home-hero__copy"
          style={{
            fontFamily: '"Manrope", system-ui, sans-serif',
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.74)",
            fontWeight: 300,
          }}
        >
          RO water purifiers — sales &amp; service for domestic and commercial
          needs in Chennai, backed by expert installation and trusted aftercare.
        </p>

        {/* CTA buttons */}
        <div
          className="home-hero__actions"
          style={{
            display: "flex",
            alignItems: "center",
            pointerEvents: "auto",
            fontFamily: '"Manrope", system-ui, sans-serif',
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/products"
            className="home-hero__primary-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#ffffff",
              color: "oklch(0.42 0.12 230)",
              borderRadius: 999,
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Explore Products
          </Link>
          <Link
            to="/contact"
            className="home-hero__secondary-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "transparent",
              color: "#ffffff",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Book a Service →
          </Link>
        </div>
      </div>
    </section>
  );
}
