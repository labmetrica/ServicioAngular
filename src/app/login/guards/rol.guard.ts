import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../login.service";
import swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class RolGuard implements CanActivate {
  constructor(private sesion: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (this.sesion.sesionIniciada()) {
      if (this.isTokenExpirado()) {
        this.sesion.logout();
        this.router.navigate(["/login"]);
        return false;
      }
      return true;
    }

    swal.fire(
      "Acceso denegado",
      `No tienes acceso a este recurso ${this.sesion.usuario.username}`,
      "warning"
    );
    this.router.navigate(["/grupos2"]);
    return false;
  }

  isTokenExpirado(): boolean {
    let token = this.sesion.token;
    let datos = this.sesion.obtenerDatosToken(token);
    let ahora = new Date().getTime() / 1000;
    if (datos.exp < ahora) {
      return true;
    }
    return false;
  }
}
