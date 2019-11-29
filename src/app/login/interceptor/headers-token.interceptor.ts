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
export class TokenInterceptor implements HttpInterceptor {
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

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
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
