import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PortfolioHoldingType } from '../../providers-v2/util/portfolio-holding-util';

/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nav-detail',
  templateUrl: 'nav-detail.html',
})
export class NavDetailPage {

	dataList = [
		{
			title: "May 2018",
			netAssetValue: 89134132.18,
			cashAndDeposit: 31857040.24,
			investment: 71135140.62,
			loan: -31857040.24
		},
		{
			title: "Apr 2018",
			netAssetValue: 49134132.18,
			cashAndDeposit: 11857040.24,
			investment: 21135140.62,
			loan: -11857040.24
		},
		{
			title: "Mar 2018",
			netAssetValue: 9134132.18,
			cashAndDeposit: 11857040.24,
			investment: 91135140.62,
			loan: -431857040.24
		},
		{
			title: "Feb 2018",
			netAssetValue: 11134132.18,
			cashAndDeposit: 81857040.24,
			investment: 1135140.62,
			loan: -31857040.24
		},
		{
			title: "Jan 2018",
			netAssetValue: 34132.18,
			cashAndDeposit: 21857040.24,
			investment: 5135140.62,
			loan: -857040.24
		},
		{
			title: "Dec 2017",
			netAssetValue: 1134132.18,
			cashAndDeposit: 1857040.24,
			investment: 9135140.62,
			loan: -1157040.24
		},
	];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}