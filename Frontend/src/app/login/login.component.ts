import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string="";
  password:string="";

 htmlData: any
  constructor(private dbshttp: HttpClient, private router: Router) { 

    
  }
  errorMessage:String=""
  login(){
    console.log(this.username);
    console.log(this.password);
    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);
    let response=this.dbshttp.get("http://localhost:8080/login?username="+this.username+"&&password="+this.password,{responseType:'text' as 'json'});
    response.subscribe((dbsData)=>{
      console.log(dbsData)
      if(dbsData=="employee"){
        this.router.navigate(['employee']);

      }  
      else if(dbsData=="customer")  this.router.navigate(['sender']);
      else
        this.errorMessage="Bad Credentials";
    }
    
    );
    
  }

  ngOnInit(): void {
  }

}
