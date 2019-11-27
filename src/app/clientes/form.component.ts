import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { NgIf } from "@angular/common";
import { stringify } from "querystring";
import { Grupo } from "../grupos2/grupos2";
import { Grupos2Service } from "../grupos2/grupos2.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html"
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public errores: string[];
  grupos: Grupo[];
  cargado: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private grupoService: Grupos2Service
  ) {}

  ngOnInit() {
    this.cargarCliente();
    this.grupoService
      .getGrupos()
      .subscribe(gruposObsv => (this.grupos = gruposObsv));
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id != null) {
        this.cargado = true;
        this.clienteService
          .getCliente(id)
          .subscribe(cliente => (this.cliente = cliente));
      } else {
        this.cargado = false;
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(["/clientes"]);
        swal.fire("El usuario ha sido creado con éxito");
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error("Código error backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(["/clientes"]);
        swal.fire("El usuario ha sido editado");
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error("Código error backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
