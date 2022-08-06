import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsSetup2faPage } from './settings-setup2fa.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsSetup2faPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsSetup2faPageRoutingModule {}
