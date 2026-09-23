import { Plus } from 'lucide-react'
import { CalendarioGeneral } from '@/components/calendario/calendario-general'
import { PageHeader } from '@/components/shell/page-header'
import { Button } from '@/components/ui/button'

export default function CalendarioPage() {
  return (
    <>
      <PageHeader
        section="Académico"
        title="Calendario general"
        description="Clases programadas, dictadas y canceladas por aula y profesor."
        action={
          <Button>
            <Plus data-icon="inline-start" />
            Programar clase
          </Button>
        }
      />
      <CalendarioGeneral />
    </>
  )
}
