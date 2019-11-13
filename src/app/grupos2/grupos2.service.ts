import { Injectable } from '@angular/core';
import { GRUPOS } from './grupos2.json';
import { Grupo, User } from './grupos2';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Grupos2Component} from './grupos2.component'
import { formatDate, DatePipe } from '@angular/common';

import { environment } from '../../environments/environment';

@Injectable()
export class Grupos2Service {

  private urlEndPoint = 'http://localhost:8033/serviceMetrica';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private router: Router) {}

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
      .post(`${this.urlEndPoint}/crearGrupo`, grupos, {
        headers: this.httpHeaders
      })
      .pipe(
        map((response: any) => response.grupos as Grupo),
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

  update(grupos: Grupo): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/actualizarGrupo`, grupos, {
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

  getGrupo(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.urlEndPoint}/buscarPorID/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/grupos2']);
        console.log(e.error.message);
        swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  delete(user: User): Observable<any> {
    swal.fire(`${user.grupo} service`)
    return this.http
      .put<any>(`${this.urlEndPoint}/actualizarUsuario`, user, {
        headers: this.httpHeaders
      })
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          alert(user.grupo)
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}