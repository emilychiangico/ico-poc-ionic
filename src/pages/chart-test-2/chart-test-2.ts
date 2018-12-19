import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { GradientUtil } from '../../providers-v2/gradient-util';

import { DoughnutUtil } from '../../providers-v2/doughnut-util';
import { GradientColorUtil } from '../../providers-v2/gradient-color-util';

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

  preareRadialGradient(canvasEl: any) {
    var ctx = canvasEl.getContext("2d");
    //return ctx.createRadialGradient(0, 0, 0, 0.5, 0.3, 7);
    return ctx.createRadialGradient(canvasEl.width/3, canvasEl.height/2 , canvasEl.width/11, canvasEl.width/3, canvasEl.height/3, canvasEl.width*1.3);
  }

  initChart() {

    var doughnutCanvasEl = this.doughnutCanvas.nativeElement;
    console.log("doughnutCanvasEl.width = " + doughnutCanvasEl.width);
    console.log("doughnutCanvasEl.height = " + doughnutCanvasEl.height);
    var ctx = doughnutCanvasEl.getContext("2d");

    var cLabels = ["Red", "Blue", "Grey", "Green", "Purple", "Goldenrod"];
    var cData = [100, 90, 50, 5, 20, 40];
    //cData = [100, 0, 0, 0, 100, 100];\
    var gradientColors = null;

    var rotateDegreeList = DoughnutUtil.getRotateDegreeList(cData);
    console.log(rotateDegreeList);
    
    // Draw doughnut Chart
    gradientColors = GradientColorUtil.getDoughnutGradientColor(ctx, cData, 220, 220)
    this.initDoughnutChart(this.doughnutCanvas, cData, gradientColors);
    
    // Draw doughnut Legend Chart
    let doughnutLegendCanvanList = this.doughnutLegendCanvasList.toArray();

    gradientColors = GradientColorUtil.getDoughnutGradientColor(ctx, cData, 90, 90);

    cLabels.forEach((item, index) => {

      var sum = cData.reduce((a, b) => a + b, 0);
      //let dataset = [cData[index], sum - cData[index]];

      console.log(doughnutLegendCanvanList);
      //let lengendCtx = doughnutLegendCanvanList[index].nativeElement.getContext("2d");
      let rotateDegreeStart = rotateDegreeList[index];
      let rotateDegreeEnd;
      
      if(index < rotateDegreeList.length - 1) {
        rotateDegreeEnd = rotateDegreeList[index+1];
      } else {
        rotateDegreeEnd = rotateDegreeList[0];
      }

      let percentage = cData[index]/sum * 100;
      this.initDoughnutLegendChart(doughnutLegendCanvanList[index], gradientColors[index], percentage, rotateDegreeStart, rotateDegreeEnd, 90);

    });

  }

  initDoughnutChart(canvasObj, data, gradientColors) {
    this.doughnutChart = new Chart(canvasObj.nativeElement, {

      type: 'doughnut',
      data: {
          //labels: labels,
          datasets: [{
            //label: '# of Votes',
            data: data,
            backgroundColor: gradientColors,
            borderColor: "rgba(255,255,255,0)"
          }]
      },
      options: {
        aspectRatio: 1,
        cutoutPercentage: 92,
        legend: {
          display: false,
          // position: 'bottom',
          // labels: {
          //     fontColor: 'rgb(255, 99, 132)'
          // }
        },
        events: [] // remove all event of chart
      }
    });
  }

  // draw Doughnut chart with 0% < data < 100%
  initDoughnutLegendChart(canvanObj, color, dataPercentage, rotateDegreeStart, rotateDegreeEnd, height) {
    var el = canvanObj.nativeElement;
    //console.log("test.width = " + el.width);
    //console.log("test.height = " + el.height);
    var ctx = el.getContext("2d");

    var center = height / 2;
    
    if(dataPercentage == 0) {
      this.drawArc(ctx, center, 0, 2 * Math.PI, 1, '#EFEFEF');
    } else if(dataPercentage == 100) {
      this.drawArc(ctx, center, 0, 2 * Math.PI, 8.5, color);
    } else {
      console.log("test.rotateDegreeStart = " + rotateDegreeStart);
      console.log("test.rotateDegreeEnd = " + rotateDegreeEnd);
  
      var arcPoint = this.getPointOfArc(rotateDegreeStart, rotateDegreeEnd);

      // draw data arc
      this.drawArc(ctx, center, arcPoint.start, arcPoint.end, 8.5, color);
      // draw data arc
      this.drawArc(ctx, center, arcPoint.end, arcPoint.start, 1, '#EFEFEF');
    }
  }

  getPointOfArc(rotateDegreeStart, rotateDegreeEnd) {
    // arc -> 0 * Math.PI == 90 degree
    // arc -> 1.5 * Math.PI == 360 degree
    var start = 270 + rotateDegreeStart;
    var end = 270 + rotateDegreeEnd;

    if(start > 360) {
      start = start - 360;
    }

    if(end > 360) {
      end = end - 360;
    }

    var startPoint = (start / 180) * Math.PI;
    var endPoint = (end / 180) * Math.PI;

    console.log("test.startPoint = " + start / 180);
    console.log("test.endPoint = " + end / 180);

    return {start: startPoint, end: endPoint};
  }

  drawArc(ctx, center, startPoint, endPoint, lineWidth, color) {
    ctx.beginPath();
    ctx.arc(center, center, 40, startPoint, endPoint, false);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

}
