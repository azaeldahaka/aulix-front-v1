'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { AulixLogo } from '@/components/aulix-logo'
import { cn } from '@/lib/utils'
import { useRole } from './role-provider'

function NavList({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname()
  const { role } = useRole()

  return (
    <nav aria-label="Módulos" className="flex flex-1 flex-col gap-1 p-3">
      <p
        className={cn(
          'mb-1 truncate px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground',
          collapsed && 'sr-only',
        )}
      >
        Módulos · {role.label}
      </p>
      {role.nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const link = (
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex h-10 items-center gap-3 rounded-lg px-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              active &&
                'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground',
              collapsed && 'justify-center px-0',
            )}
          >
            <item.icon className={cn('size-4.5 shrink-0', active ? 'text-gold-bright' : 'text-muted-foreground')} />
            <span className={cn('truncate', collapsed && 'sr-only')}>{item.label}</span>
          </Link>
        )

        if (!collapsed) return <div key={item.href}>{link}</div>

        return (
          <Tooltip key={item.href}>
            <TooltipTrigger render={link} />
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        )
      })}
    </nav>
  )
}

function RoleNotice() {
  const { role } = useRole()
  return (
    <div className="m-3 flex items-start gap-2.5 rounded-lg bg-accent p-3 text-accent-foreground">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold-dark" />
      <p className="text-xs leading-relaxed">
        Acceso limitado a los módulos habilitados para <span className="font-semibold">{role.label}</span>.
      </p>
    </div>
  )
}

export function AppSidebar() {
  const { sidebarOpen } = useRole()

  return (
    <aside
      className={cn(
        'sticky top-14 hidden h-[calc(100svh-3.5rem)] shrink-0 flex-col border-r bg-sidebar transition-[width] duration-200 md:flex',
        sidebarOpen ? 'w-60' : 'w-16',
      )}
    >
      <NavList collapsed={!sidebarOpen} />
      {sidebarOpen && <RoleNotice />}
    </aside>
  )
}

export function MobileSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b">
          <SheetTitle>
            <AulixLogo size="sm" />
          </SheetTitle>
          <SheetDescription className="sr-only">Menú de navegación</SheetDescription>
        </SheetHeader>
        <NavList onNavigate={() => onOpenChange(false)} />
        <RoleNotice />
      </SheetContent>
    </Sheet>
  )
}
