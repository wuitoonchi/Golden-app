import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsPage } from './transactions.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionsPage
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsPageRoutingModule {}
