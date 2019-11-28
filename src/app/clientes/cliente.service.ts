import { Injectable } from "@angular/core";
import { Cliente } from "./cliente";
import { of, Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { ClientesComponent } from "./clientes.component.js";
import { formatDate, DatePipe } from "@angular/common";
import { LoginService } from "../login/login.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private urlEndPoint = environment.apiBaseUrl;

  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(
    private http: HttpClient,
    private router: Router,
    private sesion: LoginService
  ) {}

  private agregarAutorizacionHeader() {
    let token = this.sesion.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer" + token);
    }
    return this.httpHeaders;
  }

  private isAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(`${this.urlEndPoint}/lista-clientes`).pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(`${this.urlEndPoint}/guardarUsuario`, cliente, {
        headers: this.agregarAutorizacionHeader()
      })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError(e => {
          if (!this.isAutorizado(e)) {
            return throwError(e);
          }
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
      .put<any>(`${this.urlEndPoint}/actualizarUsuario`, cliente, {
        headers: this.agregarAutorizacionHeader()
      })
      .pipe(
        catchError(e => {
          if (!this.isAutorizado(e)) {
            return throwError(e);
          }
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
      .get<Cliente>(`${this.urlEndPoint}/buscarUsuarioPorId/${id}`, {
        headers: this.agregarAutorizacionHeader()
      })
      .pipe(
        catchError(e => {
          if (!this.isAutorizado(e)) {
            return throwError(e);
          }
          this.router.navigate(["/clientes"]);
          console.log(e.error.message);
          swal.fire("Error al editar", e.error.message, "error");
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/borrarUsuario/${id}`, {
        headers: this.agregarAutorizacionHeader()
      })
      .pipe(
        catchError(e => {
          if (!this.isAutorizado(e)) {
            return throwError(e);
          }
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, "error");
          return throwError(e);
        })
      );
  }
}
