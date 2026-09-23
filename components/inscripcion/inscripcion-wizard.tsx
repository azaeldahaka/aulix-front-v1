'use client'

import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Alumno, Clase } from '@/lib/mock-data'
import { StepAlumno } from './step-alumno'
import { StepClase } from './step-clase'
import { StepCobro, type MedioPago } from './step-cobro'

const STEPS = [
  { id: 1, title: 'Alumno', description: 'Buscar y seleccionar' },
  { id: 2, title: 'Clase', description: 'Elegir clase disponible' },
  { id: 3, title: 'Cobro', description: 'Medio de pago y confirmación' },
]

export function InscripcionWizard() {
  const [step, setStep] = useState(1)
  const [alumno, setAlumno] = useState<Alumno | null>(null)
  const [clase, setClase] = useState<Clase | null>(null)
  const [medio, setMedio] = useState<MedioPago>('efectivo')
  const [confirmado, setConfirmado] = useState(false)

  const canContinue = (step === 1 && !!alumno) || (step === 2 && !!clase)

  const reset = () => {
    setStep(1)
    setAlumno(null)
    setClase(null)
    setMedio('efectivo')
    setConfirmado(false)
  }

  if (confirmado && alumno && clase) {
    return (
      <Card className="mx-auto max-w-xl">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="size-8" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Inscripción confirmada</h2>
            <p className="text-sm text-muted-foreground">
              {alumno.nombre} quedó inscripto en {clase.materia} — {clase.tema}.
              {medio === 'transferencia' && ' El cupo queda reservado 24 hs hasta acreditar la transferencia.'}
            </p>
          </div>
          <Button onClick={reset}>Nueva inscripción</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Stepper current={step} />

      <Card>
        <CardHeader>
          <CardTitle>
            Paso {step} de {STEPS.length} · {STEPS[step - 1].title}
          </CardTitle>
          <CardDescription>{STEPS[step - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && <StepAlumno selected={alumno} onSelect={setAlumno} />}
          {step === 2 && <StepClase selected={clase} onSelect={setClase} />}
          {step === 3 && alumno && clase && (
            <StepCobro alumno={alumno} clase={clase} medio={medio} onMedioChange={setMedio} />
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          <ArrowLeft data-icon="inline-start" />
          Anterior
        </Button>
        {step < 3 ? (
          <Button disabled={!canContinue} onClick={() => setStep((s) => Math.min(3, s + 1))}>
            Continuar
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button size="lg" onClick={() => setConfirmado(true)}>
            <Check data-icon="inline-start" />
            Confirmar inscripción
          </Button>
        )}
      </div>
    </div>
  )
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Progreso de la inscripción">
      {STEPS.map((s) => {
        const done = s.id < current
        const active = s.id === current
        return (
          <li
            key={s.id}
            aria-current={active ? 'step' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-xl border bg-card p-3 transition-colors',
              active && 'border-primary/40 ring-2 ring-primary/15',
              done && 'border-success/30',
            )}
          >
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                active && 'bg-primary text-primary-foreground',
                done && 'bg-success text-success-foreground',
                !active && !done && 'bg-muted text-muted-foreground',
              )}
            >
              {done ? <Check className="size-4" /> : s.id}
            </span>
            <div className="hidden min-w-0 flex-col sm:flex">
              <span className={cn('truncate text-sm font-medium', !active && !done && 'text-muted-foreground')}>
                {s.title}
              </span>
              <span className="truncate text-xs text-muted-foreground">{s.description}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
