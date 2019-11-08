import { Injectable } from '@angular/core';
import { GRUPOS } from './grupos.json.js';
import { Grupo } from './grupos';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import {GruposComponent} from './grupos.component.js'
import { formatDate, DatePipe } from '@angular/common';

import { environment } from '../../environments/environment';

@Injectable()
export class GruposService {

  private urlEndPoint = 'http://localhost:8083/grupos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private router: Router) {}

  getGrupos(): Observable<Grupo[]> {
    // Llamada anterior en duro.
    // Puede ser útil para hacer mocks
    // antes de tener el servicio real
    // return of(CLIENTES);

    // Llamada usando un pipe que transforme la respuesta
    // La variable nombre se pasa a mayúsculas
    return this.http.get(`${this.urlEndPoint}/lista_grupos`).pipe(
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
        // Se captura un error en el pipe
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
      .put<any>(`${this.urlEndPoint}/actulizar/${grupos.id}`, grupos, {
        headers: this.httpHeaders
      })
      .pipe(
        // Se captura un error en el pipe
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
    return this.http.get<Grupo>(`${this.urlEndPoint}/grupo/${id}`).pipe(
      // Se captura un error en el pipe
      catchError(e => {
        // Redireccion a clientes
        this.router.navigate(['/grupos']);
        console.log(e.error.message);
        swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Grupo> {
    return this.http
      .delete<Grupo>(`${this.urlEndPoint}/borrarPorId/${id}`, {
        headers: this.httpHeaders
      })
      .pipe(
        // Se captura un error en el pipe
        catchError(e => {
          console.log(e.error.message);
          swal.fire(e.error.message, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}