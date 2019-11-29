import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../grupos2/user";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private urlEndPoint = "http://localhost:8083/oauth/token";
  private _usuario: User;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) {}

  public get usuario(): User {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      sessionStorage.getItem("usuario") != null
    ) {
      this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as User;
      return this._usuario;
    }
    return new User();
  }
  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem("token") != null) {
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }

  login(usuario: User): Observable<any> {
    const credenciales = btoa("angularapp" + ":" + "12345");
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authotization: "Basic " + credenciales
    });
    let params = new URLSearchParams();
    params.set("username", usuario.username);
    params.set("password", usuario.password);

    return this.http.post<any>(this.urlEndPoint, params.toString(), {
      headers: httpHeaders
    });
  }
  guardarUsuario(access_token: string): void {
    this._usuario = new User();
    let datos = this.obtenerDatosToken(access_token);
    this._usuario.id = datos.id;
    this._usuario.activo = datos.activo;
    this._usuario.nombre = datos.nombre;
    this._usuario.username = datos.user_name; //datos.user_name ?
    this._usuario.apellido = datos.apellido;
    this._usuario.password = datos.password;
    this._usuario.email = datos.email;
    this._usuario.grupo = datos.grupo;
    this._usuario.tipo = datos.tipo;
    this._usuario.roles = datos.authorities; //datos.roles
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario));
  }
  guardarToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem("token", access_token);
  }

  sesionIniciada(): boolean {
    let datos = this.obtenerDatosToken(this.token);
    if (datos != null && datos.user_name && datos.user_name > 0) {
      return true;
    } else return false;
  }

  logout(): void {
    this._usuario = null;
    this._token = null;
    sessionStorage.clear();
    swal.fire("Logout", "Has cerrado sesion con éxito", "success");
    this.router.navigate(["/login"]);
  }

  tieneRol(rol: string): boolean {
    if (this.usuario.roles.includes(rol)) {
      return true;
    }
    return false;
  }

  obtenerDatosToken(access_token: string): any {
    if (access_token == null) {
      return null;
    }
    return JSON.parse(atob(access_token.split(".")[1]));
  }
}
