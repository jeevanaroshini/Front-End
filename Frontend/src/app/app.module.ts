import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { SenderComponent } from './sender/sender.component';
import { TransactionComponent } from './transaction/transaction.component';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReceiverComponent,
    SenderComponent,
    TransactionComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
