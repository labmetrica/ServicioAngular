import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { from } from "rxjs";
import swal from "sweetalert2";
import { User } from "../grupos2/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  router: any;
  usuario: User = new User();
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  redireccion() {
    swal.fire("si");
    this.router.navigate(["../grupos2/grupos2.component"]);
  }

  login(username: string, password: string) {
    if (this.usuario.contrasenya == null || this.usuario.nombre == null) {
      swal.fire("Error de Login", "Usuario o contraseña vacios", "error");
    }
    return this.http.post(
      "https://reqres.in/api/login",
      {
        email: username,
        password: password
      },
      this.router.navigate(["/grupos"])
    );
  }
}
