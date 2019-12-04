import { Injectable } from "@angular/core";
import { Grupo } from "./grupos";
import { of, Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { GruposComponent } from "./grupos.component.js";
import { formatDate, DatePipe } from "@angular/common";

import { environment } from "../../environments/environment";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

@Injectable()
export class GruposService {
  private urlEndPoint = environment.apiBaseUrl;
  private urlGruposAdminEndpoint = environment.apGruposUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getGrupos(): Observable<Grupo[]> {
    return this.http.get(`${this.urlEndPoint}/lista-grupos`).pipe(
      map(response => {
        let grupos = response as Grupo[];
        return grupos;
      })
    );
  }

  create(grupos: Grupo): Observable<Grupo> {
    return this.http
      .post(`${this.urlGruposAdminEndpoint}/guardarGrupo`, grupos)
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
    console.log(grupos);
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

  getGrupo(id: number): Observable<Grupo> {
    return this.http
      .get<Grupo>(`${this.urlGruposAdminEndpoint}/buscarPorId/${id}`)
      .pipe(
        catchError(e => {
          this.router.navigate(["/grupos"]);
          console.log(e.error.message);
          swal.fire("Error al editar", e.error.message, "error");
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
}
