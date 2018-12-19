import {COLOR} from "./color";

export const COLOR_THEME = {

    theme1: {
        gridLine: COLOR.gridLine["grey_0.5"],
        bar: {
            selected: COLOR.bar["grey"],
            noSelected: COLOR.bar["darkGrey"]
        },
        mix: {
            benchmarkLine: COLOR.mix["blue"],
            benchmarkBackground: COLOR.mix["white_0.2"],
            returnLine: COLOR.common["white"]
        },
        doughnut: {
            notData: COLOR.doughnut["gery"]
        },
        portfolioHoildingColors: {
            savingAndCurrent: COLOR.gradientColors["grey"],
            timeDeposit: COLOR.gradientColors["blue"],
            linkedDeposit: COLOR.gradientColors["purple"],
            stock: COLOR.gradientColors["red"],
            bondNoteCertDeposit: COLOR.gradientColors["green"],
            unitTrust: COLOR.gradientColors["goldenrod"],
            structuredProduct: COLOR.gradientColors["hotpink"],
            optionAndDerivativerContract: COLOR.gradientColors["cyan"],
            loan: COLOR.gradientColors["gold"],
            forwardForeignExchange: COLOR.gradientColors["brown"]
        }
    },
    theme2: {

    }
};