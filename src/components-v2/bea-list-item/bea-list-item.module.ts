import { NgModule } from '@angular/core';

import { BeaListItemComponent } from './bea-list-item';
import { IonicModule } from 'ionic-angular';

import { LegendPointComponentModule } from '../legend-point/legend-point.module';

@NgModule({
  declarations: [
    BeaListItemComponent
  ],
  imports: [
    IonicModule,
    LegendPointComponentModule
  ],
  exports: [
    BeaListItemComponent
]
})
export class BeaListItemModule {}
