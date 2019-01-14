import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { BasePage } from '../../base-page';

import { CcyDistributionPage } from './ccy-distribution/ccy-distribution';
import { PerformancePage } from './performance/performance';
import { PortfolioHistoryPage } from './portfolio-history/portfolio-history';

@IonicPage()
@Component({
  selector: 'page-my-portfolio',
  templateUrl: 'my-portfolio.html',
})
export class MyPortfolioPage extends BasePage {

	tab1Root = PortfolioHistoryPage;
	tab2Root = CcyDistributionPage;
  tab3Root = PerformancePage;
  
  selectedIndex = 0;

  constructor(injector: Injector) {
    super(injector);

    let selectedIndex = this._navParams.get("tabIndex");
    this.selectedIndex = (selectedIndex) ? selectedIndex : 0;
  }

  
}