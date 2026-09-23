'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CLASES_ALUMNO, CLASES_ALUMNO_PASADAS } from '@/lib/mock-data'
import { ClaseCard } from './clase-card'

export function AlumnoView() {
  return (
    <Tabs defaultValue="proximas" className="gap-6">
      <TabsList>
        <TabsTrigger value="proximas">Próximas clases</TabsTrigger>
        <TabsTrigger value="pasadas">Clases pasadas</TabsTrigger>
      </TabsList>

      <TabsContent value="proximas" className="flex flex-col gap-3">
        {CLASES_ALUMNO.map((c) => (
          <ClaseCard key={c.id} clase={c} audience="alumno" />
        ))}
      </TabsContent>

      <TabsContent value="pasadas" className="flex flex-col gap-3">
        {CLASES_ALUMNO_PASADAS.map((c) => (
          <ClaseCard key={c.id} clase={c} audience="alumno" />
        ))}
      </TabsContent>
    </Tabs>
  )
}
