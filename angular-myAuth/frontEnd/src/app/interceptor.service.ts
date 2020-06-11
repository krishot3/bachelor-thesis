import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem('userData');
    const apiKey = localStorage.getItem('apiKey');
    const oAuth = localStorage.getItem('okta-token-storage');

    if (token) {
    let jwtReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(jwtReq);

  } else if (userData) {
    let basicReq = request.clone({
      setHeaders: {
        Authorization: `Basic ${userData}`
      }
    });
    return next.handle(basicReq);

  } else if (apiKey) {
    let apiKeyReq = request.clone({
      setHeaders: {
        Authorization: `ApiKey ${apiKey}`
      }
    });
    return next.handle(apiKeyReq);
  } else if (oAuth && oAuth !== '{}') {
    let oAuthReq = request.clone({
      setHeaders: {
        Authorization: `Oauth ${oAuth}`
      }
    });
    return next.handle(oAuthReq);
  } 
    return next.handle(request);
  }
}
