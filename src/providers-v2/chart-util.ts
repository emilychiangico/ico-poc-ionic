import { Chart } from 'chart.js';
import { GradientColorUtil } from './gradient-color-util';
import { DoughnutUtil } from './doughnut-util';

export class ChartUtil {

  static colorTheme = GradientColorUtil.getThemeColor();

  static createBarChar(canvasObj, chartData, xTick, yTick, clickCallback) {
    return new Chart(canvasObj.nativeElement, {
		type: 'bar',
		data: chartData,
		options: {
			responsive: true,
			aspectRatio: 1.3,
			tooltips: {
				enabled: false
			},
			title: {
				display: false
			},
			legend: {
				display: false // no display legend
			},
			scales: {
				yAxes: [{
            		ticks: yTick,
						gridLines: {
							color: this.colorTheme.gridLine,
							zeroLineColor: this.colorTheme.gridLine,
							drawBorder: true,
							drawTicks: false
						}
					}],
					xAxes: [{
						ticks: xTick,
						gridLines: {
							color: this.colorTheme.gridLine,
							drawBorder: true,
							drawTicks: false
						}
					}]
				},
				events: (clickCallback) ? ["click"]: [], // [] => remove all event of chart
				onClick: (evt, item) => {
					if (clickCallback) {
						clickCallback(evt, item);
					}
				}
			}
		});
	}

  static createMixedChart(canvasObj, chartData) {
	return new Chart(canvasObj.nativeElement, {
		type: 'bar',
		data: chartData,
		options: {
			responsive: true,
			aspectRatio: 1.3,
			title: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			legend: {
				display: false, // no display legend
			},
			scales: {
				yAxes: [{
					ticks: {
						callback: (label, index, labels) => {
							return label + '.00%';
						},
						fontColor: this.colorTheme.gridLine,
						stepSize: 2,
						min: -4,
						max: 8,
						padding: 5,
					},
					gridLines: {
						color: this.colorTheme.gridLine,
						zeroLineColor: this.colorTheme.gridLine,
						drawBorder: true,
						drawTicks: false
					}
				}],
				xAxes: [{
						barPercentage: 0.5,
						ticks: {
							fontColor: this.colorTheme.gridLine,
							padding: 5,
						},
						gridLines: {
							color: this.colorTheme.gridLine,
							drawBorder: true,
							drawTicks: false
						}
					}]
				},
				events: []
			}
		});
	}

	static createDonghnutChart(canvasObj, chartData) {
		return new Chart(canvasObj.nativeElement, {
			type: 'doughnut',
			data: chartData,
			options: {
				aspectRatio: 1,
				cutoutPercentage: 92,
				legend: {
					display: false,
				},
				events: [] // remove all event of chart
			}
		});
	}

	static createDoughnutLegendChart(canvanObj, color, dataPercentage, rotateDegreeStart, rotateDegreeEnd, height) {
		var el = canvanObj.nativeElement;
		//console.log("test.width = " + el.width);
		//console.log("test.height = " + el.height);
		var ctx = el.getContext("2d");
	
		var center = height / 2;
		
		if(dataPercentage == 0) {
		  	DoughnutUtil.drawLegend(ctx, center, 0, 2 * Math.PI, 1, this.colorTheme.doughnut.notData);
		} else if(dataPercentage == 100) {
		  	DoughnutUtil.drawLegend(ctx, center, 0, 2 * Math.PI, 8.5, color);
		} else {
			console.log("rotateDegreeStart = " + rotateDegreeStart);
			console.log("rotateDegreeEnd = " + rotateDegreeEnd);
		
			var arcPoint = DoughnutUtil.getPointOfLegend(rotateDegreeStart, rotateDegreeEnd);
		
			DoughnutUtil.drawLegend(ctx, center, arcPoint.start, arcPoint.end, 8.5, color);
			DoughnutUtil.drawLegend(ctx, center, arcPoint.end, arcPoint.start, 1, this.colorTheme.doughnut.notData);
		}
	}

}