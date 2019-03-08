import { Component, Injector, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HoldingListPage } from './holding-list/holding-list';
import { AssetHistoryPage } from './asset-history/asset-history';
import { ProfolioHoldingMaster } from './portfolio-holding-master';

@IonicPage()
@Component({
    selector: 'page-portfolio-holding',
    templateUrl: 'portfolio-holding.html',
})
export class PortfolioHoldingPage extends ProfolioHoldingMaster implements OnInit {

    tab1Root = HoldingListPage;
    tab2Root = AssetHistoryPage;

    selectTab = "list";

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        let type = this._navParams.get("type");
        if (!!type) {
            this.selectedAccountType = type;
        }
        this.loadData();
        this._event.publish('change-type-list', this.holdingInfo);
    }

    typePopupCallback(selectedItem) {
        console.log(selectedItem);
        if (selectedItem) {
            this.loadData();
            this.publish(selectedItem.id);
        }
    }

    onTabSelect(tab) {
        this.selectTab = tab;
        this.publish(this.selectedAccountType);
    }

    publish(selectedType) {
        if (this.selectTab == "list") {
            this._event.publish('change-type-list', this.holdingInfo);
        } else {
            this._event.publish('change-type-history', this.assetAllocationDataInfo);
        }
    }

    ionViewWillLeave() {
        console.log("PortfolioHoldingPage >> ionViewWillLeave");
        this._event.unsubscribe('change-type-list');
        this._event.unsubscribe('change-type-history');
    }

}