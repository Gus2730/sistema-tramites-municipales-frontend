import { Injectable } from "@angular/core"
import { type HttpClient, HttpParams } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import type { Tramite, CreateTramite, UpdateTramite, TipoTramite, EstadoTramite } from "../models/tramite.model"
import type { ApiResponse } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class TramiteService {
  private readonly API_URL = `${environment.apiUrl}/tramites`

  constructor(private http: HttpClient) {}

  getAll(departmentId?: number): Observable<ApiResponse<Tramite[]>> {
    let params = new HttpParams()
    if (departmentId) {
      params = params.set("departmentId", departmentId.toString())
    }
    return this.http.get<ApiResponse<Tramite[]>>(this.API_URL, { params })
  }

  getById(id: number): Observable<ApiResponse<Tramite>> {
    return this.http.get<ApiResponse<Tramite>>(`${this.API_URL}/${id}`)
  }

  getByCliente(clienteCedula: string): Observable<ApiResponse<Tramite[]>> {
    return this.http.get<ApiResponse<Tramite[]>>(`${this.API_URL}/cliente/${clienteCedula}`)
  }

  create(tramite: CreateTramite): Observable<ApiResponse<Tramite>> {
    return this.http.post<ApiResponse<Tramite>>(this.API_URL, tramite)
  }

  update(id: number, tramite: UpdateTramite): Observable<ApiResponse<Tramite>> {
    return this.http.put<ApiResponse<Tramite>>(`${this.API_URL}/${id}`, tramite)
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
  }

  cambiarEstado(id: number, nuevoEstado: EstadoTramite, observaciones?: string): Observable<ApiResponse<Tramite>> {
    return this.http.patch<ApiResponse<Tramite>>(`${this.API_URL}/${id}/estado`, {
      nuevoEstado,
      observaciones,
    })
  }

  verificarRequisito(
    tramiteId: number,
    requisitoId: number,
    presentado: boolean,
    observaciones?: string,
  ): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.API_URL}/${tramiteId}/requisitos/${requisitoId}/verificar`, {
      presentado,
      observaciones,
    })
  }

  getTiposTramite(): Observable<ApiResponse<TipoTramite[]>> {
    return this.http.get<ApiResponse<TipoTramite[]>>(`${environment.apiUrl}/tipos-tramite`)
  }
}
