import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DoughnutUtil } from '../../providers-v2/util/doughnut-util';
import { GradientColorUtil } from '../../providers-v2/util/gradient-color-util';
import { PortfolioHoldingType } from '../../providers-v2/util/portfolio-holding-util';
import { ChartUtil } from '../../providers-v2/util/chart-util';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart-test-2',
  templateUrl: 'chart-test-2.html',
})
export class ChartTest2Page {

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    @ViewChildren('doughnutLegendCanvas') doughnutLegendCanvasList: QueryList<ElementRef>;

    barChart: any;
    doughnutChart: any;
    lineChart: any;

    //List Data
    holdingDataList = [];

    cData = [4500000, 3500000, 1200000, 1200000, 600000, 500000];
    //cData = [6008194.18, 31857040.24, 31857040.24, 31857040.24, 31857040.24, 31857040.24];

    type = [
      PortfolioHoldingType.SavingAndCurrent,
      PortfolioHoldingType.TimeDeposit,
      PortfolioHoldingType.StructuredProduct,
      PortfolioHoldingType.UnitTrust,
      PortfolioHoldingType.Stock,
      PortfolioHoldingType.BondNoteCertDeposit,
    ];

    titles = [
      "Saving & Current",
      "Time Deposit",
      "Structured Product",
      "Unit Trust",
      "Stock",
      "Bonds, Note & Certifcate of Deposit",
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
   

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
        title: this.titles[index],
        amount: this.cData[index],
        percentage: percentageList[index],
        goToPage: ""
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
        backgroundColor: GradientColorUtil.getDoughnutGradientColor(ctx, cData.dataList, cData.typeList, 220, 220),
        borderColor: "rgba(255,255,255,0)"
      }]
    };

    this.doughnutChart = ChartUtil.createDonghnutChart(canvasObj, chartData);

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
      
      if(index < rotateDegreeList.length - 1) {
        rotateDegreeEnd = rotateDegreeList[index+1];
      } else {
        rotateDegreeEnd = rotateDegreeList[0];
      }

      gradientColors = GradientColorUtil.getDoughnutGradientColor(lengendCtx, cData.dataList, cData.typeList, 90, 90);

      let percentage = cData[index]/sum * 100;
      ChartUtil.createDoughnutLegendChart(legendCanvan, gradientColors[index], percentage, rotateDegreeStart, rotateDegreeEnd, 90);
    });
  }

}
