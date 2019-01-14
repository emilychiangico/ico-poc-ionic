import { NgModule } from '@angular/core';

import { LegendPointComponentModule } from './private-banking/legend-point/legend-point.module';
import { PbListItemComponentModule } from './private-banking/pb-list-item/pb-list-item.module';
import { PbExpandItemComponentModule } from './private-banking/pb-expand-item/pb-expand-item.module';
import { PbAmountComponentModule } from './private-banking/pd-amount/pd-amount.module';

import { BeaIconComponentModule } from './bea-icon/bea-icon.module';

@NgModule({
    declarations: [
    ],
    imports: [],
    exports: [
        PbListItemComponentModule,
        LegendPointComponentModule,
        PbExpandItemComponentModule,
        PbAmountComponentModule,

        BeaIconComponentModule
    ]
})
export class ComponentsModule {
}