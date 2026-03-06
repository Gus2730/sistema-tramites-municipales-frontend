import { Injectable } from "@angular/core"
import { type HttpClient, HttpParams } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import type { ApiResponse } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class ReporteService {
  private readonly API_URL = `${environment.apiUrl}/reportes`

  constructor(private http: HttpClient) {}

  getTramitesPorUsuario(fechaInicio?: Date, fechaFin?: Date): Observable<ApiResponse<any[]>> {
    let params = new HttpParams()
    if (fechaInicio) {
      params = params.set("fechaInicio", fechaInicio.toISOString())
    }
    if (fechaFin) {
      params = params.set("fechaFin", fechaFin.toISOString())
    }
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/tramites-por-usuario`, { params })
  }

  getTramitesPorFechas(fechaInicio: Date, fechaFin: Date): Observable<ApiResponse<any[]>> {
    const params = new HttpParams()
      .set("fechaInicio", fechaInicio.toISOString())
      .set("fechaFin", fechaFin.toISOString())
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/tramites-por-fechas`, { params })
  }

  getTramitesPorTipos(fechaInicio?: Date, fechaFin?: Date): Observable<ApiResponse<any[]>> {
    let params = new HttpParams()
    if (fechaInicio) {
      params = params.set("fechaInicio", fechaInicio.toISOString())
    }
    if (fechaFin) {
      params = params.set("fechaFin", fechaFin.toISOString())
    }
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/tramites-por-tipos`, { params })
  }

  getTramitesPorEstados(fechaInicio?: Date, fechaFin?: Date): Observable<ApiResponse<any[]>> {
    let params = new HttpParams()
    if (fechaInicio) {
      params = params.set("fechaInicio", fechaInicio.toISOString())
    }
    if (fechaFin) {
      params = params.set("fechaFin", fechaFin.toISOString())
    }
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/tramites-por-estados`, { params })
  }

  getTramitesPorDepartamentos(fechaInicio?: Date, fechaFin?: Date): Observable<ApiResponse<any[]>> {
    let params = new HttpParams()
    if (fechaInicio) {
      params = params.set("fechaInicio", fechaInicio.toISOString())
    }
    if (fechaFin) {
      params = params.set("fechaFin", fechaFin.toISOString())
    }
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/tramites-por-departamentos`, { params })
  }

  getTramitesPorCliente(clienteCedula?: string, fechaInicio?: Date, fechaFin?: Date): Observable<ApiResponse<any[]>> {
    let params = new HttpParams()
    if (clienteCedula) {
      params = params.set("clienteCedula", clienteCedula)
    }
    if (fechaInicio) {
      params = params.set("fechaInicio", fechaInicio.toISOString())
    }
    if (fechaFin) {
      params = params.set("fechaFin", fechaFin.toISOString())
    }
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/tramites-por-cliente`, { params })
  }

  getTransacciones(
    fechaInicio?: Date,
    fechaFin?: Date,
    userCedula?: string,
    modulo?: string,
  ): Observable<ApiResponse<any[]>> {
    let params = new HttpParams()
    if (fechaInicio) {
      params = params.set("fechaInicio", fechaInicio.toISOString())
    }
    if (fechaFin) {
      params = params.set("fechaFin", fechaFin.toISOString())
    }
    if (userCedula) {
      params = params.set("userCedula", userCedula)
    }
    if (modulo) {
      params = params.set("modulo", modulo)
    }
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/transacciones`, { params })
  }

  getAlertasFavoritismo(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/alertas-favoritismo`)
  }

  getDashboardMetricas(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.API_URL}/dashboard-metricas`)
  }
}
