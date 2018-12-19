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
  selector: 'page-mixed-chart',
  templateUrl: 'mixed-chart.html',
})
export class MixedChartPage {

	@ViewChild('mixedChartCanvas') mixedChartCanvas;
	
	mixedChart = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MixedChartPage');
    //this.initChart();
    this.initChart2();
  }

  initChart() {
    new Chart(this.mixedChartCanvas.nativeElement, {
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

    //  let chartColors = {
    //   red: 'rgb(255, 99, 132,0.5)',
    //   orange: 'rgb(255, 159, 64)',
    //   yellow: 'rgb(255, 205, 86)',
    //   green: 'rgb(75, 192, 192)',
    //   blue: 'rgb(54, 162, 235)',
    //   purple: 'rgb(153, 102, 255)',
		// 	grey: 'rgb(201, 203, 207)',
		// };

    function randomScalingFactor() {
      let max = 100;
      let min = -100;
      return Math.floor(Math.random() * (max - min + 1)) + min;
      //return Math.round(Samples.utils.rand(-100, 100));
		};
		
		var el = this.mixedChartCanvas.nativeElement;
		var ctx = el.getContext("2d");

		var themeColor = COLOR_THEME["theme1"];

    var chartData = {
			labels: this.pastSixMonthData.label,
			datasets: [{
				type: 'line',
				label: 'Dataset 1',
				borderColor: themeColor.mix.benchmarkLine,
				pointBackgroundColor: themeColor.mix.benchmarkLine,
				backgroundColor: themeColor.mix.benchmarkBackground,
				borderWidth: 2,
				data: this.pastSixMonthData.benchmark
			}, {
				type: 'line',
				label: 'Dataset 2',
				data: this.pastSixMonthData.monthlyReturn,
				borderColor: themeColor.mix.returnLine,
				pointBackgroundColor: themeColor.mix.returnLine,
				borderWidth: 2,
				fill: false,
			}, {
				type: 'bar',
				label: 'Dataset 3',
				backgroundColor: GradientColorUtil.getBarGradientColor(ctx, themeColor, el.width, el.height),
				hoverBackgroundColor: GradientColorUtil.getBarGradientColor(ctx, themeColor, el.width, el.height),
				data: this.pastSixMonthData.lastSixMonthReturn
			}]
    };
    

    this.mixedChart = new Chart(this.mixedChartCanvas.nativeElement, {
      type: 'bar',
      data: chartData,
      options: {
				responsive: true,
				aspectRatio: 1.3,
        title: {
          display: false,
          text: 'Chart.js Combo Bar Line Chart'
        },
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
									return label+'.00%';
								},
								fontColor: themeColor.gridLine,
								stepSize: 2,
								min: -4,
								max: 8,
								padding: 5,
							},
							gridLines: {
								color: themeColor.gridLine,
								zeroLineColor: themeColor.gridLine,
								drawBorder: true,
								drawTicks: false
							}
					}],
					xAxes: [{
							barPercentage: 0.5,
							ticks: {
								fontColor: themeColor.gridLine,
								padding: 5,
							},
							gridLines: {
								color: themeColor.gridLine,
								drawBorder: true,
								drawTicks: false
							}
					}]
				},
				events: [] // remove onhover
      }
		});
		
		// update Gradient Color by barChart size
		let dataset = this.mixedChart.data.datasets[2];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, themeColor, this.mixedChart.width, this.mixedChart.height);
		dataset.hoverBackgroundColor = GradientColorUtil.getBarGradientColor(ctx, themeColor, this.mixedChart.width, this.mixedChart.height);

		this.mixedChart.update();

	}

	pastSixMonthData = {
		label: [["DEC", "2017"], ["JAN", "2018"], ["FEB", "2018"], ["MAR", "2018"], ["APR", "2018"], ["MAY", "2018"]],
		benchmark: [5, 2.8, 7, -2.5, -1, 1],
		monthlyReturn: [2, 1.8, 5, -1, -2, 3],
		lastSixMonthReturn: [2, 1.8, 5.8, -3, -2, 3]
	}

	thisYearData = {
		label: [["JAN"], ["FEB"], ["MAR"], ["APR"], ["MAY"],["JUN"],["JUL"],["AUG"],["SEP"],["OCT"],["NOV"],["DEC"]],
		benchmark: [2.8, 7, -2.5, -1, 1, 2, 5, -3, -0.5, 3, 1, 7.5],
		monthlyReturn: [1.8, 5, -1, -2, 3, 6, 1, -3, -1.5, 4.5, 3, 7],
		lastSixMonthReturn: [1.8, 5.8, -3, -2, 3, 4, 4, -2, -1, 5, 2.5, 5]
	}
	
	pastSixMonth() {
    this.mixedChart.data.labels = this.pastSixMonthData.label;
		this.mixedChart.data.datasets[0].data = this.pastSixMonthData.benchmark;
		this.mixedChart.data.datasets[1].data = this.pastSixMonthData.monthlyReturn;
		this.mixedChart.data.datasets[2].data = this.pastSixMonthData.lastSixMonthReturn;
    this.mixedChart.update();
	}

	thisYear() {
    this.mixedChart.data.labels = this.thisYearData.label;
		this.mixedChart.data.datasets[0].data = this.thisYearData.benchmark;
		this.mixedChart.data.datasets[1].data = this.thisYearData.monthlyReturn;
		this.mixedChart.data.datasets[2].data = this.thisYearData.lastSixMonthReturn;
    this.mixedChart.update();
	}

}