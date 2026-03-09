import { Component, OnInit } from "@angular/core"
import { AuthService } from "../../services/auth.service"
import { TramiteService } from "../../services/tramite.service"
import { User } from "../../models/user.model"

interface Stats {
  tramitesTotal: number
  tramitesPendientes: number
  tramitesFinalizados: number
  usuariosActivos: number
}

interface TramitePorMes {
  mes: string
  cantidad: number
}

interface TramiteReciente {
  id: string
  tipo: string
  cliente: string
  fecha: string
  estado: string
}

@Component({
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.scss"],
})
export class DashboardHomeComponent implements OnInit {
  currentUser: User | null = null
  stats: Stats = {
    tramitesTotal: 0,
    tramitesPendientes: 0,
    tramitesFinalizados: 0,
    usuariosActivos: 0,
  }
  tramitesPorMes: TramitePorMes[] = []
  tramitesRecientes: TramiteReciente[] = []

  constructor(
    private authService: AuthService,
    private tramiteService: TramiteService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser()
    this.loadStats()
    this.loadTramitesPorMes()
    this.loadTramitesRecientes()
  }

  private loadStats(): void {
    this.stats = {
      tramitesTotal: 45,
      tramitesPendientes: 12,
      tramitesFinalizados: 30,
      usuariosActivos: 8,
    }
  }

  private loadTramitesPorMes(): void {
    this.tramitesPorMes = [
      { mes: "Ene", cantidad: 12 },
      { mes: "Feb", cantidad: 19 },
      { mes: "Mar", cantidad: 8 },
      { mes: "Abr", cantidad: 15 },
      { mes: "May", cantidad: 10 },
      { mes: "Jun", cantidad: 14 },
    ]
  }

  private loadTramitesRecientes(): void {
    this.tramitesRecientes = [
      {
        id: "1",
        tipo: "Solicitud de Documento",
        cliente: "Juan Pérez",
        fecha: "2024-01-15",
        estado: "En Progreso",
      },
      {
        id: "2",
        tipo: "Permiso de Construcción",
        cliente: "María García",
        fecha: "2024-01-14",
        estado: "Completado",
      },
      {
        id: "3",
        tipo: "Cambio de Domicilio",
        cliente: "Carlos López",
        fecha: "2024-01-13",
        estado: "En Progreso",
      },
    ]
  }

  getProgressWidth(cantidad: number): number {
    const max = Math.max(...this.tramitesPorMes.map((item) => item.cantidad))
    return (cantidad / max) * 100
  }

  getEstadoClass(estado: string): string {
    const classes: { [key: string]: string } = {
      "En Progreso": "bg-yellow-100 text-yellow-800",
      Completado: "bg-green-100 text-green-800",
      Rechazado: "bg-red-100 text-red-800",
    }
    return classes[estado] || "bg-gray-100 text-gray-800"
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString("es-ES")
  }
}
