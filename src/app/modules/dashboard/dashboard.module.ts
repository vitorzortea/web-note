import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { TrashComponent } from './trash/trash.component';
import { SettingComponent } from './setting/setting.component';
import { NoteComponent } from './note/note.component';
import { FormsModule } from '@angular/forms';
import { SingleTrashComponent } from './single-trash/single-trash.component';


@NgModule({
  declarations: [DashboardComponent, MenuComponent, AllNotesComponent, TrashComponent, SettingComponent, NoteComponent, SingleTrashComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
