import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Injector } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { DoughnutUtil } from '../../../providers-v2/util/doughnut-util';
import { GradientColorUtil } from '../../../providers-v2/util/gradient-color-util';
import { AccountType, IPortfolioUtil } from '../../../providers-v2/util/i-portfolio-util';
import { ChartUtil } from '../../../providers-v2/util/chart-util';
import { BasePage } from '../../base-page';
import { MyPortfolioPage } from '../my-portfolio/my-portfolio';

@IonicPage()
@Component({
    selector: 'page-portfolio-overview-pure-color',
    templateUrl: 'portfolio-overview-pure-color.html',
})
export class PortfolioOverviewPureColorPage extends BasePage {

    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChildren('doughnutLegendCanvas') doughnutLegendCanvasList: QueryList<ElementRef>;

    doughnutChart: any;

    //List Data
    holdingDataList = [];

    cData = [1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000, 1200000];
    //cData = [4500000, 3500000, 1200000, 1200000, 600000, 500000];
    //cData = [6008194.18, 31857040.24, 31857040.24, 31857040.24, 31857040.24, 31857040.24];

    type = [
        AccountType.savingAndCurrent, 
        AccountType.timeDeposit, 
        AccountType.structuredProduct, 
        AccountType.stock, 
        AccountType.bondNoteCertDeposit,
        AccountType.unitTrust, 
        AccountType.linkedDeposit, 
        AccountType.optionAndDerivativesContract, 
        AccountType.loan, 
        AccountType.forwardForeignExchange
    ];

    chartData = {
        dataList: this.cData,
        typeList: this.type
    }

    beaListHeader = {
        left: "Account",
        right: "Total Amount"
    }

    amount = 1635667494.00;
    date = "31 May 2018";

    monthlyDiff = 4.15;
    sixMonthDiff = -0.95;

    colorList;


    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.initHoldingDataList();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChartPage');
        console.log(this.doughnutLegendCanvasList);
        this.initChart();
    }

    initHoldingDataList() {
        let percentageList = this.countPercentage();

        this.type.forEach((item, index) => {
            this.holdingDataList.push({
                type: item,
                title: IPortfolioUtil.getTitle(item),
                amount: this.cData[index],
                percentage: percentageList[index]
            });
        });
    }

    countPercentage() {
        let sum = this.cData.reduce((a, b) => a + b, 0);
        let list = []
        this.cData.forEach((data) => {
            list.push((data / sum * 100).toFixed(2));
        });

        return list;
    }

    initChart() {

        // Draw doughnut Chart
        this.initDoughnutChart(this.doughnutCanvas, this.chartData);

        // Draw doughnut Legend Chart
        this.initDoughnutLegendChart(this.doughnutLegendCanvasList.toArray(), this.chartData);

    }

    initDoughnutChart(canvasObj, cData) {
        var ctx = canvasObj.nativeElement.getContext("2d");

        var chartData = {
            datasets: [{
                data: cData.dataList,
                backgroundColor: GradientColorUtil.getDoughnutGradientColor(ctx, cData.dataList, cData.typeList, 220, 220, true),
                borderColor: "rgba(255,255,255,0)"
            }]
        };

        this.doughnutChart = ChartUtil.createDonghnutChart(canvasObj, chartData, false);

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

            gradientColors = GradientColorUtil.getDoughnutGradientColor(lengendCtx, cData.dataList, cData.typeList, 90, 90, true);

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
