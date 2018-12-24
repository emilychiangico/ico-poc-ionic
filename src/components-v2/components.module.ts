import { NgModule } from '@angular/core';

import { LegendPointComponentModule } from './legend-point/legend-point.module';
import { BeaListItemModule } from './bea-list-item/bea-list-item.module';

@NgModule({
    declarations: [
    ],
    imports: [],
    exports: [
        BeaListItemModule,
        LegendPointComponentModule
    ]
})
export class ComponentsModule {
}