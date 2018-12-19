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

}