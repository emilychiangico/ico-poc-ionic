import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HoldingListPage } from './holding-list/holding-list';
import { AssetHistoryPage } from './asset-history/asset-history';
import { BasePage } from '../base-page';

import { PortfolioHoldingType } from '../../providers-v2/util/portfolio-holding-util';

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
export class PortfolioHoldingPage extends BasePage {

    tab1Root = HoldingListPage;
    tab2Root = AssetHistoryPage;

    selectTab = "list";
    selectedType = PortfolioHoldingType.SavingAndCurrent;

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
        if (selectedItem) {
            this.publish(selectedItem.id);
        }
    }

    onTabSelect(tab) {
        this.selectTab = tab;
        this.publish(this.selectedType);
    }

    publish(selectedType) {
        if(this.selectTab == "list") {
            this._event.publish('change-type-list', selectedType);
        }else {
            this._event.publish('change-type-history', selectedType);
        }
    }

}