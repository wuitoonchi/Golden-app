import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityPage } from './security.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityPage
  },
  {
    path: 'settings-password',
    loadChildren: () => import('./settings-password/settings-password.module').then( m => m.SettingsPasswordPageModule)
  },
  {
    path: 'settings-setup2fa',
    loadChildren: () => import('./settings-setup2fa/settings-setup2fa.module').then( m => m.SettingsSetup2faPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityPageRoutingModule {}
