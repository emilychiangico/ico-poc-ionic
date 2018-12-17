import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { GradientUtil } from '../../providers-v2/gradient-util';

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
    //cData = [100, 0, 0, 0, 100, 100];
    var gradientColors = [
      {
        type: "linear",
        colorStops: [
          {stop: 0.4, color: "Grey"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "Grey"}
        ],
        point: null
      },
      {
        type: "linear",
        colorStops: [
          {stop: 0.35, color: "Blue"},
          {stop: 0.4, color: "#5B5BFF"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "#5B5BFF"},
          {stop: 0.65, color: "Blue"},
        ],
        point: null
      },
      {
        type: "linear",
        colorStops: [
          {stop: 0.4, color: "Purple"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "Purple"},
        ],
        point: null,
        //color: 'rgba(153, 102, 255, 0.2)'
      },
      {
        type: "linear",
        colorStops: [
          {stop: 0.35, color: "Red"},
          {stop: 0.4, color: "#FF6262"},
          {stop: 0.5, color: "#FF8E8E"},
          {stop: 0.6, color: "#FF6262"},
          {stop: 0.65, color: "Red"},

          //  {stop: 0.000, color: "Red"},
          //  {stop: 0.300, color: "#FF6262"},
          //  {stop: 0.830, color: "#FF8E8E"},
          //  {stop: 1, color: "#FF6262"},
        ],
        point: null
      },

      {
        type: "linear",
        colorStops: [
          {stop: 0.4, color: "Green"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "Green"},
        ],
        point: null,
        //color: 'rgba(75, 192, 192, 0.2)'
      },

      {
        type: "linear",
        colorStops: [
          {stop: 0.4, color: "Goldenrod"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "Goldenrod"},
        ],
        point: null,
        //color: 'rgba(255, 159, 64, 0.2)'
      },            
    ];
    var cHoverBackgroundColor = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#FF6384",
        "#36A2EB",
        "#FFCE56"
    ];


    var rotateDegreeList = GradientUtil.getRotateDegreeList(cData);
    console.log(rotateDegreeList);

    gradientColors = GradientUtil.getPointOfLinearGradient(gradientColors, rotateDegreeList, 220, 220);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

        type: 'doughnut',
        data: {
            labels: cLabels,
            datasets: [{
                label: '# of Votes',
                data: cData,
                backgroundColor: GradientUtil.prepareBackgroundColors(gradientColors, ctx),
                borderColor: "rgba(255,255,255,0)",
                hoverBackgroundColor: cHoverBackgroundColor
            }]
        },
        options: {
          aspectRatio: 1,
          cutoutPercentage: 92,
          legend: {
              display: false,
              position: 'bottom',
              labels: {
                  //fontColor: 'rgb(255, 99, 132)'
              }
        }
      }
    });

    // let doughnutLegendCanvanList = [
    //   this.doughnutLegendCanvas1,
    //   this.doughnutLegendCanvas2,
    //   this.doughnutLegendCanvas3,
    //   this.doughnutLegendCanvas4,
    //   this.doughnutLegendCanvas5,
    //   this.doughnutLegendCanvas6
    // ]
    let doughnutLegendCanvanList = this.doughnutLegendCanvasList.toArray();

    gradientColors = GradientUtil.getPointOfLinearGradient(gradientColors, rotateDegreeList, 90, 90);

    cLabels.forEach((item, index) => {

      var sum = cData.reduce((a, b) => a + b, 0);
      let dataset = [cData[index], sum - cData[index]];

      console.log(doughnutLegendCanvanList);
      let lengendCtx = doughnutLegendCanvanList[index].nativeElement.getContext("2d");
      let rotateDegreeStart = rotateDegreeList[index];
      let rotateDegreeEnd;
      
      if(index < rotateDegreeList.length - 1) {
        rotateDegreeEnd = rotateDegreeList[index+1];
      } else {
        rotateDegreeEnd = rotateDegreeList[0];
      }
      

      // this.initDoughnutLegendChart(
      //   doughnutLegendCanvanList[index],
      //   item,
      //   dataset, 
      //   rotateDegree,
      //   this.prepareSingleBackgroundColor(gradientColors[index], lengendCtx), 
      //   cHoverBackgroundColor[index]
      // );


      let percentage = cData[index]/sum * 100;
      this.initDoughnutLegendChart(doughnutLegendCanvanList[index], gradientColors[index], percentage, rotateDegreeStart, rotateDegreeEnd, 90);

    });

  }
/*
  initDoughnutLegendChart(doughnutLegendCv, label, cData, rotateDegree, backgroundColor, hoverBackgroundColor) {

    new Chart(doughnutLegendCv.nativeElement, {

      type: 'doughnut',
      data: {
          labels: [label, "Other"],
          datasets: [{
              label: '# of Votes',
              data: cData,
              backgroundColor: [
                  backgroundColor,
                  "#EFEFEF",
                  //"rgba(220,220,220,0)",
              ],
              borderColor: "rgba(255,255,255,0)",
              hoverBackgroundColor: [
                  hoverBackgroundColor,
                  "#36A2EB"
              ]
          }]
      },
      options: {
        aspectRatio: 1,
        cutoutPercentage: 92,
        rotation: (-0.5 * Math.PI) + (rotateDegree/180 * Math.PI),
        //circumference: 1 * Math.PI,
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                //fontColor: 'rgb(255, 99, 132)'
            }
      }
    }
  });

  }
*/

  // draw Doughnut chart with 0% < data < 100%
  initDoughnutLegendChart(canvanObj, color, dataPercentage, rotateDegreeStart, rotateDegreeEnd, height) {
    var el = canvanObj.nativeElement;
    //console.log("test.width = " + el.width);
    //console.log("test.height = " + el.height);
    var ctx = el.getContext("2d");

    //var centerX = height / 2;
    //var centerY = height / 2;
    var center = height / 2;
    
    if(dataPercentage == 0) {
      this.drawArc(ctx, center, 0, 2 * Math.PI, 1, '#EFEFEF');
    } else if(dataPercentage == 100) {
      this.drawArc(ctx, center, 0, 2 * Math.PI, 8.5, GradientUtil.prepareSingleBackgroundColor(color, ctx));
    } else {
      console.log("test.rotateDegreeStart = " + rotateDegreeStart);
      console.log("test.rotateDegreeEnd = " + rotateDegreeEnd);
  
      var arcPoint = this.getPointOfArc(rotateDegreeStart, rotateDegreeEnd);

      this.drawArc(ctx, center, arcPoint.start, arcPoint.end, 8.5, GradientUtil.prepareSingleBackgroundColor(color, ctx));
      // ctx.beginPath();
      // ctx.arc(centerX, centerY, 40, arcPoint.start, arcPoint.end, false);
      // ctx.lineWidth = 8.5;
      // ctx.strokeStyle = GradientUtil.prepareSingleBackgroundColor(color, ctx);
      // ctx.stroke();

      this.drawArc(ctx, center, arcPoint.end, arcPoint.start, 1, '#EFEFEF');
      // ctx.beginPath();
      // ctx.arc(centerX, centerY, 40, arcPoint.end, arcPoint.start, false);
      // ctx.lineWidth = 1;
      // ctx.strokeStyle = '#EFEFEF';
      // ctx.stroke();
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
