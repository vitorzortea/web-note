import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'login'
},
{
  path: '',
  component: DashboardComponent,
  /*children: [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'forgotpass',
      component: ForgotpassComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    }
  ]*/
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
