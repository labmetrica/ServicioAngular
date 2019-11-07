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
}
