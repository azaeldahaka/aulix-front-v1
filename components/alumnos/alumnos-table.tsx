'use client'

import { Eye, MoreHorizontal, Pencil, Search, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ALUMNOS } from '@/lib/mock-data'

export function AlumnosTable() {
  const [query, setQuery] = useState('')
  const [estado, setEstado] = useState('todos')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\./g, '')
    return ALUMNOS.filter((a) => {
      const matchesQuery =
        !q ||
        a.nombre.toLowerCase().includes(q) ||
        a.dni.replace(/\./g, '').includes(q) ||
        a.lu.toLowerCase().includes(q)
      const matchesEstado = estado === 'todos' || a.estado.toLowerCase() === estado
      return matchesQuery && matchesEstado
    })
  }, [query, estado])

  const activos = ALUMNOS.filter((a) => a.estado === 'Activo').length

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Alumnos registrados" value={ALUMNOS.length} />
        <StatCard label="Activos" value={activos} accent />
        <StatCard label="Inactivos" value={ALUMNOS.length - activos} />
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Listado de alumnos</CardTitle>
            <CardDescription>
              {rows.length} de {ALUMNOS.length} alumnos
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <InputGroup className="sm:w-72">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Buscar por nombre, DNI o LU"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar alumnos"
              />
            </InputGroup>
            <Select
              items={[
                { value: 'todos', label: 'Todos' },
                { value: 'activo', label: 'Activos' },
                { value: 'inactivo', label: 'Inactivos' },
              ]}
              value={estado}
              onValueChange={(v) => setEstado(v ?? 'todos')}
            >
              <SelectTrigger className="w-full sm:w-36" aria-label="Filtrar por estado">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="activo">Activos</SelectItem>
                  <SelectItem value="inactivo">Inactivos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <Empty className="border-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Users />
                </EmptyMedia>
                <EmptyTitle>Sin resultados</EmptyTitle>
                <EmptyDescription>No encontramos alumnos que coincidan con la búsqueda.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="pl-6">LU</TableHead>
                  <TableHead>Nombre completo</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="pr-6 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((a) => (
                  <TableRow key={a.lu}>
                    <TableCell className="pl-6 font-mono text-xs text-muted-foreground">{a.lu}</TableCell>
                    <TableCell className="font-medium">{a.nombre}</TableCell>
                    <TableCell className="tabular-nums">{a.dni}</TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">{a.email}</TableCell>
                    <TableCell>
                      <StatusBadge label={a.estado} />
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" aria-label={`Ver ficha de ${a.nombre}`}>
                          <Eye />
                        </Button>
                        <Button variant="ghost" size="icon-sm" aria-label={`Editar a ${a.nombre}`}>
                          <Pencil />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={<Button variant="ghost" size="icon-sm" aria-label="Más acciones" />}
                          >
                            <MoreHorizontal />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                              <DropdownMenuItem>Inscribir a una clase</DropdownMenuItem>
                              <DropdownMenuItem>Ver pagos</DropdownMenuItem>
                              <DropdownMenuItem variant="destructive">Dar de baja</DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className={accent ? 'text-3xl text-primary' : 'text-3xl'}>{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
