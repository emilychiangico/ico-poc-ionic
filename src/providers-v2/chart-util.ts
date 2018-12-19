import { Chart } from 'chart.js';
import { GradientColorUtil } from './gradient-color-util';

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

}