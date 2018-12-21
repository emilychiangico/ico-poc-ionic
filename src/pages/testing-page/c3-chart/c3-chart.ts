import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as c3 from 'c3';
import * as d3 from "d3";
import { path } from 'd3';

/**
 * Generated class for the C3ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-c3-chart',
  templateUrl: 'c3-chart.html',
})
export class C3ChartPage {

  @ViewChild('myCanvas') myCanvas;

  chart;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initDonutChart();
  }

  initBarChart() {
    c3.generate({
      bindto: '#mychart',
      data: {
          columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 130, 100, 140, 200, 150, 50]
          ],
          type: 'bar'
      },
      bar: {
          width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
          }
          // or
          //width: 100 // this makes bar width 100px
      }
    });
  }

  customizeArc(){
    console.log("customizeArc");
    console.log(this.chart);

    var arc = d3.arc()
    .innerRadius(132)
    .outerRadius(130);
    
    d3.select(".c3-shapes.c3-shapes-data1.c3-arcs.c3-arcs-data1")
    .html("")
    .append("path")
    .attr("d", arc)
    .attr("transform", "translate(1,1)")
    .style("fill", "#EEEEEE");
  }

  customizeColor() {
    console.log("customizeColor")
    //console.log(this.chart);
    var defs = d3.select('svg').append("svg:defs");

    //next we append a linear gradient 
    var red_gradient = defs.append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");
    
    //first dark red color
        red_gradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "rgb(221,48,2)")
            .attr("stop-opacity", 1);
    //second light red color
        red_gradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "rgb(247, 78, 1)")
            .attr("stop-opacity", 1);

            var radial_gradient = defs.append("radialGradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("cx", '50%')
            .attr("cy", '50%')
            .attr("r", "75%")
            .attr("fx", '50%')
            .attr("fy", '50%')
            .attr('gradientTransform', "translate(-200,-200)")
            .attr("id", 'gradient2');
             radial_gradient.append("stop").attr("offset", "0%").style("stop-color", "black");
             radial_gradient.append("stop").attr("offset", "55%").style("stop-color", "white");
             radial_gradient.append("stop").attr("offset", "95%").style("stop-color", "black");


             var arc = d3.arc()
             .innerRadius(140)
             .outerRadius(125);
            
             var pathList = d3.select('svg').selectAll("g.c3-shapes.c3-arcs").html("").append("path");
             pathList
             .attr("d", arc)
             .style("fill", function (d: any) {
              console.log(d.index);
              //d.data.id
              if (d.index % 2 == 0) {
                return "url(#gradient)"
              } else {
                return "url(#gradient2)"
              }
              //return "yellow";
            });


             /*
             pathList.each(function(d: d3.BaseType , i, nodes) {
               
              //this.html().
              console.log(nodes[i]);
                console.log(d);
              //  console.log(a);
             })
             console.log(pathList);
             */

 
  }

  initDonutChart() {

    var ctx = this.myCanvas.nativeElement.getContext("2d");

    var grd= ctx.createLinearGradient(0,0,170,0);
    grd.addColorStop(0,"black");
    grd.addColorStop(1,"white");

    var page = this;

    this.chart = c3.generate({
      size: {
        width: 300,
        height: 300
      },
      bindto: '#mychart',
      data: {
          columns: [
              ['data1', 45],
              ['data2', 30],
              ['data3', 18],
              ['data4', 15],
              ['data5', 10],
              ['data6', 8],
          ],
          type : 'donut',
          colors: {
            data1: '#ff0000',
            data2: grd,
            data3: '#0000ff',
            data4: '#ff0001',
            data5: '#00ff02',
            data6: '#0000f4',
          },
          onclick: function (d, element) { 
            console.log("data onclick");
            page.customizeArc();
          }
      },
      legend: {
        show: false
      },
      donut: {
          label :{
            show: false
          },
          width: 10,
          title: "Iris Petal Width"
      },
      oninit: function () { 
        console.log("oninit");
       },
      onrendered: function () { 
        console.log("onrendered");
        console.log(this.chart);
        
        page.customizeColor();
        page.customizeArc();
        
        
      },
      onresize: function () {  
        console.log("onresize");
      },

      onresized: function () {  
        console.log("onresized");

      },

    });
    //this.customizeColor();
    

  }

}
