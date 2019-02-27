import { Component, ViewChild, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { GradientColorUtil } from '../../../../providers-v2/util/gradient-color-util';
import { ChartUtil } from './../../../../providers-v2/util/chart-util';
import { IPortfolioUtil } from '../../../../providers-v2/util/i-portfolio-util';

import { IPortfolioApiService } from "../../../../providers-v2/api/i-portfolio-api-service";

import { BasePage } from "../../../base-page";

@IonicPage()
@Component({
	selector: 'page-performance',
	templateUrl: 'performance.html',
})
export class PerformancePage extends BasePage {

	private iPortfolioApiService: IPortfolioApiService;

	@ViewChild('mixedChartCanvas') mixedChartCanvas;
	mixedChart = null;

	thisYearData = null;
	lastSixMonthData = null;

	selectedIndex = "dow_jones_industrial_average_index";
	selectedRange = "month";
	selectedList = null;
	thisYear = null;

	legendList: any[] = [];

	dataList = [{ type: "Change (Net Capital In-Out Value)", amount: 4756964.13 }];

	beaListHeader = {
		left: "",
		right: ""
	};

	amount = 1635667494.00;
	date = "31 May 2018";

	constructor(public injector: Injector) {
		super(injector);
		this.iPortfolioApiService = injector.get(IPortfolioApiService);
	}

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		let data = this.iPortfolioApiService.getPerformanceAnalysis().data;
		let result = IPortfolioUtil.setPerformanceData(data);
		this.lastSixMonthData = result.lastSixMonthData;
		this.thisYearData = result.yearData;
		this.thisYear = result.yearData.startDate.getFullYear();
		console.log(result);

		this.selectedList = this.lastSixMonthData;
		this.beaListHeader.left = this.selectedList.header;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MixedChartPage');
		this.initChart();
	}

	initChart() {

		var el = this.mixedChartCanvas.nativeElement;
		var ctx = el.getContext("2d");

		var themeColor = GradientColorUtil.getThemeColor();

		this.setLegend(themeColor);

		var chartData = {
			labels: this.lastSixMonthData.label,
			datasets: [{
				type: 'line',
				label: 'Dataset 1',
				borderColor: themeColor.mix.benchmarkLine,
				pointBackgroundColor: themeColor.mix.benchmarkLine,
				backgroundColor: themeColor.mix.benchmarkBackground,
				borderWidth: 2,
				data: this.lastSixMonthData.benchmarkList.get(this.selectedIndex).percentage
			}, {
				type: 'line',
				label: 'Dataset 2',
				data: this.lastSixMonthData.returnPercent,
				borderColor: themeColor.mix.returnLine,
				pointBackgroundColor: themeColor.mix.returnLine,
				borderWidth: 2,
				fill: false,
			}, {
				type: 'bar',
				label: 'Dataset 3',
				backgroundColor: GradientColorUtil.getBarGradientColor(ctx, el.width, el.height),
				data: this.lastSixMonthData.monthlyReturnPercent
			}]
		};

		this.mixedChart = ChartUtil.createMixedChart(this.mixedChartCanvas, chartData);

		// update Gradient Color by barChart size
		let dataset = this.mixedChart.data.datasets[2];
		dataset.backgroundColor = GradientColorUtil.getBarGradientColor(ctx, this.mixedChart.width, this.mixedChart.height);

		this.mixedChart.update();
	}

	changeDateRange(type: string) {
		if (type == "month") {
			this.selectedList = this.lastSixMonthData;
			this.legendList[1].name = "Last 6 Monthly Return";
		} else {
			this.selectedList = this.thisYearData;
			this.legendList[1].name = "Year Return";
		}
		this.selectedRange = type;

		this.dataList[0].amount = this.selectedList.netCapitalValue;
		this.beaListHeader.left = this.selectedList.header;

		this.mixedChart.data.labels = this.selectedList.label;
		this.mixedChart.data.datasets[0].data = this.selectedList.benchmarkList.get(this.selectedIndex).percentage;
		this.mixedChart.data.datasets[1].data = this.selectedList.returnPercent;
		this.mixedChart.data.datasets[2].data = this.selectedList.monthlyReturnPercent;

		if (this.selectedList.label.length > 6) {
			this.mixedChart.options.scales.xAxes[0].ticks.fontSize = 10;
			this.mixedChart.options.scales.yAxes[0].ticks.fontSize = 10;
		}

		this.mixedChart.update();
	}

	setLegend(themeColor) {
		this.legendList = [
			{ name: "Monthly Return", color: themeColor.mix.returnLine, type: "" },
			{ name: "Last 6 Monthly Return", color: themeColor.mix.returnLine, type: "line" },
			{ name: "Benchmark", color: themeColor.mix.benchmarkLine, type: "line" },
		];
	}

	changeBenchmark(index) {
		if (index != this.selectedIndex) {
			this.selectedIndex = index;

			this.mixedChart.data.datasets[0].data = this.selectedList.benchmarkList.get(this.selectedIndex).percentage;

			this.mixedChart.update();
		}
	}

}