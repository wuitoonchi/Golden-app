import { ComponentsModule } from './../../components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelsPageRoutingModule } from './travels-routing.module';

import { TravelsPage } from './travels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TravelsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class TravelsPageModule {}
