import { NgModule } from '@angular/core';

import { BeaListItemComponent } from './bea-list-item';
import { IonicModule } from 'ionic-angular';

import { LegendPointComponentModule } from '../legend-point/legend-point.module';
import { PbExpandItemComponentModule } from '../pb-expand-item/pb-expand-item.module';

@NgModule({
  declarations: [
    BeaListItemComponent
  ],
  imports: [
    IonicModule,
    LegendPointComponentModule,
    PbExpandItemComponentModule
  ],
  exports: [
    BeaListItemComponent
]
})
export class BeaListItemModule {}
