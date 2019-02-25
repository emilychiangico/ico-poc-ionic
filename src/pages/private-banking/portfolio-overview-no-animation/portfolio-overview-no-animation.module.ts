import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioOverviewNoAnimationPage } from './portfolio-overview-no-animation';

@NgModule({
    declarations: [
        PortfolioOverviewNoAnimationPage,
    ],
    imports: [
        IonicPageModule.forChild(PortfolioOverviewNoAnimationPage),
    ],
})
export class PortfolioOverviewNoAnimationPageModule { }
