import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { CcyDistributionPage } from './ccy-distribution/ccy-distribution';
import { MixedChartPage } from './mixed-chart/mixed-chart';
import { PortfolioHistoryPage } from './portfolio-history/portfolio-history';

@IonicPage()
@Component({
  selector: 'page-my-portfolio',
  templateUrl: 'my-portfolio.html',
})
export class MyPortfolioPage {

	tab1Root = PortfolioHistoryPage;
	tab2Root = CcyDistributionPage;
	tab3Root = MixedChartPage;

  constructor() {
  }

  
}