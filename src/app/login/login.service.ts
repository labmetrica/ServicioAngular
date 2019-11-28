import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { User } from "../grupos2/user";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private urlEndPoint = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(usuario: User): Observable<any> {
    const credenciales = btoa("");
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authotization: "Basic " + credenciales
    });
    let params = new URLSearchParams();
    params.set("username", usuario.nombre);
    params.set("password", usuario.contrasenya);

    return this.http.post<any>(this.urlEndPoint, params.toString(), {
      headers: httpHeaders
    });
  }
}
