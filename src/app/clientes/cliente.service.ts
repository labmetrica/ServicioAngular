import { Injectable } from "@angular/core";
import { Cliente } from "./cliente";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { ClientesComponent } from "./clientes.component.js";
import { LoginService } from "../login/login.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private urlEndPoint = environment.apiBaseUrl;
  private urlClienteAdminEndPoint = environment.apiClientesUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sesion: LoginService
  ) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get(`${this.urlEndPoint}/lista-clientes`).pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes;
      })
    );
  }

  getClientesAdmin(): Observable<Cliente[]> {
    return this.http.get(`${this.urlClienteAdminEndPoint}/lista-clientes`).pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes;
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(`${this.urlClienteAdminEndPoint}/guardarUsuario`, cliente)
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlClienteAdminEndPoint}/actualizarUsuario`, cliente)
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http
      .get<Cliente>(`${this.urlClienteAdminEndPoint}/buscarPorID/${id}`)
      .pipe(
        catchError(e => {
          this.router.navigate(["/clientes"]);
          console.log(e.error.message);
          swal.fire("Error al editar", e.error.message, "error");
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlClienteAdminEndPoint}/borrarUsuario/${id}`)
      .pipe(
        catchError(e => {
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, "error");
          return throwError(e);
        })
      );
  }
}
