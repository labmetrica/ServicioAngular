import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  // En el constructor queda inyectado el servicio cliente
  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    // Mediante un observable se espera que los datos
    // del servicio tengan un cambio
    // Mediante una función anonima se recoge ese valor (al exisitir cambio)
    // en la variable clientesObsv y se guarda en la variable clientes
    this.clienteService
      .getClientes()
      .subscribe(clientesObsv => (this.clientes = clientesObsv));
  }
}
