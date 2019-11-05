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

  delete(cliente: Cliente): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
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
          this.clienteService.delete(cliente.id).subscribe(response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }
}
