import { Component, Injector, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HoldingListPage } from './holding-list/holding-list';
import { AssetHistoryPage } from './asset-history/asset-history';
import { BasePage } from '../../base-page';

import { PortfolioHoldingType } from '../../../providers-v2/util/portfolio-holding-util';

@IonicPage()
@Component({
    selector: 'page-portfolio-holding',
    templateUrl: 'portfolio-holding.html',
})
export class PortfolioHoldingPage extends BasePage implements OnInit {

    tab1Root = HoldingListPage;
    tab2Root = AssetHistoryPage;

    selectTab = "list";
    selectedType = PortfolioHoldingType.SavingAndCurrent;

    info = {
        totalAmount: 0,
        aumProportion: 0,
        holding: 0
    }

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

    ngOnInit() {
        let type = this._navParams.get("type");
        if (type >= 0) {
            this.selectedType = type;
        } else {
            this.selectedType == this.holdingTypeList[0].id;
        }
        this.loadData();
    }

    typePopupCallback(selectedItem) {
        console.log(selectedItem);
        if (selectedItem) {
            this.publish(selectedItem.id);
            this.loadData();
        }
    }

    onTabSelect(tab) {
        this.selectTab = tab;
        this.publish(this.selectedType);
    }

    publish(selectedType) {
        if (this.selectTab == "list") {
            this._event.publish('change-type-list', selectedType);
        } else {
            this._event.publish('change-type-history', selectedType);
        }
    }

    loadData() {
        switch (this.selectedType) {
            case PortfolioHoldingType.SavingAndCurrent:
                this.info = { totalAmount: 11770124.00, aumProportion: 25.34, holding: 12 }
                break;

            case PortfolioHoldingType.TimeDeposit:
                this.info = { totalAmount: 91770124.00, aumProportion: 5.34, holding: 120 }
                break;

            case PortfolioHoldingType.StructuredProduct:
                this.info = { totalAmount: 144.00, aumProportion: 29.34, holding: 1 }
                break;

            case PortfolioHoldingType.Stock:
                this.info = { totalAmount: 11345124.00, aumProportion: 75.34, holding: 2 }
                break;

            case PortfolioHoldingType.BondNoteCertDeposit:
                this.info = { totalAmount: 1177.00, aumProportion: 29.45, holding: 5 }
                break;

            case PortfolioHoldingType.UnitTrust:
                this.info = { totalAmount: 11870124.00, aumProportion: 21.94, holding: 92 }
                break;

            case PortfolioHoldingType.LinkedDeposit:
                this.info = { totalAmount: 11774.00, aumProportion: 75.30, holding: 8 }
                break;

            case PortfolioHoldingType.OptionAndDerivativerContract:
                this.info = { totalAmount: 13770124.00, aumProportion: 65.34, holding: 14 }
                break;

            case PortfolioHoldingType.Loan:
                this.info = { totalAmount: 117704.00, aumProportion: 14.53, holding: 45 }
                break;

            case PortfolioHoldingType.ForwardForeignExchange:
                this.info = { totalAmount: 1770124.00, aumProportion: 23.77, holding: 87 }
                break;

            default:
                this.info = { totalAmount: 0, aumProportion: 0, holding: 0 };
        }
    }

}