import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-auth',
  templateUrl: './basic-auth.component.html',
  styleUrls: ['./basic-auth.component.css']
})
export class BasicAuthComponent implements OnInit {

  basicUsername = "";
  basicPassword = "";
  body = {"basic": "yes", "jwt": "no", "apikey": "no"};

  constructor(private _auth: AuthService,private _router: Router) { }

  ngOnInit() {
  }

   
  basicAuthLogin() {
    this._auth.authPost(this.basicUsername, this.basicPassword, this.body)
        .subscribe(
          res => {
           localStorage.setItem('userData', res.userData);
           this._router.navigate(['/homepage']);
          },
          err => {
            alert("Error");
          }
        );
    }

}
