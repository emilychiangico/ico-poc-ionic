export enum ChartType { Area, Bar, Doughnut, DoughnutLegend, Point };

export class GradientUtil {

    static getPointOfLinearGradient(chartType, width, height, rotateDegrees?) {
        switch (chartType) {
            case ChartType.Area:
                return this.countPointOfLinearGradient(width, height, 0);

            case ChartType.Bar:
                return this.countPointOfLinearGradient(width, height, 135);

            case ChartType.Doughnut:
                return this.countPointOfLinearGradient(width, height, rotateDegrees);

            case ChartType.Point:
                return this.countPointOfLinearGradient(width, height, 0);
        }
    }

    static countPointOfLinearGradient(width, height, rotateDegrees) {
        let x1, y1, x2, y2;
        if (0 <= rotateDegrees && rotateDegrees < 45) {
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
        gradientColors.forEach(function (item) {
            //console.log(page);
            let resultColor = GradientUtil.prepareSingleBackgroundColor(item, ctx);
            backgroundColors.push(resultColor);
        });
        return backgroundColors;
    }

    static prepareSingleBackgroundColor(color, ctx) {
        //console.log("prepareSingleBackgroundColor >> ");
        //console.log(ctx);
        //console.log(color);
        let resultColor;
        if (color.type == 'radial') {
            resultColor = ctx.createRadialGradient(0, 0, 150, 150, 150, 150);
            color.colorStops.forEach(function (stopItem) {
                resultColor.addColorStop(stopItem.stop, stopItem.color);
            });
        } else if (color.type == 'linear') {
            if (color.point) {
                //console.log("point!!!!");
                resultColor = ctx.createLinearGradient(color.point.x1, color.point.y1, color.point.x2, color.point.y2);
            } else {
                resultColor = ctx.createLinearGradient(0, 0, 0, 0);
            }
            color.colorStops.forEach(function (stopItem) {
                resultColor.addColorStop(stopItem.stop, stopItem.color);
            });
        } else {
            resultColor = color.color;
        }
        return resultColor;
    }
}