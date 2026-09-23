import { AlumnoView } from '@/components/mis-clases/alumno-view'
import { PageHeader } from '@/components/shell/page-header'

export default function MisClasesPage() {
  return (
    <>
      <PageHeader
        section="Alumno"
        title="Mis clases"
        description="Consultá tus próximas clases y el historial de las ya dictadas."
      />
      <AlumnoView />
    </>
  )
}
