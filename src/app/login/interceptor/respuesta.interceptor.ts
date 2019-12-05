import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable, throwError, pipe } from "rxjs";
import swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class RespuestaInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {
          this.router.navigate(["/grupos2"]);
        }
        if (e.status == 403) {
          swal.fire(
            "Acceso denegado",
            `No tienes acceso a este recurso `,
            "warning"
          );
          this.router.navigate(["/grupos2"]);
        }
        return throwError(e);
      })
    );
  }
}
