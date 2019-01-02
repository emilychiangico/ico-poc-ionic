import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HoldingListPage }from './holding-list/holding-list';
import { AssetHistoryPage } from './asset-history/asset-history';
import { BasePage } from '../base-page';

import { PortfolioHoldingType } from '../../providers-v2/util/gradient-color-util';

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
export class PortfolioHoldingPage extends BasePage{

	tab1Root = HoldingListPage;
  tab2Root = AssetHistoryPage;

  selectedType = 0;
  
  holdingTypeList = [
    {
      id: PortfolioHoldingType.SavingAndCurrent,
      name: "Saving & Current"
    },
    {
      id: PortfolioHoldingType.TimeDeposit,
      name: "Time Deposit"
    },
    {
      id: PortfolioHoldingType.LinkedDeposit,
      name: "Linked Deposit"
    },
    {
      id: PortfolioHoldingType.Stock,
      name: "Stock"
    }
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  typePopupCallback(selectedItem) {
    console.log(selectedItem);
    if(selectedItem) {
      this._event.publish('change-type', selectedItem);
    }
  }

}