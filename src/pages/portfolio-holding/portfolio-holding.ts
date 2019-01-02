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

  selectedType = 0;
  
  holdingTypeList = [
    {
      id: 0,
      name: "Saving & Current"
    },
    {
      id: 1,
      name: "Time Deposit"
    },
    {
      id: 2,
      name: "Linked Deposit"
    },
    {
      id: 3,
      name: "Stock"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  typePopupCallback() {
    
  }

  
}