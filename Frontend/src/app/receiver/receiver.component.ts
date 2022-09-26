import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';

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
testdata:any
  constructor(private dbshttps:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  userdata:any
  cusdata:any
  balance:Number=0;
  overdraft:string="";
  header:any;



  getCustomerDetails(){
    let response=this.dbshttps.get("http://localhost:8080/sender?username="+this.username);
    response.subscribe((dbsdata)=>{
      this.userdata=dbsdata;
     console.log(this.userdata);
     this.userName=this.userdata[0].custName;
    //  this.balance=this.userdata[0].balance;
    //  this.overdraft=this.userdata[0].overDraft;
    });

    response=this.dbshttps.get("http://localhost:8080/sender?username="+localStorage.getItem('username'));
    response.subscribe((dbsdata)=>{
      this.cusdata=dbsdata;
     console.log(this.cusdata);
    //  this.userName=this.cusdata[0].custName;
    this.balance=this.cusdata[0].balance;
    this.overdraft=this.cusdata[0].overDraft;


    });
    
  }
  data1:any
  status:boolean=true;
  url:string="";
  res:any;
  blacklist:string="";
  makeATransaction(){

    if(localStorage.getItem('username')!=null){
      let response=this.dbshttps.get("http://localhost:8080/blacklist?username="+this.userdata[0].username);
      response.subscribe((data)=>{
        this.data1=data;
        this.blacklist=this.data1+""
        console.log(this.blacklist)
      if(this.blacklist=='true')     
      {
        console.log("Working");
        this.status=false;
        console.log(this.status);
      }
      });
        
      // this.header = new HttpHeaders();
      // this.header.set('Access-Control-Allow-Origin', '*');

      // this.blacklist=this.data1;
      if(this.overdraft=="false"){
        if(this.amount>this.balance)     
        {
          this.status=false;
          console.log("status set to false");
        }

      }
      console.log(this.status+"---->Update balance")
      if(this.status==true){
        this.url="http://localhost:8080/updateBalance?cust="+this.cusdata[0].username+"&amount="+this.amount+"&rec="+this.userdata[0].username;
        let response=this.dbshttps.get(this.url,{responseType: 'text' as 'json'});
        response.subscribe((data)=>{this.data1=data;
        console.log(this.data1)});

      }
  
          this.url="http://localhost:8080/receiver?cusId="+this.cusdata[0].username+"&amount="+this.amount+"&cusName="+this.cusdata[0].custName+"&recId="+this.userdata[0].username+"&recName="+this.userdata[0].custName+"&status="+this.status;
          // this.url="http://localhost:8080/receiver?cusId=CUS01&amount=500&cusName=TJeevanaRoshini&recId=CUS02&recName=MohammedShariq&status=true"
          response= this.dbshttps.get(this.url,{responseType: 'text' as 'json'});
          response.subscribe((data:any)=>{
          console.log(this.testdata=data);
          
          })
          console.log("transaction recorded");
          // this.router.navigate(['sender'])  .then(() => {
          //   window.location.reload();
          // });
        // console.log(this.url)
        // console.log(this.testdata)
  
  
        
  
      
     
     
      
  
      // localhost:8080/updateBalance?cust=CUS01&amount=2000&rec=CUS02
      
      // "&custname="+this.cusdata[0].cusName+"&bal="+this.cusdata[0].balance+
      // "&overdraft="+this.cusdata[0].overDraft+"&amount="

    }
    

  }

}
