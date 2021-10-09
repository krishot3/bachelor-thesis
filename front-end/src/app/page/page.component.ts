import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  // headers = ["ID", "Name", "Host", "Desc.", "DbHost", "DbUser", "DbPass", "DbName", "JWT", "CompanyID", "Enabled", "ServerID", "Action"];
  headers = ["ID", "Name", "Host", "DbHost", "DbUser", "DbName", "CompanyID", "ServerID", "Action"];
  tableDataArray = [];
  putArray = [];
  postArray = {};
  typeAuth = "";

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this._dataService.getAuth()
      .subscribe(
        res => {
          if(res) {
            this.typeAuth = this._dataService.typeOfAuth();
            this.getTableData();
          }
        },
        err => {
          if(err) {
            this._router.navigate(['/']);
          };
        }
      );
  }

  getTableData() {
    this._dataService.tableData()
      .subscribe(
        res => {
          this.tableDataArray = res;
        },
        err => alert("Error")
      );
  }

  deleteData(id, name) {
    let result = confirm(`Do you want delete ${name}?`);
    if (result) {
      this.deleteDataApp(id);
    }
  }

  deleteDataApp(id) {
    this._dataService.deleteApp(id)
    .subscribe(
      res => {
        alert("Data Deleted");
        location.reload();
      },
      err => {
        alert("Error");
        location.reload();
      }
    );
  }

  putData(id) {
    let obj = this.tableDataArray.find(o => o.id === id);
    this.putArray.length = 0;
    this.putArray.push(obj);
  }

  putDataApp(id) {
    
    this._dataService.putApp(id, this.putArray[0])
        .subscribe(
          res => {
            alert("Data Updated");
            location.reload();
          },
          err => {
            alert("Error");
          }
        );
    }

  postDataApp() {
    console.log(this.postArray)
    this._dataService.postApp(this.postArray)
      .subscribe(
        res => {
          alert("Data Added");
          location.reload();
         },
         err => {
          alert("Error");
         }
      );
  }
  
}
