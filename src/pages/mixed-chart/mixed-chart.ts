import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GradientColorUtil } from '../../providers-v2/util/gradient-color-util';
import { ChartUtil } from './../../providers-v2/util/chart-util';

/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mixed-chart',
  templateUrl: 'mixed-chart.html',
})
export class MixedChartPage {

	@ViewChild('mixedChartCanvas') mixedChartCanvas;
	
	mixedChart = null;
	//type = PortfolioHoldingType.SavingAndCurrent;

	pastSixMonthData = {
		label: [["DEC", "2017"], ["JAN", "2018"], ["FEB", "2018"], ["MAR", "2018"], ["APR", "2018"], ["MAY", "2018"]],
		benchmarkDataList: [
			{
				benchmark: [5, 2.8, 7, -2.5, -1, 1],
				monthlyReturn: [2, 1.8, 5, -1, -2, 3],
				lastSixMonthReturn: [2, 1.8, 5.8, -3, -2, 3]
			},
			{
				benchmark: [4, 1.8, 8, -3.5, -2, 1],
				monthlyReturn: [5, 3.8, 2, -2, -4, 6],
				lastSixMonthReturn: [4, 6.8, 2.8, -4, -2, 1]
			},
			{
				benchmark: [2, 0.8, 5, -1.5, -3, 4],
				monthlyReturn: [6, 4.8, 1, -2, -3, 2],
				lastSixMonthReturn: [5, 3.8, 1.8, -2, -1, 5]
			}
		]
	}

	thisYearData = {
		label: [["JAN"], ["FEB"], ["MAR"], ["APR"], ["MAY"],["JUN"],["JUL"],["AUG"],["SEP"],["OCT"],["NOV"],["DEC"]],
		benchmarkDataList: [
			{
				benchmark: [2.8, 7, -2.5, -1, 1, 2, 5, -3, -0.5, 3, 1, 7.5],
				monthlyReturn: [1.8, 5, -1, -2, 3, 6, 1, -3, -1.5, 4.5, 3, 7],
				lastSixMonthReturn: [1.8, 5.8, -3, -2, 3, 4, 4, -2, -1, 5, 2.5, 5]
			},
			{
				benchmark: [4, 1.8, 8, -3.5, -2, 1, 2, 2, 3, 3, 4, 5],
				monthlyReturn: [5, 3.8, 2, -2, -4, 6, 5, 4, 3, 2, 1 ,1],
				lastSixMonthReturn: [4, 6.8, 2.8, -4, -2, 1, 1, 2, 3, 4, 5, 6]
			},
			{
				benchmark: [2, 0.8, 5, -1.5, -3, 4, 6, 6, 5, 4, 4, 1],
				monthlyReturn: [6, 4.8, 1, -2, -3, 2, 1, 2, 3, -3, 4, 5],
				lastSixMonthReturn: [5, 3.8, 1.8, -2, -1, 5, 6, 5, 4, 3, 2, 1]
			}
		]
	}

	selectedIndex = 0;
	selectedList = this.pastSixMonthData;

	legendList : any[] = [];

	dataList = [{type: "Change (Net Capital In-Out Value)", amount:4756964.13}];

	beaListHeader = {
		left: "01 Nov 2017 - 30 Apr 2018",
		right: ""
	};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MixedChartPage');
    this.initChart2();
  }

  initChart2() {

    // function randomScalingFactor() {
    //   let max = 100;
    //   let min = -100;
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    //   //return Math.round(Samples.utils.rand(-100, 100));
		// };
		
		var el = this.mixedChartCanvas.nativeElement;
		var ctx = el.getContext("2d");

		var themeColor = GradientColorUtil.getThemeColor();

		this.setLegend(themeColor);

    var chartData = {
			labels: this.pastSixMonthData.label,
			datasets: [{
				type: 'line',
				label: 'Dataset 1',
				borderColor: themeColor.mix.benchmarkLine,
				pointBackgroundColor: themeColor.mix.benchmarkLine,
				backgroundColor: themeColor.mix.benchmarkBackground,
				borderWidth: 2,
				data: this.pastSixMonthData.benchmarkDataList[this.selectedIndex].benchmark
			}, {
				type: 'line',
				label: 'Dataset 2',
				data: this.pastSixMonthData.benchmarkDataList[this.selectedIndex].monthlyReturn,
				borderColor: themeColor.mix.returnLine,
				pointBackgroundColor: themeColor.mix.returnLine,
				borderWidth: 2,
				fill: false,
			}, {
				type: 'bar',
				label: 'Dataset 3',
				backgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height),
				hoverBackgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height),
				data: this.pastSixMonthData.benchmarkDataList[this.selectedIndex].lastSixMonthReturn
			}]
    };
    
		this.mixedChart = ChartUtil.createMixedChart(this.mixedChartCanvas, chartData);
    // this.mixedChart = new Chart(this.mixedChartCanvas.nativeElement, {
    //   type: 'bar',
    //   data: chartData,
    //   options: {
		// 		responsive: true,
		// 		aspectRatio: 1.3,
    //     title: {
    //       display: false,
    //       text: 'Chart.js Combo Bar Line Chart'
    //     },
    //     tooltips: {
		// 			enabled: false,
    //       mode: 'index',
    //       intersect: true
		// 		},
		// 		legend: {
		// 			display: false, // no display legend
		// 		},
		// 		scales: {
		// 			yAxes: [{
		// 					ticks: {
		// 						callback: (label, index, labels) => {
		// 							return label+'.00%';
		// 						},
		// 						fontColor: themeColor.gridLine,
		// 						stepSize: 2,
		// 						min: -4,
		// 						max: 8,
		// 						padding: 5,
		// 					},
		// 					gridLines: {
		// 						color: themeColor.gridLine,
		// 						zeroLineColor: themeColor.gridLine,
		// 						drawBorder: true,
		// 						drawTicks: false
		// 					}
		// 			}],
		// 			xAxes: [{
		// 					barPercentage: 0.5,
		// 					ticks: {
		// 						fontColor: themeColor.gridLine,
		// 						padding: 5,
		// 					},
		// 					gridLines: {
		// 						color: themeColor.gridLine,
		// 						drawBorder: true,
		// 						drawTicks: false
		// 					}
		// 			}]
		// 		},
		// 		events: [] // remove onhover
    //   }
		// });
		
		// update Gradient Color by barChart size
		let dataset = this.mixedChart.data.datasets[2];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, this.mixedChart.width, this.mixedChart.height);
		dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, this.mixedChart.width, this.mixedChart.height);

		this.mixedChart.update();

	}
	
	pastSixMonth() {
		this.selectedList = this.pastSixMonthData;

    this.mixedChart.data.labels = this.pastSixMonthData.label;
		this.mixedChart.data.datasets[0].data = this.pastSixMonthData.benchmarkDataList[this.selectedIndex].benchmark;
		this.mixedChart.data.datasets[1].data = this.pastSixMonthData.benchmarkDataList[this.selectedIndex].monthlyReturn;
		this.mixedChart.data.datasets[2].data = this.pastSixMonthData.benchmarkDataList[this.selectedIndex].lastSixMonthReturn;

		this.mixedChart.options.scales.xAxes[0].ticks.fontSize = 12;
		this.mixedChart.options.scales.yAxes[0].ticks.fontSize = 12;

    this.mixedChart.update();
	}

	thisYear() {
		this.selectedList = this.thisYearData;

    this.mixedChart.data.labels = this.thisYearData.label;
		this.mixedChart.data.datasets[0].data = this.thisYearData.benchmarkDataList[this.selectedIndex].benchmark;
		this.mixedChart.data.datasets[1].data = this.thisYearData.benchmarkDataList[this.selectedIndex].monthlyReturn;
		this.mixedChart.data.datasets[2].data = this.thisYearData.benchmarkDataList[this.selectedIndex].lastSixMonthReturn;

		this.mixedChart.options.scales.xAxes[0].ticks.fontSize = 10;
		this.mixedChart.options.scales.yAxes[0].ticks.fontSize = 10;

    this.mixedChart.update();
	}

	setLegend(themeColor) {
		this.legendList = [
			{name:"Monthly Return", color: themeColor.mix.returnLine, type:""},
			{name:"Last 6 Monthly Return", color: themeColor.mix.returnLine, type:"line"},
			{name:"Benchmark", color: themeColor.mix.benchmarkLine, type:"line"},
		]
	}

	changeBenchmark(index) {
		this.selectedIndex = index;

		this.mixedChart.data.datasets[0].data = this.selectedList.benchmarkDataList[this.selectedIndex].benchmark;
		this.mixedChart.data.datasets[1].data = this.selectedList.benchmarkDataList[this.selectedIndex].monthlyReturn;
		this.mixedChart.data.datasets[2].data = this.selectedList.benchmarkDataList[this.selectedIndex].lastSixMonthReturn;

    this.mixedChart.update();
	}

}