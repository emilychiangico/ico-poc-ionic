import { Component, ViewChild, Injector } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { GradientColorUtil } from '../../../providers-v2/util/gradient-color-util';
import { PortfolioHoldingType } from '../../../providers-v2/util/portfolio-holding-util';
import { ChartUtil } from '../../../providers-v2/util/chart-util';

import { AssetAllocationDetailPage } from '../../asset-allocation-detail/asset-allocation-detail';
import { MyPortfolioPage } from '../../my-portfolio/my-portfolio';

import { BasePage } from '../../base-page';

/**
 * Generated class for the MixedChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asset-history',
  templateUrl: 'asset-history.html',
})
export class AssetHistoryPage extends BasePage{

	@ViewChild(Content) content: Content;

	@ViewChild('areaChartContainer') areaChartContainer;
	@ViewChild('areaChartCanvas2') areaChartCanvas2;
	areaChart2;
	selectedMonthIndex2: number = 0;
	selectedMonthLabel2: string;

	savingAndCurrent = [6, 13.2, 10.8, 6, 12, 12, 12];
	timeDeposit =     [6, 6.4, 5, 4, 4.2, 4.6, 5];
	unitTrust = [6, 7, 7, 5, 4.5, 4.8, 5.5];
	structProd = [8.6, 8.6, 9.5, 7, 7.5, 7.5, 7.7];
	bondsNoteCert = [9, 9, 10, 9, 8, 8.2, 8.6];
	stock = [4, 5, 4.5, 2, 8, 4, 10];
	xData = [
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

	selectedType = PortfolioHoldingType.SavingAndCurrent;

	constructor(injector: Injector) {
		super(injector);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AssetHistoryPage');
		ChartUtil.initChartForSelectedArea();
		this.createAreaChart2();
	}

	selectMonth(chart, index) {
		chart.data.xHighlightRange.begin = index;
		chart.data.xHighlightRange.end = index + 1;
		chart.update();
	}

	createAreaChart2() {

		var areaChartCanvasEl = this.areaChartCanvas2.nativeElement;
		console.log("areaChartCanvasEl.width = " + areaChartCanvasEl.width);
		console.log("areaChartCanvasEl.height = " + areaChartCanvasEl.height);
		var ctx = areaChartCanvasEl.getContext("2d");
	
		const backgroundColors = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, areaChartCanvasEl.width, areaChartCanvasEl.height);
	
		let chartData = {
		  labels: this.xData,
		  xHighlightRange: {
			begin: this.selectedMonthIndex2,
			end: this.selectedMonthIndex2 + 1
		  },
		  datasets: [{
			label: "UntimeDeposit",
			fill: true,
			backgroundColor: backgroundColors[0],
			pointRadius: 0,
			borderWidth: 0.01,
			borderColor: backgroundColors[0],
			borderCapStyle: 'butt',
			data: this.savingAndCurrent,
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
			x <= xAxis.right-30 && x >= xAxis.left-30
			/** && y <= xAxis.bottom && y >= xAxis.top **/
		   ) {
			// category scale returns index here for some reason
			var index = xAxis.getValueForPixel(x);
			this.selectedMonthIndex2 = index;
			this.selectedMonthLabel2 = this.areaChart2.data.labels[index].join();
			this.selectMonth(this.areaChart2, this.selectedMonthIndex2);
	
			ChartUtil.openTip(this.areaChart2, 0, this.selectedMonthIndex2);
		  } else {
			ChartUtil.closeTip(this.areaChart2, 0, this.selectedMonthIndex2);
		  }
		};
	
			let xTick = {
				labelOffset: 30,
				fontFunction: (tickIndex) => {
					// console.log("fontFunction tickIndex = " + tickIndex);
					// console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
					if (tickIndex == this.selectedMonthIndex2) {
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
			console.log(tooltipModel.dataPoints[0].yLabel);
	  
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
	  
			// Hide if no tooltip
			if (tooltipModel.opacity === 0) {
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
	  
				var innerHtml = '';
	  
				innerHtml += '<div style="position: relative;">';
	  
				innerHtml += '<div style="margin-left: -30px; background: blue; padding: 3px 20px; border-radius: 10px; color: #FFF; font-weight: bold;">';
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
		
		this.areaChart2 = ChartUtil.createAreaChart(this.areaChartCanvas2, chartData, xTick, customTooltip, clickCallback);
	
		// update color by char size
		let color = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, this.areaChart2.width, this.areaChart2.height);
	
		let datasets = this.areaChart2.data.datasets;
		for(var i = 0; i < datasets.length; i++) {
		  datasets[i].backgroundColor = color[i]
		}
	
		this.areaChart2.update();
	}

	/********* button handling **********/
	viewAll() {
		this.push(MyPortfolioPage);
	}

	viewDetail() {
		this.push(AssetAllocationDetailPage);
	}
}