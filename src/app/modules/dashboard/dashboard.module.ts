import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { TrashComponent } from './trash/trash.component';
import { SettingComponent } from './setting/setting.component';


@NgModule({
  declarations: [DashboardComponent, MenuComponent, AllNotesComponent, TrashComponent, SettingComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
