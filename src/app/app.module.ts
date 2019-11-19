import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { GruposComponent } from './grupos/grupos.component';
import { GruposService } from './grupos/grupos.service';
import { GruposallComponent } from './gruposall/gruposall.component';
import { GruposallService } from './gruposall/gruposall.service';
import { Grupos2Component } from './grupos2/grupos2.component';
import { Grupos2Service } from './grupos2/grupos2.service';
import { Form2Component } from './grupos2/form2.component';
import { Form3Component } from './grupos2/form3.component';




import { FormComponent } from './clientes/form.component';
import { Form1Component } from './grupos/form1.component';
import { FormsModule } from '@angular/forms';
import { SubheaderComponent } from './subheader/SubheaderComponent';
<<<<<<< HEAD
=======
import { LoginComponent } from './login/login.component';
import { FormallComponent } from './gruposall/formall.component';




>>>>>>> 72a8d50119b39565e6761f5237470b6f432f8969

registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/grupos', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'grupos', component: GruposComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  { path: 'grupos/form1', component: Form1Component },
<<<<<<< HEAD
  { path: 'grupos/form1/:id', component: Form1Component }
=======
  { path: 'grupos/form1/:id', component: Form1Component },
  { path: 'login', component: LoginComponent },
  { path: 'gruposall', component: GruposallComponent },
  { path: 'gruposall/formall', component: FormallComponent },
  { path: 'gruposall/formall/:id', component: FormallComponent },
  { path: 'grupos2', component: Grupos2Component },
  { path: 'grupos2/form2', component: Form2Component },
  { path: 'grupos2/form2/:id', component: Form2Component },
  { path: 'grupos2/form3', component: Form3Component },
  { path: 'grupos2/form3/:id', component: Form3Component },

>>>>>>> 72a8d50119b39565e6761f5237470b6f432f8969
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubheaderComponent,
    ClientesComponent,
    GruposComponent,
    FormComponent,
<<<<<<< HEAD
    Form1Component
=======
    Form1Component,
    LoginComponent,
    GruposallComponent,
    FormallComponent,
    Grupos2Component,
    Form2Component,
    Form3Component,

    
>>>>>>> 72a8d50119b39565e6761f5237470b6f432f8969
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
<<<<<<< HEAD
    FormsModule
  ],
  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: 'es' },
    GruposService
  ],
=======
    FormsModule,

  ],
  providers: [ClienteService, { provide: LOCALE_ID, useValue: 'es' }, GruposService, GruposallService, Grupos2Service],
>>>>>>> 72a8d50119b39565e6761f5237470b6f432f8969
  bootstrap: [AppComponent]
})
export class AppModule {}
