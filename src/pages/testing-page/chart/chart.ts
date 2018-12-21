import { Component, ViewChild,  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { DoughnutUtil } from '../../../providers-v2/util/doughnut-util';
import { GradientColorUtil } from '../../../providers-v2/util/gradient-color-util';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    @ViewChild('doughnutLegendCanvas1') doughnutLegendCanvas1;
    @ViewChild('doughnutLegendCanvas2') doughnutLegendCanvas2;
    @ViewChild('doughnutLegendCanvas3') doughnutLegendCanvas3;
    @ViewChild('doughnutLegendCanvas4') doughnutLegendCanvas4;
    @ViewChild('doughnutLegendCanvas5') doughnutLegendCanvas5;
    @ViewChild('doughnutLegendCanvas6') doughnutLegendCanvas6;
 
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

  /*
  prepareTextInCenter() {
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
    
        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
    
        var text = "<b>75%</b>",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
    
        //ctx.fill(text);
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
  }
  */

  preareRadialGradient(canvasEl: any) {
    var ctx = canvasEl.getContext("2d");
    //return ctx.createRadialGradient(0, 0, 0, 0.5, 0.3, 7);
    return ctx.createRadialGradient(canvasEl.width/3, canvasEl.height/2 , canvasEl.width/11, canvasEl.width/3, canvasEl.height/3, canvasEl.width*1.3);
  }

  prepareSingleBackgroundColor(color, ctx) {
    console.log("prepareSingleBackgroundColor >> ");
    console.log(ctx);
    console.log(color);
      let resultColor;
      if (color.type == 'radial') {
        resultColor = ctx.createRadialGradient(0, 0, 150 , 150, 150, 150);
        color.colorStops.forEach( function( stopItem ){
          resultColor.addColorStop(stopItem.stop, stopItem.color);
        });
      } else if (color.type == 'linear') {
        //resultColor = ctx.createLinearGradient(0, 0, 150, 150);
        if(color.point != null) {
          console.log("point!!!!");
          resultColor = ctx.createLinearGradient(color.point.x1, color.point.y1, color.point.x2, color.point.y2);
        }else {
          resultColor = ctx.createLinearGradient(0, 0, 600, 600);
        }
        color.colorStops.forEach( function( stopItem ){
          resultColor.addColorStop(stopItem.stop, stopItem.color);
        });
      } else {
        resultColor = color.color;
      }
      return resultColor;
  }

  prepareBackgroundColors(gradientColors, ctx) {
    var backgroundColors = [];
    let page = this;
    gradientColors.forEach(function( item ){
      console.log(page);
      let resultColor = page.prepareSingleBackgroundColor(item, ctx);
      backgroundColors.push(resultColor);
    });
    return backgroundColors;
  }

  initChart() {

    var doughnutCanvasEl = this.doughnutCanvas.nativeElement;
    console.log("doughnutCanvasEl.width = " + doughnutCanvasEl.width);
    console.log("doughnutCanvasEl.height = " + doughnutCanvasEl.height);
    var ctx = doughnutCanvasEl.getContext("2d");

    /*
    var gradientStroke0 = ctx.createLinearGradient(0, 0, 500, 500);
    gradientStroke0.addColorStop(0, "#4e544a");
    gradientStroke0.addColorStop(0.5, "#f4f4f6");
    gradientStroke0.addColorStop(1, "#4e544a");

    // var gradientStroke0 = this.preareRadialGradient(doughnutCanvasEl);
    // gradientStroke0.addColorStop(0, "#4e544a");
    // gradientStroke0.addColorStop(0.5, "#f4f4f6");
    // gradientStroke0.addColorStop(1, "#4e544a");


    var gradientStroke1 = this.preareRadialGradient(doughnutCanvasEl);
    gradientStroke1.addColorStop(0, "#88ebfe");
    gradientStroke1.addColorStop(0.33, "#567f93");
    gradientStroke1.addColorStop(0.66, "#88ebfe");
    gradientStroke1.addColorStop(1, "#567f93");

    var gradientStroke2 = this.preareRadialGradient(doughnutCanvasEl);
    gradientStroke2.addColorStop(0, "#b29ff0");
    gradientStroke2.addColorStop(0.33, "#504678");
    gradientStroke2.addColorStop(0.66, "#b29ff0");
    gradientStroke2.addColorStop(1, "#504678");
    */

    var cLabels = ["Red", "Blue", "Grey", "Green", "Purple", "Orange"];
    var cData = [50, 50, 50, 10, 20, 40];
    //cData = [100];
    var gradientColors = [
      {
        type: "linear",
        colorStops: [
          {stop: 0.4, color: "Red"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "Red"},
        ],
        point: null
      },
      {
        type: "linear",
        colorStops: [
          {stop: 0.4, color: "Blue"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "Blue"},
        ],
        point: null
      },
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
          {stop: 0.4, color: "Orange"},
          {stop: 0.5, color: "#FAFAFA"},
          {stop: 0.6, color: "Orange"},
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


    var rotateDegreeList = DoughnutUtil.getRotateDegreeList(cData);
    console.log(rotateDegreeList);

    //gradientColors = GradientUtil.getDonghnutPointOfLinearGradient(gradientColors, rotateDegreeList, 220, 220);
    var type= [0,1,2,3,4,5];

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

        type: 'doughnut',
        data: {
            labels: cLabels,
            datasets: [{
                label: '# of Votes',
                data: cData,
                backgroundColor: GradientColorUtil.getDoughnutGradientColor(ctx, cData, type, 220, 220),
                borderColor: "rgba(255,255,255,0)",
                hoverBackgroundColor: cHoverBackgroundColor
            }]
        },
        options: {
          aspectRatio: 1,
          cutoutPercentage: 90,
          legend: {
              display: false,
              position: 'bottom',
              labels: {
                  //fontColor: 'rgb(255, 99, 132)'
              }
        }
      }
    });

    let doughnutLegendCanvanList = [
      this.doughnutLegendCanvas1,
      this.doughnutLegendCanvas2,
      this.doughnutLegendCanvas3,
      this.doughnutLegendCanvas4,
      this.doughnutLegendCanvas5,
      this.doughnutLegendCanvas6
    ]

    gradientColors = GradientColorUtil.getDoughnutGradientColor(ctx, cData, type, 90, 90);

    cLabels.forEach((item, index) => {

      var sum = cData.reduce((a, b) => a + b, 0);
      let dataset = [cData[index], sum - cData[index]];

      let lengendCtx = doughnutLegendCanvanList[index].nativeElement.getContext("2d");

      // let pastDataSum  = 0;
      // cData.forEach((data, dIndex) => {
      //   if (dIndex < index) {
      //     pastDataSum += data;
      //   }
      // });
      // console.log("pastDataSum = " + pastDataSum);
      // console.log("pastDataSum/sum= " + pastDataSum/sum);
      // let rotateDegree = (pastDataSum/sum)*360;
      // console.log("rotateDegree = " + rotateDegree);

      // // count line
      // gradientColors[index].point = this.countLine(220, 220, rotateDegree);

      let rotateDegree = rotateDegreeList[index];
      
      this.initDoughnutLegendChart(
        doughnutLegendCanvanList[index],
        item,
        dataset, 
        rotateDegree,
        gradientColors[index], 
        cHoverBackgroundColor[index]
      );

    });

  }

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
                  "#EFEFEF"
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
        cutoutPercentage: 85,
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

}
