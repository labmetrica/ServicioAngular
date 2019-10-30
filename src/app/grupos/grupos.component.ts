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
}
