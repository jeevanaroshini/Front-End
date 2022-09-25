import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  transactionData:any
  constructor(private dbshttp:HttpClient) { }

  ngOnInit(): void {
    let response = this.dbshttp.get("http://localhost:8080/log",{responseType:'text' as 'json'});
    response.subscribe((data)=>{
this.transactionData= data;
console.log(this.transactionData[0].cusId)
    })
    
  
  }
 

 

}
