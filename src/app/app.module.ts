import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header/header.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { ClientesComponent } from "./clientes/clientes.component";
import { ClienteService } from "./clientes/cliente.service";
import { GruposComponent } from "./grupos/grupos.component";
import { GruposService } from "./grupos/grupos.service";
import { Grupos2Component } from "./grupos2/grupos2.component";
import { Grupos2Service } from "./grupos2/grupos2.service";
import { Form2Component } from "./grupos2/form2.component";
import { Form3Component } from "./grupos2/form3.component";

import { FormComponent } from "./clientes/form.component";
import { Form1Component } from "./grupos/form1.component";
import { FormsModule } from "@angular/forms";
import { SubheaderComponent } from "./subheader/SubheaderComponent";
import { LoginComponent } from "./login/login.component";
import { PeticionInterceptor } from "./login/interceptor/peticion.interceptor";
import { RespuestaInterceptor } from "./login/interceptor/respuesta.interceptor";
import { LoginService } from "./login/login.service";

registerLocaleData(localeEs, "es");

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubheaderComponent,
    ClientesComponent,
    GruposComponent,
    FormComponent,
    Form1Component,
    LoginComponent,
    Grupos2Component,
    Form2Component,
    Form3Component
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    ClienteService,
    LoginService,
    { provide: LOCALE_ID, useValue: "es" },
    GruposService,
    Grupos2Service,
    { provide: HTTP_INTERCEPTORS, useClass: PeticionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RespuestaInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
