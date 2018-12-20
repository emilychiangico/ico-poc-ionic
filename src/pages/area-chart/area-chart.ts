import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { GradientColorUtil, PortfolioHoldingType } from '../../providers-v2/util/gradient-color-util';

/**
 * Generated class for the AreaChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-area-chart',
  templateUrl: 'area-chart.html',
})
export class AreaChartPage {

  @ViewChild('areaChartCanvas') areaChartCanvas;
  areaChart;
  selectedMonthIndex: number = 0;
  selectedMonthLabel: string;

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AreaChartPage');
    this.drawSelectedArea();
    this.createAreaChart();
    this.createAreaChart2();
  }

  selectMonth(chart, index) {
    chart.data.xHighlightRange.begin = index;
    chart.data.xHighlightRange.end = index + 1;
    chart.update();
  }

  selectMonth_old() {
    console.log(">>>>>> selectMonth_old");
    console.log(this.areaChart);

    let newFontColors = [];
    this.areaChart.data.labels.forEach((element, index) => {
      console.log("index = " + index);
      console.log("element = " + element);
      if (index == this.selectedMonthIndex) {
        newFontColors.push("#ffffff");
        //this.areaChart.options.scales.xAxes[0].ticks.fontColor[index] = "#ffffff";
      } else {
        newFontColors.push("#999999");
        //this.areaChart.options.scales.xAxes[0].ticks.fontColor[index] = "#999999";
      }
    });
    console.log(this.areaChart.options.scales.xAxes[0].ticks.fontColor);
    //this.areaChart.options.scales.
    //console.log(newFontColors);
    this.areaChart.options.scales.xAxes[0].ticks.fontColor = newFontColors;
    this.areaChart.options.scales.xAxes[0].ticks.major.fontColor = newFontColors;
    this.areaChart.options.scales.xAxes[0].ticks.minor.fontColor = newFontColors;
    this.areaChart.update();
  }

  drawSelectedArea() {
    // The original draw function for the line chart. This will be applied after we have drawn our highlight range (as a rectangle behind the line chart).
    var originalLineDraw = Chart.controllers.line.prototype.draw;
    // Extend the line chart, in order to override the draw function.
    Chart.helpers.extend(Chart.controllers.line.prototype, {
      draw : function() {
        var chart = this.chart;
        // Get the object that determines the region to highlight.
        var yHighlightRange = chart.config.data.yHighlightRange;

        var ctx = chart.chart.ctx;
        var xaxis = chart.scales['x-axis-0'];
        var yaxis = chart.scales['y-axis-0'];

        // If the object exists.
        if (yHighlightRange !== undefined) {

          var yRangeBegin = yHighlightRange.begin;
          var yRangeEnd = yHighlightRange.end;

          var yRangeBeginPixel = yaxis.getPixelForValue(yRangeBegin);
          var yRangeEndPixel = yaxis.getPixelForValue(yRangeEnd);

          ctx.save();

          // The fill style of the rectangle we are about to fill.
          ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
          // Fill the rectangle that represents the highlight region. The parameters are the closest-to-starting-point pixel's x-coordinate,
          // the closest-to-starting-point pixel's y-coordinate, the width of the rectangle in pixels, and the height of the rectangle in pixels, respectively.
          ctx.fillRect(xaxis.left, Math.min(yRangeBeginPixel, yRangeEndPixel), xaxis.right - xaxis.left, Math.max(yRangeBeginPixel, yRangeEndPixel) - Math.min(yRangeBeginPixel, yRangeEndPixel));

          ctx.restore();
        }

        var xHighlightRange = chart.config.data.xHighlightRange;

        // If the object exists.
        if (xHighlightRange !== undefined) {

          var xRangeBegin = xHighlightRange.begin;
          var xRangeEnd = xHighlightRange.end;

          var xRangeBeginPixel = xaxis.getPixelForTick(xRangeBegin);
          var xRangeEndPixel = xaxis.getPixelForTick(xRangeEnd);

          console.log('xRangeBeginPixel = ' + xRangeBeginPixel);
          console.log('xRangeEndPixel = ' + xRangeEndPixel);
          console.log('yaxis.top = ' + yaxis.top);
          console.log('yaxis.bottom = ' + yaxis.bottom);

          ctx.save();
          ctx.fillStyle = 'rgba(230, 230, 230, 0.01)';
          ctx.fillRect(
            Math.min(xRangeBeginPixel, xRangeEndPixel), 
            yaxis.top, 
            Math.max(xRangeBeginPixel, xRangeEndPixel) - Math.min(xRangeBeginPixel, xRangeEndPixel),
            yaxis.bottom - yaxis.top
          );
          ctx.restore();

        }

        // Apply the original draw function for the line chart.
        originalLineDraw.apply(this, arguments);
      }
    });
  }

  createAreaChart() {

    var areaChartCanvasEl = this.areaChartCanvas.nativeElement;
    console.log("areaChartCanvasEl.width = " + areaChartCanvasEl.width);
    console.log("areaChartCanvasEl.height = " + areaChartCanvasEl.height);
    var ctx = areaChartCanvasEl.getContext("2d");

    const backgroundColors = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, areaChartCanvasEl.width, areaChartCanvasEl.height);

    this.areaChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.xData,
        // This, if it exists at all, defines the highlight region.
        // yHighlightRange: {
        //   begin: 6.5,
        //   end: 12.5
        // },
        xHighlightRange: {
          begin: this.selectedMonthIndex,
          end: this.selectedMonthIndex + 1
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

        }, {
          label: "Available for Existing",
          fill: true,
          backgroundColor: backgroundColors[1],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[1],
          borderCapStyle: 'butt',
          data: this.timeDeposit,
        }, {
          label: "Available",
          fill: true,
          backgroundColor: backgroundColors[2],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[2],
          borderCapStyle: 'butt',
          data: this.unitTrust,
        }, {
          label: "Logged In",
          fill: true,
          backgroundColor: backgroundColors[3],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[3],
          borderCapStyle: 'butt',
          data: this.structProd,
        },
        {
          label: "Logged In",
          fill: true,
          backgroundColor: backgroundColors[4],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[4],
          borderCapStyle: 'butt',
          data: this.bondsNoteCert,
        },
        {
          label: "Logged In",
          fill: true,
          backgroundColor: backgroundColors[5],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[5],
          borderCapStyle: 'butt',
          data: this.stock,
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 1.3,
        spanGaps: false,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        scales: {
          xAxes: [{
            beforeUpdate: (scaleInstance) => {
              console.log(">>>>>>> beforeBuildTicks");
              console.log(scaleInstance);
              /*
              let newFontColors = [];
              xData.forEach((element, index) => {
                console.log("index = " + index);
                console.log("element = " + element);
                if (index == this.selectedMonthIndex) {
                  newFontColors.push("#ffffff");
                } else {
                  newFontColors.push("#d9d9d9");
                }
              });
              scaleInstance.options.ticks.fontColor = newFontColors;
              scaleInstance.options.ticks.major.fontColor = newFontColors;
              scaleInstance.options.ticks.minor.fontColor = newFontColors;
              console.log(scaleInstance.options.ticks);
              */
            },
            ticks: {
              labelOffset: 30,
              fontFunction: (tickIndex) => {
                //console.log("fontFunction tickIndex = " + tickIndex);
                //console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
                if (tickIndex == this.selectedMonthIndex) {
                 //console.log("******* should be bold****")
                    return 'bold 12px sans-serif';
                } else {
                    //console.log("******* should be normal****")
                    return '200 12px sans-serif"';
                }
              },
              padding: 5,
              fontSize: 12, 
              fontFamily: "sans-serif", 
              fontColor: '#FFFFFF', 
              fontStyle: '200'
            },
            gridLines: {
              //drawOnChartArea: true,
              display: true,
              color: "#3b486d",
              //style: '100',
              drawBorder: true,
              //drawOnChartArea: false,
              drawTicks: false,
            }
          }],
          yAxes: [{
            
            stacked: true, // Can't just just `stacked: true` like the docs say
            ticks: {
              callback: (label, index, labels) => {
                return label+'mn';
              },
              padding: 5,
              fontSize: 12, 
              fontFamily: "sans-serif", 
              fontColor: '#FFFFFF', 
              fontStyle: '200',
              stepSize: 20,
              min: 0,
              max: 80
            },
            gridLines: {
              //drawOnChartArea: true,
              display: true,
              color: "#3b486d",
              //drawOnChartArea: false,
              drawTicks: false,
            }
          }]
        },
        animation: {
          duration: 750,
          onComplete: () => {
            console.log(">>>>>>>>>>>>>>>> onComplete");
            console.log(this.areaChart);
            //this.selectMonth();
          }
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        onClick: (chartEvent, item) => {
          console.log("onClick");
          console.log(chartEvent);
          console.log(item);

          var xAxis = this.areaChart.scales['x-axis-0'];
          console.log(xAxis);

          // If mouse is over the legend, change cursor style to pointer, else don't show it
          var x = chartEvent.offsetX - 30;
          var y = chartEvent.offsetY;
      
          if (chartEvent.type === 'click' &&
            x <= xAxis.right && x >= xAxis.left 
            /** && y <= xAxis.bottom && y >= xAxis.top **/
           ) {
            // category scale returns index here for some reason
            var index = xAxis.getValueForPixel(x);
            this.selectedMonthIndex = index;
            this.selectedMonthLabel = this.areaChart.data.labels[index].join();
            this.selectMonth(this.areaChart, this.selectedMonthIndex);
            //document.getElementById('tick').innerHTML = chartInstance.data.labels[index];
          // var element = this.getElementAtEvent(e);
          // if (element.length) {
          //    console.log(element[0])
          // }
          }
        }
      },
    });

    // update color by char size
    let color = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, this.areaChart.width, this.areaChart.height);

    let datasets = this.areaChart.data.datasets;
    for(var i = 0; i < datasets.length; i++) {
      datasets[i].backgroundColor = color[i]
    }

		this.areaChart.update();
  }

  createAreaChart2() {

    var areaChartCanvasEl = this.areaChartCanvas2.nativeElement;
    console.log("areaChartCanvasEl.width = " + areaChartCanvasEl.width);
    console.log("areaChartCanvasEl.height = " + areaChartCanvasEl.height);
    var ctx = areaChartCanvasEl.getContext("2d");

    const backgroundColors = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, areaChartCanvasEl.width, areaChartCanvasEl.height);

    this.areaChart2 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.xData,
        // This, if it exists at all, defines the highlight region.
        // yHighlightRange: {
        //   begin: 6.5,
        //   end: 12.5
        // },
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
      },
      options: {
        responsive: true,
        aspectRatio: 1.3,
        spanGaps: false,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        scales: {
          xAxes: [{
            beforeUpdate: (scaleInstance) => {
              console.log(">>>>>>> beforeBuildTicks");
              console.log(scaleInstance);
              /*
              let newFontColors = [];
              xData.forEach((element, index) => {
                console.log("index = " + index);
                console.log("element = " + element);
                if (index == this.selectedMonthIndex) {
                  newFontColors.push("#ffffff");
                } else {
                  newFontColors.push("#d9d9d9");
                }
              });
              scaleInstance.options.ticks.fontColor = newFontColors;
              scaleInstance.options.ticks.major.fontColor = newFontColors;
              scaleInstance.options.ticks.minor.fontColor = newFontColors;
              console.log(scaleInstance.options.ticks);
              */
            },
            ticks: {
              labelOffset: 30,
              fontFunction: (tickIndex) => {
                //console.log("fontFunction tickIndex = " + tickIndex);
                //console.log("fontFunction selectedMonthIndex = " + this.selectedMonthIndex);
                if (tickIndex == this.selectedMonthIndex2) {
                 //console.log("******* should be bold****")
                    return 'bold 12px sans-serif';
                } else {
                    //console.log("******* should be normal****")
                    return '200 12px sans-serif"';
                }
              },
              padding: 5,
              fontSize: 12, 
              fontFamily: "sans-serif", 
              fontColor: '#FFFFFF', 
              fontStyle: '200'
            },
            gridLines: {
              //drawOnChartArea: true,
              display: true,
              color: "#3b486d",
              //style: '100',
              drawBorder: true,
              //drawOnChartArea: false,
              drawTicks: false,
            }
          }],
          yAxes: [{
            
            stacked: true, // Can't just just `stacked: true` like the docs say
            ticks: {
              callback: (label, index, labels) => {
                return label+'mn';
              },
              padding: 5,
              fontSize: 12, 
              fontFamily: "sans-serif", 
              fontColor: '#FFFFFF', 
              fontStyle: '200',
              stepSize: 20,
              min: 0,
              max: 80
            },
            gridLines: {
              //drawOnChartArea: true,
              display: true,
              color: "#3b486d",
              //drawOnChartArea: false,
              drawTicks: false,
            }
          }]
        },
        animation: {
          duration: 750,
          onComplete: () => {
            console.log(">>>>>>>>>>>>>>>> onComplete");
            console.log(this.areaChart2);
            //this.selectMonth();
          }
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: true
        },
        onClick: (chartEvent, item) => {
          console.log("onClick");
          console.log(chartEvent);
          console.log(item);

          var xAxis = this.areaChart2.scales['x-axis-0'];
          console.log(xAxis);

          // If mouse is over the legend, change cursor style to pointer, else don't show it
          var x = chartEvent.offsetX - 30;
          var y = chartEvent.offsetY;
      
          if (chartEvent.type === 'click' &&
            x <= xAxis.right && x >= xAxis.left 
            /** && y <= xAxis.bottom && y >= xAxis.top **/
           ) {
            // category scale returns index here for some reason
            var index = xAxis.getValueForPixel(x);
            this.selectedMonthIndex2 = index;
            this.selectedMonthLabel2 = this.areaChart2.data.labels[index].join();
            this.selectMonth(this.areaChart2, this.selectedMonthIndex2);
            //document.getElementById('tick').innerHTML = chartInstance.data.labels[index];
          // var element = this.getElementAtEvent(e);
          // if (element.length) {
          //    console.log(element[0])
          // }
          }
        }
      },
    });

    // update color by char size
    let color = GradientColorUtil.getAreaGradientColor(ctx, this.holdingTypeList, this.areaChart2.width, this.areaChart2.height);

    let datasets = this.areaChart2.data.datasets;
    for(var i = 0; i < datasets.length; i++) {
      datasets[i].backgroundColor = color[i]
    }

		this.areaChart2.update();
  }

}
