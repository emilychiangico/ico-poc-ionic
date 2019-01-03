import { Component, ViewChild, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { GradientColorUtil } from '../../../providers-v2/util/gradient-color-util';
import { PortfolioHoldingType } from '../../../providers-v2/util/portfolio-holding-util';
import { ChartUtil } from '../../../providers-v2/util/chart-util';

import { AssetAllocationDetailPage } from '../../asset-allocation-detail/asset-allocation-detail';
import { NavDetailPage } from '../../nav-detail/nav-detail';

import { BasePage } from '../../base-page';
/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio-history',
  templateUrl: 'portfolio-history.html',
})
export class PortfolioHistoryPage extends BasePage {

	@ViewChild('barChartCanvas') barChartCanvas;

	navDataList = [
		{
			title: "Dec 2017",
			netAssetValue: 1134132.18,
			cashAndDeposit: 1857040.24,
			investment: 9135140.62,
			loan: -1157040.24
		},
		{
			title: "Jan 2018",
			netAssetValue: 34132.18,
			cashAndDeposit: 21857040.24,
			investment: 5135140.62,
			loan: -857040.24
		},
		{
			title: "Feb 2018",
			netAssetValue: 11134132.18,
			cashAndDeposit: 81857040.24,
			investment: 1135140.62,
			loan: -31857040.24
		},
		{
			title: "Mar 2018",
			netAssetValue: 9134132.18,
			cashAndDeposit: 11857040.24,
			investment: 91135140.62,
			loan: -431857040.24
		},
		{
			title: "Apr 2018",
			netAssetValue: 49134132.18,
			cashAndDeposit: 11857040.24,
			investment: 21135140.62,
			loan: -11857040.24
		},
		{
			title: "May 2018",
			netAssetValue: 89134132.18,
			cashAndDeposit: 31857040.24,
			investment: 71135140.62,
			loan: -31857040.24
		}
	];

	navSelectedData;

	@ViewChild('areaChartCanvas') areaChartCanvas;
	savingAndCurrent = [6, 13.2, 10.8, 6, 12, 12, 12];
	timeDeposit =     [6, 6.4, 5, 4, 4.2, 4.6, 5];
	unitTrust = [6, 7, 7, 5, 4.5, 4.8, 5.5];
	structProd = [8.6, 8.6, 9.5, 7, 7.5, 7.5, 7.7];
	bondsNoteCert = [9, 9, 10, 9, 8, 8.2, 8.6];
	stock = [4, 5, 4.5, 2, 8, 4, 10];
	areaChartLabel = [
	  ["DEC", "2017"], 
	  ["JAN", "2018"], 
	  ["FEB", "2018"], 
	  ["MAR", "2018"], 
	  ["APR", "2018"], 
	  ["MAY", "2018"],
	  ["JUN", "2018"],
	];
	holdingTypeList = [
	  PortfolioHoldingType.SavingAndCurrent,
	  PortfolioHoldingType.TimeDeposit,
	  PortfolioHoldingType.StructuredProduct,
	  PortfolioHoldingType.UnitTrust,
	  PortfolioHoldingType.Stock,
	  PortfolioHoldingType.BondNoteCertDeposit,
	];
	areaDataList = {
		title: [
			"Saving & Current", "Time Deposit", "Structured Product", "Unit Trust", "Stock", "Bonds, Note & Certifcate of Deposit",
		],
		data: [
			this.savingAndCurrent, this.timeDeposit, this.unitTrust, this.structProd, this.bondsNoteCert, this.stock
		]
	};

	assetSelectedData;
	header;

	month: string = "MAY";
	selectedMonthIndex: number = 5;

	selectedTab = "asset";

	amount = 1635667494.00;
	date = "31 May 2018";

	constructor(injector: Injector) {
		super(injector);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BarChartPage');
		this.initChart();
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
			labels: [
				["DEC", "2017"], 
				["JAN", "2018"], 
				["FEB", "2018"], 
				["MAR", "2018"], 
				["APR", "2018"], 
				["MAY", "2018"]
			],
			datasets: [{
				type: 'bar',
				backgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height, 6, 5),
				hoverBackgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height, 6, 5),
				data: [30,40,30,50,35,45]
			}]
		};

		let xTick = {
			fontFunction: (tickIndex) => {
				//console.log("fontFunction tickIndex = " + tickIndex);
				//console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
				if (tickIndex == this.selectedMonthIndex) {
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
				return label+'mn';
			},
			fontColor: themeColor.gridLine, 
			beginAtZero: true,
			stepSize: 20,
			max: 80,
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

				if(item.length > 0) {
					this.month = item[0]['_model'].label[0];

					var index = item[0]._index;
					var datasetIndex = item[0]._datasetIndex;
					var dataset = barChart.data.datasets[datasetIndex];

					console.log("index >> " + index);
					this.selectedMonthIndex = index;

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
		var areaChartCanvasEl = this.areaChartCanvas.nativeElement;
		console.log("areaChartCanvasEl.width = " + areaChartCanvasEl.width);
		console.log("areaChartCanvasEl.height = " + areaChartCanvasEl.height);
		var ctx = areaChartCanvasEl.getContext("2d");

		const backgroundColors = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, areaChartCanvasEl.width, areaChartCanvasEl.height);

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
			labels: this.areaChartLabel,
			xHighlightRange: {
			  begin: this.selectedMonthIndex,
			  end: this.selectedMonthIndex + 1
			},
			datasets: setdata(this.areaDataList.data)
		};

		var xTick = {
			labelOffset: 30,
			fontFunction: (tickIndex) => {
				// console.log("fontFunction tickIndex = " + tickIndex);
				// console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
				if (tickIndex == this.selectedMonthIndex) {
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
				  x <= xAxis.right && x >= xAxis.left 
				  /** && y <= xAxis.bottom && y >= xAxis.top **/
				 ) {
				  // category scale returns index here for some reason
				  var index = xAxis.getValueForPixel(x);
				  this.selectedMonthIndex = index;
				  //this.selectedMonthLabel = areaChart.data.labels[index].join();
				  this.selectMonth(areaChart, this.selectedMonthIndex);
				  this.selectAreaData();
				  //document.getElementById('tick').innerHTML = chartInstance.data.labels[index];
				// var element = this.getElementAtEvent(e);
				// if (element.length) {
				//    console.log(element[0])
				// }
				}
			}
		);

		// update color by char size
		let color = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, areaChart.width, areaChart.height);

		let datasets = areaChart.data.datasets;
		for(var i = 0; i < datasets.length; i++) {
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

	selectAreaData() {
		let list = [];
		this.holdingTypeList.forEach((item, index) => {
			list.push({
				type: item,
				title: this.areaDataList.title[index],
				percentage: this.areaDataList.data[index][this.selectedMonthIndex]
			});
		});
		this.assetSelectedData = list;

		let label = this.areaChartLabel[this.selectedMonthIndex];
		this.header = {
			left: label[0] + " " + label[1],
			right: ""
		}
	}

	selectBarData() {
		let list = [];
		list.push(this.navDataList[this.selectedMonthIndex]);
		this.navSelectedData = list;

		let label = this.areaChartLabel[this.selectedMonthIndex];
		this.header = {
			left: label[0] + " " + label[1],
			right: ""
		}
	}

	/********** button function **********/
	changeTab(type) {
		if(type == "asset") {
			this.selectedTab = "asset";
		} else {
			this.selectedTab = "nav";
		}
	}

	viewDetail() {
		if(this.selectedTab == "asset") {
			this.push(AssetAllocationDetailPage);
		} else {
			this.push(NavDetailPage);
		}
	}
	
}