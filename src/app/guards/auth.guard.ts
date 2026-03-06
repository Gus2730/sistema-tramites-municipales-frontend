import { Injectable } from "@angular/core"
import  { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import  { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      // Verificar permisos específicos si están definidos en la ruta
      const requiredPermissions = route.data["permissions"] as string[]

      if (requiredPermissions && requiredPermissions.length > 0) {
        if (!this.authService.hasAnyPermission(requiredPermissions)) {
          this.router.navigate(["/dashboard"])
          return false
        }
      }

      return true
    }

    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } })
    return false
  }
}
