import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { DoughnutUtil } from '../../providers-v2/doughnut-util';
import { GradientColorUtil } from '../../providers-v2/gradient-color-util';
import { ChartUtil } from '../../providers-v2/chart-util';

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

    /*
    @ViewChild('doughnutLegendCanvas1') doughnutLegendCanvas1;
    @ViewChild('doughnutLegendCanvas2') doughnutLegendCanvas2;
    @ViewChild('doughnutLegendCanvas3') doughnutLegendCanvas3;
    @ViewChild('doughnutLegendCanvas4') doughnutLegendCanvas4;
    @ViewChild('doughnutLegendCanvas5') doughnutLegendCanvas5;
    @ViewChild('doughnutLegendCanvas6') doughnutLegendCanvas6;
    */

    barChart: any;
    doughnutChart: any;
    lineChart: any;
   

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
    this.initChart();
    //this.initDoughnutLegendChart();
    //this.prepareTextInCenter();
  }

  // preareRadialGradient(canvasEl: any) {
  //   var ctx = canvasEl.getContext("2d");
  //   //return ctx.createRadialGradient(0, 0, 0, 0.5, 0.3, 7);
  //   return ctx.createRadialGradient(canvasEl.width/3, canvasEl.height/2 , canvasEl.width/11, canvasEl.width/3, canvasEl.height/3, canvasEl.width*1.3);
  // }

  initChart() {

    // var doughnutCanvasEl = this.doughnutCanvas.nativeElement;
    // console.log("doughnutCanvasEl.width = " + doughnutCanvasEl.width);
    // console.log("doughnutCanvasEl.height = " + doughnutCanvasEl.height);
    // var ctx = doughnutCanvasEl.getContext("2d");

    //var cLabels = ["Red", "Blue", "Grey", "Green", "Purple", "Goldenrod"];
    var cData = [100, 90, 50, 5, 20, 40];
    //cData = [100, 0, 0, 0, 100, 100];\
    
    // Draw doughnut Chart
    this.initDoughnutChart(this.doughnutCanvas, cData);
    
    // Draw doughnut Legend Chart
    this.initDoughnutLegendChart(this.doughnutLegendCanvasList.toArray(), cData);

  }

  initDoughnutChart(canvasObj, data) {
    var ctx = canvasObj.nativeElement.getContext("2d");

    var chartData = {
      datasets: [{
        data: data,
        backgroundColor: GradientColorUtil.getDoughnutGradientColor(ctx, data, 220, 220),
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
  initDoughnutLegendChart(doughnutLegendCanvanList, data) {

    var rotateDegreeList = DoughnutUtil.getRotateDegreeList(data);
    console.log(rotateDegreeList);

    doughnutLegendCanvanList.forEach((legendCanvan, index) => {

      var sum = data.reduce((a, b) => a + b, 0);

      let lengendCtx = doughnutLegendCanvanList[index].nativeElement.getContext("2d");
      let rotateDegreeStart = rotateDegreeList[index];
      let rotateDegreeEnd;
      
      if(index < rotateDegreeList.length - 1) {
        rotateDegreeEnd = rotateDegreeList[index+1];
      } else {
        rotateDegreeEnd = rotateDegreeList[0];
      }

      let gradientColors = GradientColorUtil.getDoughnutGradientColor(lengendCtx, data, 90, 90);

      let percentage = data[index]/sum * 100;
      ChartUtil.createDoughnutLegendChart(legendCanvan, gradientColors[index], percentage, rotateDegreeStart, rotateDegreeEnd, 90);
    });
  }

}
