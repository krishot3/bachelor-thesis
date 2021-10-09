import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicAuthComponent } from './basic-auth/basic-auth.component';
import { JwtComponent } from './jwt/jwt.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth.guard';
import { ApiKeyComponent } from './api-key/api-key.component';
import { PageComponent } from './page/page.component';
import { OktaCallbackComponent } from '@okta/okta-angular';


const routes: Routes = [
  {
    path: 'basicauth',
    component: BasicAuthComponent
  },
  {
    path: 'jwt',
    component: JwtComponent
  },
  {
    path: 'apikey',
    component: ApiKeyComponent
  },
  {
    path: 'homepage',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'page',
    component: PageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
