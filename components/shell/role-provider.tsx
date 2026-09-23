'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_ROLE, getRole, roleCanAccess, rolesForPath, type Role, type RoleId } from '@/lib/roles'

type RoleContextValue = {
  role: Role
  setRoleId: (id: RoleId) => void
  sidebarOpen: boolean
  toggleSidebar: () => void
}

const RoleContext = createContext<RoleContextValue | null>(null)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [roleId, setRoleIdState] = useState<RoleId>(DEFAULT_ROLE)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const role = useMemo(() => getRole(roleId), [roleId])

  // If the user lands directly on a route the current role can't see (e.g. /mi-calendario),
  // auto-switch to the first role that can, so the mockup is always coherent.
  useEffect(() => {
    if (!roleCanAccess(role, pathname)) {
      const candidate = rolesForPath(pathname)[0]
      if (candidate) setRoleIdState(candidate.id)
    }
  }, [pathname, role])

  const setRoleId = useCallback(
    (id: RoleId) => {
      setRoleIdState(id)
      const next = getRole(id)
      if (!roleCanAccess(next, pathname)) {
        router.push(next.nav[0].href)
      }
    },
    [pathname, router],
  )

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), [])

  return (
    <RoleContext.Provider value={{ role, setRoleId, sidebarOpen, toggleSidebar }}>{children}</RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
