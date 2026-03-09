import { Component,  OnInit } from "@angular/core"
import  { AuthService } from "../../services/auth.service"
import  { ActivatedRoute } from "@angular/router"
import  { User } from "../../models/user.model"

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null
  sidebarOpen = true
  pageTitle = "Dashboard"

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
    })

    // Actualizar título según la ruta activa
    this.route.firstChild?.params.subscribe(() => {
      this.updatePageTitle()
    })
    this.updatePageTitle()
  }

  private updatePageTitle(): void {
    const child = this.route.firstChild
    if (child?.component) {
      const component = (child.component as any).name
      if (component === "TramitesListComponent") {
        this.pageTitle = "Trámites"
      } else {
        this.pageTitle = "Dashboard"
      }
    } else {
      this.pageTitle = "Dashboard"
    }
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
}
