import { Component, OnInit } from '@angular/core';
import { Grupo } from './grupos2';
import { Grupos2Service } from './grupos2.service';
import { GroupedObservable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html'
})
export class Form2Component implements OnInit {
  public grupo: Grupo = new Grupo();
  public errores: string[];

  constructor(
    private gruposService: Grupos2Service,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getGrup();
  }

  getGrup(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.gruposService
          .getGrupo(id)
          .subscribe(grupo => (this.grupo = grupo));
      }
    });
  }

  create(): void {
    this.gruposService.create(this.grupo).subscribe(
      grupo => {
        this.router.navigate(['/grupos2']);
        swal.fire(
          'El grupo ha sido creado con éxito'
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
    this.gruposService.update(this.grupo).subscribe(
      json => {
        this.router.navigate(['/grupos2']);
        swal.fire(
          'El grupo ha sido editado'
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
