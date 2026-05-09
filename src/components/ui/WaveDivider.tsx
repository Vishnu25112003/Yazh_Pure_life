export function WaveDivider({ flip = false, color = '#f0f8ff' }: { flip?: boolean; color?: string }) {
  return (
    <div className={flip ? 'rotate-180' : ''} aria-hidden="true">
      <svg viewBox="0 0 1440 110" className="block w-full">
        <path fill={color} d="M0,64L80,58.7C160,53,320,43,480,53.3C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L0,120Z" />
      </svg>
    </div>
  )
}
