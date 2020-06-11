import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ɵangular_packages_router_router_e, Router } from '@angular/router';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.css']
})
export class JwtComponent implements OnInit {

  jwtUsername = "";
  jwtPassword = "";
  body = {"basic": "no", "jwt": "yes", "apikey": "no"};

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  jwtLogin() {
    this._auth.authPost(this.jwtUsername, this.jwtPassword, this.body)
    .subscribe(
          res => {
            localStorage.setItem('token', res.token);
            this._router.navigate(['/homepage']);
          },
          err => alert("Error")
        );
  }

}
