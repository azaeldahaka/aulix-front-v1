'use client'

import { useState } from 'react'
import { AppSidebar, MobileSidebar } from './app-sidebar'
import { RoleProvider } from './role-provider'
import { TopNav } from './top-nav'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <RoleProvider>
      <div className="flex min-h-svh flex-col">
        <TopNav onMenuClick={() => setMobileOpen(true)} />
        <div className="flex flex-1">
          <AppSidebar />
          <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
          <div className="flex min-w-0 flex-1 flex-col">
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
            <footer className="flex h-9 items-center justify-between border-t px-4 text-[11px] text-muted-foreground sm:px-6 lg:px-8">
              <span>Aulix · Sprint 1 · v0.1.0</span>
              <span>Entorno: maqueta (datos de ejemplo)</span>
            </footer>
          </div>
        </div>
      </div>
    </RoleProvider>
  )
}
