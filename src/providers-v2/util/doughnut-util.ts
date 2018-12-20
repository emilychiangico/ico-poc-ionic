export class DoughnutUtil {

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

    static getPointOfLegend(rotateDegreeStart, rotateDegreeEnd) {
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

    static drawLegend(ctx, center, startPoint, endPoint, lineWidth, color) {
      ctx.beginPath();
      ctx.arc(center, center, 40, startPoint, endPoint, false);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.stroke();
    }

}