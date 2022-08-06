import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IqsPage } from './iqs.page';

const routes: Routes = [
  {
    path: '',
    component: IqsPage
  },
  {
    path:'buy',
    loadChildren: () => import('./buy/buy.module').then( m => m.BuyPageModule)
  },
  {
    path:'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IqsPageRoutingModule {}
