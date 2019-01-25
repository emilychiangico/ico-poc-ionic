import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioOverviewPage } from './portfolio-overview';

@NgModule({
    declarations: [
        PortfolioOverviewPage,
    ],
    imports: [
        IonicPageModule.forChild(PortfolioOverviewPage),
    ],
})
export class PortfolioOverviewPageModule { }
