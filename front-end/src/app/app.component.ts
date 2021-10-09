import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-myAuth';
  isAuthenticated: boolean;

  constructor(private _authService: AuthService, public oktaAuth: OktaAuthService) {
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/homepage');
  }

  logout() {
    localStorage.clear();
    this.oktaAuth.logout('/');
    location.reload();
    
  }

}
