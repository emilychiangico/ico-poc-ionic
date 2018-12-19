import { GradientUtil } from '../providers-v2/gradient-util';


export class GradientColorUtil {

    static getGradientColorForAreaChart(ctx) {
        var gradientColors = [
            {
              type: "linear",
              colorStops: [
                {stop: 0.4, color: "Grey"},
                {stop: 0.5, color: "#FAFAFA"},
                {stop: 0.6, color: "Grey"}
              ],
              point: null
            },
            {
              type: "linear",
              colorStops: [
                {stop: 0.35, color: "Blue"},
                {stop: 0.4, color: "#5B5BFF"},
                {stop: 0.5, color: "#FAFAFA"},
                {stop: 0.6, color: "#5B5BFF"},
                {stop: 0.65, color: "Blue"},
              ],
              point: null
            },
            {
              type: "linear",
              colorStops: [
                {stop: 0.4, color: "Purple"},
                {stop: 0.5, color: "#FAFAFA"},
                {stop: 0.6, color: "Purple"},
              ],
              point: null,
              //color: 'rgba(153, 102, 255, 0.2)'
            },
            {
              type: "linear",
              colorStops: [
                {stop: 0.35, color: "Red"},
                {stop: 0.4, color: "#FF6262"},
                {stop: 0.5, color: "#FF8E8E"},
                {stop: 0.6, color: "#FF6262"},
                {stop: 0.65, color: "Red"},
      
                //  {stop: 0.000, color: "Red"},
                //  {stop: 0.300, color: "#FF6262"},
                //  {stop: 0.830, color: "#FF8E8E"},
                //  {stop: 1, color: "#FF6262"},
              ],
              point: null
            },
      
            {
              type: "linear",
              colorStops: [
                {stop: 0.4, color: "Green"},
                {stop: 0.5, color: "#FAFAFA"},
                {stop: 0.6, color: "Green"},
              ],
              point: null,
              //color: 'rgba(75, 192, 192, 0.2)'
            },
      
            {
              type: "linear",
              colorStops: [
                {stop: 0.4, color: "Goldenrod"},
                {stop: 0.5, color: "#FAFAFA"},
                {stop: 0.6, color: "Goldenrod"},
              ],
              point: null,
              //color: 'rgba(255, 159, 64, 0.2)'
            },            
          ];

          
          return GradientUtil.prepareBackgroundColors(gradientColors, ctx);

    }

    static getBarGradientColor(ctx, color, chartWidth, chartHeight, noOfBar?, selectedIndex?) {
      let selectColor = {
        type: "linear",
        colorStops: color.bar.selected,
        point: GradientUtil.countPointOfLinearGradient(chartWidth, chartHeight, 135)
      }

      let noSelecedColor = {
        type: "linear",
        colorStops: color.bar.noSelected,
        point: GradientUtil.countPointOfLinearGradient(chartWidth, chartHeight, 135)
      }

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


}