import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  getId: number = 0;
  getId2: number = 0;
  dataApps = [];
  dataServers = [];
  // headers = ["ID", "Name", "Host", "Desc.", "DbHost", "DbUser", "DbPass", "DbName", "JWT", "CompanyID", "Enabled", "ServerID"];
  headers = ["ID", "Name", "Host", "DbHost", "DbUser", "DbName", "CompanyID", "ServerID"];
  headers2 = ["ID", "Name", "ApiSchema", "ApiPort", "ApiEndpoint", "ThisInstance"];
  typeAuth = "";

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this._dataService.getAuth()
      .subscribe(
        res => console.log(res),
        err => {
          if(err) {
            this._router.navigate(['/']);
          };
        }
      )
  }

  getDataApp() {
    this.typeAuth = this._dataService.typeOfAuth();
    this._dataService.getApp(this.getId)
        .subscribe(
          res => {

            this.dataApps.length = 0;
           this.dataApps.push(res[0].apps);
           console.log(this.dataApps);

           this.dataServers.length = 0;
           this.dataServers.push(res[0].servers);

          },
          err => {
            alert("Error");
          }
        );
    }

}
