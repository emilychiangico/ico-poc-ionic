import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GradientColorUtil } from '../../providers-v2/util/gradient-color-util';
import { ChartUtil } from '../../providers-v2/util/chart-util';

/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bar-chart-2',
  templateUrl: 'bar-chart-2.html',
})
export class BarChart2Page {

	@ViewChild('barChartCanvas') barChartCanvas;
	@ViewChild('barChartCanvas2') barChartCanvas2;
	
	month: string = "MAY";
	selectedMonthIndex: number;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BarChartPage');
		//this.initChart();
		this.initChart2();
		this.initCcyChart();
	}
	
  	initChart2() {

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
				}
			}
		);
    
		// var barChart = new Chart(this.barChartCanvas.nativeElement, {
		// 	type: 'bar',
		// 	data: chartData,
		// 	options: {
		// 		responsive: true,
		// 		aspectRatio: 1.3,
		// 		tooltips: {
		// 			enabled: false,
		// 			mode: 'index',
		// 			intersect: true
		// 		},
		// 		legend: {
		// 			display: false, // no display legend
		// 		},
		// 		scales: {
		// 			yAxes: [{
		// 				ticks: {
		// 					callback: (label, index, labels) => {
		// 						return label+'mn';
		// 					},
		// 					fontColor: themeColor.gridLine, 
		// 					beginAtZero: true,
		// 					stepSize: 20,
		// 					max: 80,
		// 					padding: 5
		// 				},
		// 				gridLines: {
		// 					color: themeColor.gridLine,
		// 					drawBorder: true,
		// 					drawTicks: false
		// 				}
		// 			}],
		// 			xAxes: [{
		// 				ticks: {
		// 					fontFunction: (tickIndex) => {
		// 						//console.log("fontFunction tickIndex = " + tickIndex);
		// 						//console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
		// 						if (tickIndex == this.selectedMonthIndex) {
		// 							//console.log("******* should be bold****")
		// 							return 'bold 12px sans-serif';
		// 						} else {
		// 							//console.log("******* should be normal****")
		// 							return '200 12px sans-serif';
		// 						}
		// 					},
		// 					fontColor: themeColor.gridLine,
		// 					padding: 5
		// 				},
		// 				gridLines: {
		// 					color: themeColor.gridLine,
		// 					drawBorder: true,
		// 					drawTicks: false
		// 				}
		// 			}]
		// 		},
		// 		onClick : (evt, item) => { 
		// 			console.log("onClick >>>>>>>");
		// 			console.log(evt);
		// 			console.log(item);

		// 			if(item.length > 0) {
		// 				this.month = item[0]['_model'].label[0];

		// 				var index = item[0]._index;
		// 				var datasetIndex = item[0]._datasetIndex;
		// 				var dataset = barChart.data.datasets[datasetIndex];

		// 				console.log("index >> " + index);
		// 				this.selectedMonthIndex = index;

		// 				// Reset old state
		// 				dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, index);
		// 				dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, index);

		// 				barChart.update();
		// 			}
		// 		}
		// 	}
		// });

		// update Gradient Color by barChart size
		let dataset = barChart.data.datasets[0];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, 5);
		dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, 5);

		barChart.update();

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
			labels: ["AUD", "EUR", "GBP", "HKD", "OTH", "USD"],
			datasets: [{
				type: 'bar',
				backgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height),
				//hoverBackgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height),
				data: [20,- 25, -10, 50, 10, 20]
			}]
		};

		var yTick = {
			callback: (label, index, labels) => {
				return label + 'mn';
			},
			fontColor: themeColor.gridLine,
			stepSize: 20,
			min: -40,
			max: 80,
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
		
		// var barChart = new Chart(this.barChartCanvas2.nativeElement, {
		// 	type: 'bar',
		// 	data: chartData,
		// 	options: {
		// 		responsive: true,
		// 		aspectRatio: 1.3,
		// 		tooltips: {
		// 			enabled: false,
		// 			mode: 'index',
		// 			intersect: true
		// 		},
		// 		legend: {
		// 			display: false, // no display legend
		// 		},
		// 		scales: {
		// 			yAxes: [{
		// 				ticks: {
		// 					callback: (label, index, labels) => {
		// 						return label + 'mn';
		// 					},
		// 					fontColor: themeColor.gridLine,
		// 					stepSize: 20,
		// 					min: -40,
		// 					max: 80,
		// 					padding: 5
		// 				},
		// 				gridLines: {
		// 					color: themeColor.gridLine,
		// 					zeroLineColor: themeColor.gridLine,
		// 					drawBorder: true,
		// 					drawTicks: false
		// 				}
		// 			}],
		// 			xAxes: [{
		// 				ticks: {
		// 					fontColor: themeColor.gridLine,
		// 					padding: 5
		// 				},
		// 				gridLines: {
		// 					color: themeColor.gridLine,
		// 					drawBorder: true,
		// 					drawTicks: false
		// 				}
		// 			}]
		// 		},
		// 		events: [] // remove all event of chart
		// 	}
		// });

		// update Gradient Color by barChart size
		let dataset = barChart.data.datasets[0];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height);
		//dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height);

		barChart.update();

	}
	

}