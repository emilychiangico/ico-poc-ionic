import { NgModule } from '@angular/core';

import { PbAmountComponent } from './pd-amount';

import { BeaIconComponentModule } from '../../bea-icon/bea-icon.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        PbAmountComponent
    ],
    imports: [
        PipesModule,
        BeaIconComponentModule
    ],
    exports: [
        PbAmountComponent
    ]
})
export class PbAmountComponentModule { }