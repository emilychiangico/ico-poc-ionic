import { NgModule } from '@angular/core';

import { PbAmountComponent } from './pd-amount';

import { BeaIconComponentModule } from '../../bea-icon/bea-icon.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        PbAmountComponent
    ],
    imports: [
        PipesModule,
        BeaIconComponentModule,
        //IonicModule
    ],
    exports: [
        PbAmountComponent
    ]
})
export class PbAmountComponentModule { }