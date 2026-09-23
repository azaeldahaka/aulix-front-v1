'use client'

import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AULAS, EVENTOS, MATERIAS, PROFESORES } from '@/lib/mock-data'
import { WeekGrid } from './week-grid'

const TODOS = 'todos'
const vistaItemClass = 'aria-pressed:bg-brand aria-pressed:text-brand-foreground aria-pressed:border-brand'

export function CalendarioGeneral() {
  const [vista, setVista] = useState('semana')
  const [materia, setMateria] = useState(TODOS)
  const [profesor, setProfesor] = useState(TODOS)
  const [aula, setAula] = useState(TODOS)

  const eventos = useMemo(
    () =>
      EVENTOS.filter(
        (e) =>
          (materia === TODOS || e.materia === materia) &&
          (profesor === TODOS || e.profesor === profesor) &&
          (aula === TODOS || e.aula === aula),
      ),
    [materia, profesor, aula],
  )

  const hasFilters = materia !== TODOS || profesor !== TODOS || aula !== TODOS

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 border-b pb-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" aria-label="Semana anterior">
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Semana siguiente">
            <ChevronRight />
          </Button>
          <div className="ml-1 flex flex-col leading-tight">
            <span className="text-sm font-semibold whitespace-nowrap">21 – 26 de septiembre de 2026</span>
            <span className="text-xs text-muted-foreground">
              {eventos.length} clases · semana actual
            </span>
          </div>
          <Button variant="ghost" size="sm" className="ml-2 hidden sm:inline-flex">
            Hoy
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Filter className="size-3.5" />
            Filtrar
          </span>
          <FilterSelect label="Materia" value={materia} onChange={setMateria} options={MATERIAS} allLabel="Todas las materias" />
          <FilterSelect label="Profesor" value={profesor} onChange={setProfesor} options={PROFESORES} allLabel="Todos los profesores" />
          <FilterSelect label="Aula" value={aula} onChange={setAula} options={AULAS} allLabel="Todas las aulas" />
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMateria(TODOS)
                setProfesor(TODOS)
                setAula(TODOS)
              }}
            >
              <X data-icon="inline-start" />
              Limpiar
            </Button>
          )}
          <ToggleGroup
            variant="outline"
            size="sm"
            value={[vista]}
            onValueChange={(v) => v[0] && setVista(v[0])}
            aria-label="Cambiar vista"
            className="sm:ml-2"
          >
            <ToggleGroupItem value="dia" className={vistaItemClass}>
              Día
            </ToggleGroupItem>
            <ToggleGroupItem value="semana" className={vistaItemClass}>
              Semana
            </ToggleGroupItem>
            <ToggleGroupItem value="mes" className={vistaItemClass}>
              Mes
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-wrap items-center gap-4 px-4 text-xs text-muted-foreground">
          <Legend className="bg-primary" label="Programada" />
          <Legend className="bg-success" label="Dictada" />
          <Legend className="bg-muted-foreground/40" label="Cancelada" />
        </div>
        <WeekGrid eventos={eventos} vista={vista} />
      </CardContent>
    </Card>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span aria-hidden className={`size-2.5 rounded-sm ${className}`} />
      {label}
    </span>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  allLabel: string
}) {
  const items = [{ value: TODOS, label: allLabel }, ...options.map((o) => ({ value: o, label: o }))]
  return (
    <Select items={items} value={value} onValueChange={(v) => onChange(v ?? TODOS)}>
      <SelectTrigger size="sm" className="w-full sm:w-44" aria-label={`Filtrar por ${label.toLowerCase()}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={TODOS}>{allLabel}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
