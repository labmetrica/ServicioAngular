import { Component, OnInit } from '@angular/core';
import { User } from './grupos2';
import { Grupos2Service } from './grupos2.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html'
})
export class Form3Component implements OnInit {
  public User: User = new User();
  public errores: string[];

  constructor(
    private grupos2service: Grupos2Service,
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
        this.grupos2service
          .getCliente(id)
          .subscribe(User => (this.User = User));
      }
    });
  }

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

  update(): void {
    this.grupos2service.update(this.User).subscribe(
      json => {
        this.router.navigate(['/grupos2']);
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
