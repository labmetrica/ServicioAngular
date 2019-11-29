import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { LoginService } from "../login.service";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class PeticionInterceptor implements HttpInterceptor {
  constructor(private sesion: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.sesion.token;

    if (token != null) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer" + token)
      });
      if (req.url.includes("generarExcel")) {
        const excelReq = req.clone({
          headers: req.headers.set("Content-Type", "application/vnd.ms-excel")
        });
        return next.handle(excelReq);
      }
      return next.handle(authReq);
    }
    if (req.url.includes("generarExcel")) {
      const excelReq = req.clone({
        headers: req.headers.set("Content-Type", "application/vnd.ms-excel")
      });
      return next.handle(excelReq);
    }
    return next.handle(req);
  }
}
