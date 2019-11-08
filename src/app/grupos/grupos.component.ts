import { Component, OnInit } from '@angular/core';
import { Grupo } from './grupos';
import { GruposService } from './grupos.service';
import swal from 'sweetalert2';
import { GroupedObservable } from 'rxjs';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html'
})
export class GruposComponent implements OnInit {
  Grupos: Grupo[];

  // En el constructor queda inyectado el servicio cliente
  constructor(private gruposService: GruposService) {}

  ngOnInit() {
    // Mediante un observable se espera que los datos
    // del servicio tengan un cambio
    // Mediante una función anonima se recoge ese valor (al exisitir cambio)
    // en la variable clientesObsv y se guarda en la variable clientes
    this.gruposService
      .getGrupos()
      .subscribe(gruposObsv => (this.Grupos = gruposObsv));
  }

  delete(grupos: Grupo): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `¿Seguro que desea eliminar al Grupo de las ${grupos.nombre}?`,
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
          this.gruposService.delete(grupos.id).subscribe(response => {
            this.Grupos = this.Grupos.filter(cli => cli !== grupos);
            swal.fire(
              'Grupo Eliminado!',
              `Grupo de las ${grupos.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

}
