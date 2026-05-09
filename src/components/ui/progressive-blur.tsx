import { cn } from '@/utils/cn'

type ProgressiveBlurProps = {
  blurIntensity?: number
  className?: string
  direction?: 'left' | 'right'
}

export function ProgressiveBlur({ blurIntensity = 1, className, direction = 'left' }: ProgressiveBlurProps) {
  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        backdropFilter: `blur(${blurIntensity * 8}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity * 8}px)`,
        maskImage: direction === 'left'
          ? 'linear-gradient(to right, black, transparent)'
          : 'linear-gradient(to left, black, transparent)',
        WebkitMaskImage: direction === 'left'
          ? 'linear-gradient(to right, black, transparent)'
          : 'linear-gradient(to left, black, transparent)',
      }}
    />
  )
}
