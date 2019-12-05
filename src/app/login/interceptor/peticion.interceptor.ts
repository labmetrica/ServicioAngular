import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class PeticionInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes("generarExcel")) {
      const excelReq = req.clone({
        headers: req.headers.set("Content-Type", "application/vnd.ms-excel")
      });
      return next.handle(excelReq);
    }

    return next.handle(req);
  }
}
