import { NgModule } from '@angular/core';

import { LegendPointComponentModule } from './private-banking/legend-point/legend-point.module';
import { PbListItemComponentModule } from './private-banking/pb-list-item/pb-list-item.module';
import { PbExpandItemComponentModule } from './private-banking/pb-expand-item/pb-expand-item.module';
import { PbAmountComponentModule } from './private-banking/pd-amount/pd-amount.module';

import { BeaIconComponent } from './bea-icon/bea-icon';

@NgModule({
    declarations: [
        BeaIconComponent
    ],
    imports: [],
    exports: [
        PbListItemComponentModule,
        LegendPointComponentModule,
        PbExpandItemComponentModule,
        BeaIconComponent,
        PbAmountComponentModule
    ]
})
export class ComponentsModule {
}