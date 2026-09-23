'use client'

import { Wallet } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CLASES_PROFESOR, HONORARIOS, formatARS } from '@/lib/mock-data'
import { ClaseCard } from './clase-card'

export function ProfesorView() {
  const pendiente = HONORARIOS.filter((h) => h.estado === 'Pendiente').reduce((acc, h) => acc + h.monto, 0)

  return (
    <Tabs defaultValue="calendario" className="gap-6">
      <TabsList>
        <TabsTrigger value="calendario">Mi calendario</TabsTrigger>
        <TabsTrigger value="honorarios">Mis honorarios</TabsTrigger>
      </TabsList>

      <TabsContent value="calendario" className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Próximas clases</h2>
          <span className="text-xs text-muted-foreground">{CLASES_PROFESOR.length} clases esta semana</span>
        </div>
        <div className="flex flex-col gap-3">
          {CLASES_PROFESOR.map((c) => (
            <ClaseCard key={c.id} clase={c} audience="profesor" />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="honorarios" className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card size="sm">
            <CardHeader>
              <CardDescription>Pendiente de cobro</CardDescription>
              <CardTitle className="text-2xl text-warning">{formatARS(pendiente)}</CardTitle>
            </CardHeader>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardDescription>Clases dictadas (sept.)</CardDescription>
              <CardTitle className="text-2xl">{HONORARIOS[0].clases}</CardTitle>
            </CardHeader>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardDescription>Horas dictadas (sept.)</CardDescription>
              <CardTitle className="text-2xl">{HONORARIOS[0].horas} h</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="size-4 text-gold-dark" />
              Liquidaciones por período
            </CardTitle>
            <CardDescription>Honorarios calculados sobre clases efectivamente dictadas.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="pl-6">Período</TableHead>
                  <TableHead className="text-right">Clases</TableHead>
                  <TableHead className="text-right">Horas</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="pr-6">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {HONORARIOS.map((h) => (
                  <TableRow key={h.periodo}>
                    <TableCell className="pl-6 font-medium">{h.periodo}</TableCell>
                    <TableCell className="text-right tabular-nums">{h.clases}</TableCell>
                    <TableCell className="text-right tabular-nums">{h.horas}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatARS(h.monto)}</TableCell>
                    <TableCell className="pr-6">
                      <StatusBadge label={h.estado} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
