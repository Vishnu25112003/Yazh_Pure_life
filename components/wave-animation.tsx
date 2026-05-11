"use client";

export function WaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
      {/* Elegant layered waves */}
      <div className="relative h-20 sm:h-24">
        {/* Back wave - slowest, most subtle */}
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave-slow opacity-30"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z"
            fill="oklch(0.35 0.1 230)"
          />
          <path
            d="M1440,60 C1680,90 1920,30 2160,60 C2400,90 2640,30 2880,60 L2880,120 L1440,120 Z"
            fill="oklch(0.35 0.1 230)"
          />
        </svg>

        {/* Middle wave */}
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave-reverse opacity-50"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C180,40 360,100 540,60 C720,20 900,80 1080,50 C1260,20 1440,70 1440,80 L1440,120 L0,120 Z"
            fill="oklch(0.42 0.12 230)"
          />
          <path
            d="M1440,80 C1620,40 1800,100 1980,60 C2160,20 2340,80 2520,50 C2700,20 2880,70 2880,80 L2880,120 L1440,120 Z"
            fill="oklch(0.42 0.12 230)"
          />
        </svg>

        {/* Front wave - fastest, most prominent */}
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave opacity-70"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,90 C160,60 320,100 480,80 C640,60 800,90 960,70 C1120,50 1280,85 1440,90 L1440,120 L0,120 Z"
            fill="oklch(0.48 0.1 220)"
          />
          <path
            d="M1440,90 C1600,60 1760,100 1920,80 C2080,60 2240,90 2400,70 C2560,50 2720,85 2880,90 L2880,120 L1440,120 Z"
            fill="oklch(0.48 0.1 220)"
          />
        </svg>

        {/* Solid bottom fill */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-background" />
      </div>
    </div>
  );
}
