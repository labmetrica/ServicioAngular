import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconoVaderComponent } from './componentes/icono-vader/icono-vader.component';
import { ClientesComponent } from './clientes/clientes.component';
import { SubheaderComponent } from './subheader/SubheaderComponent';
import { LoginComponent } from './login/login.component';
import { Grupos2Component } from './grupos2/grupos2.component';


const routes: Routes = [
{path: 'subheader', component: SubheaderComponent},
{path: 'icono-vader', component: IconoVaderComponent},
{ path: 'clientes', component: ClientesComponent },
{ path: 'login',component: LoginComponent},
{ path: 'grupos2',component: Grupos2Component},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
