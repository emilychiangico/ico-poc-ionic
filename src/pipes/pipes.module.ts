import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { BeaNumberPipe } from './bea-number';


@NgModule({
    declarations: [
        BeaNumberPipe
    ],
    providers: [
        CurrencyPipe,
        DecimalPipe,

        BeaNumberPipe
    ],
    imports: [],
    exports: [
        BeaNumberPipe
    ]
})
export class PipesModule {
}