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

	static createAreaChart(canvasObj, chartData, xTick, tooltips, clickCallback) {
		this.drawSelectedArea();
		return new Chart(canvasObj.nativeElement, {
			type: 'line',
			data: chartData,
			options: {
				responsive: true,
				aspectRatio: 1.3,
				spanGaps: false,
				elements: {
					line: {
					tension: 0.000001
					}
				},
				scales: {
					xAxes: [{
					ticks: xTick,
					gridLines: {
						display: true,
						color: "#3b486d",
						drawBorder: true,
						drawTicks: false,
					}
					}],
					yAxes: [{
					stacked: true, // Can't just just `stacked: true` like the docs say
					ticks: {
						callback: (label, index, labels) => {
						return label+'mn';
						},
						padding: 5,
						fontSize: 12, 
						fontFamily: "sans-serif", 
						fontColor: '#FFFFFF', 
						fontStyle: '200',
						stepSize: 20,
						min: 0,
						max: 80
					},
					gridLines: {
						display: true,
						color: "#3b486d",
						drawTicks: false,
					}
					}]
				},
				animation: {
					duration: 750,
				},
				legend: {
					display: false
				},
				tooltips: tooltips,
				onClick: (chartEvent, item) => {
					if (clickCallback) {
						clickCallback(chartEvent, item);
					}
				}
			},
		});
	}

	static drawSelectedArea() {
		// The original draw function for the line chart. This will be applied after we have drawn our highlight range (as a rectangle behind the line chart).
		var originalLineDraw = Chart.controllers.line.prototype.draw;
		// Extend the line chart, in order to override the draw function.
		Chart.helpers.extend(Chart.controllers.line.prototype, {
			draw : function() {
				var chart = this.chart;
				// Get the object that determines the region to highlight.
				var yHighlightRange = chart.config.data.yHighlightRange;
		
				var ctx = chart.chart.ctx;
				var xaxis = chart.scales['x-axis-0'];
				var yaxis = chart.scales['y-axis-0'];
		
				// If the object exists.
				if (yHighlightRange !== undefined) {
		
				var yRangeBegin = yHighlightRange.begin;
				var yRangeEnd = yHighlightRange.end;
		
				var yRangeBeginPixel = yaxis.getPixelForValue(yRangeBegin);
				var yRangeEndPixel = yaxis.getPixelForValue(yRangeEnd);
		
				ctx.save();
		
				// The fill style of the rectangle we are about to fill.
				ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
				// Fill the rectangle that represents the highlight region. The parameters are the closest-to-starting-point pixel's x-coordinate,
				// the closest-to-starting-point pixel's y-coordinate, the width of the rectangle in pixels, and the height of the rectangle in pixels, respectively.
				ctx.fillRect(xaxis.left, Math.min(yRangeBeginPixel, yRangeEndPixel), xaxis.right - xaxis.left, Math.max(yRangeBeginPixel, yRangeEndPixel) - Math.min(yRangeBeginPixel, yRangeEndPixel));
		
				ctx.restore();
				}
		
				var xHighlightRange = chart.config.data.xHighlightRange;
		
				// If the object exists.
				if (xHighlightRange !== undefined) {
		
				var xRangeBegin = xHighlightRange.begin;
				var xRangeEnd = xHighlightRange.end;
		
				var xRangeBeginPixel = xaxis.getPixelForTick(xRangeBegin);
				var xRangeEndPixel = xaxis.getPixelForTick(xRangeEnd);
		
				// console.log('xRangeBeginPixel = ' + xRangeBeginPixel);
				// console.log('xRangeEndPixel = ' + xRangeEndPixel);
				// console.log('yaxis.top = ' + yaxis.top);
				// console.log('yaxis.bottom = ' + yaxis.bottom);
		
				ctx.save();
				ctx.fillStyle = 'rgba(230, 230, 230, 0.01)';
				ctx.fillRect(
					Math.min(xRangeBeginPixel, xRangeEndPixel), 
					yaxis.top, 
					Math.max(xRangeBeginPixel, xRangeEndPixel) - Math.min(xRangeBeginPixel, xRangeEndPixel),
					yaxis.bottom - yaxis.top
				);
				ctx.restore();
		
				}
		
				// Apply the original draw function for the line chart.
				originalLineDraw.apply(this, arguments);
			}
		});
	}

}