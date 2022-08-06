import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmentsPageRoutingModule } from './entertainments-routing.module';

import { EntertainmentsPage } from './entertainments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmentsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EntertainmentsPage]
})
export class EntertainmentsPageModule {}
