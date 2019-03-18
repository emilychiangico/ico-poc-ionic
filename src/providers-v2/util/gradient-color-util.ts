import { GradientUtil, ChartType } from './gradient-util';
import { DoughnutUtil } from './doughnut-util';
import { COLOR_THEME } from '../chart-color/colorTheme';

import { AccountType } from './i-portfolio-util';

export class GradientColorUtil {

    static colorTheme = COLOR_THEME["theme1"];

    static getThemeColor() {
        return this.colorTheme;
    }

    /******************** getColorByAccountType ********************/
    static getColorByAccountType(holderType) {
        switch (holderType) {
            case AccountType.savingAndCurrent:
                return this.colorTheme.portfolioHoldingColors.savingAndCurrent;
            case AccountType.timeDeposit:
                return this.colorTheme.portfolioHoldingColors.timeDeposit;
            case AccountType.structuredProduct:
                return this.colorTheme.portfolioHoldingColors.structuredProduct;
            case AccountType.stock:
                return this.colorTheme.portfolioHoldingColors.stock;
            case AccountType.bondNoteCertDeposit:
                return this.colorTheme.portfolioHoldingColors.bondNoteCertDeposit;
            case AccountType.unitTrust:
                return this.colorTheme.portfolioHoldingColors.unitTrust;
            case AccountType.linkedDeposit:
                return this.colorTheme.portfolioHoldingColors.linkedDeposit;
            case AccountType.optionAndDerivativesContract:
                return this.colorTheme.portfolioHoldingColors.optionAndDerivativerContract;
            case AccountType.loan:
                return this.colorTheme.portfolioHoldingColors.loan;
            case AccountType.forwardForeignExchange:
                return this.colorTheme.portfolioHoldingColors.forwardForeignExchange;
            default:
                return null;
        }
    }

    /******************** getPointGradientColor - Legend Point ********************/
    static getPointGradientColor(ctx, chartWidth, chartHeight, color) {
        console.log(">>>> getPointGradientColor Start >>>>");
        color["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Point, chartWidth, chartHeight);

        console.log("color >>");
        console.log(color);

        console.log(">>>> getPointGradientColor End >>>>");

        return GradientUtil.prepareSingleBackgroundColor(color, ctx);
    }

    /******************** getAreaGradientColor ********************/
    static getAreaGradientColor(ctx, holdingTypeList, chartWidth, chartHeight, isPureColor?: boolean) {
        console.log(">>>> getAreaGradientColor Start >>>>");

        let gradientColors = [];

        for (let type of holdingTypeList) {
            // get color by AccountType
            let gradientColor;
            if (isPureColor == true) {
                gradientColor = this.getColorByAccountType(type).pure;
            } else {
                gradientColor = this.getColorByAccountType(type).area;
                gradientColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Area, chartWidth, chartHeight);
            }
            gradientColors.push(gradientColor);
        }

        console.log("AreaGradientColor >>");
        console.log(gradientColors);

        console.log(">>>> getAreaGradientColor End >>>>");

        return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
    }

    /******************** getBarGradientColor ********************/
    static getBarGradientColor(ctx, chartWidth, chartHeight, noOfBar?, selectedIndex?) {
        console.log(">>>> getBarGradientColor Start >>>>");

        var selectColor = this.colorTheme.bar.selected;
        selectColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Bar, chartWidth, chartHeight);

        let noSelecedColor = this.colorTheme.bar.noSelected;
        noSelecedColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Bar, chartWidth, chartHeight);

        if (!Number.isInteger(noOfBar)) {
            return GradientUtil.prepareSingleBackgroundColor(selectColor, ctx);
        }

        let gradientColors = [];
        for (var i = 0; i < noOfBar; i++) {
            if (!Number.isInteger(selectedIndex)) {
                gradientColors.push(selectColor);
            } else {
                if (i == selectedIndex) {
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

    /******************** getDoughnutGradientColor ********************/
    static getDoughnutGradientColor(ctx, data, holdingTypeList, chartSize, isPureColor?: boolean, isCtxList?: boolean) {
        console.log(">>>> getDoughnutGradientColor Start >>>>");

        console.log(holdingTypeList);

        let gradientColors = [];

        if (isPureColor == true) {
            holdingTypeList.forEach((item) => {
                let gradientColor = this.getColorByAccountType(item).pure;
                gradientColors.push(gradientColor);
            });
        } else {
            let rotateDegreeList = DoughnutUtil.getRotateDegreeList(data);

            rotateDegreeList.forEach((item, index) => {
                let halfRotateDegree;
                // get halfRotateDegree of startDegree and endDegree
                if (index < rotateDegreeList.length - 1) {
                    halfRotateDegree = (item + rotateDegreeList[index + 1]) / 2;
                } else {
                    halfRotateDegree = (item + 360) / 2;
                }

                console.log("halfRotateDegree >> " + halfRotateDegree);

                // get color by AccountType
                let gradientColor = this.getColorByAccountType(holdingTypeList[index]).doughnut;
                gradientColor["point"] = GradientUtil.getPointOfLinearGradient(ChartType.Doughnut, chartSize, chartSize, halfRotateDegree);
                gradientColors.push(gradientColor);
            });
        }

        console.log("DoughnutGradientColor >>");
        console.log(gradientColors);

        console.log(">>>> getDoughnutGradientColor End >>>>");

        if (isCtxList && ctx instanceof Array) {
            // for Doughnut Legend
            let colorList = [];
            ctx.forEach((item, index) => {
                colorList.push(GradientUtil.prepareBackgroundColors([gradientColors[index]], item.nativeElement.getContext("2d"))[0]);
            });
            return colorList;
        } else {
            return GradientUtil.prepareBackgroundColors(gradientColors, ctx);
        }
    }


}