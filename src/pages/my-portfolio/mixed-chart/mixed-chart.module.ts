import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MixedChartPage } from './mixed-chart';

@NgModule({
  declarations: [
    MixedChartPage,
  ],
  imports: [
    IonicPageModule.forChild(MixedChartPage),
  ],
})
export class MixedChartPageModule {}
