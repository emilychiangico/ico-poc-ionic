import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { DoughnutUtil } from '../../../providers-v2/util/doughnut-util';
import { GradientColorUtil } from '../../../providers-v2/util/gradient-color-util';
import { IPortfolioUtil } from '../../../providers-v2/util/i-portfolio-util';
import { ChartUtil } from '../../../providers-v2/util/chart-util';

import { BasePage } from '../../base-page';
import { MyPortfolioPage } from '../my-portfolio/my-portfolio';

import { IPortfolioApiService } from "../../../providers-v2/api/i-portfolio-api-service";
import { IPortfolioApiMockService } from "../../../providers-v2/api/i-portfolio-api-mock-service";

@IonicPage()
@Component({
    selector: 'page-portfolio-overview-no-animation',
    templateUrl: 'portfolio-overview-no-animation.html',
})
export class PortfolioOverviewNoAnimationPage extends BasePage {

    private iPortfolioApiService: IPortfolioApiService;
    private iPortfolioApiMockService: IPortfolioApiMockService;

    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChildren('doughnutLegendCanvas') doughnutLegendCanvasList: QueryList<ElementRef>;

    doughnutChart: any;

    myPortfolioData = {
        chartData: {
            dataList: [],
            percentageList:[],
            typeList: []
        },
        holdingDataList: []
    }

    beaListHeader = {
        left: "Account",
        right: "Total Amount"
    }

    totalAmountInfo = {
        ccy: "HKD",
        amount: 1635667494.00,
        date: "31 May 2018"
    }

    monthlyDiff = 4.15;
    sixMonthDiff = -0.95;


    constructor(injector: Injector) {
        super(injector);
        this.iPortfolioApiService = injector.get(IPortfolioApiService);
        this.iPortfolioApiMockService = injector.get(IPortfolioApiMockService);
    }

    ngOnInit() {
        this.loadData();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChartPage');
        console.log(this.doughnutLegendCanvasList);
        this.initChart();
    }

    loadData() {
        let data = this.iPortfolioApiMockService.getMyPortfolio().data;

        this.totalAmountInfo = IPortfolioUtil.setTotalAumontInfo(data.portfolioCurrency, data.totalAUM, data.lastUpdateDate);
        this.monthlyDiff = data.monthlyPercentage;
        this.sixMonthDiff = data.lastSixMonthsPercentage;

        data.detailList.forEach((item) => {
            let accountType = item.accountType;
            this.myPortfolioData.chartData.dataList.push(item.amount);
            this.myPortfolioData.chartData.percentageList.push(item.percentage);
            this.myPortfolioData.chartData.typeList.push(accountType);
            this.myPortfolioData.holdingDataList.push({
                type: accountType,
                title: IPortfolioUtil.getTitle(accountType),
                amount: item.amount,
                percentage: item.percentage
            });
        });
    }

    initChart() {

        let chartData = this.myPortfolioData.chartData;

        // Draw doughnut Chart
        this.initDoughnutChart(this.doughnutCanvas, chartData);

        // Draw doughnut Legend Chart
        this.initDoughnutLegendChart(this.doughnutLegendCanvasList.toArray(), chartData);

    }

    initDoughnutChart(canvasObj, cData) {
        var ctx = canvasObj.nativeElement.getContext("2d");

        var chartData = {
            datasets: [{
                data: cData.dataList,
                backgroundColor: GradientColorUtil.getDoughnutGradientColor(ctx, cData.dataList, cData.typeList, 220),
                borderColor: "rgba(255,255,255,0)"
            }]
        };

        this.doughnutChart = ChartUtil.createDonghnutChart(canvasObj, chartData, false);
    }

    // draw Doughnut chart with 0% < data < 100%
    initDoughnutLegendChart(doughnutLegendCanvanList, cData) {
        var chartSize = 90;
        var rotateDegreeList = DoughnutUtil.getRotateDegreeList(cData.dataList);
        console.log(rotateDegreeList);

        var gradientColors = GradientColorUtil.getDoughnutGradientColor(doughnutLegendCanvanList, cData.dataList, cData.typeList, chartSize, false, true);
        console.log(gradientColors);

        doughnutLegendCanvanList.forEach((legendCanvan, index) => {
            let rotateDegreeStart = rotateDegreeList[index];
            let rotateDegreeEnd;

            if (index < rotateDegreeList.length - 1) {
                rotateDegreeEnd = rotateDegreeList[index + 1];
            } else {
                rotateDegreeEnd = rotateDegreeList[0];
            }

            let percentage = cData.percentageList[index];
            ChartUtil.createDoughnutLegendChart(legendCanvan, gradientColors[index], percentage, rotateDegreeStart, rotateDegreeEnd, chartSize);
        });
    }

    goToPage(type: string) {
        console.log("goToPage >> " + type);
        if (type == "history") {
            this.setRoot(MyPortfolioPage, { tabIndex: 0 });
        } else if (type == "currency") {
            this.setRoot(MyPortfolioPage, { tabIndex: 1 });
        } else {
            this.setRoot(MyPortfolioPage, { tabIndex: 2 });
        }
    }

}
