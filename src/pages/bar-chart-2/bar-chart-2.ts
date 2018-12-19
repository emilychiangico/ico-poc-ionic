import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { GradientColorUtil } from '../../providers-v2/gradient-color-util';
import { COLOR_THEME } from './../../providers-v2/colorTheme';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MixedChartPage');
    //this.initChart();
		this.initChart2();
		this.initCcyChart();
  }

  initChart() {
    new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [{
            label: "Europe",
            type: "line",
            borderColor: "#8e5ea2",
            data: [408,547,675,734],
            fill: false
          }, {
            label: "Africa",
            type: "line",
            borderColor: "#3e95cd",
            data: [133,221,783,2478],
            fill: false
          }, {
            label: "Europe",
            type: "bar",
            backgroundColor: "rgba(0,0,0,0.2)",
            data: [408,547,675,734],
          }, {
            label: "Africa",
            type: "bar",
            backgroundColor: "rgba(0,0,0,0.2)",
            backgroundColorHover: "#3e95cd",
            data: [133,221,783,2478]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Population growth (millions): Europe & Africa'
        },
        legend: { display: false }
      }
    });
	}
	
	chartColors = {
		darkGrey: 'rgb(77, 79, 93)',
		grey: 'rgb(132, 139, 137)',
		darkWhite: "rgb(109, 108, 117)",
		white: "rgb(225, 225, 225)",
	};

  initChart2() {

  /*
	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = Months[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
  };
  */

		var el = this.barChartCanvas.nativeElement;
		var ctx = el.getContext("2d");

		// console.log(el);

		// console.log("el.width >> " + el.width);
		// console.log("el.height >> " + el.height);

		// console.log(el.style);

		// console.log("el.style.width >> " + el.style.width);
		// console.log("el.style.height >> " + el.style.height);
		
		// var colorNotSelect = {
		// 	type: "linear",
		// 	colorStops: [
		// 		{stop: 0, color: chartColors.darkWhite},
		// 		{stop: 0.1, color: chartColors.darkGrey},
		// 		{stop: 0.4, color: chartColors.darkWhite},
		// 		{stop: 0.5, color: chartColors.darkGrey},
		// 		{stop: 0.8, color: chartColors.darkWhite},
		// 		{stop: 0.9, color: chartColors.darkGrey}
		// 	],
		// 	point: GradientUtil.countPointOfLinearGradient(el.width, el.height, 135),
		// };

		// var colorOnSelect = {
		// 	type: "linear",
		// 	colorStops: [
		// 		{stop: 0, color: chartColors.white},
		// 		{stop: 0.1, color: chartColors.grey},
		// 		{stop: 0.4, color: chartColors.white},
		// 		{stop: 0.5, color: chartColors.grey},
		// 		{stop: 0.8, color: chartColors.white},
		// 		{stop: 0.9, color: chartColors.grey}
		// 	],
		// 	point: GradientUtil.countPointOfLinearGradient(el.width, el.height, 135),
		// };

		// var backgroundColors = GradientUtil.prepareSingleBackgroundColor(colorNotSelect, ctx);
		// var hoverBackgrounds = GradientUtil.prepareSingleBackgroundColor(colorOnSelect, ctx);

		var themeColor = COLOR_THEME["theme1"];
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
    
    var barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: chartData,
      options: {
		responsive: true,
		aspectRatio: 1.3,
        tooltips: {
					enabled: false,
          mode: 'index',
          intersect: true
				},
				legend: {
					display: false, // no display legend
				},
				scales: {
					yAxes: [{
							ticks: {
								callback: (label, index, labels) => {
									return label+'mn';
								},
								fontColor: themeColor.gridLine, 
								beginAtZero: true,
								stepSize: 20,
								max: 80,
								padding: 5
							},
							gridLines: {
								color: themeColor.gridLine,
								drawBorder: true,
								drawTicks: false
							}
					}],
					xAxes: [{
							ticks: {
								fontColor: themeColor.gridLine,
								padding: 5
							},
							gridLines: {
								color: themeColor.gridLine,
								drawBorder: true,
								drawTicks: false
							}
					}]
				},
				onClick : (evt, item) => { 
					console.log("onClick >>>>>>>");
					console.log(evt);
					console.log(item);
					var datasetIndex;
					var dataset;
					
					if(item.length > 0) {
						this.month = item[0]['_model'].label[0];

						var index = item[0]._index;
						datasetIndex = item[0]._datasetIndex;
						dataset = barChart.data.datasets[datasetIndex];

						console.log("index >> " + index);

						// Reset old state
						dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, index);
						dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, index);
						// for(var i = 0; i < dataset.data.length; i++) {
						// 	dataset.backgroundColor[i] = backgroundColors;
						// 	dataset.hoverBackgroundColor[i] = backgroundColors;
						// }
						
						// // Clicked element
						// dataset.backgroundColor[index] = hoverBackgrounds;
						// dataset.hoverBackgroundColor[index] = hoverBackgrounds;

						barChart.update();
					}
				},
      }
		});

		// update Gradient Color by barChart size
		let dataset = barChart.data.datasets[0];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, 5);
		dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height, 6, 5);

		barChart.update();

	}

	initCcyChart() {

		var el = this.barChartCanvas2.nativeElement;
		var ctx = el.getContext("2d");

		var themeColor = COLOR_THEME["theme1"];
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
		
		var barChart = new Chart(this.barChartCanvas2.nativeElement, {
			type: 'bar',
			data: chartData,
			options: {
				responsive: true,
				aspectRatio: 1.3,
				tooltips: {
					enabled: false,
					mode: 'index',
					intersect: true
				},
				legend: {
					display: false, // no display legend
				},
				scales: {
					yAxes: [{
						ticks: {
							callback: (label, index, labels) => {
								return label + 'mn';
							},
							fontColor: themeColor.gridLine,
							stepSize: 20,
							min: -40,
							max: 80,
							padding: 5
						},
						gridLines: {
							color: themeColor.gridLine,
							zeroLineColor: themeColor.gridLine,
							drawBorder: true,
							drawTicks: false
						}
					}],
					xAxes: [{
						ticks: {
							fontColor: themeColor.gridLine,
							padding: 5
						},
						gridLines: {
							color: themeColor.gridLine,
							drawBorder: true,
							drawTicks: false
						}
					}]
				},
				events: [] // remove all event of chart
			}
		});

		// update Gradient Color by barChart size
		let dataset = barChart.data.datasets[0];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height);
		//dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, barChart.width, barChart.height);

		barChart.update();

	}
	

}