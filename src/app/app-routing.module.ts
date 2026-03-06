import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { LoginComponent } from "./components/login/login.component"
import { DashboardComponent } from "./components/dashboard/dashboard.component"
import { TramitesListComponent } from "./components/tramites/tramites-list.component"
import { AuthGuard } from "./guards/auth.guard"

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "tramites",
    component: TramitesListComponent,
    canActivate: [AuthGuard],
    data: { permissions: ["TRA5"] },
  },
  { path: "**", redirectTo: "/dashboard" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
