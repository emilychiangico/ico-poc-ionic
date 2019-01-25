import { COLOR } from "./color";

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
        portfolioHoldingColors: {
            savingAndCurrent: COLOR.gradientColors["grey"],
            timeDeposit: COLOR.gradientColors["dark_cyan"],
            structuredProduct: COLOR.gradientColors["purple"],
            stock: COLOR.gradientColors["blue"],
            bondNoteCertDeposit: COLOR.gradientColors["light_cyan"],
            unitTrust: COLOR.gradientColors["ligth_purple"],

            linkedDeposit: COLOR.gradientColors["hotpink"],
            optionAndDerivativerContract: COLOR.gradientColors["cyan"],
            loan: COLOR.gradientColors["gold"],
            forwardForeignExchange: COLOR.gradientColors["brown"]
        }
    },
    theme2: {

    }
};