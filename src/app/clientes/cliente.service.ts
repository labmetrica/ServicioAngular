import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ClientesComponent } from './clientes.component.js';
import { formatDate, DatePipe } from '@angular/common';

import { environment } from '../../environments/environment';

@Injectable()
export class ClienteService {

  //private urlEndPoint = 'http://localhost:8080/api/clientes';

  private urlEndPoint = 'http://localhost:8081/clientes/lista-clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    // Llamada anterior en duro.
    // Puede ser útil para hacer mocks
    // antes de tener el servicio real
    // return of(CLIENTES);

    // Llamada usando un pipe que transforme la respuesta
    // La variable nombre se pasa a mayúsculas
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
         return cliente;
        });
      })
    );
  }
}
