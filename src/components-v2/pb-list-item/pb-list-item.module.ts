import { NgModule } from '@angular/core';

import { PbListItemComponent } from './pb-list-item';
import { IonicModule } from 'ionic-angular';

import { LegendPointComponentModule } from '../legend-point/legend-point.module';
import { PbExpandItemComponentModule } from '../pb-expand-item/pb-expand-item.module';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PbListItemComponent
  ],
  imports: [
    IonicModule,
    LegendPointComponentModule,
    PbExpandItemComponentModule,
    PipesModule
  ],
  exports: [
    PbListItemComponent
]
})
export class PbListItemComponentModule {}
