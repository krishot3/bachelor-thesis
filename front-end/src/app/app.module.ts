import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicAuthComponent } from './basic-auth/basic-auth.component';
import { JwtComponent } from './jwt/jwt.component';
import { AuthService } from './auth.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth.guard';
import { ApiKeyComponent } from './api-key/api-key.component';
import { InterceptorService } from './interceptor.service';
import { PageComponent } from './page/page.component';

const config = {
  issuer: 'https://dev-926171.okta.com/oauth2/aus261jt4waqRdGWf4x6',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa35144283Aq56XK4x6',
  pkce: true
}

@NgModule({
  declarations: [
    AppComponent,
    BasicAuthComponent,
    JwtComponent,
    HomePageComponent,
    ApiKeyComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [AuthService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
