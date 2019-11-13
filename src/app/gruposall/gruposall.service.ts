import { Injectable } from '@angular/core';
import { GRUPOSALL } from './gruposall.json';
import { Grupoall } from './gruposall';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import {GruposallComponent} from './gruposall.component'
import { formatDate, DatePipe } from '@angular/common';

import { environment } from '../../environments/environment';

@Injectable()
export class GruposallService {

  private urlEndPoint = 'http://localhost:8083/grupos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private router: Router) {}

  getGrupos(): Observable<Grupoall[]> {
    return this.http.get(`${this.urlEndPoint}/lista-grupos`).pipe(
      map(response => {
        let gruposall = response as Grupoall[];
              return gruposall;
        })
    );
  }

  create(gruposall: Grupoall): Observable<Grupoall> {
    return this.http
      .post(`${this.urlEndPoint}/crearGrupo`, gruposall, {
        headers: this.httpHeaders
      })
      .pipe(
        map((response: any) => response.gruposall as Grupoall),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }

          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  update(gruposall: Grupoall): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/actualizarGrupo`, gruposall, {
        headers: this.httpHeaders
      })
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }

          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getGrupo(id: number): Observable<Grupoall> {
    return this.http.get<Grupoall>(`${this.urlEndPoint}/buscarPorID/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/grupos']);
        console.log(e.error.message);
        swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Grupoall> {
    return this.http
      .delete<Grupoall>(`${this.urlEndPoint}/borrarPorId/${id}`, {
        headers: this.httpHeaders
      })
      .pipe(
        catchError(e => {
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}