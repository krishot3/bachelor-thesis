import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private _url = "http://localhost:3000/nsoric/auth/application/";
  private _urlAuth = "http://localhost:3000/login-redirect/";
  private urlTable = "http://localhost:3000/tabledata";

  getAuth() {
    return this.http.get<any>(this._urlAuth);
  }

  tableData() {
    return this.http.get<any>(this.urlTable);
  }

  getApp(id: number) {
    return this.http.get<any>(`${this._url}${id}`);
  }

  deleteApp(id: number) {
    return this.http.delete<any>(`${this._url}${id}`);
  }

  putApp(id: number, body) {
    return this.http.put<any>(`${this._url}${id}`, body);
  }

  postApp(body) {
    return this.http.post<any>(this._url, body);
  }

  typeOfAuth() {
    let auth = "Authorization: "
    if (!!localStorage.getItem('token') == true) {
      return  auth + "Bearer " + localStorage.getItem('token');
    } else if (!!localStorage.getItem('userData') == true) {
      return  auth + "Basic " + localStorage.getItem('userData');
    } else if (!!localStorage.getItem('apiKey') == true) {
      return  auth + "ApiKey " + localStorage.getItem('apiKey');;
    } 
    // else if (!!localStorage.getItem('okta-token-storage') == true) {
    //   let token = localStorage.getItem('okta-token-storage');
    //   let token2 = token.substring(31);
    //   const oAuth = token2.split('"')[0];
    //   return  auth + "OAuth " + oAuth;
    // }
  }

}
