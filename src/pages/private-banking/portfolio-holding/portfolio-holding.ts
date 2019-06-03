import { Component, Injector, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../base-page';

import { IPortfolioApiService } from "../../../providers-v2/api/i-portfolio-api-service";
import { IPortfolioApiMockService } from "../../../providers-v2/api/i-portfolio-api-mock-service";

import { HoldingListPage } from './holding-list/holding-list';
import { AssetHistoryPage } from './asset-history/asset-history';

import { IPortfolioUtil } from "../../../providers-v2/util/i-portfolio-util";

@IonicPage()
@Component({
    selector: 'page-portfolio-holding',
    templateUrl: 'portfolio-holding.html',
})
export class PortfolioHoldingPage extends BasePage implements OnInit {

    tab1Root = HoldingListPage;
    tab2Root = AssetHistoryPage;

    protected iPortfolioApiService: IPortfolioApiService;
    protected iportfolioApiMockService: IPortfolioApiMockService; // for testing

    selectedAccountType: string = null;
    currentType: string = null;
    accountTypeList: any[] = [];

    totalAmountInfo = {
        totalAmount: null,
        aumProportion: null,
        holding: null
    }

    holdingInfo = {
        selectedAccountType: null,
        header: [],
        data: []
    }

    assetAllocationDataInfo = {
        selectedAccountType: null,
        holdingTypeList: [],
        chartData: {
            label: [],
            amount: []
        }
    };

    selectTab = "list";

    constructor(injector: Injector) {
        super(injector);
        this.iPortfolioApiService = injector.get(IPortfolioApiService);
        this.iportfolioApiMockService = injector.get(IPortfolioApiMockService);
    }

    ngOnInit() {
        let type = this._navParams.get("type");
        if (!!type) {
            this.selectedAccountType = type;
        }
        this.loadData();
    }

    loadData() {
        //this.iPortfolioApiService.getPortfolioHolding(this.selectedAccountType).subscribe(
        //    response => {
                let response = this.iportfolioApiMockService.getPortfolioHolding(this.selectedAccountType);
                let data =  response.data;
                this.setAccountTypeList(data.accountTypeList);

                let detail = data.detail;
                this.totalAmountInfo = {
                    totalAmount: detail.totalAmount,
                    aumProportion: detail.aumProportion,
                    holding: detail.holding
                };

                this.selectedAccountType = detail.accountType;
                this.currentType = detail.accountType;
                let result = IPortfolioUtil.setPortfolioHoldingData(detail);

                this.holdingInfo = result.holdingInfo;
                this.assetAllocationDataInfo = result.assetAllocationDataInfo;

                this.publish();
        //    }
        //);
    }

    setAccountTypeList(accountList) {
        this.accountTypeList = [];
        accountList.forEach((item) => {
            this.accountTypeList.push({
                id: item,
                name: IPortfolioUtil.getTitle(item)
            });
        });
    }

    typePopupCallback(selectedItem) {
        console.log("typePopupCallback >> " + selectedItem);
        if (this.currentType != selectedItem.id) {
            this.loadData();
        }
    }

    onTabSelect(tab) {
        this.selectTab = tab;
        this.publish();
    }

    publish() {
        if (this.selectTab == "list") {
            this._event.publish('change-type-list', this.holdingInfo);
        } else {
            this._event.publish('change-type-history', this.assetAllocationDataInfo);
        }
    }

    // ionViewWillUnload() {
    //     console.log("PortfolioHoldingPage >> ionViewWillLeave");
    //     this._event.unsubscribe('change-type-list');
    //     this._event.unsubscribe('change-type-history');
    // }

}