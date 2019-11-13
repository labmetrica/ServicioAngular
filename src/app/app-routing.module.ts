import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { SubheaderComponent } from './subheader/SubheaderComponent';

const routes: Routes = [
  { path: 'subheader', component: SubheaderComponent },
  { path: 'clientes', component: ClientesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
