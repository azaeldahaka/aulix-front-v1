import { ProfesorView } from '@/components/mis-clases/profesor-view'
import { PageHeader } from '@/components/shell/page-header'

export default function MiCalendarioPage() {
  return (
    <>
      <PageHeader
        section="Docente"
        title="Mi calendario"
        description="Tus clases de la semana y el estado de tus honorarios."
      />
      <ProfesorView />
    </>
  )
}
