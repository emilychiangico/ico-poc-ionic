import { Component, ViewChild, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { GradientColorUtil } from '../../../../providers-v2/util/gradient-color-util';
import { ChartUtil } from '../../../../providers-v2/util/chart-util';

import { IPortfolioApiService } from "../../../../providers-v2/api/i-portfolio-api-service";

import { BasePage } from "../../../base-page";

@IonicPage()
@Component({
	selector: 'page-ccy-distribution',
	templateUrl: 'ccy-distribution.html',
})
export class CcyDistributionPage extends BasePage {

	private iPortfolioApiService: IPortfolioApiService;

	@ViewChild('barChartCanvas2') barChartCanvas2;

	ccyDistributionInfo = {
		dataList: [],
		chartData: {
			label: [],
			data: []
		}
	}

	beaListHeader = {
		left: "Currency",
		right: "Amount"
	}

	amount = 1635667494.00;
	date = "31 May 2018";

	constructor(public injector: Injector) {
		super(injector);
		this.iPortfolioApiService = injector.get(IPortfolioApiService);
	}

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		let data = this.iPortfolioApiService.getCcyDistribution().data;
		let dataList = data.currencyDistributionList;

		let chartLabel = [];
		let chartData = [];

		dataList.forEach((item) => {
			chartLabel.push(item.currency);
			chartData.push(item.amount);
		})

		this.ccyDistributionInfo.dataList = dataList;
		this.ccyDistributionInfo.chartData.label = chartLabel;
		this.ccyDistributionInfo.chartData.data = chartData;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BarChartPage');
		this.initCcyChart();
	}

	initCcyChart() {

		var el = this.barChartCanvas2.nativeElement;
		var ctx = el.getContext("2d");

		var themeColor = GradientColorUtil.getThemeColor();
		console.log("themeColor >>>>");
		console.log(themeColor);

		console.log("width >>>>" + el.width);
		console.log("height >>>>" + el.height);

		var chartData = {
			labels: this.ccyDistributionInfo.chartData.label,
			datasets: [{
				type: 'bar',
				backgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height),
				data: this.ccyDistributionInfo.chartData.data
			}]
		};

		var yTick = {
			callback: (label, index, labels) => {
				return label / 1000000 + 'mn';
			},
			fontColor: themeColor.gridLine,
			stepSize: 20000000,
			min: -40000000,
			max: 80000000,
			padding: 5
		};

		var xTick = {
			fontColor: themeColor.gridLine,
			padding: 5
		};

		var barChart = ChartUtil.createBarChar(this.barChartCanvas2,
			chartData,
			xTick,
			yTick,
			null
		);

		// update Gradient Color by barChart size
		let dataset = barChart.data.datasets[0];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height);

		barChart.update();

	}


}