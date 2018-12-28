import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';

import { PbExpandItemComponent } from './pb-expand-item';

import { LegendPointComponentModule } from '../legend-point/legend-point.module';


@NgModule({
    declarations: [
        PbExpandItemComponent
    ],
    imports: [
        IonicModule,
        LegendPointComponentModule
    ],
    exports: [
        PbExpandItemComponent
    ]
})
export class PbExpandItemComponentModule {
}