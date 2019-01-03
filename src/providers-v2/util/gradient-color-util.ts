import { GradientUtil, ChartType } from './gradient-util';
import { DoughnutUtil } from './doughnut-util';
import { COLOR_THEME } from '../color/colorTheme';

import { PortfolioHoldingType } from './portfolio-holding-util';

export class GradientColorUtil {

    static colorTheme = COLOR_THEME["theme1"];

    static getThemeColor() {
      return this.colorTheme;
    }

    static getColorByPortfolioHoldingType(holderType) {
      switch(holderType) {
        case PortfolioHoldingType.SavingAndCurrent:
          return this.colorTheme.portfolioHoldingColors.savingAndCurrent;
        case PortfolioHoldingType.TimeDeposit:
          return this.colorTheme.portfolioHoldingColors.timeDeposit;
        case PortfolioHoldingType.StructuredProduct:
          return this.colorTheme.portfolioHoldingColors.structuredProduct;
        case PortfolioHoldingType.Stock:
          return this.colorTheme.portfolioHoldingColors.stock;
        case PortfolioHoldingType.BondNoteCertDeposit:
          return this.colorTheme.portfolioHoldingColors.bondNoteCertDeposit;
        case PortfolioHoldingType.UnitTrust:
          return this.colorTheme.portfolioHoldingColors.unitTrust;
        case PortfolioHoldingType.LinkedDeposit:
          return this.colorTheme.portfolioHoldingColors.linkedDeposit;
        case PortfolioHoldingType.OptionAndDerivativerContract:
          return this.colorTheme.portfolioHoldingColors.optionAndDerivativerContract;
        case PortfolioHoldingType.Loan:
          return this.colorTheme.portfolioHoldingColors.loan;
        case PortfolioHoldingType.ForwardForeignExchange:
          return this.colorTheme.portfolioHoldingColors.forwardForeignExchange;
        default:
          return null;
      }
    }

    static getPointGradientColor(ctx, chartWidth, chartHeight, color) {
      console.log(">>>> getPointGradientColor Start >>>>");
      color["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Point, chartWidth, chartHeight);

      console.log("color >>");
      console.log(color);

      console.log(">>>> getPointGradientColor End >>>>");

      return GradientUtil.prepareSingleBackgroundColor(color, ctx);
    }

    static getAreaGradientColor(ctx, holdingTypeList, chartWidth, chartHeight) {
      console.log(">>>> getAreaGradientColor Start >>>>");

      let gradientColors = [];

      for(let type of holdingTypeList) {
        // get color by PortfolioHoldingType
        let gradientColor = this.getColorByPortfolioHoldingType(type).area;
        gradientColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Area, chartWidth, chartHeight);
        gradientColors.push(gradientColor);
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

    static getDoughnutGradientColor(ctx, data, holdingTypeList, chartWidth, chartHeight) {
      console.log(">>>> getDoughnutGradientColor Start >>>>");

      console.log(holdingTypeList);

      let gradientColors = [];

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

        // get color by PortfolioHoldingType
        let gradientColor = this.getColorByPortfolioHoldingType(holdingTypeList[index]).doughnut;
        gradientColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Doughnut, chartWidth, chartHeight, halfRotateDegree);
        gradientColors.push(gradientColor);
      });

      console.log("DoughnutGradientColor >>");
      console.log(gradientColors);

      console.log(">>>> getDoughnutGradientColor End >>>>");

      return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }


}