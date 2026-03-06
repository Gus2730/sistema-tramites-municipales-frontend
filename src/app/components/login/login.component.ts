import { Component,  OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { Router, ActivatedRoute } from "@angular/router"
import  { AuthService } from "../../services/auth.service"
import  { LoginRequest } from "../../models/user.model"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  error = ""
  returnUrl = ""
  currentYear = new Date().getFullYear()
  showPassword = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.formBuilder.group({
      cedula: ["", [Validators.required, Validators.maxLength(10)]],
      contrasena: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    // Obtener la URL de retorno
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard"

    // Redirigir si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl])
    }
  }

  get f() {
    return this.loginForm.controls
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched()
      return
    }

    this.loading = true
    this.error = ""

    const credentials: LoginRequest = {
      cedula: this.f["cedula"].value,
      contrasena: this.f["contrasena"].value,
    }

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.loading = false
        this.router.navigate([this.returnUrl])
      },
      error: (error) => {
        this.loading = false
        this.error = error.error?.message || "Error al iniciar sesión. Intente nuevamente."
      },
    })
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key)
      control?.markAsTouched()
    })
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName)

    if (field?.errors && field.touched) {
      if (field.errors["required"]) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`
      }
      if (field.errors["maxlength"]) {
        return `${this.getFieldDisplayName(fieldName)} debe tener máximo ${field.errors["maxlength"].requiredLength} caracteres`
      }
      if (field.errors["minlength"]) {
        return `${this.getFieldDisplayName(fieldName)} debe tener mínimo ${field.errors["minlength"].requiredLength} caracteres`
      }
    }

    return ""
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      cedula: "La cédula",
      contrasena: "La contraseña",
    }

    return displayNames[fieldName] || fieldName
  }
}
