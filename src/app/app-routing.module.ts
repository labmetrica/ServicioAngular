import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientesComponent } from "./clientes/clientes.component";
import { LoginComponent } from "./login/login.component";
import { Grupos2Component } from "./grupos2/grupos2.component";
import { GruposComponent } from "./grupos/grupos.component";
import { Form2Component } from "./grupos2/form2.component";
import { Form3Component } from "./grupos2/form3.component";
import { FormComponent } from "./clientes/form.component";
import { Form1Component } from "./grupos/form1.component";
import { AuthGuard } from "./login/guards/auth.guard";
import { RolGuard } from "./login/guards/rol.guard";

const routes: Routes = [
  { path: "", redirectTo: "/grupos2", pathMatch: "full" },
  { path: "clientes", component: ClientesComponent },
  { path: "grupos", component: GruposComponent },
  { path: "clientes/form", component: FormComponent },
  { path: "clientes/form/:id", component: FormComponent },
  { path: "grupos/form1", component: Form1Component },
  { path: "grupos/form1/:id", component: Form1Component },
  { path: "login", component: LoginComponent },
  { path: "grupos2", component: Grupos2Component },
  {
    path: "grupos2/form2",
    component: Form2Component,
    canActivate: [AuthGuard, RolGuard],
    data: { rol: "ROLE_ADMIN" }
  },
  { path: "grupos2/form2/:id", component: Form2Component },
  { path: "grupos2/form3", component: Form3Component },
  { path: "grupos2/form3/:id", component: Form3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
