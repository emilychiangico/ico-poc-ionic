import { NgModule } from '@angular/core';

import { LegendPointComponentModule } from './legend-point/legend-point.module';
import { PbListItemComponentModule } from './pb-list-item/pb-list-item.module';
import { PbExpandItemComponentModule } from './pb-expand-item/pb-expand-item.module';
import { PbAmountComponentModule } from './pd-amount/pd-amount.module';

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