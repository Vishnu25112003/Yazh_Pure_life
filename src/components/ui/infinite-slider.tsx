import type { ReactNode } from 'react'

type InfiniteSliderProps = {
  children: ReactNode
  gap?: number
  speed?: number
  speedOnHover?: number
  reverse?: boolean
  className?: string
}

export function InfiniteSlider({
  children,
  gap = 42,
  speed = 60,
  speedOnHover = 20,
  reverse = false,
  className = '',
}: InfiniteSliderProps) {
  const duration = `${speed}s`
  const hoverDuration = `${speedOnHover}s`

  return (
    <div
      className={`group/infinite-slider overflow-hidden ${className}`}
      style={{
        ['--slider-gap' as string]: `${gap}px`,
        ['--slider-duration' as string]: duration,
        ['--slider-hover-duration' as string]: hoverDuration,
      }}
    >
      <div className={`flex w-max gap-[var(--slider-gap)] ${reverse ? 'animate-logo-marquee-reverse' : 'animate-logo-marquee'} group-hover/infinite-slider:[animation-duration:var(--slider-hover-duration)]`}>
        <div className="flex shrink-0 items-center gap-[var(--slider-gap)]">{children}</div>
        <div className="flex shrink-0 items-center gap-[var(--slider-gap)]" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
