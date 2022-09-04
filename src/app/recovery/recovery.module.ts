import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryPageRoutingModule } from './recovery-routing.module';

import { RecoveryPage } from './recovery.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoveryPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [RecoveryPage]
})
export class RecoveryPageModule {}
