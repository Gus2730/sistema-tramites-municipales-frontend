import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import type { Department, CreateDepartmentDto, UpdateDepartmentDto, ApiResponse } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  private readonly API_URL = `${environment.apiUrl}/departments`

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Department[]>> {
    return this.http.get<ApiResponse<Department[]>>(this.API_URL)
  }

  getActive(): Observable<ApiResponse<Department[]>> {
    return this.http.get<ApiResponse<Department[]>>(`${this.API_URL}/active`)
  }

  getById(id: number): Observable<ApiResponse<Department>> {
    return this.http.get<ApiResponse<Department>>(`${this.API_URL}/${id}`)
  }

  create(department: CreateDepartmentDto): Observable<ApiResponse<Department>> {
    return this.http.post<ApiResponse<Department>>(this.API_URL, department)
  }

  update(id: number, department: UpdateDepartmentDto): Observable<ApiResponse<Department>> {
    return this.http.put<ApiResponse<Department>>(`${this.API_URL}/${id}`, department)
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
  }
}
