import { Component } from "@angular/core";
import { Grupos2Service } from "./grupos2/grupos2.service";
import { LoginService } from "./login/login.service";

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
  constructor(private servicio: Grupos2Service, private sesion: LoginService) {}

  logout(): void {
    this.sesion.logout();
  }
  Excel(): void {
    this.servicio.guardarExcel();
  }
}
