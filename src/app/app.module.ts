import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { IconoVaderComponent } from './componentes/icono-vader/icono-vader.component';
import { EjemploComponent } from './ejemplo/ejemplo.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { GruposComponent } from './grupos/grupos.component';
import { GruposService } from './grupos/grupos.service';





registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/grupos', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'grupos', component: GruposComponent }

];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IconoVaderComponent,
    EjemploComponent,
    ClientesComponent,
    GruposComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService, { provide: LOCALE_ID, useValue: 'es' }, GruposService],
  bootstrap: [AppComponent]
})
export class AppModule { }
