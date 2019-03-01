import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { DoughnutUtil } from '../../../providers-v2/util/doughnut-util';
import { GradientColorUtil } from '../../../providers-v2/util/gradient-color-util';
import { IPortfolioUtil } from '../../../providers-v2/util/i-portfolio-util';
import { ChartUtil } from '../../../providers-v2/util/chart-util';

import { BasePage } from '../../base-page';
import { MyPortfolioPage } from '../my-portfolio/my-portfolio';

import { IPortfolioApiService } from "../../../providers-v2/api/i-portfolio-api-service";

@IonicPage()
@Component({
    selector: 'page-portfolio-overview',
    templateUrl: 'portfolio-overview.html',
})
export class PortfolioOverviewPage extends BasePage {

    private iPortfolioApiService: IPortfolioApiService;

    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChildren('doughnutLegendCanvas') doughnutLegendCanvasList: QueryList<ElementRef>;

    doughnutChart: any;

    myPortfolioData = {
        chartData: {
            dataList: [],
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
        let data = this.iPortfolioApiService.getMyPortfolio().data;

        this.totalAmountInfo = IPortfolioUtil.setTotalAumontInfo(data.portfolioCurrency, data.totalAUM, data.lastUpdateDate);
        this.monthlyDiff = data.monthlyPercentage;
        this.sixMonthDiff = data.lastSixMonthsPercentage;

        data.detailList.forEach((item) => {
            let accountType = item.accountType;
            this.myPortfolioData.chartData.dataList.push(item.amount);
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
                backgroundColor: GradientColorUtil.getDoughnutGradientColor(ctx, cData.dataList, cData.typeList, 220, 220),
                borderColor: "rgba(255,255,255,0)"
            }]
        };

        this.doughnutChart = ChartUtil.createDonghnutChart(canvasObj, chartData, true);

        // this.doughnutChart = new Chart(canvasObj.nativeElement, {

        //   type: 'doughnut',
        //   data: {
        //       //labels: labels,
        //       datasets: [{
        //         //label: '# of Votes',
        //         data: data,
        //         backgroundColor: gradientColors,
        //         borderColor: "rgba(255,255,255,0)"
        //       }]
        //   },
        //   options: {
        //     aspectRatio: 1,
        //     cutoutPercentage: 92,
        //     legend: {
        //       display: false,
        //       // position: 'bottom',
        //       // labels: {
        //       //     fontColor: 'rgb(255, 99, 132)'
        //       // }
        //     },
        //     events: [] // remove all event of chart
        //   }
        // });
    }

    // draw Doughnut chart with 0% < data < 100%
    initDoughnutLegendChart(doughnutLegendCanvanList, cData) {

        var rotateDegreeList = DoughnutUtil.getRotateDegreeList(cData.dataList);
        console.log(rotateDegreeList);

        var gradientColors = null;

        doughnutLegendCanvanList.forEach((legendCanvan, index) => {

            var sum = cData.dataList.reduce((a, b) => a + b, 0);

            let lengendCtx = doughnutLegendCanvanList[index].nativeElement.getContext("2d");
            let rotateDegreeStart = rotateDegreeList[index];
            let rotateDegreeEnd;

            if (index < rotateDegreeList.length - 1) {
                rotateDegreeEnd = rotateDegreeList[index + 1];
            } else {
                rotateDegreeEnd = rotateDegreeList[0];
            }

            gradientColors = GradientColorUtil.getDoughnutGradientColor(lengendCtx, cData.dataList, cData.typeList, 90, 90);

            let percentage = cData[index] / sum * 100;
            ChartUtil.createDoughnutLegendChart(legendCanvan, gradientColors[index], percentage, rotateDegreeStart, rotateDegreeEnd, 90);
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
