import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import type { Permission, ApiResponse } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  private readonly API_URL = `${environment.apiUrl}/permissions`

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Permission[]>> {
    return this.http.get<ApiResponse<Permission[]>>(this.API_URL)
  }

  getByModule(): Observable<ApiResponse<{ modulo: string; permisos: Permission[] }[]>> {
    return this.http.get<ApiResponse<{ modulo: string; permisos: Permission[] }[]>>(`${this.API_URL}/by-module`)
  }
}
