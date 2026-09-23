'use client'

import { Banknote, Clock3, CreditCard, Landmark } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { formatARS, type Alumno, type Clase } from '@/lib/mock-data'

export type MedioPago = 'efectivo' | 'transferencia' | 'tarjeta'

const MEDIOS: { value: MedioPago; label: string; icon: typeof Banknote }[] = [
  { value: 'efectivo', label: 'Efectivo', icon: Banknote },
  { value: 'transferencia', label: 'Transferencia', icon: Landmark },
  { value: 'tarjeta', label: 'Tarjeta', icon: CreditCard },
]

type Props = {
  alumno: Alumno
  clase: Clase
  medio: MedioPago
  onMedioChange: (m: MedioPago) => void
}

export function StepCobro({ alumno, clase, medio, onMedioChange }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel>Medio de pago</FieldLabel>
            <ToggleGroup
              variant="outline"
              value={[medio]}
              onValueChange={(v) => {
                const next = v[0] as MedioPago | undefined
                if (next) onMedioChange(next)
              }}
              className="w-full"
            >
              {MEDIOS.map((m) => (
                <ToggleGroupItem
                  key={m.value}
                  value={m.value}
                  className="h-11 flex-1 gap-2 px-3 aria-pressed:border-primary aria-pressed:bg-accent aria-pressed:text-primary aria-pressed:ring-1 aria-pressed:ring-primary/30"
                >
                  <m.icon className="size-4" />
                  {m.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <FieldDescription>El comprobante se emite automáticamente al confirmar.</FieldDescription>
          </Field>

          {medio === 'efectivo' && (
            <Field>
              <FieldLabel htmlFor="monto-recibido">Monto recibido</FieldLabel>
              <Input id="monto-recibido" inputMode="numeric" defaultValue={clase.precio} className="max-w-xs" />
              <FieldDescription>Se calculará el vuelto al confirmar.</FieldDescription>
            </Field>
          )}

          {medio === 'transferencia' && (
            <Field>
              <FieldLabel htmlFor="comprobante">N.° de comprobante (opcional)</FieldLabel>
              <Input id="comprobante" placeholder="Ej. 0001-00234567" className="max-w-xs" />
            </Field>
          )}

          {medio === 'tarjeta' && (
            <Field>
              <FieldLabel htmlFor="lote">Lote / cupón del posnet</FieldLabel>
              <Input id="lote" placeholder="Ej. 0412 / 00087" className="max-w-xs" />
            </Field>
          )}
        </FieldGroup>

        {medio === 'transferencia' && (
          <Alert className="border-warning/30 bg-warning/5 text-foreground">
            <Clock3 className="text-warning" />
            <AlertTitle>Cupo reservado por 24 horas</AlertTitle>
            <AlertDescription>
              La inscripción queda en estado <span className="font-medium">Reservado</span> hasta que Contaduría
              acredite la transferencia. Si no se acredita en 24 hs, el cupo se libera automáticamente.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <aside className="flex flex-col gap-4 rounded-xl border bg-muted/40 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Resumen</h3>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-muted-foreground">Alumno</dt>
            <dd className="font-medium">{alumno.nombre}</dd>
            <dd className="font-mono text-xs text-muted-foreground">{alumno.lu}</dd>
          </div>
          <Separator />
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-muted-foreground">Clase</dt>
            <dd className="font-medium">
              {clase.materia} — {clase.tema}
            </dd>
            <dd className="text-xs text-muted-foreground">
              {clase.profesor} · Aula {clase.aula} · {clase.dia} {clase.horario}
            </dd>
          </div>
          <Separator />
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs text-muted-foreground">Medio de pago</dt>
            <dd className="font-medium capitalize">{medio}</dd>
          </div>
          <Separator />
          <div className="flex items-baseline justify-between">
            <dt className="font-medium">Total a cobrar</dt>
            <dd className="text-2xl font-semibold tabular-nums text-brand">{formatARS(clase.precio)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  )
}
