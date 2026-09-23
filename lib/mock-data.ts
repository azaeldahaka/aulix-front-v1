export type EstadoAlumno = 'Activo' | 'Inactivo'

export type Alumno = {
  lu: string
  nombre: string
  dni: string
  email: string
  estado: EstadoAlumno
  telefono: string
}

export const ALUMNOS: Alumno[] = [
  { lu: 'LU-2026-00042', nombre: 'Tomás Herrera', dni: '44.120.338', email: 'tomas.herrera@gmail.com', estado: 'Activo', telefono: '11 5523-4410' },
  { lu: 'LU-2026-00041', nombre: 'Camila Sosa', dni: '45.881.902', email: 'camila.sosa@hotmail.com', estado: 'Activo', telefono: '11 6118-7702' },
  { lu: 'LU-2026-00040', nombre: 'Facundo Pereyra', dni: '43.207.115', email: 'facu.pereyra@gmail.com', estado: 'Activo', telefono: '11 4402-1189' },
  { lu: 'LU-2026-00039', nombre: 'Julieta Martínez', dni: '46.310.774', email: 'juli.martinez@outlook.com', estado: 'Inactivo', telefono: '11 3391-8820' },
  { lu: 'LU-2026-00038', nombre: 'Agustín Ramírez', dni: '44.905.226', email: 'agustin.ramirez@gmail.com', estado: 'Activo', telefono: '11 7745-0013' },
  { lu: 'LU-2026-00037', nombre: 'Valentina López', dni: '45.118.640', email: 'valen.lopez@gmail.com', estado: 'Activo', telefono: '11 2208-6651' },
  { lu: 'LU-2026-00036', nombre: 'Mateo Giménez', dni: '43.672.011', email: 'mateo.gimenez@yahoo.com', estado: 'Inactivo', telefono: '11 5090-2274' },
  { lu: 'LU-2026-00035', nombre: 'Sofía Acosta', dni: '46.004.389', email: 'sofia.acosta@gmail.com', estado: 'Activo', telefono: '11 6632-1908' },
  { lu: 'LU-2026-00034', nombre: 'Nicolás Benítez', dni: '44.359.517', email: 'nico.benitez@gmail.com', estado: 'Activo', telefono: '11 4187-3345' },
  { lu: 'LU-2026-00033', nombre: 'Martina Romero', dni: '45.720.163', email: 'martina.romero@gmail.com', estado: 'Activo', telefono: '11 3810-9926' },
  { lu: 'LU-2026-00032', nombre: 'Lautaro Díaz', dni: '43.991.428', email: 'lautaro.diaz@hotmail.com', estado: 'Inactivo', telefono: '11 5571-0480' },
  { lu: 'LU-2026-00031', nombre: 'Lucía Torres', dni: '46.215.903', email: 'lucia.torres@gmail.com', estado: 'Activo', telefono: '11 6924-7713' },
]

export type Materia = 'Matemática' | 'Física' | 'Química' | 'Biología' | 'Lengua'

export type Clase = {
  id: string
  materia: Materia
  tema: string
  profesor: string
  aula: string
  dia: string
  horario: string
  cupo: number
  inscriptos: number
  precio: number
}

export const CLASES: Clase[] = [
  { id: 'c1', materia: 'Matemática', tema: 'Funciones cuadráticas', profesor: 'Lucía Fernández', aula: 'A1', dia: 'Lunes', horario: '18:00 – 19:30', cupo: 12, inscriptos: 8, precio: 18500 },
  { id: 'c2', materia: 'Física', tema: 'Cinemática', profesor: 'Diego Morales', aula: 'A2', dia: 'Martes', horario: '17:00 – 18:30', cupo: 10, inscriptos: 9, precio: 19000 },
  { id: 'c3', materia: 'Química', tema: 'Estequiometría', profesor: 'Paula Iglesias', aula: 'Lab 1', dia: 'Miércoles', horario: '16:00 – 17:30', cupo: 8, inscriptos: 3, precio: 21000 },
  { id: 'c4', materia: 'Matemática', tema: 'Trigonometría', profesor: 'Lucía Fernández', aula: 'A1', dia: 'Jueves', horario: '19:00 – 20:30', cupo: 12, inscriptos: 12, precio: 18500 },
  { id: 'c5', materia: 'Biología', tema: 'Genética mendeliana', profesor: 'Carlos Vega', aula: 'A3', dia: 'Viernes', horario: '15:00 – 16:30', cupo: 15, inscriptos: 6, precio: 17000 },
  { id: 'c6', materia: 'Lengua', tema: 'Análisis sintáctico', profesor: 'Marta Quiroga', aula: 'A2', dia: 'Sábado', horario: '10:00 – 11:30', cupo: 10, inscriptos: 4, precio: 16000 },
]

export type EstadoClase = 'Programada' | 'Dictada' | 'Cancelada'

export type EventoCalendario = {
  id: string
  materia: Materia
  profesor: string
  aula: string
  dia: number // 0 = Lunes ... 5 = Sábado
  inicio: number // hora en formato 24h (ej. 17.5 = 17:30)
  fin: number
  estado: EstadoClase
  inscriptos?: number
}

export const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export const FECHAS_SEMANA = ['21 sep', '22 sep', '23 sep', '24 sep', '25 sep', '26 sep']
export const HORAS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export const EVENTOS: EventoCalendario[] = [
  { id: 'e1', materia: 'Matemática', profesor: 'Lucía Fernández', aula: 'A1', dia: 0, inicio: 9, fin: 10.5, estado: 'Dictada', inscriptos: 8 },
  { id: 'e2', materia: 'Física', profesor: 'Diego Morales', aula: 'A2', dia: 0, inicio: 17, fin: 18.5, estado: 'Dictada', inscriptos: 9 },
  { id: 'e3', materia: 'Química', profesor: 'Paula Iglesias', aula: 'Lab 1', dia: 1, inicio: 10, fin: 11.5, estado: 'Dictada', inscriptos: 5 },
  { id: 'e4', materia: 'Matemática', profesor: 'Lucía Fernández', aula: 'A1', dia: 1, inicio: 18, fin: 19.5, estado: 'Cancelada', inscriptos: 7 },
  { id: 'e5', materia: 'Lengua', profesor: 'Marta Quiroga', aula: 'A2', dia: 2, inicio: 15, fin: 16.5, estado: 'Programada', inscriptos: 4 },
  { id: 'e6', materia: 'Biología', profesor: 'Carlos Vega', aula: 'A3', dia: 2, inicio: 17, fin: 18.5, estado: 'Programada', inscriptos: 6 },
  { id: 'e7', materia: 'Física', profesor: 'Diego Morales', aula: 'A2', dia: 3, inicio: 9, fin: 10.5, estado: 'Programada', inscriptos: 10 },
  { id: 'e8', materia: 'Matemática', profesor: 'Lucía Fernández', aula: 'A1', dia: 3, inicio: 19, fin: 20.5, estado: 'Programada', inscriptos: 12 },
  { id: 'e9', materia: 'Química', profesor: 'Paula Iglesias', aula: 'Lab 1', dia: 4, inicio: 16, fin: 17.5, estado: 'Programada', inscriptos: 3 },
  { id: 'e10', materia: 'Matemática', profesor: 'Lucía Fernández', aula: 'A1', dia: 4, inicio: 11, fin: 12.5, estado: 'Programada', inscriptos: 9 },
  { id: 'e11', materia: 'Lengua', profesor: 'Marta Quiroga', aula: 'A2', dia: 5, inicio: 10, fin: 11.5, estado: 'Programada', inscriptos: 4 },
  { id: 'e12', materia: 'Biología', profesor: 'Carlos Vega', aula: 'A3', dia: 5, inicio: 12, fin: 13.5, estado: 'Cancelada', inscriptos: 2 },
]

export const MATERIAS: Materia[] = ['Matemática', 'Física', 'Química', 'Biología', 'Lengua']
export const PROFESORES = ['Lucía Fernández', 'Diego Morales', 'Paula Iglesias', 'Carlos Vega', 'Marta Quiroga']
export const AULAS = ['A1', 'A2', 'A3', 'Lab 1']

export type ClaseProxima = {
  id: string
  fecha: string
  hora: string
  materia: Materia
  tema: string
  profesor: string
  aula: string
  alumnos: number
  estado: 'En curso' | 'Próxima' | 'Dictada'
}

export const CLASES_PROFESOR: ClaseProxima[] = [
  { id: 'p1', fecha: 'Hoy, mié 23 sep', hora: '18:00 – 19:30', materia: 'Matemática', tema: 'Funciones cuadráticas', profesor: 'Lucía Fernández', aula: 'A1', alumnos: 8, estado: 'En curso' },
  { id: 'p2', fecha: 'Jue 24 sep', hora: '19:00 – 20:30', materia: 'Matemática', tema: 'Trigonometría', profesor: 'Lucía Fernández', aula: 'A1', alumnos: 12, estado: 'Próxima' },
  { id: 'p3', fecha: 'Vie 25 sep', hora: '11:00 – 12:30', materia: 'Matemática', tema: 'Logaritmos', profesor: 'Lucía Fernández', aula: 'A1', alumnos: 9, estado: 'Próxima' },
  { id: 'p4', fecha: 'Lun 28 sep', hora: '09:00 – 10:30', materia: 'Matemática', tema: 'Repaso integrador', profesor: 'Lucía Fernández', aula: 'A1', alumnos: 8, estado: 'Próxima' },
]

export const CLASES_ALUMNO: ClaseProxima[] = [
  { id: 'a1', fecha: 'Hoy, mié 23 sep', hora: '18:00 – 19:30', materia: 'Matemática', tema: 'Funciones cuadráticas', profesor: 'Lucía Fernández', aula: 'A1', alumnos: 8, estado: 'Próxima' },
  { id: 'a2', fecha: 'Jue 24 sep', hora: '17:00 – 18:30', materia: 'Física', tema: 'Cinemática', profesor: 'Diego Morales', aula: 'A2', alumnos: 9, estado: 'Próxima' },
  { id: 'a3', fecha: 'Sáb 26 sep', hora: '10:00 – 11:30', materia: 'Lengua', tema: 'Análisis sintáctico', profesor: 'Marta Quiroga', aula: 'A2', alumnos: 4, estado: 'Próxima' },
]

export const CLASES_ALUMNO_PASADAS: ClaseProxima[] = [
  { id: 'a4', fecha: 'Lun 21 sep', hora: '09:00 – 10:30', materia: 'Matemática', tema: 'Ecuaciones lineales', profesor: 'Lucía Fernández', aula: 'A1', alumnos: 8, estado: 'Dictada' },
  { id: 'a5', fecha: 'Mar 15 sep', hora: '17:00 – 18:30', materia: 'Física', tema: 'Vectores', profesor: 'Diego Morales', aula: 'A2', alumnos: 9, estado: 'Dictada' },
  { id: 'a6', fecha: 'Sáb 12 sep', hora: '10:00 – 11:30', materia: 'Lengua', tema: 'Clases de palabras', profesor: 'Marta Quiroga', aula: 'A2', alumnos: 4, estado: 'Dictada' },
]

export type Honorario = {
  periodo: string
  clases: number
  horas: number
  monto: number
  estado: 'Pagado' | 'Pendiente'
}

export const HONORARIOS: Honorario[] = [
  { periodo: 'Septiembre 2026', clases: 14, horas: 21, monto: 168000, estado: 'Pendiente' },
  { periodo: 'Agosto 2026', clases: 18, horas: 27, monto: 216000, estado: 'Pagado' },
  { periodo: 'Julio 2026', clases: 12, horas: 18, monto: 144000, estado: 'Pagado' },
]

export type PagoAlumno = {
  fecha: string
  concepto: string
  medio: string
  monto: number
  estado: 'Confirmado' | 'Pendiente'
}

export const PAGOS_ALUMNO: PagoAlumno[] = [
  { fecha: '22 sep 2026', concepto: 'Matemática — Funciones cuadráticas', medio: 'Transferencia', monto: 18500, estado: 'Pendiente' },
  { fecha: '10 sep 2026', concepto: 'Física — Cinemática', medio: 'Efectivo', monto: 19000, estado: 'Confirmado' },
  { fecha: '2 sep 2026', concepto: 'Lengua — Análisis sintáctico', medio: 'Tarjeta', monto: 16000, estado: 'Confirmado' },
]

export const formatARS = (value: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)
