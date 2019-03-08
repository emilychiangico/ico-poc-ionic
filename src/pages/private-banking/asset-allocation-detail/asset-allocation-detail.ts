import { Component, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { IPortfolioUtil } from '../../../providers-v2/util/i-portfolio-util';
import { IPortfolioApiService } from "../../../providers-v2/api/i-portfolio-api-service";

import { BasePage } from '../../base-page';

@IonicPage()
@Component({
	selector: 'page-asset-allocation-detail',
	templateUrl: 'asset-allocation-detail.html',
})
export class AssetAllocationDetailPage extends BasePage {

	private iPortfolioApiService: IPortfolioApiService;

	dataList = [];

	constructor(injector: Injector) {
		super(injector);
		this.iPortfolioApiService = injector.get(IPortfolioApiService);
	}

	ngOnInit() {
		let assetAllocationDataInfo = this._navParams.data;
		//let data = this.iPortfolioApiService.getAssetAllocationHistory().data;
		//let assetAllocationDataInfo = IPortfolioUtil.setAssetAllocationData(data.assetAllocationHistoryList);
		this.loadData(assetAllocationDataInfo);
	}

	loadData(data) {
		data.holdingTypeList.forEach((item, index) => {
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