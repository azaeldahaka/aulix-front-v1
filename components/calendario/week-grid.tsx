'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DIAS_SEMANA, FECHAS_SEMANA, HORAS, type EventoCalendario } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const HOUR_PX = 56
const START = HORAS[0]
const TODAY_INDEX = 2 // miércoles 23 sep

const formatHora = (h: number) => {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

const estadoClasses: Record<EventoCalendario['estado'], string> = {
  Programada: 'border-primary/30 bg-primary/10 text-brand hover:bg-primary/15',
  Dictada: 'border-success/30 bg-success/10 text-success hover:bg-success/15',
  Cancelada: 'border-border bg-muted text-muted-foreground line-through hover:bg-muted/80',
}

const estadoBar: Record<EventoCalendario['estado'], string> = {
  Programada: 'bg-primary',
  Dictada: 'bg-success',
  Cancelada: 'bg-muted-foreground/40',
}

export function WeekGrid({ eventos, vista }: { eventos: EventoCalendario[]; vista: string }) {
  if (vista === 'mes') return <MonthPreview eventos={eventos} />

  const dias = vista === 'dia' ? [TODAY_INDEX] : DIAS_SEMANA.map((_, i) => i)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        <div
          className="grid border-b bg-muted/30"
          style={{ gridTemplateColumns: `64px repeat(${dias.length}, minmax(0, 1fr))` }}
        >
          <div />
          {dias.map((d) => (
            <div
              key={d}
              className={cn(
                'flex flex-col items-center gap-0.5 border-l py-2.5 text-sm',
                d === TODAY_INDEX && 'bg-accent/70',
              )}
            >
              <span className={cn('font-medium', d === TODAY_INDEX && 'text-primary')}>{DIAS_SEMANA[d]}</span>
              <span className="text-xs text-muted-foreground">{FECHAS_SEMANA[d]}</span>
            </div>
          ))}
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: `64px repeat(${dias.length}, minmax(0, 1fr))` }}
        >
          <div className="relative" style={{ height: HORAS.length * HOUR_PX }}>
            {HORAS.map((h, i) => (
              <span
                key={h}
                className="absolute right-2 -translate-y-1/2 text-xs tabular-nums text-muted-foreground"
                style={{ top: i * HOUR_PX }}
              >
                {i === 0 ? '' : formatHora(h)}
              </span>
            ))}
          </div>

          {dias.map((d) => (
            <div
              key={d}
              className={cn('relative border-l', d === TODAY_INDEX && 'bg-accent/30')}
              style={{
                height: HORAS.length * HOUR_PX,
                backgroundImage: 'linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
                backgroundSize: `100% ${HOUR_PX}px`,
              }}
            >
              {eventos
                .filter((e) => e.dia === d)
                .map((e) => {
                  const top = (e.inicio - START) * HOUR_PX
                  const height = (e.fin - e.inicio) * HOUR_PX
                  return (
                    <Tooltip key={e.id}>
                      <TooltipTrigger
                        render={
                          <button
                            type="button"
                            className={cn(
                              'absolute inset-x-1 flex overflow-hidden rounded-lg border text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                              estadoClasses[e.estado],
                            )}
                            style={{ top: top + 2, height: height - 4 }}
                          />
                        }
                      >
                        <span aria-hidden className={cn('w-1 shrink-0', estadoBar[e.estado])} />
                        <span className="flex min-w-0 flex-col gap-0.5 px-2 py-1.5">
                          <span className="truncate font-semibold">{e.materia}</span>
                          <span className="truncate opacity-80">
                            {formatHora(e.inicio)} – {formatHora(e.fin)} · {e.aula}
                          </span>
                          <span className="truncate opacity-70">{e.profesor}</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex flex-col gap-0.5">
                        <span className="font-semibold">
                          {e.materia} · {e.estado}
                        </span>
                        <span>
                          {e.profesor} · Aula {e.aula}
                        </span>
                        <span>{e.inscriptos} inscriptos</span>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MonthPreview({ eventos }: { eventos: EventoCalendario[] }) {
  // Septiembre 2026, semana lunes–sábado (los domingos no se muestran).
  const first = new Date(2026, 8, 1)
  const offset = (first.getDay() + 6) % 7 // lunes = 0
  const cells: (number | null)[] = Array<null>(offset).fill(null)
  for (let day = 1; day <= 30; day++) {
    if (new Date(2026, 8, day).getDay() !== 0) cells.push(day)
  }
  const weekOfMock = [21, 22, 23, 24, 25, 26]

  return (
    <div className="grid grid-cols-6 border-t">
      {DIAS_SEMANA.map((d) => (
        <div key={d} className="border-b border-l bg-muted/30 py-2 text-center text-xs font-medium text-muted-foreground first:border-l-0">
          {d.slice(0, 3)}
        </div>
      ))}
      {cells.map((day, i) => {
        const dayIdx = weekOfMock.indexOf(day ?? -1)
        const dayEvents = dayIdx >= 0 ? eventos.filter((e) => e.dia === dayIdx) : []
        return (
          <div
            key={i}
            className={cn(
              'flex min-h-24 flex-col gap-1 border-b border-l p-2 text-xs first:border-l-0 [&:nth-child(6n+1)]:border-l-0',
              day === 23 && 'bg-accent/50',
            )}
          >
            {day && (
              <span className={cn('font-medium', day === 23 && 'text-primary')}>{day}</span>
            )}
            {dayEvents.slice(0, 3).map((e) => (
              <span key={e.id} className={cn('truncate rounded px-1.5 py-0.5', estadoClasses[e.estado])}>
                {formatHora(e.inicio)} {e.materia}
              </span>
            ))}
            {dayEvents.length > 3 && (
              <span className="text-muted-foreground">+{dayEvents.length - 3} más</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
