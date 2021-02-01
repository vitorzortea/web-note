import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardGuard } from './service/authguard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: ()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate:	[AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
