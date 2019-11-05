import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { IconoVaderComponent } from './componentes/icono-vader/icono-vader.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { GruposComponent } from './grupos/grupos.component';
import { GruposService } from './grupos/grupos.service';

import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { SubheaderComponent } from './subheader/SubheaderComponent';





registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/grupos', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'grupos', component: GruposComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent }

];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IconoVaderComponent,
    SubheaderComponent,
    ClientesComponent,
    GruposComponent,
    FormComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule

  ],
  providers: [ClienteService, { provide: LOCALE_ID, useValue: 'es' }, GruposService],
  bootstrap: [AppComponent]
})
export class AppModule { }
