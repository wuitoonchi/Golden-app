import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPasswordPage } from './settings-password.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPasswordPageRoutingModule {}
