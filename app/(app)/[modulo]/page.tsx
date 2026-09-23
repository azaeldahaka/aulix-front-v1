import { Construction } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shell/page-header'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Badge } from '@/components/ui/badge'
import { ROLES } from '@/lib/roles'

export default async function ModuloPlaceholderPage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo } = await params
  const href = `/${modulo}`
  const item = ROLES.flatMap((r) => r.nav).find((n) => n.href === href)
  if (!item) notFound()

  const roles = ROLES.filter((r) => r.nav.some((n) => n.href === href))

  return (
    <>
      <PageHeader section="Módulo" title={item.label} description="Este módulo se construye en un sprint posterior." />
      <Empty className="min-h-[50vh] border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Construction />
          </EmptyMedia>
          <EmptyTitle>{item.label} — próximamente</EmptyTitle>
          <EmptyDescription>
            La maqueta del Sprint 1 cubre login, alumnos, inscripción y cobro, calendario general y las vistas de
            profesor y alumno. Este módulo ya figura en el menú para validar el acceso por rol.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-xs text-muted-foreground">Roles con acceso:</span>
            {roles.map((r) => (
              <Badge key={r.id} variant="secondary">
                {r.label}
              </Badge>
            ))}
          </div>
        </EmptyContent>
      </Empty>
    </>
  )
}
