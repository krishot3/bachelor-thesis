import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = "http://localhost:3000/login/"
  private delUrl = "http://localhost:3000/logoutApiKey"
  constructor(private http: HttpClient, private _router: Router) { }

  authPost(login, password, body) {
    let userData = login + ":" + password;
    return this.http.post<any>(this._url, body, {headers: new HttpHeaders().set('Authorization', `Basic ${btoa(userData)}`)});
  }

  basicLoggedIn() {
    return !!localStorage.getItem('userData');
  }

  loggedOutBasic() {
    // localStorage.removeItem('userData');
    localStorage.clear();
    location.reload();
  }

  jwtLoggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedOutJwt() {
    // localStorage.removeItem('token');
    localStorage.clear();
    location.reload();
  }

  apikLoggedIn() {
    return !!localStorage.getItem('apiKey');
  }

  apiKeyDelete() {
    let apiKey = localStorage.getItem('apiKey');
    return this.http.patch<any>(this.delUrl, {apikey: apiKey});
  }

  apiKeyLogout() {
    this.apiKeyDelete()
      .subscribe(
      res => {
        if(res){
          // localStorage.removeItem('apiKey');
          localStorage.clear();
          location.reload();
        };
      },
      err => alert("Error")
    );
  }

  oAuthLoggedIn() {
    return !!localStorage.getItem('okta-token-storage');
  }

}
