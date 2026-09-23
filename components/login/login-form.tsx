'use client'

import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, LogIn, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="font-brand text-2xl font-semibold text-brand">Ingreso al portal</h2>
        <p className="text-sm text-muted-foreground">
          Usá las credenciales que te asignó la administración del centro.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push('/alumnos')
        }}
        className="rounded-xl border bg-card p-6 shadow-sm sm:p-8"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="usuario">DNI o usuario</FieldLabel>
            <InputGroup className="h-10">
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
              <InputGroupInput id="usuario" name="usuario" placeholder="44120338" autoComplete="username" />
            </InputGroup>
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <a href="#" className="text-xs font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <InputGroup className="h-10">
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="recordarme" name="recordarme" />
            <FieldLabel htmlFor="recordarme" className="font-normal">
              Recordarme en este equipo
            </FieldLabel>
          </Field>

          <Button type="submit" size="lg" className="h-10 w-full">
            <LogIn data-icon="inline-start" />
            Ingresar al portal
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Las cuentas son creadas por la administración. Si no tenés acceso, contactá a recepción.
      </p>
    </div>
  )
}
