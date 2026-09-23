import { InscripcionWizard } from '@/components/inscripcion/inscripcion-wizard'
import { PageHeader } from '@/components/shell/page-header'

export default function InscripcionesPage() {
  return (
    <>
      <PageHeader
        section="Recepción"
        title="Inscripción y cobro"
        description="Inscribí a un alumno en una clase disponible y registrá el pago en el mismo flujo."
      />
      <InscripcionWizard />
    </>
  )
}
