import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  redireccion() {
    swal.fire('si');
    this.router.navigate(['../grupos2/grupos2.component']);
  }

  login(username: string, password: string) {
    return this.http.post(
      'https://reqres.in/api/login',
      {
        email: username,
        password: password
      },
      this.router.navigate(['/grupos'])
    );
  }
}
