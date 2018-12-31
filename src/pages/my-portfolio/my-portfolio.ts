import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CcyDistributionPage } from './ccy-distribution/ccy-distribution';
import { MixedChartPage } from './mixed-chart/mixed-chart';
import { PortfolioHistoryPage } from './portfolio-history/portfolio-history';

/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-portfolio',
  templateUrl: 'my-portfolio.html',
})
export class MyPortfolioPage {

	tab1Root = PortfolioHistoryPage;
	tab2Root = CcyDistributionPage;
	tab3Root = MixedChartPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}