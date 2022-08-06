import { ComponentsModule } from './../../../components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyPageRoutingModule } from './buy-routing.module';

import { BuyPage } from './buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BuyPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class BuyPageModule {}
