import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { User } from "../grupos2/user";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuarioRegistro: User = new User();

  constructor(
    private http: HttpClient,
    private sesion: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.sesion.sesionIniciada()) {
      swal.fire(
        "Login",
        `Hola ${this.sesion.usuario.nombre}, ya estas autentificado`,
        "info"
      );
      this.router.navigate(["/grupos2"]);
    }
  }

  redireccion() {
    swal.fire("si");
    this.router.navigate(["../grupos2/grupos2.component"]);
  }

  login() {
    if (
      this.usuarioRegistro.password == null ||
      this.usuarioRegistro.username == null
    ) {
      swal.fire("Error de Login", "Usuario o contraseña vacios", "error");
    } else {
      this.sesion.login(this.usuarioRegistro).subscribe(
        response => {
          this.sesion.guardarUsuario(response.access_token);
          this.sesion.guardarToken(response.access_token);
          let usuario = this.sesion.usuario;

          this.router.navigate(["/grupos2"]);
          //datos.user_name ?
          swal.fire(
            "Login",
            `Hola ${usuario.nombre}, has iniciado sesion con exito!`,
            "success"
          );
        },
        err => {
          if ((err.status = 400)) {
            swal.fire("Error de Login", "Usuario o clave incorrectas", "error");
            console.log(err);
          }
        }
      );
    }
  }
}
