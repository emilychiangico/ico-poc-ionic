import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PbExpandItemComponent } from './pb-expand-item';

import { LegendPointComponentModule } from '../legend-point/legend-point.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        PbExpandItemComponent
    ],
    imports: [
        IonicModule,
        LegendPointComponentModule,
        PipesModule
    ],
    exports: [
        PbExpandItemComponent
    ]
})
export class PbExpandItemComponentModule {
}