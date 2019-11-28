import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { from } from "rxjs";
import swal from "sweetalert2";
import { User } from "../grupos2/user";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  router: any;
  usuarioRegistro: User = new User();
  constructor(private http: HttpClient, private sesion: LoginService) {}

  ngOnInit() {}

  redireccion() {
    swal.fire("si");
    this.router.navigate(["../grupos2/grupos2.component"]);
  }

  login() {
    if (
      this.usuarioRegistro.contrasenya == null ||
      this.usuarioRegistro.nombre == null
    ) {
      swal.fire("Error de Login", "Usuario o contraseña vacios", "error");
    }

    this.sesion.login(this.usuarioRegistro).subscribe(response => {
      console.log(response);
      console.log(response.access_token.split("."));
      this.router.navigate(["/grupos2"]);
      swal.fire(
        "Login",
        `Hola ${response.nombre}, has iniciado sesion con exito!`,
        "success"
      );
    });
    /*return this.http.post(
      "https://reqres.in/api/login",
      {
        email: this.usuario.nombre,
        password: this.usuario.contrasenya
      },
      this.router.navigate(["/grupos"])
    );*/
  }
}
