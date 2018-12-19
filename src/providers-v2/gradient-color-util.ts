import { GradientUtil, ChartType } from './gradient-util';
import { DoughnutUtil } from './doughnut-util';
import { COLOR_THEME } from './colorTheme';

export class GradientColorUtil {

    static colorTheme = COLOR_THEME["theme1"];

    static getGradientColorForAreaChart(ctx, chartWidth, chartHeight) {
      let gradientColors = [
        this.colorTheme.portfolioHoildingColors.savingAndCurrent,
        this.colorTheme.portfolioHoildingColors.timeDeposit,
        this.colorTheme.portfolioHoildingColors.linkedDeposit,
        this.colorTheme.portfolioHoildingColors.stock,
        this.colorTheme.portfolioHoildingColors.bondNoteCertDeposit,
        this.colorTheme.portfolioHoildingColors.unitTrust,
        this.colorTheme.portfolioHoildingColors.structuredProduct,
        this.colorTheme.portfolioHoildingColors.optionAndDerivativerContract,
        this.colorTheme.portfolioHoildingColors.loan,
        this.colorTheme.portfolioHoildingColors.forwardForeignExchange
      ];

      for(let color of gradientColors) {
        console.log(color);
        color["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Area, chartWidth, chartHeight);
      }

      return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }

    static getBarGradientColor(ctx, chartWidth, chartHeight, noOfBar?, selectedIndex?) {

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

      return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }

    static getDoughnutGradientColor(ctx, data, chartWidth, chartHeight) {
      console.log(">>>> getDoughnutGradientColor Start >>>>");
      console.log(data);
      console.log("chartWidth >> " + chartWidth);
      console.log("chartHeight >> " + chartHeight);


      let gradientColors = [
        this.colorTheme.portfolioHoildingColors.savingAndCurrent,
        this.colorTheme.portfolioHoildingColors.timeDeposit,
        this.colorTheme.portfolioHoildingColors.linkedDeposit,
        this.colorTheme.portfolioHoildingColors.stock,
        this.colorTheme.portfolioHoildingColors.bondNoteCertDeposit,
        this.colorTheme.portfolioHoildingColors.unitTrust,
        this.colorTheme.portfolioHoildingColors.structuredProduct,
        this.colorTheme.portfolioHoildingColors.optionAndDerivativerContract,
        this.colorTheme.portfolioHoildingColors.loan,
        this.colorTheme.portfolioHoildingColors.forwardForeignExchange
      ];

      let rotateDegreeList = DoughnutUtil.getRotateDegreeList(data);

      gradientColors = GradientUtil.getDonghnutPointOfLinearGradient(gradientColors, rotateDegreeList, chartWidth, chartHeight);
      
      console.log(">>>> getDoughnutGradientColor End >>>>");

      return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }


}