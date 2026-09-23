import { Plus } from 'lucide-react'
import { AlumnosTable } from '@/components/alumnos/alumnos-table'
import { PageHeader } from '@/components/shell/page-header'
import { Button } from '@/components/ui/button'

export default function AlumnosPage() {
  return (
    <>
      <PageHeader
        section="Recepción"
        title="Alumnos"
        description="Padrón de alumnos del centro. Buscá por nombre, DNI o libreta."
        action={
          <Button>
            <Plus data-icon="inline-start" />
            Nuevo alumno
          </Button>
        }
      />
      <AlumnosTable />
    </>
  )
}
