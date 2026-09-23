'use client'

import { CalendarDays, Clock, DoorOpen, GraduationCap, UserCheck, Users } from 'lucide-react'
import { useState } from 'react'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import type { ClaseProxima } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type Props = {
  clase: ClaseProxima
  audience: 'profesor' | 'alumno'
}

export function ClaseCard({ clase, audience }: Props) {
  const [presente, setPresente] = useState(false)
  const puedeMarcar = audience === 'profesor' && clase.estado !== 'Dictada'
  const enCurso = clase.estado === 'En curso'

  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-xs sm:flex-row sm:items-center',
        enCurso && 'border-success/40 ring-2 ring-success/10',
      )}
    >
      <div className="flex w-full items-center gap-4 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1 sm:border-r sm:pr-4">
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          <CalendarDays className="size-4 text-primary" />
          {clase.fecha}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {clase.hora}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">{clase.materia}</span>
          <StatusBadge label={clase.estado} />
        </div>
        <h3 className="text-base font-semibold leading-tight">{clase.tema}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {audience === 'alumno' ? (
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5" />
              {clase.profesor}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              {clase.alumnos} alumnos inscriptos
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <DoorOpen className="size-3.5" />
            Aula {clase.aula}
          </span>
        </div>
      </div>

      {puedeMarcar && (
        <div className="sm:shrink-0">
          <Button
            size="lg"
            variant={presente ? 'outline' : 'default'}
            className={cn('w-full sm:w-auto', !presente && enCurso && 'bg-success hover:bg-success/90')}
            onClick={() => setPresente(true)}
            disabled={presente}
          >
            <UserCheck data-icon="inline-start" />
            {presente ? 'Presencia registrada' : 'Marcar presente'}
          </Button>
        </div>
      )}
    </article>
  )
}
