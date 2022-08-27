import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPasswordPageRoutingModule } from './settings-password-routing.module';

import { SettingsPasswordPage } from './settings-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPasswordPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SettingsPasswordPage]
})
export class SettingsPasswordPageModule {}
