import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioHoldingPage } from './portfolio-holding';

@NgModule({
  declarations: [
    PortfolioHoldingPage,
  ],
  imports: [
    IonicPageModule.forChild(PortfolioHoldingPage),
  ],
})
export class PortfolioHoldingPageModule {}
