export interface User {
  cedula: string
  nombreCompleto: string
  correoElectronico: string
  fechaCreacion: Date
  fechaUltimaModificacion: Date
  estado: UserStatus
  permisos: string[]
  departamentos: Department[]
}

export interface Department {
  id: number
  nombre: string
  descripcion?: string
  fechaCreacion: Date
  fechaUltimaModificacion: Date
  estado: DepartmentStatus
}

export interface CreateUserDto {
  cedula: string
  nombreCompleto: string
  correoElectronico: string
  contrasena: string
  permisos: string[]
  departamentosIds: number[]
}

export interface UpdateUserDto {
  nombreCompleto: string
  correoElectronico: string
  estado: UserStatus
  permisos: string[]
  departamentosIds: number[]
}

export interface CreateDepartmentDto {
  nombre: string
  descripcion?: string
}

export interface UpdateDepartmentDto {
  nombre: string
  descripcion?: string
  estado: DepartmentStatus
}

export interface LoginRequest {
  cedula: string
  contrasena: string
}

export interface LoginResponse {
  token: string
  usuario: User
  permisos: string[]
  departamentos: Department[]
}

export interface ApiResponse<T> {
  message: string
  data: T
  errors?: any
}

export interface Permission {
  id: string
  descripcion: string
  modulo: string
  notas?: string
  fechaCreacion: Date
}

export enum UserStatus {
  Activo = 1,
  Inactivo = 0,
}

export enum DepartmentStatus {
  Activo = 1,
  Inactivo = 0,
}
