"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const WATER_COLOR = "#3b9bd9";

interface HeroMeetingProps {
  waterColor?: string;
}

export function HeroMeeting({ waterColor = WATER_COLOR }: HeroMeetingProps) {
  const [isFlowing, setIsFlowing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const droplets = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: ((index * 19) % 52) - 26,
        delay: 0.08 + index * 0.035,
        size: 4 + (index % 5) * 2,
        drift: (index % 2 === 0 ? -1 : 1) * (14 + (index % 6) * 5),
      })),
    []
  );

  const css = `
    @keyframes yd3-stream-on {
      0% { transform: scaleY(0) translateX(0); opacity: 0; }
      12% { opacity: 1; }
      62% { transform: scaleY(1) translateX(2px); opacity: 1; }
      100% { transform: scaleY(1) translateX(-1px); opacity: 0.9; }
    }

    @keyframes yd3-stream-off {
      0% { transform: scaleY(1); opacity: 0.88; }
      100% { transform: scaleY(0); opacity: 0; }
    }

    @keyframes yd3-droplet {
      0% { transform: translate(0, 0) scale(0.45); opacity: 0; }
      12% { opacity: 0.95; }
      58% { transform: translate(calc(var(--drift) * 0.45), 35vh) scale(1); opacity: 0.95; }
      88% { transform: translate(var(--drift), 50vh) scale(0.85); opacity: 0.9; }
      100% { transform: translate(var(--drift), 56vh) scale(0.35); opacity: 0; }
    }

    @keyframes yd3-spread-on {
      0%, 45% { transform: translateY(100%) scaleX(0.12); opacity: 0; }
      68% { opacity: 0.72; }
      100% { transform: translateY(0) scaleX(1); opacity: 0.9; }
    }

    @keyframes yd3-spread-off {
      0% { transform: translateY(0) scaleX(1); opacity: 0.9; }
      100% { transform: translateY(78%) scaleX(0.82); opacity: 0; }
    }

    @keyframes yd3-tap-pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 155, 217, 0.35); }
      50% { transform: scale(1.04); box-shadow: 0 0 0 10px rgba(59, 155, 217, 0); }
    }

    .yd3-hero {
      background: linear-gradient(180deg, var(--water-dark) 0%, var(--water-medium) 52%, var(--background) 100%);
    }

    .yd3-layout {
      position: relative;
      z-index: 4;
      min-height: 100vh;
      min-height: 100svh;
      display: grid;
      grid-template-columns: minmax(0, 0.92fr) minmax(20rem, 1.08fr);
      align-items: center;
      gap: clamp(2rem, 5vw, 5rem);
      max-width: 92rem;
      margin: 0 auto;
      padding: 6rem 1rem 3rem;
    }

    .yd3-copy {
      max-width: 38rem;
    }

    .yd3-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.875rem;
      margin-bottom: 1.4rem;
      color: rgba(255,255,255,0.72);
      font-family: "Manrope", system-ui, sans-serif;
      font-size: 0.6875rem;
      font-weight: 600;
      letter-spacing: 0.28em;
      text-transform: uppercase;
    }

    .yd3-eyebrow::before,
    .yd3-eyebrow::after {
      content: "";
      width: 1.75rem;
      height: 1px;
      background: rgba(255,255,255,0.38);
    }

    .yd3-title {
      margin: 0;
      max-width: 12ch;
      color: #fff;
      font-family: "Cormorant Garamond", "Cormorant", serif;
      font-size: clamp(4rem, 8vw, 8.25rem);
      font-weight: 400;
      line-height: 1;
    }

    .yd3-description {
      max-width: 33rem;
      margin: 1.5rem 0 0;
      color: rgba(255,255,255,0.76);
      font-family: "Manrope", system-ui, sans-serif;
      font-size: 0.96rem;
      font-weight: 300;
      line-height: 1.7;
    }

    .yd3-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      margin-top: 2.2rem;
      font-family: "Manrope", system-ui, sans-serif;
    }

    .yd3-primary-link,
    .yd3-secondary-link {
      display: inline-flex;
      min-height: 3.2rem;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      text-decoration: none;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.18em;
    }

    .yd3-primary-link {
      padding: 1rem 1.85rem;
      border-radius: 999px;
      background: #fff;
      color: oklch(0.42 0.12 230);
      box-shadow: 0 18px 45px rgba(14, 27, 39, 0.18);
    }

    .yd3-secondary-link {
      padding: 1rem 0.35rem;
      color: #fff;
    }

    .yd3-visual {
      position: relative;
      min-height: min(70vh, 42rem);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .yd3-machine-wrap {
      position: relative;
      width: min(100%, 29rem);
      aspect-ratio: 0.72;
      filter: drop-shadow(0 34px 55px rgba(12, 29, 47, 0.28));
    }

    .yd3-machine {
      width: 100%;
      height: 100%;
      display: block;
    }

    .yd3-tap-button {
      position: absolute;
      right: 17.5%;
      top: 42%;
      width: 4.2rem;
      height: 4.2rem;
      border: 0;
      border-radius: 999px;
      background: rgba(255,255,255,0.2);
      cursor: pointer;
      animation: yd3-tap-pulse 2.2s ease-in-out infinite;
      transition: background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
    }

    .yd3-tap-button::before {
      content: "";
      position: absolute;
      inset: 0.95rem;
      border-radius: 999px;
      background: linear-gradient(145deg, #fff, #ccefff);
      box-shadow: inset 0 0 0 4px rgba(15, 117, 182, 0.28), 0 5px 12px rgba(4, 33, 58, 0.18);
    }

    .yd3-tap-button::after {
      content: "";
      position: absolute;
      left: 1.48rem;
      top: 1.48rem;
      width: 0.42rem;
      height: 0.42rem;
      border-radius: 999px;
      background: #1f9cdf;
      box-shadow: 0 0 0 4px rgba(31, 156, 223, 0.16);
    }

    .yd3-tap-button:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 4px;
    }

    .yd3-hero.is-flowing .yd3-tap-button {
      animation: none;
      background: rgba(59, 155, 217, 0.36);
      box-shadow: 0 0 0 8px rgba(255,255,255,0.1);
    }

    .yd3-hero.is-flowing .yd3-tap-button::before {
      background: ${waterColor};
      box-shadow: inset 0 0 0 4px rgba(255,255,255,0.38);
    }

    .yd3-hero.is-flowing .yd3-tap-button::after {
      background: #fff;
      box-shadow: 0 0 0 5px rgba(255,255,255,0.18), 0 0 16px rgba(143,227,255,0.8);
    }

    .yd3-water-flow {
      position: absolute;
      right: calc(17.5% + 2.05rem);
      top: calc(42% + 3.2rem);
      height: min(55vh, 24rem);
      width: 3.7rem;
      pointer-events: none;
      transform: translateX(50%);
    }

    .yd3-stream-core,
    .yd3-stream-glow,
    .yd3-stream-side {
      position: absolute;
      left: 50%;
      border-radius: 999px;
      opacity: 0;
      transform: scaleY(0);
      transform-origin: top;
    }

    .yd3-stream-glow {
      top: 0;
      width: 2.25rem;
      height: 100%;
      margin-left: -1.125rem;
      background: linear-gradient(180deg, rgba(255,255,255,0.26), rgba(91,197,247,0.2) 46%, rgba(59,155,217,0.04));
      filter: blur(7px);
    }

    .yd3-stream-core {
      top: 0.15rem;
      width: 0.78rem;
      height: 100%;
      margin-left: -0.39rem;
      background: linear-gradient(180deg, rgba(255,255,255,0.94), #8fe3ff 28%, ${waterColor} 72%, #167fc0);
    }

    .yd3-stream-side {
      width: 0.28rem;
      height: 86%;
      background: linear-gradient(180deg, rgba(255,255,255,0.68), rgba(59,155,217,0.84));
    }

    .yd3-stream-side.is-left {
      margin-left: -0.95rem;
      top: 8%;
    }

    .yd3-stream-side.is-right {
      margin-left: 0.66rem;
      top: 14%;
    }

    .yd3-droplet {
      position: absolute;
      right: calc(17.5% + 1.86rem);
      top: calc(42% + 4rem);
      width: var(--size);
      height: var(--size);
      border-radius: 999px;
      background: radial-gradient(circle at 32% 26%, #fff 0 13%, ${waterColor} 45%, #167fc0 100%);
      opacity: 0;
      filter: drop-shadow(0 8px 12px rgba(15, 90, 142, 0.2));
    }

    .yd3-spread {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      height: 23%;
      opacity: 0;
      transform: translateY(100%) scaleX(0.12);
      transform-origin: center bottom;
      background:
        radial-gradient(ellipse at 78% 5%, rgba(255,255,255,0.34) 0 9%, transparent 38%),
        linear-gradient(180deg, rgba(59,155,217,0.02) 0%, rgba(59,155,217,0.72) 54%, rgba(22,111,176,0.9) 100%);
      clip-path: polygon(0 34%, 8% 25%, 19% 36%, 32% 22%, 45% 33%, 58% 19%, 72% 31%, 84% 23%, 100% 34%, 100% 100%, 0 100%);
      overflow: hidden;
    }

    .yd3-hero.is-flowing .yd3-stream-core,
    .yd3-hero.is-flowing .yd3-stream-glow,
    .yd3-hero.is-flowing .yd3-stream-side {
      animation: yd3-stream-on 0.75s ease-out forwards;
    }

    .yd3-hero.is-flowing .yd3-stream-core {
      animation: yd3-stream-on 0.75s ease-out forwards;
    }

    .yd3-hero.is-flowing .yd3-stream-side.is-left {
      animation-delay: 0.08s;
    }

    .yd3-hero.is-flowing .yd3-stream-side.is-right {
      animation-delay: 0.16s;
    }

    .yd3-hero.has-interacted:not(.is-flowing) .yd3-stream-core,
    .yd3-hero.has-interacted:not(.is-flowing) .yd3-stream-glow,
    .yd3-hero.has-interacted:not(.is-flowing) .yd3-stream-side {
      animation: yd3-stream-off 0.45s ease-in forwards;
    }

    .yd3-hero.is-flowing .yd3-droplet {
      animation: yd3-droplet 2.45s cubic-bezier(.42,.05,.42,1) forwards;
      animation-delay: var(--delay);
    }

    .yd3-hero.is-flowing .yd3-spread {
      animation: yd3-spread-on 1.7s ease-out 2.05s forwards;
    }

    .yd3-hero.has-interacted:not(.is-flowing) .yd3-spread {
      animation: yd3-spread-off 0.8s ease-in forwards;
    }

    @media (max-width: 900px) {
      .yd3-layout {
        grid-template-columns: 1fr;
        gap: 1.6rem;
        padding-top: 5.5rem;
        text-align: center;
      }

      .yd3-copy {
        max-width: 42rem;
        margin: 0 auto;
      }

      .yd3-title,
      .yd3-description {
        margin-left: auto;
        margin-right: auto;
      }

      .yd3-actions {
        justify-content: center;
      }

      .yd3-visual {
        min-height: 26rem;
      }

      .yd3-machine-wrap {
        width: min(78vw, 20rem);
      }
    }

    @media (max-width: 480px) {
      .yd3-layout {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .yd3-eyebrow::before,
      .yd3-eyebrow::after {
        display: none;
      }

      .yd3-title {
        font-size: 3.15rem;
      }

      .yd3-description {
        font-size: 0.875rem;
      }

      .yd3-primary-link,
      .yd3-secondary-link {
        width: 100%;
      }
    }
  `;

  return (
    <section
      className={`home-hero yd3-hero ${isFlowing ? "is-flowing" : ""} ${
        hasInteracted ? "has-interacted" : ""
      }`}
    >
      <style>{css}</style>

      <div className="yd3-spread" />

      <div className="yd3-layout">
        <div className="yd3-copy">
          <div className="yd3-eyebrow">Premium Water Purification</div>
          <h1 className="yd3-title">
            Pure to the
            <br />
            last drop.
          </h1>
          <p className="yd3-description">
            RO water purifiers — sales &amp; service for domestic and commercial
            needs in Chennai, backed by expert installation and trusted aftercare.
          </p>
          <div className="yd3-actions">
            <Link to="/products" className="yd3-primary-link">
              Explore Products
            </Link>
            <Link to="/contact" className="yd3-secondary-link">
              Book a Service →
            </Link>
          </div>
        </div>

        <div className="yd3-visual" aria-label="Interactive water purifier animation">
          <div className="yd3-machine-wrap">
            <svg
              className="yd3-machine"
              viewBox="0 0 420 580"
              role="img"
              aria-label="Water purifier machine"
            >
              <defs>
                <linearGradient id="yd3-body" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#dbeaf3" />
                </linearGradient>
                <linearGradient id="yd3-panel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#17415f" />
                  <stop offset="100%" stopColor="#0d2639" />
                </linearGradient>
                <linearGradient id="yd3-glow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#74d2ff" />
                  <stop offset="100%" stopColor="#1c8bd0" />
                </linearGradient>
              </defs>
              <ellipse cx="210" cy="548" rx="142" ry="20" fill="rgba(8,27,42,0.22)" />
              <rect x="86" y="54" width="248" height="438" rx="44" fill="url(#yd3-body)" />
              <rect x="108" y="82" width="204" height="382" rx="34" fill="#f8fbfd" />
              <path
                d="M 126 136 C 150 104, 270 104, 294 136 L 294 302 C 260 336, 160 336, 126 302 Z"
                fill="url(#yd3-panel)"
              />
              <path
                d="M 146 158 C 172 139, 248 139, 274 158 L 274 266 C 244 289, 176 289, 146 266 Z"
                fill="url(#yd3-glow)"
                opacity="0.9"
              />
              <path
                d="M 162 194 C 181 176, 239 176, 258 194 C 260 230, 239 256, 210 256 C 181 256, 160 230, 162 194 Z"
                fill="rgba(255,255,255,0.35)"
              />
              <rect x="144" y="350" width="132" height="22" rx="11" fill="#d8e7ef" />
              <rect x="156" y="388" width="108" height="18" rx="9" fill="#e5f0f5" />
              <path
                d="M 292 250 L 352 250 C 370 250, 380 260, 380 276 C 380 292, 368 302, 352 302 L 332 302 L 332 325"
                fill="none"
                stroke="#d6e6ee"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 292 250 L 352 250 C 370 250, 380 260, 380 276 C 380 292, 368 302, 352 302 L 332 302 L 332 325"
                fill="none"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
              <circle cx="332" cy="328" r="16" fill="#0f75b6" />
              <circle cx="332" cy="328" r="7" fill="#8fe3ff" />
              <rect x="122" y="482" width="176" height="28" rx="14" fill="#dceaf2" />
            </svg>

            <button
              type="button"
              className="yd3-tap-button"
              aria-label={isFlowing ? "Stop water flow" : "Start water flow"}
              aria-pressed={isFlowing}
              onClick={() => {
                setHasInteracted(true);
                setIsFlowing((current) => !current);
              }}
            />

            <div className="yd3-water-flow" aria-hidden="true">
              <span className="yd3-stream-glow" />
              <span className="yd3-stream-side is-left" />
              <span className="yd3-stream-core" />
              <span className="yd3-stream-side is-right" />
            </div>
            {droplets.map((droplet) => (
              <span
                key={droplet.id}
                className="yd3-droplet"
                style={
                  {
                    "--delay": `${droplet.delay}s`,
                    "--size": `${droplet.size}px`,
                    "--drift": `${droplet.drift}px`,
                    marginRight: `${droplet.left}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
