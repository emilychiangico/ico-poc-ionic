export class GradientUtil {

    static getRotateDegreeList(cData) {
        console.log(">>>> rotateDegreeList Start >>>>");
        let rotateDegreeList = [];
        var sum = cData.reduce((a, b) => a + b, 0);
        console.log("sum >> " + sum);

        cData.forEach((item, index) => {
          console.log(">>>>>>>>>>>>>>> index >> " + index)
          //let dataset = [cData[index], sum - cData[index]];
    
          let pastDataSum  = 0;
          cData.forEach((data, dIndex) => {
            if (dIndex < index) {
              pastDataSum += data;
            }
          });
          console.log("pastDataSum = " + pastDataSum);
          console.log("pastDataSum/sum= " + pastDataSum/sum);
          let rotateDegree = (pastDataSum/sum)*360;
          console.log("rotateDegree = " + rotateDegree);
    
          rotateDegreeList.push(rotateDegree);
        });
        console.log(">>>> rotateDegreeList End >>>>");

        return rotateDegreeList;
    }

    static getPointOfLinearGradient(gradientColors, rotateDegreeList, width, height) {
        console.log(">>>> getPointOfLinearGradient Start >>>>");
        rotateDegreeList.forEach((item, index) => {
          let halfRotateDegree;
          if(index < rotateDegreeList.length-1) {
            halfRotateDegree = (item + rotateDegreeList[index+1]) / 2;
          } else {
            halfRotateDegree = (item + 360) / 2;
          }
    
          console.log("halfRotateDegree >> " + halfRotateDegree);
    
          // count line
          gradientColors[index].point = this.countPointOfLinearGradient(width, height, halfRotateDegree);
        });
        console.log(">>>> getPointOfLinearGradient End >>>>");

        return gradientColors;
    }

    static countPointOfLinearGradient(width, height, rotateDegrees) {    
        let x1, y1 ,x2 ,y2;
        if (0 <= rotateDegrees &&  rotateDegrees < 45) {
            x1 = 0;
            y1 = height / 2 * (45 - rotateDegrees) / 45;
            x2 = width;
            y2 = height - y1;
        } else if (45 <= rotateDegrees && rotateDegrees < 135) {
            x1 = width * (rotateDegrees - 45) / (135 - 45);
            y1 = 0;
            x2 = width - x1;
            y2 = height;
        } else if (135 <= rotateDegrees && rotateDegrees < 225) {
          x1 = width;
          y1 = height * (rotateDegrees - 135) / (225 - 135);
          x2 = 0;
          y2 = height - y1;
        } else if (225 <= rotateDegrees && rotateDegrees < 315) {
          x1 = width * (1 - (rotateDegrees - 225) / (315 - 225));
          y1 = height;
          x2 = width - x1;
          y2 = 0;
        } else if (315 <= rotateDegrees) {
          x1 = 0;
          y1 = height - height / 2 * (rotateDegrees - 315) / (360 - 315);
          x2 = width;
          y2 = height - y1;
        }
    
        return {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2
        }
      }


    static prepareBackgroundColors(gradientColors, ctx) {
        var backgroundColors = [];
        let page = this;
        gradientColors.forEach(function( item ){
          console.log(page);
          let resultColor = GradientUtil.prepareSingleBackgroundColor(item, ctx);
          backgroundColors.push(resultColor);
        });
        return backgroundColors;
      }

    static prepareSingleBackgroundColor(color, ctx) {
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
}