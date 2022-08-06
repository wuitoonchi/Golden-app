import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadershipsPageRoutingModule } from './leaderships-routing.module';

import { LeadershipsPage } from './leaderships.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadershipsPageRoutingModule
  ],
  declarations: [LeadershipsPage]
})
export class LeadershipsPageModule {}
