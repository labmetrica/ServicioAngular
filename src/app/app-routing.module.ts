import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EjemploComponent } from './ejemplo/ejemplo.component';
import { IconoVaderComponent } from './componentes/icono-vader/icono-vader.component';
import { ClientesComponent } from './clientes/clientes.component';


const routes: Routes = [
{path: 'ejemplo', component: EjemploComponent},
{path: 'icono-vader', component: IconoVaderComponent},
{ path: 'clientes', component: ClientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
