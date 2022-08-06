import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacityPolicyPage } from './privacity-policy.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacityPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacityPolicyPageRoutingModule {}
