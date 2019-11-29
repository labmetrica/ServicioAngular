import { Injectable } from "@angular/core";
import { Grupo } from "./grupos2";
import { User } from "./user";
import { of, Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { Grupos2Component } from "./grupos2.component";
import { formatDate, DatePipe } from "@angular/common";
import { saveAs } from "file-saver";
import { LoginService } from "../login/login.service";
import { environment } from "../../environments/environment";

@Injectable()
export class Grupos2Service {
  private urlEndPoint = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sesion: LoginService
  ) {}

  private isAutorizado(e): boolean {
    if (e.status == 401) {
      this.router.navigate(["/grupos2"]);
      if (!this.sesion.sesionIniciada()) {
        this.sesion.logout();
      }
      return false;
    }
    if (e.status == 403) {
      swal.fire(
        "Acceso denegado",
        `No tienes acceso a este recurso ${this.sesion.usuario.username}`,
        "warning"
      );
      this.router.navigate(["/grupos2"]);
      return false;
    }
    return true;
  }

  getGrupos(): Observable<Grupo[]> {
    return this.http.get(`${this.urlEndPoint}/lista-horarios`).pipe(
      map(response => {
        let grupos = response as Grupo[];
        return grupos;
      })
    );
  }

  create(grupos: Grupo): Observable<Grupo> {
    return this.http.post(`${this.urlEndPoint}/guardarGrupo`, grupos).pipe(
      map((response: any) => response.grupos as Grupo),
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

  update(grupos: Grupo): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/actualizarGrupo`, grupos)
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
  delete(id: number): Observable<Grupo> {
    return this.http
      .delete<Grupo>(`${this.urlEndPoint}/borrarGrupo/${id}`)
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

  getGrupo(nombre: string): Observable<Grupo> {
    return this.http
      .get<Grupo>(`${this.urlEndPoint}/buscarGrupoPorNombre/${nombre}`)
      .pipe(
        catchError(e => {
          if (!this.isAutorizado(e)) {
            return throwError(e);
          }
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
      .put<any>(`${this.urlEndPoint}/actualizarUsuario`, user)
      .pipe(
        catchError(e => {
          if (!this.isAutorizado(e)) {
            return throwError(e);
          }
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
      .get<User>(`${this.urlEndPoint}/buscarUsuarioPorId/${id}`)
      .pipe(
        catchError(e => {
          if (!this.isAutorizado(e)) {
            return throwError(e);
          }
          this.router.navigate(["/grupo2"]);
          console.log(e.error.message);
          swal.fire("Error al editar", e.error.message, "error");
          return throwError(e);
        })
      );
  }

  createU(user: User): Observable<User> {
    return this.http.post(`${this.urlEndPoint}/guardarUsuario`, user).pipe(
      map((response: any) => response.user as User),
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
