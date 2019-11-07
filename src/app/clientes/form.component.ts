import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe(cliente => (this.cliente = cliente));
      }
    });
  }

  // Método 1: Se recupera desde el subscribe como map transformado a Cliente.
  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire(
          'El usuario ha sido creado con éxito'
        );
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código error backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  // Método 2: Se recupera desde el subscribe con el json completo. Subscribe trabaja con any.
  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        swal.fire(
          'El usuario ha sido editado'
        );
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código error backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
