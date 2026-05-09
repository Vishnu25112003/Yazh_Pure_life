import { useEffect, useState } from 'react'

export function CursorDot() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const move = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY })
    const over = (event: MouseEvent) => setHover(Boolean((event.target as HTMLElement).closest('a, button, input, textarea')))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <span className="cursor-dot pointer-events-none fixed z-[90] rounded-full bg-cyan transition-[width,height] duration-150" style={{ left: pos.x - (hover ? 10 : 6), top: pos.y - (hover ? 10 : 6), width: hover ? 20 : 12, height: hover ? 20 : 12 }} />
      <span className="cursor-ring pointer-events-none fixed z-[89] rounded-full border border-cyan/60 transition-all duration-100" style={{ left: pos.x - (hover ? 25 : 18), top: pos.y - (hover ? 25 : 18), width: hover ? 50 : 36, height: hover ? 50 : 36 }} />
    </>
  )
}
