import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HoldingListPage }from './holding-list/holding-list';


/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio-holding',
  templateUrl: 'portfolio-holding.html',
})
export class PortfolioHoldingPage {

	tab1Root = HoldingListPage;
	tab2Root = HoldingListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}