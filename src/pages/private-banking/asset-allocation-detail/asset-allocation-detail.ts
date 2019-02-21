import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { PortfolioHoldingType, PortfolioHoldingUtil } from '../../../providers-v2/util/portfolio-holding-util';

@IonicPage()
@Component({
	selector: 'page-asset-allocation-detail',
	templateUrl: 'asset-allocation-detail.html',
})
export class AssetAllocationDetailPage {

	dataList = [
		{
			type: PortfolioHoldingType.SavingAndCurrent,
			title: "",
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
			title: "",
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
			title: "",
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
			title: "",
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
			title: "",
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
			title: "",
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
			title: "",
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

	ngOnInit() {
        this.dataList.forEach((item) => {
			item.title = PortfolioHoldingUtil.getTitle(item.type);
		});
    }

}