import { LoginForm } from '@/components/login/login-form'
import { AulixLogo } from '@/components/aulix-logo'
import { BookOpen, CalendarDays, Wallet } from 'lucide-react'

const highlights = [
  { icon: CalendarDays, text: 'Calendario unificado de clases y aulas' },
  { icon: Wallet, text: 'Inscripción y cobro en un solo flujo' },
  { icon: BookOpen, text: 'Seguimiento académico por alumno' },
]

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col lg:flex-row">
      <section className="relative flex flex-col justify-between bg-brand-dark px-6 py-6 text-brand-foreground lg:w-[46%] lg:px-14 lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(37,99,235,0.35),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(234,179,8,0.12),_transparent_50%)]"
        />
        <div className="relative flex items-center justify-between lg:block">
          <AulixLogo size="sm" tone="light" className="lg:hidden" />
          <AulixLogo size="lg" tone="light" className="hidden lg:flex" />
          <p className="text-xs text-slate-400 lg:hidden">Portal institucional</p>
        </div>

        <div className="relative hidden lg:flex lg:flex-col lg:gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Centro de apoyo académico</p>
            <h1 className="font-brand text-3xl font-semibold leading-tight text-balance xl:text-4xl">
              La gestión de tu centro, ordenada en un solo lugar.
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-slate-300">
              Alumnos, clases, profesores y cobros conectados para que recepción y coordinación trabajen sin
              planillas sueltas.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-slate-200">
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-gold ring-1 ring-white/10">
                  <Icon className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <footer className="relative hidden text-xs text-slate-400 lg:block">© 2026 Aulix · Todos los derechos reservados</footer>
      </section>

      <section className="flex flex-1 items-center justify-center bg-background px-6 py-10 lg:px-12">
        <LoginForm />
      </section>
    </main>
  )
}
