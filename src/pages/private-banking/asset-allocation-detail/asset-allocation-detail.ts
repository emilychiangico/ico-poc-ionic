import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../base-page';

import { IPortfolioUtil } from '../../../providers-v2/util/i-portfolio-util';

@IonicPage()
@Component({
	selector: 'page-asset-allocation-detail',
	templateUrl: 'asset-allocation-detail.html',
})
export class AssetAllocationDetailPage extends BasePage {

	dataList = [];

	detailExpand : boolean = false;

	constructor(injector: Injector) {
		super(injector);
	}

	ngOnInit() {
		let assetAllocationDataInfo = this._navParams.data;
		this.loadData(assetAllocationDataInfo);
	}

	loadData(data) {
		let holdingTypeList = data.holdingTypeList;
		if(holdingTypeList.length == 1) {
			this.detailExpand = true;
		}
		holdingTypeList.forEach((item, index) => {
			let detailList = [];
			console.log(data.chartData.amount[index]);
			data.chartData.amount[index].forEach((amount, aIndex) => {
				// last data is extra data, need to be remove
				if (aIndex < data.chartData.amount[index].length - 1) {
					detailList.push({
						month: data.chartData.label[aIndex][0], year: data.chartData.label[aIndex][1], amount: amount
					});
				}
			});
			this.dataList.push({
				type: item,
				title: IPortfolioUtil.getTitle(item),
				monthDetail: detailList
			});
		});
		console.log(this.dataList);
	}

}