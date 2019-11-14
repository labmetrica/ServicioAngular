import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Grupo } from './grupos2';
import { Grupos2Service } from './grupos2.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html'
})
export class Form2Component implements OnInit {

  public User: User = new User();
  public errores: string[];
  Grupos: Grupo[];
  user: Grupo;
  grupoSuelto: Grupo;

  constructor(
    private grupos2service: Grupos2Service,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.grupos2service
      .getGrupos()
      .subscribe(gruposObsv => (this.Grupos = gruposObsv));
  }

  getGrup(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.grupos2service
          .getGrupo(id)
          .subscribe(Grupo => (this.grupoSuelto = Grupo));
      }
    });
  }
  
  create(): void {
    this.grupos2service.createU(this.User).subscribe(
      user => {
        this.router.navigate(['/grupos2']);
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

}
