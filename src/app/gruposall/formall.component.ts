import { Component, OnInit } from '@angular/core';
import { Grupoall } from './gruposall';
import { GruposallService } from './gruposall.service';
import { GroupedObservable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-formall',
  templateUrl: './formall.component.html'
})
export class FormallComponent implements OnInit {
  public grupoall: Grupoall = new Grupoall();
  public errores: string[];

  constructor(
    private gruposallService: GruposallService,
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
        this.gruposallService
          .getGrupo(id)
          .subscribe(grupoall => (this.grupoall = grupoall));
      }
    });
  }

  create(): void {
    this.gruposallService.create(this.grupoall).subscribe(
      grupo => {
        this.router.navigate(['/gruposall']);
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
    this.gruposallService.update(this.grupoall).subscribe(
      json => {
        this.router.navigate(['/gruposall']);
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
