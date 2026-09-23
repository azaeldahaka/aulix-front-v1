import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  CalendarDays,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileBarChart2,
  GraduationCap,
  KeyRound,
  Receipt,
  RotateCcw,
  Tag,
  UserCheck,
  Users,
  Wallet,
} from 'lucide-react'

export type RoleId =
  | 'admin-roles'
  | 'director'
  | 'coordinador'
  | 'recepcionista'
  | 'contador'
  | 'gerente'
  | 'profesor'
  | 'alumno'

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export type Role = {
  id: RoleId
  label: string
  userName: string
  initials: string
  nav: NavItem[]
}

const nav = {
  cuentas: { href: '/cuentas', label: 'Cuentas de acceso', icon: KeyRound },
  profesores: { href: '/profesores', label: 'Profesores', icon: GraduationCap },
  tarifas: { href: '/tarifas', label: 'Tarifas', icon: Tag },
  reportes: { href: '/reportes', label: 'Reportes', icon: FileBarChart2 },
  catalogo: { href: '/catalogo', label: 'Catálogo de clases', icon: BookOpen },
  calendario: { href: '/calendario', label: 'Calendario general', icon: CalendarDays },
  disponibilidad: { href: '/disponibilidad', label: 'Disponibilidad docente', icon: ClipboardList },
  alumnos: { href: '/alumnos', label: 'Alumnos', icon: Users },
  inscripciones: { href: '/inscripciones', label: 'Inscripción y cobro', icon: Receipt },
  devoluciones: { href: '/devoluciones', label: 'Devoluciones', icon: RotateCcw },
  pagos: { href: '/pagos', label: 'Pagos', icon: CreditCard },
  miCalendario: { href: '/mi-calendario', label: 'Mi calendario', icon: CalendarDays },
  presencia: { href: '/presencia', label: 'Marcar presencia', icon: UserCheck },
  asistencia: { href: '/asistencia', label: 'Registrar asistencia', icon: ClipboardCheck },
  honorarios: { href: '/honorarios', label: 'Mis honorarios', icon: Wallet },
  misClases: { href: '/mis-clases', label: 'Mis clases', icon: CalendarCheck },
  misPagos: { href: '/mis-pagos', label: 'Mis pagos', icon: CreditCard },
} satisfies Record<string, NavItem>

export const ROLES: Role[] = [
  {
    id: 'recepcionista',
    label: 'Recepcionista',
    userName: 'Valeria Gómez',
    initials: 'VG',
    nav: [nav.alumnos, nav.inscripciones, nav.calendario, nav.devoluciones],
  },
  {
    id: 'coordinador',
    label: 'Coordinador Académico',
    userName: 'Martín Rodríguez',
    initials: 'MR',
    nav: [nav.catalogo, nav.calendario, nav.disponibilidad],
  },
  {
    id: 'director',
    label: 'Director',
    userName: 'Silvia Ferreyra',
    initials: 'SF',
    nav: [nav.profesores, nav.tarifas, nav.calendario, nav.reportes],
  },
  {
    id: 'contador',
    label: 'Contador',
    userName: 'Jorge Benítez',
    initials: 'JB',
    nav: [nav.pagos, nav.devoluciones, nav.reportes],
  },
  {
    id: 'gerente',
    label: 'Gerente',
    userName: 'Ana Castellanos',
    initials: 'AC',
    nav: [nav.reportes],
  },
  {
    id: 'admin-roles',
    label: 'Administrador de roles',
    userName: 'Pablo Ledesma',
    initials: 'PL',
    nav: [nav.cuentas],
  },
  {
    id: 'profesor',
    label: 'Profesor',
    userName: 'Lucía Fernández',
    initials: 'LF',
    nav: [nav.miCalendario, nav.presencia, nav.asistencia, nav.honorarios],
  },
  {
    id: 'alumno',
    label: 'Alumno',
    userName: 'Tomás Herrera',
    initials: 'TH',
    nav: [nav.misClases, nav.misPagos],
  },
]

export const DEFAULT_ROLE: RoleId = 'recepcionista'

export function getRole(id: RoleId): Role {
  return ROLES.find((r) => r.id === id) ?? ROLES[0]
}

export function roleCanAccess(role: Role, pathname: string): boolean {
  return role.nav.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
}

export function rolesForPath(pathname: string): Role[] {
  return ROLES.filter((r) => roleCanAccess(r, pathname))
}
