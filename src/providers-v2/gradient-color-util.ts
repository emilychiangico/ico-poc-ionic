import { GradientUtil, ChartType } from './gradient-util';
import { DoughnutUtil } from './doughnut-util';
import { COLOR_THEME } from './colorTheme';

export class GradientColorUtil {

    static colorTheme = COLOR_THEME["theme1"];

    static getThemeColor() {
      return this.colorTheme;
    }

    static getAreaGradientColor(ctx, chartWidth, chartHeight) {
      console.log(">>>> getAreaGradientColor Start >>>>");

      let gradientColors = [
        this.colorTheme.portfolioHoildingColors.savingAndCurrent.area,
        this.colorTheme.portfolioHoildingColors.timeDeposit.area,
        this.colorTheme.portfolioHoildingColors.structuredProduct.area,
        this.colorTheme.portfolioHoildingColors.unitTrust.area,
        this.colorTheme.portfolioHoildingColors.stock.area,
        this.colorTheme.portfolioHoildingColors.bondNoteCertDeposit.area,

        this.colorTheme.portfolioHoildingColors.linkedDeposit.area,
        this.colorTheme.portfolioHoildingColors.optionAndDerivativerContract.area,
        this.colorTheme.portfolioHoildingColors.loan.area,
        this.colorTheme.portfolioHoildingColors.forwardForeignExchange.area
      ];

      for(let color of gradientColors) {
        console.log(color);
        color["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Area, chartWidth, chartHeight);
      }

      console.log("AreaGradientColor >>");
      console.log(gradientColors);

      console.log(">>>> getAreaGradientColor End >>>>");

      return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }

    static getBarGradientColor(ctx, chartWidth, chartHeight, noOfBar?, selectedIndex?) {
      console.log(">>>> getBarGradientColor Start >>>>");

      var selectColor = this.colorTheme.bar.selected;
      selectColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Bar, chartWidth, chartHeight);

      let noSelecedColor = this.colorTheme.bar.noSelected;
      noSelecedColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Bar, chartWidth, chartHeight);

      if(!Number.isInteger(noOfBar)) {
        return GradientUtil.prepareSingleBackgroundColor(selectColor, ctx);
      }

      let gradientColors = [];
      for(var i = 0; i < noOfBar; i++) {
        if(!Number.isInteger(selectedIndex)) {
          gradientColors.push(selectColor);
        }else {
          if(i == selectedIndex) {
            gradientColors.push(selectColor);
          } else {
            gradientColors.push(noSelecedColor);
          }
        }
      }

      console.log("BarGradientColor >>");
      console.log(gradientColors);

      console.log(">>>> getBarGradientColor End >>>>");

      return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }

    static getDoughnutGradientColor(ctx, data, chartWidth, chartHeight) {
      console.log(">>>> getDoughnutGradientColor Start >>>>");

      let gradientColors = [
        this.colorTheme.portfolioHoildingColors.savingAndCurrent.doughnut,
        this.colorTheme.portfolioHoildingColors.timeDeposit.doughnut,
        this.colorTheme.portfolioHoildingColors.structuredProduct.doughnut,
        this.colorTheme.portfolioHoildingColors.unitTrust.doughnut,
        this.colorTheme.portfolioHoildingColors.stock.doughnut,
        this.colorTheme.portfolioHoildingColors.bondNoteCertDeposit.doughnut,

        this.colorTheme.portfolioHoildingColors.linkedDeposit.doughnut,
        this.colorTheme.portfolioHoildingColors.optionAndDerivativerContract.doughnut,
        this.colorTheme.portfolioHoildingColors.loan.doughnut,
        this.colorTheme.portfolioHoildingColors.forwardForeignExchange.doughnut
      ];

      let rotateDegreeList = DoughnutUtil.getRotateDegreeList(data);

      rotateDegreeList.forEach((item, index) => {
        let halfRotateDegree;
        // get halfRotateDegree of startDegree and endDegree
        if(index < rotateDegreeList.length-1) {
          halfRotateDegree = (item + rotateDegreeList[index+1]) / 2;
        } else {
          halfRotateDegree = (item + 360) / 2;
        }
  
        console.log("halfRotateDegree >> " + halfRotateDegree);
  
        gradientColors[index]["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Doughnut, chartWidth, chartHeight, halfRotateDegree);
      });

      console.log("DoughnutGradientColor >>");
      console.log(gradientColors);

      console.log(">>>> getDoughnutGradientColor End >>>>");

      return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }


}