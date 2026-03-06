import type { Department, User } from "./user.model"

export interface Tramite {
  id: number
  tipo: string
  estado: EstadoTramite
  fechaRegistro: Date
  fechaInicio?: Date
  fechaFinalizacion?: Date
  fechaEntrega?: Date
  notasInternas?: string
  notasPublicas?: string
  clienteCedula: string
  clienteNombre: string
  clienteEmail?: string
  clienteTelefono?: string
  department: Department
  usuarioRegistro: User
  usuarioAsignado?: User
  requisitos: TramiteRequisito[]
  archivos: TramiteArchivo[]
}

export interface CreateTramite {
  tipoTramiteId: number
  clienteCedula: string
  clienteNombre: string
  clienteEmail?: string
  clienteTelefono?: string
  notasPublicas?: string
}

export interface UpdateTramite {
  estado: EstadoTramite
  notasInternas?: string
  notasPublicas?: string
  usuarioAsignadoCedula?: string
  observacionesCambioEstado?: string
}

export interface TramiteRequisito {
  id: number
  requisito: Requisito
  presentado: boolean
  fechaPresentacion?: Date
  observaciones?: string
  verificadoPor?: User
  fechaVerificacion?: Date
}

export interface TramiteArchivo {
  id: number
  nombreArchivo: string
  tipoArchivo: string
  tamanoBytes: number
  tipo: TipoArchivoTramite
  fechaSubida: Date
  subidoPor: User
  descripcion?: string
}

export interface Requisito {
  id: number
  nombre: string
  descripcion?: string
  obligatorio: boolean
  estado: EstadoRequisito
}

export interface TipoTramite {
  id: number
  nombre: string
  descripcion?: string
  department: Department
  tiempoEstimadoDias: number
  costo?: number
  fechaCreacion: Date
  fechaUltimaModificacion: Date
  estado: EstadoTipoTramite
  requisitos: Requisito[]
}

export enum EstadoTramite {
  Registrado = 1,
  Iniciado = 2,
  Anulado = 3,
  Finalizado = 4,
  Entregado = 5,
  Calificado = 6,
}

export enum EstadoRequisito {
  Activo = 1,
  Inactivo = 0,
}

export enum EstadoTipoTramite {
  Activo = 1,
  Inactivo = 0,
}

export enum TipoArchivoTramite {
  Requisito = 1,
  Generado = 2,
  Adicional = 3,
}
