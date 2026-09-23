import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type StatusTone = 'success' | 'warning' | 'danger' | 'neutral' | 'info'

const toneClasses: Record<StatusTone, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  neutral: 'bg-muted text-muted-foreground border-border',
  info: 'bg-primary/10 text-primary border-primary/20',
}

const toneByLabel: Record<string, StatusTone> = {
  Activo: 'success',
  Confirmado: 'success',
  Aprobado: 'success',
  Dictada: 'success',
  Pagado: 'success',
  'En curso': 'success',
  Pendiente: 'warning',
  Reservado: 'warning',
  Cancelado: 'danger',
  Cancelada: 'danger',
  Rechazado: 'danger',
  Inactivo: 'neutral',
  Programada: 'info',
  Próxima: 'info',
}

export function StatusBadge({ label, tone, className }: { label: string; tone?: StatusTone; className?: string }) {
  const resolved = tone ?? toneByLabel[label] ?? 'neutral'
  return (
    <Badge variant="outline" className={cn('gap-1.5 font-medium', toneClasses[resolved], className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </Badge>
  )
}
