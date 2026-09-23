import { cn } from '@/lib/utils'

type AulixLogoProps = {
  size?: 'sm' | 'lg'
  tone?: 'light' | 'dark'
  className?: string
}

export function AulixLogo({ size = 'sm', tone = 'dark', className }: AulixLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className={cn(
          'flex shrink-0 items-center justify-center rounded-lg bg-brand text-gold-bright font-brand font-bold leading-none ring-1 ring-gold-dark/40',
          size === 'sm' ? 'size-8 text-base' : 'size-14 text-3xl rounded-xl',
        )}
      >
        A
      </span>
      <span
        className={cn(
          'font-brand font-bold tracking-wide',
          size === 'sm' ? 'text-lg' : 'text-4xl',
          tone === 'light' ? 'text-gold' : 'text-brand',
        )}
      >
        Aulix
      </span>
    </div>
  )
}
