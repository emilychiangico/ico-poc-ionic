import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PortfolioHoldingType } from '../../../../providers-v2/util/portfolio-holding-util';

import { BasePage } from '../../../base-page';

@IonicPage()
@Component({
	selector: 'page-holding-list',
	templateUrl: 'holding-list.html',
})
export class HoldingListPage extends BasePage {

	selectedType = 'savingAndCurrent';

	TestDataList = {
		savingAndCurrent: [
			{
				accountType: "HKD Current Account",
				ccy: "HKD",
				principal: 820.5,
				principalInHKD: 820.5,
				// type: "savingAndCurrent"
			},
			{
				accountType: "Statement Savings Account",
				ccy: "AUD",
				principal: 216643.33,
				principalInHKD: 1288255.43,
				// type: "savingAndCurrent"
			},
			{
				accountType: "Statement Savings Account",
				ccy: "CNY",
				principal: 31098.4,
				principalInHKD: 38118.38,
				// type: "savingAndCurrent"
			}
		],
		timeDeposit: [
			{
				accountType: "Time Deposit Account",
				referNo: "#00125",
				ccy: "HKD",
				principal: 394500,
				principalInHKD: 394500,
				effectiveDate: "2018-06-07",
				dueDate: "2018-06-07",
				interestRate: "1.8750",
				// type: "timeDeposit"
			}
		],
		linkedDeposit: [
			{
				accountType: "Currency Link Deposit",
				referNo: "CYD00278759",
				settlementDate: "2018-06-07",
				maturityDate: "2018-06-07",
				couponRate: "2.0600",
				referValue: "1.1678",
				amount: 3000000,
				amountInHKD: 2354265,
				// type: "linkedDeposit"
			}
		],
		stock: [
			{
				company: "02388 BOC Hong Kong Holdings Ltd",
				ccy: "HKD",
				marketValue: 394500,
				marketValueInHKD: 394500,
				shares: 10000,
				marketPrice: 3000000,
				avgUnitCost: "--",
				// type: "stock"
			}
		]
	};

	dataList: any[] = this.TestDataList.savingAndCurrent;

	constructor(injector: Injector) {
		super(injector);
	}

	ionViewWillEnter() {
		this._event.subscribe('change-type-list', (selectedType) => {
			console.log('change-type >> ');
			console.log(selectedType);
			this.dataList = this.loadData(selectedType);

			console.log(this.dataList);
			console.log(this.selectedType);
		});
	}

	ionViewWillLeave() {
		//console.log("holding-list >> ionViewWillLeave");
		this._event.unsubscribe('change-type-list');
	}

	ionViewWillUnload() {
		//console.log("holding-list >> ionViewWillUnload");
		this._event.unsubscribe('change-type-list');
	}

	loadData(id) {
		console.log(id);
		switch (id) {
			case PortfolioHoldingType.SavingAndCurrent:
				this.selectedType = 'savingAndCurrent';
				return this.TestDataList.savingAndCurrent;

			case PortfolioHoldingType.TimeDeposit:
				this.selectedType = 'timeDeposit';
				return this.TestDataList.timeDeposit;

			case PortfolioHoldingType.StructuredProduct:
				this.selectedType = 'structuredProduct';
				return null;

			case PortfolioHoldingType.Stock:
				this.selectedType = 'stock';
				return this.TestDataList.stock;

			case PortfolioHoldingType.BondNoteCertDeposit:
				this.selectedType = 'bondNoteCertDeposit';
				return null;

			case PortfolioHoldingType.UnitTrust:
				this.selectedType = 'unitTrust';
				return null;

			case PortfolioHoldingType.LinkedDeposit:
				this.selectedType = 'linkedDeposit';
				return this.TestDataList.linkedDeposit;

			case PortfolioHoldingType.OptionAndDerivativerContract:
				this.selectedType = 'optionAndDerivativerContract';
				return null;

			case PortfolioHoldingType.Loan:
				this.selectedType = 'loan';
				return null;

			case PortfolioHoldingType.ForwardForeignExchange:
				this.selectedType = 'forwardForeignExchange';
				return null;

			default:
				return null;
		}
	}

}