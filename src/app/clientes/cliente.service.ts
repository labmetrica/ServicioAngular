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

@Injectable()
export class ClienteService {

  private urlEndPoint = 'http://localhost:8083/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    // Llamada anterior en duro.
    // Puede ser útil para hacer mocks
    // antes de tener el servicio real
    // return of(CLIENTES);

    // Llamada usando un pipe que transforme la respuesta
    // La variable nombre se pasa a mayúsculas
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

  // Método 1: Se recupera desde el subscribe como map transformado a Cliente.
  // El post no devuelve nada por defecto ....post(this...
  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(`${this.urlEndPoint}/guardarUsuario`, cliente, {
        headers: this.httpHeaders
      })
      .pipe(
        map((response: any) => response.cliente as Cliente),
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

 // Método 2: Se recupera desde el subscribe con el json completo. Subscribe trabaja con any.
  // El put devuelve any por defecto ....put<any>(this...
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/buscarPorID/${cliente.id}`, cliente, {
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

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/buscarPorID/${id}`).pipe(
      // Se captura un error en el pipe
      catchError(e => {
        // Redireccion a clientes
        this.router.navigate(['/clientes']);
        console.log(e.error.message);
        swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/borrarUsuario/${id}`, {
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
