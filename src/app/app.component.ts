import { Component } from "@angular/core";
import { Grupos2Service } from "./grupos2/grupos2.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  animations: [
    // animation triggers go here
  ]
})
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "";
  constructor(private servicio: Grupos2Service) {}

  Excel(): void {
    this.servicio.guardarExcel();
  }
}
/*

obtenerExcel() {
  const options = new RequestOptions({
    responseType: ResponseContentType.Blob
  });

  return this.http.get(`${this.urlEndPoint}/guardarUsuario`, options);
}
}
  this.servicio.guardarExcel();
}
}

this.http
.get(url)
.map((response: Response) => {
  // response.arrayBuffer()   // returns body as an ArrayBuffer
  // response.blob()          // returns body as a Blob
  return response.text();
})
.subscribe((data: string) => {
  console.log(data);
});*/
