import { Component, OnInit } from "@angular/core";
import { Grupo } from "./grupos2";
import { User } from "./user";
import { Grupos2Service } from "./grupos2.service";
import swal from "sweetalert2";
import { GroupedObservable } from "rxjs";
import { SelectControlValueAccessor } from "@angular/forms";
import { ClienteService } from "../clientes/cliente.service";

@Component({
  selector: "app-grupos2",
  templateUrl: "./grupos2.component.html",
  styleUrls: ["./grupos2.component.css"]
})
export class Grupos2Component implements OnInit {
  Grupos: Grupo[];
  listaUsuarios: User[];
  user: User[];

  constructor(
    private gruposService: Grupos2Service,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.gruposService
      .getGrupos()
      .subscribe(gruposObsv => (this.Grupos = gruposObsv));
    this.clienteService
      .getClientes()
      .subscribe(clientesObsv => (this.listaUsuarios = clientesObsv));
  }

  updateUser(user: User): void {
    swal
      .fire({
        title: "¿Está seguro?",
        text: `¿Seguro que desea eliminar al usuario ${user.nombre} ${user.apellido} del grupo ${user.grupo}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: false,
        reverseButtons: true
      })
      .then(result => {
        user[user.grupo] == 0;
        swal.fire(`${user.grupo} component`);
        if (result.value) {
          this.gruposService.updateUser(user).subscribe(response => {
            this.user = this.user.filter(cli => cli !== user);
            swal.fire(
              "Usuario Eliminado!",
              `Usuario ${user.nombre} eliminado con éxito.`,
              "success"
            );
          });
        }
      });
  }
}
