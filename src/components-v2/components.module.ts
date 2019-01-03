import { NgModule } from '@angular/core';

import { LegendPointComponentModule } from './legend-point/legend-point.module';
import { BeaListItemModule } from './bea-list-item/bea-list-item.module';
import { PbExpandItemComponentModule } from './pb-expand-item/pb-expand-item.module';
import { PbAmountComponentModule } from './pd-amount/pd-amount.module';

import { BeaIconComponent } from './bea-icon/bea-icon';

@NgModule({
    declarations: [
        BeaIconComponent
    ],
    imports: [],
    exports: [
        BeaListItemModule,
        LegendPointComponentModule,
        PbExpandItemComponentModule,
        BeaIconComponent,
        PbAmountComponentModule
    ]
})
export class ComponentsModule {
}