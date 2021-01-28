import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { DashboardComponent } from './dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { TrashComponent } from './trash/trash.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'notes'
},
{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'notes',
      component: AllNotesComponent
    },
    {
      path: 'trash',
      component: TrashComponent
    },
    {
      path: 'setting',
      component: SettingComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
