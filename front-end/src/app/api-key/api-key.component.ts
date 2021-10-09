import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-key',
  templateUrl: './api-key.component.html',
  styleUrls: ['./api-key.component.css']
})
export class ApiKeyComponent implements OnInit {

  apikUsername = "";
  apikPassword = "";
  body = {"basic": "no", "jwt": "no", "apikey": "yes"};

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  apiKeyLogin() {
    this._auth.authPost(this.apikUsername, this.apikPassword, this.body)
      .subscribe(
        res => {
          localStorage.setItem('apiKey', res.apiKey);
           this._router.navigate(['/homepage']);
        },
        err => alert("Error")
      );
  }

}
