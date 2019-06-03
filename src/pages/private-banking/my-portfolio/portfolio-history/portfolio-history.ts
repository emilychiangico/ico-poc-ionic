import { Component, ViewChild, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { GradientColorUtil } from '../../../../providers-v2/util/gradient-color-util';
import { IPortfolioUtil } from '../../../../providers-v2/util/i-portfolio-util';
import { ChartUtil } from '../../../../providers-v2/util/chart-util';
import { IPortfolioApiService } from "../../../../providers-v2/api/i-portfolio-api-service";
import { IPortfolioApiMockService } from "../../../../providers-v2/api/i-portfolio-api-mock-service";

import { AssetAllocationDetailPage } from '../../asset-allocation-detail/asset-allocation-detail';
import { NavDetailPage } from '../../nav-detail/nav-detail';

import { BasePage } from '../../../base-page';

@IonicPage()
@Component({
	selector: 'page-portfolio-history',
	templateUrl: 'portfolio-history.html',
})
export class PortfolioHistoryPage extends BasePage {

	iPortfolioApiService: IPortfolioApiService;
	iPortfolioApiMockService: IPortfolioApiMockService; //testing

	@ViewChild('barChartCanvas') barChartCanvas;
	navDataInfo = {
		chartData: {
			label: [],
			data: []
		},
		detail: []
	};

	navSelectedData;
	navHeader;

	@ViewChild('areaChartCanvas') areaChartCanvas;
	assetAllocationDataInfo = {
		holdingTypeList: [],
		chartData: {
			label: [],
			amount: []
		},
		percentage: []
	};

	assetSelectedData;
	assetHeader;

	assetSelectedMonthIndex: number = 5;
	navSelectedMonthIndex: number = 5;

	selectedTab = "asset";

	totalAmountInfo = {
		ccy: "HKD",
		amount: 1635667494.00,
		date: "31 May 2018"
	}

	constructor(injector: Injector) {
		super(injector);
		this.iPortfolioApiService = injector.get(IPortfolioApiService);
		this.iPortfolioApiMockService = injector.get(IPortfolioApiMockService);
	}

	ngOnInit() {
		this.loadData();
	}

	/************ Data Handling start ************/

	loadData() {
		console.log("loadAssetAllocationData >> ");
		// this.iPortfolioApiService.getAssetAllocationHistory().subscribe(
		// 	response => {
		// 		console.log("response >> ");
		// 		console.log(response);
				let response = this.iPortfolioApiMockService.getAssetAllocationHistory();
				let data = response.data;
				this.totalAmountInfo = IPortfolioUtil.setTotalAumontInfo(data.portfolioCurrency, data.totalAUM, data.lastUpdateDate);
				this.assetAllocationDataInfo = IPortfolioUtil.setAssetAllocationData(data.assetAllocationHistoryList);
				this.navDataInfo = IPortfolioUtil.setNavData(data.netAssetValueHistoryList);
				console.log(this.assetAllocationDataInfo);

				this.initChart();
		// 	}
		// );
	}

	/************ Data Handling end ************/

	/************ Chart Handling start ************/
	ionViewDidLoad() {
		console.log('ionViewDidLoad BarChartPage');
		
	}

	initChart() {
		this.initBarChar();
		this.initAreaChar();
	}

	initBarChar() {

		var el = this.barChartCanvas.nativeElement;
		var ctx = el.getContext("2d");

		var themeColor = GradientColorUtil.getThemeColor();
		console.log("themeColor >>>>");
		console.log(themeColor);

		console.log("width >>>>" + el.width);
		console.log("height >>>>" + el.height);

		var chartData = {
			labels: this.navDataInfo.chartData.label,
			datasets: [{
				type: 'bar',
				backgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height, 6, 5),
				hoverBackgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height, 6, 5),
				data: this.navDataInfo.chartData.data
			}]
		};

		let xTick = {
			fontFunction: (tickIndex) => {
				//console.log("fontFunction tickIndex = " + tickIndex);
				//console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
				if (tickIndex == this.navSelectedMonthIndex) {
					//console.log("******* should be bold****")
					return 'bold 12px sans-serif';
				} else {
					//console.log("******* should be normal****")
					return '200 12px sans-serif';
				}
			},
			fontColor: themeColor.gridLine,
			padding: 5
		};

		let yTick = {
			callback: (label, index, labels) => {
				return Number(label) / 1000000 + 'mn';
			},
			fontColor: themeColor.gridLine,
			beginAtZero: true,
			stepSize: 20000000,
			max: 80000000,
			padding: 5
		};

		var barChart = ChartUtil.createBarChar(this.barChartCanvas,
			chartData,
			xTick,
			yTick,
			(evt, item) => {
				console.log("onClick >>>>>>>");
				console.log(evt);
				console.log(item);

				if (item.length > 0) {
					var index = item[0]._index;
					var datasetIndex = item[0]._datasetIndex;
					var dataset = barChart.data.datasets[datasetIndex];

					console.log("index >> " + index);
					this.navSelectedMonthIndex = index;

					// Reset old state
					dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, index);
					dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, index);

					barChart.update();

					this.selectBarData();
				}
			}
		);

		// update Gradient Color by barChart size
		let dataset = barChart.data.datasets[0];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, 5);
		dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, 5);

		barChart.update();

		this.selectBarData();
	}

	initAreaChar() {
		ChartUtil.initChartForSelectedArea();
		var areaChartCanvasEl = this.areaChartCanvas.nativeElement;
		console.log("areaChartCanvasEl.width = " + areaChartCanvasEl.width);
		console.log("areaChartCanvasEl.height = " + areaChartCanvasEl.height);
		var ctx = areaChartCanvasEl.getContext("2d");

		let holdingTypeList = this.assetAllocationDataInfo.holdingTypeList;

		const backgroundColors = GradientColorUtil.getAreaGradientColor(ctx, holdingTypeList, areaChartCanvasEl.width, areaChartCanvasEl.height);

		function setdata(dataList) {
			let dataset = [];
			dataList.forEach((element, index) => {
				dataset.push({
					fill: true,
					backgroundColor: backgroundColors[index],
					pointRadius: 0,
					borderWidth: 0.01,
					borderColor: backgroundColors[index],
					borderCapStyle: 'butt',
					data: element
				});
			});
			return dataset;
		}

		var data = {
			labels: this.assetAllocationDataInfo.chartData.label,
			xHighlightRange: {
				begin: this.assetSelectedMonthIndex,
				end: this.assetSelectedMonthIndex + 1
			},
			datasets: setdata(this.assetAllocationDataInfo.chartData.amount)
		};

		var xTick = {
			labelOffset: 30,
			fontFunction: (tickIndex) => {
				// console.log("fontFunction tickIndex = " + tickIndex);
				// console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
				if (tickIndex == this.assetSelectedMonthIndex) {
					//console.log("******* should be bold****")
					return 'bold 12px sans-serif';
				} else {
					//console.log("******* should be normal****")
					return '200 12px sans-serif';
				}
			},
			padding: 5,
			fontSize: 12,
			fontFamily: "sans-serif",
			fontColor: '#FFFFFF',
			fontStyle: '200'
		};

		var areaChart = ChartUtil.createAreaChart(this.areaChartCanvas, data,
			xTick,
			{},
			(chartEvent, item) => {
				console.log("onClick");
				console.log(chartEvent);
				console.log(item);

				var xAxis = areaChart.scales['x-axis-0'];
				console.log(xAxis);

				// If mouse is over the legend, change cursor style to pointer, else don't show it
				var x = chartEvent.offsetX - 30;
				var y = chartEvent.offsetY;

				if (chartEvent.type === 'click' &&
					x <= xAxis.right - 30 && x >= xAxis.left - 30
					/** && y <= xAxis.bottom && y >= xAxis.top **/
				) {
					// category scale returns index here for some reason
					var index = xAxis.getValueForPixel(x);
					this.assetSelectedMonthIndex = index;
					//this.selectedMonthLabel = areaChart.data.labels[index].join();
					this.selectMonth(areaChart, this.assetSelectedMonthIndex);
					this.selectAreaData();
				}
			}
		);

		// update color by char size
		let color = GradientColorUtil.getAreaGradientColor(ctx, holdingTypeList, areaChart.width, areaChart.height);

		let datasets = areaChart.data.datasets;
		for (var i = 0; i < datasets.length; i++) {
			datasets[i].backgroundColor = color[i]
		}

		areaChart.update();

		this.selectAreaData();
	}

	selectMonth(chart, index) {
		chart.data.xHighlightRange.begin = index;
		chart.data.xHighlightRange.end = index + 1;
		chart.update();
	}

	/************ Chart Handling end ************/

	selectAreaData() {
		let list = [];
		this.assetAllocationDataInfo.holdingTypeList.forEach((item, index) => {
			list.push({
				type: item,
				title: IPortfolioUtil.getTitle(item),
				percentage: this.assetAllocationDataInfo.percentage[index][this.assetSelectedMonthIndex]
			});
		});
		this.assetSelectedData = list;

		let label = this.assetAllocationDataInfo.chartData.label[this.assetSelectedMonthIndex];
		this.assetHeader = {
			left: label[0] + " " + label[1],
			right: ""
		}
	}

	selectBarData() {
		let list = [];
		list.push(this.navDataInfo.detail[this.navSelectedMonthIndex]);
		this.navSelectedData = list;

		let label = this.navDataInfo.chartData.label[this.navSelectedMonthIndex];
		this.navHeader = {
			left: label[0] + " " + label[1],
			right: ""
		}
	}

	/********** button function **********/
	changeTab(type) {
		if (type == "asset") {
			this.selectedTab = "asset";
		} else {
			this.selectedTab = "nav";
		}
	}

	viewDetail() {
		if (this.selectedTab == "asset") {
			this.push(AssetAllocationDetailPage, this.assetAllocationDataInfo);
		} else {
			this.push(NavDetailPage, this.navDataInfo);
		}
	}

}