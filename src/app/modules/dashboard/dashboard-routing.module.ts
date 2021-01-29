import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { DashboardComponent } from './dashboard.component';
import { NoteComponent } from './note/note.component';
import { SettingComponent } from './setting/setting.component';
import { SingleTrashComponent } from './single-trash/single-trash.component';
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
      component: AllNotesComponent,
      children: [
        {
          path: 'edit/:id',
          component: NoteComponent
        },
        {
          path: 'new-note',
          component: NoteComponent
        }
      ]
    },
    {
      path: 'trash',
      component: TrashComponent,
      children: [
        {
          path: ':id',
          component: SingleTrashComponent
        }
      ]
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
