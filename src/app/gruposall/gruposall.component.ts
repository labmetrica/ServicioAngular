import { Component, OnInit } from '@angular/core';
import { Grupoall } from './gruposall';
import { GruposallService } from './gruposall.service';
import swal from 'sweetalert2';
import { GroupedObservable } from 'rxjs';

@Component({
  selector: 'app-gruposall',
  templateUrl: './gruposall.component.html'
})
export class GruposallComponent implements OnInit {
  Gruposall: Grupoall[];

  constructor(private gruposallService: GruposallService) {}

  ngOnInit() {

    this.gruposallService
      .getGrupos()
      .subscribe(gruposallObsv => (this.Gruposall = gruposallObsv));
  }

  delete(gruposall: Grupoall): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `¿Seguro que desea eliminar al Grupo de las ${gruposall.nombre}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          this.gruposallService.delete(gruposall.id).subscribe(response => {
            this.Gruposall = this.Gruposall.filter(cli => cli !== gruposall);
            swal.fire(
              'Grupo Eliminado!',
              `Grupo de las ${gruposall.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

}
