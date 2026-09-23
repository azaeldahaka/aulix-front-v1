'use client'

import { AlertTriangle, Check, Clock, DoorOpen, GraduationCap, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CLASES, formatARS, type Clase } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function cupoInfo(c: Clase) {
  const libres = c.cupo - c.inscriptos
  if (libres <= 0) return { libres, tone: 'full' as const, label: 'Sin cupo' }
  if (libres <= 2) return { libres, tone: 'low' as const, label: `Quedan ${libres}` }
  return { libres, tone: 'ok' as const, label: `${libres} lugares` }
}

export function StepClase({ selected, onSelect }: { selected: Clase | null; onSelect: (c: Clase) => void }) {
  return (
    <ul role="listbox" aria-label="Clases disponibles" className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {CLASES.map((c) => {
        const cupo = cupoInfo(c)
        const isSelected = selected?.id === c.id
        const disabled = cupo.tone === 'full'
        const pct = Math.round((c.inscriptos / c.cupo) * 100)

        return (
          <li key={c.id}>
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              disabled={disabled}
              onClick={() => onSelect(c)}
              className={cn(
                'flex h-full w-full flex-col gap-3 rounded-xl border bg-card p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                !disabled && 'hover:border-primary/40 hover:bg-accent/60',
                isSelected && 'border-primary bg-accent ring-2 ring-primary/20',
                disabled && 'cursor-not-allowed opacity-60',
                cupo.tone === 'low' && !isSelected && 'border-warning/50',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{c.materia}</span>
                  <span className="text-base font-semibold leading-tight">{c.tema}</span>
                </div>
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full border',
                    isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-transparent',
                  )}
                  aria-hidden
                >
                  <Check className="size-3.5" />
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="size-3.5" />
                  <dd className="truncate">{c.profesor}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <DoorOpen className="size-3.5" />
                  <dd>Aula {c.aula}</dd>
                </div>
                <div className="col-span-2 flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <dd>
                    {c.dia} · {c.horario}
                  </dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="size-3.5" />
                    Cupo{' '}
                    <span className="font-medium tabular-nums text-foreground">
                      {c.inscriptos}/{c.cupo}
                    </span>
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      cupo.tone === 'ok' && 'border-success/20 bg-success/10 text-success',
                      cupo.tone === 'low' && 'border-warning/20 bg-warning/10 text-warning',
                      cupo.tone === 'full' && 'border-danger/20 bg-danger/10 text-danger',
                    )}
                  >
                    {cupo.tone === 'low' && <AlertTriangle data-icon="inline-start" />}
                    {cupo.label}
                  </Badge>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
                  <div
                    className={cn(
                      'h-full rounded-full',
                      cupo.tone === 'ok' && 'bg-success',
                      cupo.tone === 'low' && 'bg-warning',
                      cupo.tone === 'full' && 'bg-danger',
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-baseline justify-between border-t pt-2">
                  <span className="text-xs text-muted-foreground">Precio por mes</span>
                  <span className="text-lg font-semibold tabular-nums text-brand">{formatARS(c.precio)}</span>
                </div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
