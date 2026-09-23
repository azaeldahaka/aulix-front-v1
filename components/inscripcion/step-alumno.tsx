'use client'

import { Check, Search, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { StatusBadge } from '@/components/status-badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ALUMNOS, type Alumno } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

export function StepAlumno({ selected, onSelect }: { selected: Alumno | null; onSelect: (a: Alumno) => void }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\./g, '')
    if (!q) return ALUMNOS.slice(0, 6)
    return ALUMNOS.filter(
      (a) =>
        a.nombre.toLowerCase().includes(q) || a.dni.replace(/\./g, '').includes(q) || a.lu.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex flex-col gap-4">
      <InputGroup className="h-10 max-w-xl">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          autoFocus
          placeholder="Buscar alumno por nombre, DNI o LU…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar alumno"
        />
      </InputGroup>

      {results.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserRound />
            </EmptyMedia>
            <EmptyTitle>Sin coincidencias</EmptyTitle>
            <EmptyDescription>Probá con otro nombre o DNI, o registrá al alumno desde el módulo Alumnos.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul role="listbox" aria-label="Resultados de alumnos" className="grid gap-2 md:grid-cols-2">
          {results.map((a) => {
            const isSelected = selected?.lu === a.lu
            return (
              <li key={a.lu}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(a)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border bg-card p-3 text-left transition-colors hover:border-primary/40 hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                    isSelected && 'border-primary bg-accent ring-2 ring-primary/20',
                  )}
                >
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-brand/10 text-sm font-semibold text-brand">{initials(a.nombre)}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{a.nombre}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      DNI {a.dni} · <span className="font-mono">{a.lu}</span>
                    </span>
                  </div>
                  <StatusBadge label={a.estado} className="hidden sm:inline-flex" />
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-full border',
                      isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-transparent',
                    )}
                    aria-hidden
                  >
                    <Check className="size-3.5" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
