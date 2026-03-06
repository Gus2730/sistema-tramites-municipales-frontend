import { Component,  OnInit } from "@angular/core"
import  { TramiteService } from "../../services/tramite.service"
import  { AuthService } from "../../services/auth.service"
import  { Tramite, EstadoTramite } from "../../models/tramite.model"
import  { Department } from "../../models/user.model"

@Component({
  selector: "app-tramites-list",
  templateUrl: "./tramites-list.component.html",
  styleUrls: ["./tramites-list.component.scss"],
})
export class TramitesListComponent implements OnInit {
  tramites: Tramite[] = []
  filteredTramites: Tramite[] = []
  loading = false
  error = ""

  // Filtros
  selectedDepartment: number | null = null
  selectedEstado: EstadoTramite | null = null
  searchTerm = ""

  // Paginación
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  // Datos para filtros
  departments: Department[] = []
  estados = [
    { value: 1, label: "Registrado" },
    { value: 2, label: "Iniciado" },
    { value: 3, label: "Anulado" },
    { value: 4, label: "Finalizado" },
    { value: 5, label: "Entregado" },
    { value: 6, label: "Calificado" },
  ]

  constructor(
    private tramiteService: TramiteService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadTramites()
    this.loadUserDepartments()
  }

  loadTramites(): void {
    this.loading = true
    this.error = ""

    this.tramiteService.getAll(this.selectedDepartment || undefined).subscribe({
      next: (response) => {
        this.tramites = response.data
        this.applyFilters()
        this.loading = false
      },
      error: (error) => {
        this.error = error.error?.message || "Error al cargar los trámites"
        this.loading = false
      },
    })
  }

  loadUserDepartments(): void {
    const currentUser = this.authService.getCurrentUser()
    if (currentUser) {
      this.departments = currentUser.departamentos
    }
  }

  applyFilters(): void {
    let filtered = [...this.tramites]

    // Filtro por estado
    if (this.selectedEstado !== null) {
      filtered = filtered.filter((t) => t.estado === this.selectedEstado)
    }

    // Filtro por búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.tipo.toLowerCase().includes(term) ||
          t.clienteNombre.toLowerCase().includes(term) ||
          t.clienteCedula.includes(term),
      )
    }

    this.filteredTramites = filtered
    this.totalItems = filtered.length
    this.currentPage = 1
  }

  onDepartmentChange(): void {
    this.loadTramites()
  }

  onEstadoChange(): void {
    this.applyFilters()
  }

  onSearchChange(): void {
    this.applyFilters()
  }

  clearFilters(): void {
    this.selectedDepartment = null
    this.selectedEstado = null
    this.searchTerm = ""
    this.loadTramites()
  }

  getPaginatedTramites(): Tramite[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    return this.filteredTramites.slice(startIndex, endIndex)
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page
    }
  }

  getEstadoClass(estado: EstadoTramite): string {
    switch (estado) {
      case 1: // Registrado
        return "bg-blue-100 text-blue-800"
      case 2: // Iniciado
        return "bg-yellow-100 text-yellow-800"
      case 3: // Anulado
        return "bg-red-100 text-red-800"
      case 4: // Finalizado
        return "bg-green-100 text-green-800"
      case 5: // Entregado
        return "bg-purple-100 text-purple-800"
      case 6: // Calificado
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  getEstadoLabel(estado: EstadoTramite): string {
    const estadoObj = this.estados.find((e) => e.value === estado)
    return estadoObj?.label || "Desconocido"
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }

  // Expose Math.min to the template
  getMin(a: number, b: number): number {
    return Math.min(a, b)
  }

  canEditTramite(tramite: Tramite): boolean {
    return this.authService.hasPermission("TRA2") && tramite.estado !== 3 // No anulado
  }

  canDeleteTramite(tramite: Tramite): boolean {
    return this.authService.hasPermission("TRA3") && tramite.estado === 1 // Solo registrados
  }

  canFinalizeTramite(tramite: Tramite): boolean {
    return this.authService.hasPermission("TRA4") && (tramite.estado === 1 || tramite.estado === 2)
  }

  editTramite(tramite: Tramite): void {
    // Implementar navegación al formulario de edición
    console.log("Editar trámite:", tramite.id)
  }

  deleteTramite(tramite: Tramite): void {
    if (confirm(`¿Está seguro de que desea anular el trámite ${tramite.tipo}?`)) {
      this.tramiteService.delete(tramite.id).subscribe({
        next: () => {
          this.loadTramites()
        },
        error: (error) => {
          this.error = error.error?.message || "Error al anular el trámite"
        },
      })
    }
  }

  cambiarEstado(tramite: Tramite, nuevoEstado: EstadoTramite): void {
    const observaciones = prompt("Observaciones (opcional):")

    this.tramiteService.cambiarEstado(tramite.id, nuevoEstado, observaciones || undefined).subscribe({
      next: () => {
        this.loadTramites()
      },
      error: (error) => {
        this.error = error.error?.message || "Error al cambiar el estado del trámite"
      },
    })
  }
}
