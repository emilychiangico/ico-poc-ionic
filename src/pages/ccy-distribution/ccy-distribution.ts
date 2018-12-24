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
  selector: 'page-ccy-distribution',
  templateUrl: 'ccy-distribution.html',
})
export class CcyDistributionPage {

	@ViewChild('barChartCanvas2') barChartCanvas2;
	
	dataList = [
		{ccy: "AUD", amount: 25519193.18},
		{ccy: "EUR", amount: (32345243.34)},
		{ccy: "GBP", amount: (1532574.64)},
		{ccy: "HKD", amount: 71452643.53},
		{ccy: "OTH", amount: 1245632.53},
		{ccy: "USD", amount: 24743632.67}
	];

	beaListHeader = {
		left: "Currency",
		right: "Amount"
	  }

	constructor(public navCtrl: NavController, public navParams: NavParams) {
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

		// update Gradient Color by barChart size
		let dataset = barChart.data.datasets[0];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height);
		//dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height);

		barChart.update();

	}
	

}