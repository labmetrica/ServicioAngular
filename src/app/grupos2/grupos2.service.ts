import { Injectable } from "@angular/core";
import { Grupo } from "./grupos2";
import { User } from "./user";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { Grupos2Component } from "./grupos2.component";
import { saveAs } from "file-saver";
import { LoginService } from "../login/login.service";
import { environment } from "../../environments/environment";

@Injectable()
export class Grupos2Service {
  private urlEndPoint = environment.apiBaseUrl;
  private urlGruposAdminEndpoint = environment.apGruposUrl;
  private urlClienteAdminEndPoint = environment.apiClientesUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sesion: LoginService
  ) {}

  getGrupos(): Observable<Grupo[]> {
    return this.http.get(`${this.urlEndPoint}/lista-horarios`).pipe(
      map(response => {
        let grupos = response as Grupo[];
        return grupos;
      })
    );
  }

  create(grupos: Grupo): Observable<Grupo> {
    return this.http
      .post(`${this.urlGruposAdminEndpoint}/crearGrupo`, grupos)
      .pipe(
        map((response: any) => response.grupos as Grupo),
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

  update(grupos: Grupo): Observable<any> {
    return this.http
      .put<any>(`${this.urlGruposAdminEndpoint}/actualizarGrupo`, grupos)
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
  delete(id: number): Observable<Grupo> {
    return this.http
      .delete<Grupo>(`${this.urlGruposAdminEndpoint}/borrarGrupo/${id}`)
      .pipe(
        catchError(e => {
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  getGrupo(nombre: string): Observable<Grupo> {
    return this.http
      .get<Grupo>(`${this.urlGruposAdminEndpoint}/buscarPorNombre/${nombre}`)
      .pipe(
        catchError(e => {
          this.router.navigate(["/grupos2"]);
          console.log(e.error.message);
          swal.fire("Error al editar", e.error.message, "error");
          return throwError(e);
        })
      );
  }

  updateUser(user: User): Observable<any> {
    swal.fire(`${user.grupo} service`);
    return this.http
      .put<any>(`${this.urlClienteAdminEndPoint}/actualizarUsuario`, user)
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          alert(user.grupo);
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  getCliente(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.urlClienteAdminEndPoint}/buscarPorID/${id}`)
      .pipe(
        catchError(e => {
          this.router.navigate(["/grupo2"]);
          console.log(e.error.message);
          swal.fire("Error al editar", e.error.message, "error");
          return throwError(e);
        })
      );
  }

  createU(user: User): Observable<User> {
    return this.http
      .post(`${this.urlClienteAdminEndPoint}/guardarUsuario`, user)
      .pipe(
        map((response: any) => response.user as User),
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

  guardarExcel(): void {
    this.http
      .get(`${this.urlEndPoint}/generarExcel`, {
        responseType: "arraybuffer"
      })
      .pipe(
        map(response => {
          const data: Blob = new Blob([response], { type: "EXCEL_TYPE" });
          saveAs(data, "horarios.xls");
        })
      )
      .subscribe();
  }
}
