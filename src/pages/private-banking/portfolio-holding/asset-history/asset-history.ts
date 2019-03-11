import { Component, ViewChild, Injector } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { BasePage } from '../../../base-page';

import { GradientColorUtil } from '../../../../providers-v2/util/gradient-color-util';
import { IPortfolioUtil } from '../../../../providers-v2/util/i-portfolio-util';
import { ChartUtil } from '../../../../providers-v2/util/chart-util';

import { AssetAllocationDetailPage } from '../../asset-allocation-detail/asset-allocation-detail';
import { MyPortfolioPage } from '../../my-portfolio/my-portfolio';

@IonicPage()
@Component({
	selector: 'page-asset-history',
	templateUrl: 'asset-history.html',
})
export class AssetHistoryPage extends BasePage {

	@ViewChild(Content) content: Content;

	@ViewChild('areaChartContainer') areaChartContainer;
	@ViewChild('areaChartCanvas') areaChartCanvas;
	areaChart2;
	areaChartCanvasCtx;
	selectedMonthIndex: number = 0;
	selectedMonthLabel: string;

	title = "";

	assetAllocationDataInfo = {
		selectedAccountType: null,
		holdingTypeList: [],
		chartData: {
			label: [],
			amount: []
		}
	};

	selectedAccountType = null;

	constructor(injector: Injector) {
		super(injector);
	}

	ionViewDidLoad() {
		console.log('AssetHistoryPage >> ionViewDidLoad');
	}

	ionViewWillEnter() {
		console.log("AssetHistoryPage >> ionViewWillEnter");
		this._event.subscribe('change-type-history', (assetAllocationDataInfo) => {
			console.log('change-type-history >> ');
			console.log(assetAllocationDataInfo);
			this.assetAllocationDataInfo = assetAllocationDataInfo;
			this.selectedAccountType = assetAllocationDataInfo.selectedAccountType;
			this.title = IPortfolioUtil.getTitle(this.selectedAccountType);

			if (this.areaChart2) {
				this.updateChart();
			} else {
				ChartUtil.initChartForSelectedArea();
				this.initAreaChart();
			}
		});
	}

	ionViewWillLeave() {
		console.log("AssetHistoryPage >> ionViewWillLeave");
		this._event.unsubscribe('change-type-history');
	}

	ionViewWillUnload() {
		console.log("AssetHistoryPage >> ionViewWillUnload");
		this._event.unsubscribe('change-type-history');
	}

	selectMonth(chart, index) {
		chart.data.xHighlightRange.begin = index;
		chart.data.xHighlightRange.end = index + 1;
		chart.update();
	}

	initAreaChart() {

		var areaChartCanvasEl = this.areaChartCanvas.nativeElement;
		console.log("areaChartCanvasEl.width = " + areaChartCanvasEl.width);
		console.log("areaChartCanvasEl.height = " + areaChartCanvasEl.height);
		this.areaChartCanvasCtx = areaChartCanvasEl.getContext("2d");

		const backgroundColors = GradientColorUtil.getAreaGradientColor(this.areaChartCanvasCtx, [this.selectedAccountType], areaChartCanvasEl.width, areaChartCanvasEl.height);

		let chartData = {
			labels: this.assetAllocationDataInfo.chartData.label,
			xHighlightRange: {
				begin: this.selectedMonthIndex,
				end: this.selectedMonthIndex + 1
			},
			datasets: [{
				fill: true,
				backgroundColor: backgroundColors[0],
				pointRadius: 0,
				borderWidth: 0.01,
				borderColor: backgroundColors[0],
				borderCapStyle: 'butt',
				data: this.assetAllocationDataInfo.chartData.amount[0],
			}]
		};

		let clickCallback = (chartEvent, item) => {
			console.log("onClick");
			console.log(chartEvent);
			console.log(item);

			var xAxis = this.areaChart2.scales['x-axis-0'];
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
				this.selectedMonthIndex = index;
				this.selectedMonthLabel = this.areaChart2.data.labels[index].join();
				this.selectMonth(this.areaChart2, this.selectedMonthIndex);

				ChartUtil.openTip(this.areaChart2, 0, this.selectedMonthIndex);
			}
			//else {
			//ChartUtil.closeTip(this.areaChart2, 0, this.selectedMonthIndex);
			//}
		};

		let xTick = {
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

		let customTooltip = {
			enabled: false,
			custom: (tooltipModel) => {
				console.log("tooltips custom function");
				console.log(tooltipModel);
				// dataPoint only exist when area is selected
				if (tooltipModel.dataPoints) {
					console.log(tooltipModel.dataPoints[0].yLabel);
				}

				// Tooltip Element
				var tooltipEl = document.getElementById('chartjs-tooltip');

				// Create element on first render
				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chartjs-tooltip';
					//tooltipEl.innerHTML = "<table></table>";
					this.areaChartContainer.nativeElement.appendChild(tooltipEl);
					//document.body.appendChild(tooltipEl);
				}

				// Hide if no tooltip / no dataPoint exist
				if (!tooltipModel.dataPoints || tooltipModel.opacity === 0) {
					tooltipEl.style.opacity = "0";
					return;
				}

				// Set caret Position
				tooltipEl.classList.remove('above', 'below', 'no-transform');
				if (tooltipModel.yAlign) {
					tooltipEl.classList.add(tooltipModel.yAlign);
				} else {
					tooltipEl.classList.add('no-transform');
				}

				function getBody(bodyItem) {
					return bodyItem.lines;
				}

				// Set Text
				if (tooltipModel.body) {
					var titleLines = tooltipModel.title || [];
					var bodyLines = tooltipModel.body.map(getBody);

					var marginLeft = (this.selectedMonthIndex == 0) ? -10 : ((this.selectedMonthIndex == 5) ? -80 : -30);

					var innerHtml = '';

					innerHtml += '<div style="position: relative;">';

					innerHtml += '<div style="margin-left: ' + marginLeft + 'px; background: blue; padding: 3px 20px; border-radius: 10px; color: #FFF; font-weight: bold;">';
					innerHtml += "HKD " + tooltipModel.dataPoints[0].yLabel;
					innerHtml += '</div>';

					innerHtml += '<div style="border-left: 3px dashed #FFFFFF; width: 1%; height: 40px;"></div>';

					innerHtml += '<div style="margin-left: -5px; background: white; border-radius: 7px; width: 14px; height: 14px; padding: 2px;">';
					innerHtml += '<div style="background: blue; border-radius: 5px; width: 10px; height: 10px;">';
					innerHtml += '</div>';
					innerHtml += '</div>';

					innerHtml += '</div>';

					tooltipEl.innerHTML = innerHtml;
				}

				// `this` will be the overall tooltip
				var position = this.areaChart2.canvas.getBoundingClientRect();

				let scrollLeft = this.content.getContentDimensions().scrollLeft;
				let scrollTop = this.content.getContentDimensions().scrollTop;

				// Display, position, and set styles for font
				tooltipEl.style.opacity = "1";
				tooltipEl.style.position = 'absolute';
				tooltipEl.style.left = position.left + scrollLeft + tooltipModel.caretX + 'px';
				tooltipEl.style.top = position.top + scrollTop + tooltipModel.caretY - 405 + 'px'; // count with header height
				tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
				tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
				tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
				tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
				tooltipEl.style.pointerEvents = 'none';
				tooltipEl.style.zIndex = '100';
			}
		};

		this.areaChart2 = ChartUtil.createAreaChart(this.areaChartCanvas, chartData, xTick, customTooltip, clickCallback);

		// update color by char size
		let color = GradientColorUtil.getAreaGradientColor(this.areaChartCanvasCtx, [this.selectedAccountType], this.areaChart2.width, this.areaChart2.height);

		let datasets = this.areaChart2.data.datasets;
		datasets[0].backgroundColor = color[0];

		this.areaChart2.update();
	}

	updateChart() {

		ChartUtil.closeTip(this.areaChart2);

		let color = GradientColorUtil.getAreaGradientColor(this.areaChartCanvasCtx, [this.selectedAccountType], this.areaChart2.width, this.areaChart2.height);

		let datasets = this.areaChart2.data.datasets;
		datasets[0].data = this.assetAllocationDataInfo.chartData.amount[0];
		datasets[0].backgroundColor = color[0];

		this.areaChart2.update();

	}

	/********* button handling **********/
	viewAll() {
		this.setRoot(MyPortfolioPage);
	}

	viewDetail() {
		this.push(AssetAllocationDetailPage, this.assetAllocationDataInfo);
	}
}