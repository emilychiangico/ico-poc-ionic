import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { GradientColorUtil } from '../../providers-v2/gradient-color-util';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AreaChartPage');
    this.createAreaChart();
  }

  createAreaChart() {

    var areaChartCanvasEl = this.areaChartCanvas.nativeElement;
    console.log("areaChartCanvasEl.width = " + areaChartCanvasEl.width);
    console.log("areaChartCanvasEl.height = " + areaChartCanvasEl.height);
    var ctx = areaChartCanvasEl.getContext("2d");

    const colors = {
      green: {
        fill: '#e0eadf',
        stroke: '#5eb84d',
      },
      lightBlue: {
        stroke: '#6fccdd',
      },
      darkBlue: {
        fill: '#92bed2',
        stroke: '#3282bf',
      },
      purple: {
        fill: '#8fa8c8',
        stroke: '#75539e',
      },
    };

    const loggedIn = [26, 36, 42, 38, 40, 30, 12];
    const available = [34, 44, 33, 24, 25, 28, 25];
    const availableForExisting = [16, 13, 25, 33, 40, 33, 45];
    const unavailable = [5, 9, 10, 9, 18, 19, 20];
    const xData = [
      ["DEC", "2017"], 
      ["JAN", "2018"], 
      ["FEB", "2018"], 
      ["MAR", "2018"], 
      ["APR", "2018"], 
      ["MAY", "2018"], 
      [],
      ];

    
    const backgroundColors = GradientColorUtil.getGradientColorForAreaChart(ctx);

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xData,
        datasets: [{
          label: "Unavailable",
          fill: true,

          backgroundColor: backgroundColors[0],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[0],

          borderCapStyle: 'butt',
          data: unavailable,

        }, {
          label: "Available for Existing",
          fill: true,
          backgroundColor: backgroundColors[1],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[1],
          borderCapStyle: 'butt',
          data: availableForExisting,
        }, {
          label: "Available",
          fill: true,
          backgroundColor: backgroundColors[2],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[2],
          borderCapStyle: 'butt',
          data: available,
        }, {
          label: "Logged In",
          fill: true,
          backgroundColor: backgroundColors[3],
          pointRadius: 0,
          borderWidth: 0.01,
          borderColor: backgroundColors[3],
          borderCapStyle: 'butt',
          data: loggedIn,
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
            ticks: {
              labelOffset: 30,
              padding: 5,
              fontSize: 12, 
              fontFamily: "'Roboto', sans-serif", 
              fontColor: '#FFF', 
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
              fontFamily: "'Roboto', sans-serif", 
              fontColor: '#FFF', 
              fontStyle: '200'
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
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
      }
    }, );
  }

}
