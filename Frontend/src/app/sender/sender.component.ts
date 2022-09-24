import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {
navigate() {
  this.router.navigate(['receiver']);
}

  constructor(private dbshttps:HttpClient, private router: Router) { }
  userdata:any
  ngOnInit(): void {
    console.log(localStorage.getItem('username'));
    let response=this.dbshttps.get("http://localhost:8080/sender?username="+localStorage.getItem('username'))
    response.subscribe((dbsdata)=>{
      this.userdata=dbsdata;
     // console.log(this.userdata[0].username);
      
    }
    )
    
  }
  
  getSessionVariable(){
    console.log(this.userdata);
   
  }
}
