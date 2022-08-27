import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IqsPageRoutingModule } from './iqs-routing.module';

import { IqsPage } from './iqs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IqsPageRoutingModule
  ],
  declarations: [IqsPage]
})
export class IqsPageModule {}
