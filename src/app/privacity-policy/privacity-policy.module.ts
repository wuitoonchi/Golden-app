import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacityPolicyPageRoutingModule } from './privacity-policy-routing.module';

import { PrivacityPolicyPage } from './privacity-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacityPolicyPageRoutingModule
  ],
  declarations: [PrivacityPolicyPage]
})
export class PrivacityPolicyPageModule {}
