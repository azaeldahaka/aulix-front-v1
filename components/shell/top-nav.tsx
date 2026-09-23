'use client'

import Link from 'next/link'
import { Bell, Eye, LogOut, Menu } from 'lucide-react'
import { AulixLogo } from '@/components/aulix-logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ROLES, type RoleId } from '@/lib/roles'
import { useRole } from './role-provider'

export function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const { role, setRoleId, toggleSidebar } = useRole()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card px-3 sm:px-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="Abrir menú de navegación"
      >
        <Menu />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:inline-flex"
        onClick={toggleSidebar}
        aria-label="Mostrar u ocultar menú lateral"
      >
        <Menu />
      </Button>
      <Link href={role.nav[0].href} className="flex items-center" aria-label="Ir al inicio">
        <AulixLogo size="sm" />
      </Link>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-gold-dark/30 bg-gold/10 pl-2.5">
          <Eye className="size-4 text-gold-dark" aria-hidden />
          <span className="hidden text-xs font-medium text-gold-dark sm:inline">Ver como</span>
          <Select
            items={ROLES.map((r) => ({ value: r.id, label: r.label }))}
            value={role.id}
            onValueChange={(v) => v && setRoleId(v as RoleId)}
          >
            <SelectTrigger size="sm" className="border-0 bg-transparent font-medium" aria-label="Seleccionar rol simulado">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                {ROLES.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Notificaciones" />}>
            <Bell />
          </TooltipTrigger>
          <TooltipContent>Notificaciones</TooltipContent>
        </Tooltip>

        <div className="hidden items-center gap-2.5 border-l pl-3 md:flex">
          <Avatar className="size-8">
            <AvatarFallback className="bg-brand text-xs font-semibold text-brand-foreground">{role.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{role.userName}</span>
            <span className="text-xs text-muted-foreground">{role.label}</span>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger
            render={
              <Link
                href="/"
                aria-label="Cerrar sesión"
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              />
            }
          >
            <LogOut className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Cerrar sesión</TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
