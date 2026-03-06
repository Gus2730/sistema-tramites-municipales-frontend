import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable } from "rxjs"
import { tap } from "rxjs/operators"
import type { Router } from "@angular/router"
import type { LoginRequest, LoginResponse, User, ApiResponse } from "../models/user.model"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = environment.apiUrl
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  private tokenSubject = new BehaviorSubject<string | null>(null)

  public currentUser$ = this.currentUserSubject.asObservable()
  public token$ = this.tokenSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Verificar si hay un token almacenado al inicializar el servicio
    const token = this.getStoredToken()
    if (token) {
      this.validateStoredToken(token)
    }
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((response) => {
        if (response.data) {
          this.setSession(response.data)
        }
      }),
    )
  }

  logout(): void {
    this.clearSession()
    this.router.navigate(["/login"])
  }

  private setSession(loginResponse: LoginResponse): void {
    localStorage.setItem("token", loginResponse.token)
    localStorage.setItem("user", JSON.stringify(loginResponse.usuario))
    localStorage.setItem("permissions", JSON.stringify(loginResponse.permisos))
    localStorage.setItem("departments", JSON.stringify(loginResponse.departamentos))

    this.tokenSubject.next(loginResponse.token)
    this.currentUserSubject.next(loginResponse.usuario)
  }

  private clearSession(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("permissions")
    localStorage.removeItem("departments")

    this.tokenSubject.next(null)
    this.currentUserSubject.next(null)
  }

  private getStoredToken(): string | null {
    return localStorage.getItem("token")
  }

  private validateStoredToken(token: string): void {
    this.http.post<ApiResponse<User>>(`${this.API_URL}/auth/validate-token`, token).subscribe({
      next: (response) => {
        if (response.data) {
          this.tokenSubject.next(token)
          this.currentUserSubject.next(response.data)
        } else {
          this.clearSession()
        }
      },
      error: () => {
        this.clearSession()
      },
    })
  }

  isAuthenticated(): boolean {
    const token = this.getStoredToken()
    return !!token && !this.isTokenExpired(token)
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp < currentTime
    } catch {
      return true
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }

  getToken(): string | null {
    return this.tokenSubject.value
  }

  getUserPermissions(): string[] {
    const permissions = localStorage.getItem("permissions")
    return permissions ? JSON.parse(permissions) : []
  }

  hasPermission(permission: string): boolean {
    const permissions = this.getUserPermissions()
    return permissions.includes(permission)
  }

  hasAnyPermission(permissions: string[]): boolean {
    const userPermissions = this.getUserPermissions()
    return permissions.some((permission) => userPermissions.includes(permission))
  }
}
