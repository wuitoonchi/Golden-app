import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadershipsPage } from './leaderships.page';

const routes: Routes = [
  {
    path: '',
    component: LeadershipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadershipsPageRoutingModule {}
