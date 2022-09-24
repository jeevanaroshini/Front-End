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
  clickme() {
    console.log(this.username);
  }

  constructor(private dbshttps:HttpClient) { }

  ngOnInit(): void {
  }
  userdata:any

  getCustomerDetails(){
    let response=this.dbshttps.get("http://localhost:8080/sender?username="+this.username);
    response.subscribe((dbsdata)=>{
      this.userdata=dbsdata;
     console.log(this.userdata);
      
    });
  }

}
