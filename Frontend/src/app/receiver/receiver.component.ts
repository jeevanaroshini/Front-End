import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  username: string = '';
  userName: string = '';
  amount:number=0;
  clickme() {
    console.log(this.username);
  }

  constructor(private dbshttps:HttpClient) { }

  ngOnInit(): void {
  }
  userdata:any
  cusdata:any

  getCustomerDetails(){
    let response=this.dbshttps.get("http://localhost:8080/sender?username="+this.username);
    response.subscribe((dbsdata)=>{
      this.userdata=dbsdata;
     console.log(this.userdata);
     this.userName=this.userdata[0].custName;
      
    });

    response=this.dbshttps.get("http://localhost:8080/sender?username="+localStorage.getItem);
    response.subscribe((dbsdata)=>{
      this.cusdata=dbsdata;
     console.log(this.cusdata);
     this.userName=this.cusdata[0].custName;
      
    });
  }
  
  makeATransaction(){
    let response=this.dbshttps.get("localhost:8080/receiver?cusId="+this.cusdata[0].cusId+"&amount="+this.amount+
    "&cusName="+this.cusdata[0].cusName+"&recId="+this.userdata[0].recId+"&recName="+this.userdata[0].recName+"&status=true");
    
  
  }

}
