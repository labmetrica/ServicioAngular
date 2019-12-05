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
