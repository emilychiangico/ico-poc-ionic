import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the BarChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bar-chart',
  templateUrl: 'bar-chart.html',
})
export class BarChartPage {

  rectangleSet = false;
  chartTest;

  @ViewChild('barChartCanvas') barChartCanvas;
  @ViewChild('axisChartCanvas') axisChartCanvas;
  @ViewChild('chartAreaWrapper2') chartAreaWrapper2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarChartPage');
    this.createBarChart();
  }

  generateLabels() {
      var chartLabels = [];
      for (var x = 0; x < 100; x++) {
          chartLabels.push("Label" + x);
      }
      return chartLabels;
  }

  generateData() {
      var chartData = [];
      for (var x = 0; x < 100; x++) {
          chartData.push(Math.floor((Math.random() * 100) + 1));
      }
      return chartData;
  }

  addData(numData, chart) {
    for (var i = 0; i < numData; i++) {
        chart.data.datasets[0].data.push(Math.random() * 100);
        chart.data.labels.push("Label" + i);
        //var newwidth = $('.chartAreaWrapper2').width() + 60;
        //$('.chartAreaWrapper2').width(newwidth);
        console.log(this.chartAreaWrapper2);
        var newwidth = this.chartAreaWrapper2.nativeElement.width + 60;
        console.log("this.chartAreaWrapper2.nativeElement.width = " + this.chartAreaWrapper2.nativeElement.width);
        this.chartAreaWrapper2.nativeElement.width = newwidth;
        
      }
  }

  createBarChart() {

    var barChartCanvasEl = this.barChartCanvas.nativeElement;
    console.log("barChartCanvasEl.width = " + barChartCanvasEl.width);
    console.log("barChartCanvasEl.height = " + barChartCanvasEl.height);
    var ctx = barChartCanvasEl.getContext("2d");

    var chartData = {
        labels: this.generateLabels(),
        datasets: [{
            label: "Test Data Set",
            data: this.generateData()
        }]
    };

    

    //var canvasTest = $('#chart-Test');
    this.chartTest = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        maintainAspectRatio: false,
        responsive: true,
        options: {
            tooltips: {
                titleFontSize: 0,
                titleMarginBottom: 0,
                bodyFontSize: 12
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 12,
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontSize: 12,
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                onComplete: () => {
                    if (!this.rectangleSet) {
                        var scale = window.devicePixelRatio;                       

                        var sourceCanvas = this.chartTest.chart.canvas;
                        var copyWidth = this.chartTest.scales['y-axis-0'].width - 10;
                        var copyHeight = this.chartTest.scales['y-axis-0'].height + this.chartTest.scales['y-axis-0'].top + 10;

                        console.log(this.axisChartCanvas);
                        var axisChartCanvasEl = this.axisChartCanvas.nativeElement;
                        var targetCtx = axisChartCanvasEl.getContext("2d");

                        targetCtx.scale(scale, scale);
                        targetCtx.canvas.width = copyWidth * scale;
                        targetCtx.canvas.height = copyHeight * scale;

                        targetCtx.canvas.style.width = `${copyWidth}px`;
                        targetCtx.canvas.style.height = `${copyHeight}px`;
                        targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);

                        var sourceCtx = sourceCanvas.getContext('2d');

                        // Normalize coordinate system to use css pixels.

                        sourceCtx.clearRect(0, 0, copyWidth * scale, copyHeight * scale);
                        this.rectangleSet = true;
                    }
                },
                onProgress: () => {
                    if (this.rectangleSet === true) {
                        var copyWidth = this.chartTest.scales['y-axis-0'].width;
                        var copyHeight = this.chartTest.scales['y-axis-0'].height + this.chartTest.scales['y-axis-0'].top + 10;

                        var sourceCtx = this.chartTest.chart.canvas.getContext('2d');
                        sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
                    }
                }
            }
        }
    });
    this.addData(5, this.chartTest);

  }

}
