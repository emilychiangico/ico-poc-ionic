import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreaChartPage } from './area-chart';

@NgModule({
  declarations: [
    AreaChartPage,
  ],
  imports: [
    IonicPageModule.forChild(AreaChartPage),
  ],
})
export class AreaChartPageModule {}
