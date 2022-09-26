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
  url2:string="";
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
                console.log("Working in blacklist true");
                this.url="http://localhost:8080/receiver?cusId="+this.cusdata[0].username+"&amount="+this.amount+"&cusName="+this.cusdata[0].custName+"&recId="+this.userdata[0].username+"&recName="+this.userdata[0].custName+"&status=0";
                let res= this.dbshttps.get(this.url,{responseType: 'text' as 'json'});
          res.subscribe((data:any)=>{
          this.testdata=data
          console.log(this.url+"Showing url last")
          console.log("transaction recorded");

          })
            }
            else{

              if(this.overdraft=="false"){
                if(this.amount>this.balance)     
                {
                  this.url="http://localhost:8080/receiver?cusId="+this.cusdata[0].username+"&amount="+this.amount+"&cusName="+this.cusdata[0].custName+"&recId="+this.userdata[0].username+"&recName="+this.userdata[0].custName+"&status=0";
                  let res= this.dbshttps.get(this.url,{responseType: 'text' as 'json'});
                  res.subscribe((data:any)=>{
                  this.testdata=data
                  console.log(this.url+"Showing url last")
                  console.log("transaction recorded");
        
                  })
                }
                else{
                  this.url="http://localhost:8080/receiver?cusId="+this.cusdata[0].username+"&amount="+this.amount+"&cusName="+this.cusdata[0].custName+"&recId="+this.userdata[0].username+"&recName="+this.userdata[0].custName+"&status=1";
                  let res= this.dbshttps.get(this.url,{responseType: 'text' as 'json'});
                  res.subscribe((data:any)=>{
                  this.testdata=data
                  console.log(this.url+"Showing url last")
                  console.log("transaction recorded");
        
                  })



                  console.log(this.status+"---->Update balance")
                  this.url2="http://localhost:8080/updateBalance?cust="+this.cusdata[0].username+"&amount="+this.amount+"&rec="+this.userdata[0].username;
                  let response=this.dbshttps.get(this.url2,{responseType: 'text' as 'json'});
                  response.subscribe((data)=>{this.data1=data;
                  console.log(this.data1)});
                }
              }
             
              else{
                
                this.url="http://localhost:8080/receiver?cusId="+this.cusdata[0].username+"&amount="+this.amount+"&cusName="+this.cusdata[0].custName+"&recId="+this.userdata[0].username+"&recName="+this.userdata[0].custName+"&status=1";
                let res= this.dbshttps.get(this.url,{responseType: 'text' as 'json'});
                res.subscribe((data:any)=>{
                this.testdata=data
                console.log(this.url+"Showing url last")
                console.log("transaction recorded");
                })
                console.log(this.status+"---->Update balance")
                this.url2="http://localhost:8080/updateBalance?cust="+this.cusdata[0].username+"&amount="+this.amount+"&rec="+this.userdata[0].username;
                let response=this.dbshttps.get(this.url2,{responseType: 'text' as 'json'});
                response.subscribe((data)=>{this.data1=data;
                console.log(this.data1)});
                
                
              }

            }

          });
      
          this.router.navigate(['sender']).then(() => {
            window.location.reload();
          });
          
          

    }
    

  }

}























// if(this.blacklist=="true"){
  //   this.url="http://localhost:8080/receiver?cusId="+this.cusdata[0].username+"&amount="+this.amount+"&cusName="+this.cusdata[0].custName+"&recId="+this.userdata[0].username+"&recName="+this.userdata[0].custName+"&status=0";
  // }
  // else{
  //   console.log(this.blacklist+"Inside elseeeeeeeeeeeeeeeeee")
  //   this.url="http://localhost:8080/receiver?cusId="+this.cusdata[0].username+"&amount="+this.amount+"&cusName="+this.cusdata[0].custName+"&recId="+this.userdata[0].username+"&recName="+this.userdata[0].custName+"&status=1";
  // }
         
          // this.url="http://localhost:8080/receiver?cusId=CUS01&amount=500&cusName=TJeevanaRoshini&recId=CUS02&recName=MohammedShariq&status=true"
          
          
        // console.log(this.url)
        // console.log(this.testdata)
  
  
        
  
      
     
     
      
  
      // localhost:8080/updateBalance?cust=CUS01&amount=2000&rec=CUS02
      
      // "&custname="+this.cusdata[0].cusName+"&bal="+this.cusdata[0].balance+
      // "&overdraft="+this.cusdata[0].overDraft+"&amount="
