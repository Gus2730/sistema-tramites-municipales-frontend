import { Component, type OnInit } from "@angular/core"
import type { AuthService } from "../../services/auth.service"
import type { User } from "../../models/user.model"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null
  sidebarOpen = true

  // Estadísticas del dashboard
  stats = {
    tramitesTotal: 1250,
    tramitesPendientes: 85,
    tramitesFinalizados: 1165,
    usuariosActivos: 45,
  }

  // Datos para gráficos
  tramitesPorMes = [
    { mes: "Ene", cantidad: 95 },
    { mes: "Feb", cantidad: 110 },
    { mes: "Mar", cantidad: 125 },
    { mes: "Abr", cantidad: 140 },
    { mes: "May", cantidad: 155 },
    { mes: "Jun", cantidad: 170 },
  ]

  tramitesRecientes = [
    {
      id: 1001,
      tipo: "Licencia de Construcción",
      cliente: "Juan Pérez",
      estado: "En Proceso",
      fecha: new Date("2024-01-15"),
    },
    {
      id: 1002,
      tipo: "Certificado de Residencia",
      cliente: "María González",
      estado: "Finalizado",
      fecha: new Date("2024-01-14"),
    },
    {
      id: 1003,
      tipo: "Permiso Comercial",
      cliente: "Carlos Rodríguez",
      estado: "Pendiente",
      fecha: new Date("2024-01-13"),
    },
  ]

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
    })
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen
  }

  logout(): void {
    this.authService.logout()
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission)
  }

  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case "finalizado":
        return "bg-green-100 text-green-800"
      case "en proceso":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "anulado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  getProgressWidth(cantidad: number): number {
    return (cantidad / 200) * 100
  }
}
