import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { PortfolioHoldingType } from '../../../providers-v2/util/portfolio-holding-util';

@IonicPage()
@Component({
	selector: 'page-asset-allocation-detail',
	templateUrl: 'asset-allocation-detail.html',
})
export class AssetAllocationDetailPage {

	dataList = [
		{
			type: PortfolioHoldingType.SavingAndCurrent,
			title: "Saving & Current",
			monthDetail: [
				{ month: "Jun", year: 2018, amount: 6008194.53 },
				{ month: "May", year: 2018, amount: 8220550.54 },
				{ month: "Apr", year: 2018, amount: 8220550.54 },
				{ month: "Mar", year: 2018, amount: 1202912.31 },
				{ month: "Feb", year: 2018, amount: 11923425.63 }
			]
		},
		{
			type: PortfolioHoldingType.TimeDeposit,
			title: "Time Deposit",
			monthDetail: [
				{ month: "Jun", year: 2018, amount: 6008194.53 },
				{ month: "May", year: 2018, amount: 8220550.54 },
				{ month: "Apr", year: 2018, amount: 8220550.54 },
				{ month: "Mar", year: 2018, amount: 1202912.31 },
				{ month: "Feb", year: 2018, amount: 11923425.63 }
			]
		},
		{
			type: PortfolioHoldingType.StructuredProduct,
			title: "Saving & Current",
			monthDetail: [
				{ month: "Jun", year: 2018, amount: 6008194.53 },
				{ month: "May", year: 2018, amount: 8220550.54 },
				{ month: "Apr", year: 2018, amount: 8220550.54 },
				{ month: "Mar", year: 2018, amount: 1202912.31 },
				{ month: "Feb", year: 2018, amount: 11923425.63 }
			]
		},
		{
			type: PortfolioHoldingType.SavingAndCurrent,
			title: "Structured Product",
			monthDetail: [
				{ month: "Jun", year: 2018, amount: 6008194.53 },
				{ month: "May", year: 2018, amount: 8220550.54 },
				{ month: "Apr", year: 2018, amount: 8220550.54 },
				{ month: "Mar", year: 2018, amount: 1202912.31 },
				{ month: "Feb", year: 2018, amount: 11923425.63 }
			]
		},
		{
			type: PortfolioHoldingType.UnitTrust,
			title: "Unit Trust",
			monthDetail: [
				{ month: "Jun", year: 2018, amount: 6008194.53 },
				{ month: "May", year: 2018, amount: 8220550.54 },
				{ month: "Apr", year: 2018, amount: 8220550.54 },
				{ month: "Mar", year: 2018, amount: 1202912.31 },
				{ month: "Feb", year: 2018, amount: 11923425.63 }
			]
		},
		{
			type: PortfolioHoldingType.Stock,
			title: "Stock",
			monthDetail: [
				{ month: "Jun", year: 2018, amount: 6008194.53 },
				{ month: "May", year: 2018, amount: 8220550.54 },
				{ month: "Apr", year: 2018, amount: 8220550.54 },
				{ month: "Mar", year: 2018, amount: 1202912.31 },
				{ month: "Feb", year: 2018, amount: 11923425.63 }
			]
		},
		{
			type: PortfolioHoldingType.BondNoteCertDeposit,
			title: "Bonds, Note & Certifcate of Deposit",
			monthDetail: [
				{ month: "Jun", year: 2018, amount: 6008194.53 },
				{ month: "May", year: 2018, amount: 8220550.54 },
				{ month: "Apr", year: 2018, amount: 8220550.54 },
				{ month: "Mar", year: 2018, amount: 1202912.31 },
				{ month: "Feb", year: 2018, amount: 11923425.63 }
			]
		}
	];

	constructor() {
	}


}