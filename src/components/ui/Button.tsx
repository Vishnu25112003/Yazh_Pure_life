import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import type { ButtonSize, ButtonVariant } from '@/types'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-cyan text-navy font-semibold hover:bg-white hover:shadow-blue-glow',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#128C7E]',
  download: 'border-2 border-bright text-bright hover:bg-bright hover:text-white',
  outline: 'border-2 border-cyan text-cyan hover:bg-cyan hover:text-navy',
  ghost: 'text-sky hover:text-cyan underline-offset-4 hover:underline',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}

export function Button({ children, variant = 'primary', size = 'md', href, className, ...props }: ButtonProps) {
  const classNames = cn('inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300', variants[variant], sizes[size], className)
  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}
