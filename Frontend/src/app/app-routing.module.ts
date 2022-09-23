import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { ReceiverComponent } from './receiver/receiver.component';
import { SenderComponent } from './sender/sender.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {path: "",component:LoginComponent},
  {path: "login",component:LoginComponent},
  {path: "sender",component:SenderComponent},
  {path: "receiver",component:ReceiverComponent},
  {path: "employee",component:EmployeeComponent},
  {path: "transaction",component:TransactionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
