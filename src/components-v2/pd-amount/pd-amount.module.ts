import { NgModule } from '@angular/core';

import { PbAmountComponent } from './pd-amount';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PbAmountComponent
  ],
  imports: [
    PipesModule
  ],
  exports: [
    PbAmountComponent
]
})
export class PbAmountComponentModule {}