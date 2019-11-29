import { Component, OnInit } from "@angular/core";
import { Grupo } from "./grupos";
import { Grupos2Service } from "../grupos2/grupos2.service";
import swal from "sweetalert2";
import { GroupedObservable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.component.html",
  styleUrls: ["./grupos.component.css"]
})
export class GruposComponent implements OnInit {
  Grupos: Grupo[];
  nombreRuta: string = "/grupos2/form3";

  constructor(private gruposService: Grupos2Service, private router: Router) {}

  ngOnInit() {
    this.gruposService
      .getGrupos()
      .subscribe(gruposObsv => (this.Grupos = gruposObsv));
  }

  crearRuta(idGrupo: string) {
    var usuarioSeleccionado: string = (<HTMLSelectElement>(
      document.getElementById(`select${idGrupo}`)
    )).value;
    var rutaCompleta: string = `${this.nombreRuta}/${usuarioSeleccionado}`;
    this.router.navigate([rutaCompleta]);
  }

  delete(grupos: Grupo): void {
    swal
      .fire({
        title: "¿Está seguro?",
        text: `¿Seguro que desea eliminar al Grupo de las ${grupos.nombre}?`,
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
        if (result.value) {
          this.gruposService.delete(grupos.id).subscribe(response => {
            this.Grupos = this.Grupos.filter(cli => cli !== grupos);
            swal.fire(
              "Grupo Eliminado!",
              `Grupo de las ${grupos.nombre} eliminado con éxito.`,
              "success"
            );
          });
        }
      });
  }
}
