import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsSetup2faPageRoutingModule } from './settings-setup2fa-routing.module';

import { SettingsSetup2faPage } from './settings-setup2fa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsSetup2faPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SettingsSetup2faPage]
})
export class SettingsSetup2faPageModule {}
