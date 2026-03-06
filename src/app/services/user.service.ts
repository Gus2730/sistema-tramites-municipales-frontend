import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import  { User, CreateUserDto, UpdateUserDto, ApiResponse } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.API_URL)
  }

  getById(cedula: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/${cedula}`)
  }

  getByDepartment(departmentId: number): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.API_URL}/department/${departmentId}`)
  }

  create(user: CreateUserDto): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.API_URL, user)
  }

  update(cedula: string, user: UpdateUserDto): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.API_URL}/${cedula}`, user)
  }

  delete(cedula: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${cedula}`)
  }

  changePassword(cedula: string, newPassword: string): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.API_URL}/${cedula}/change-password`, {
      newPassword,
    })
  }
}
