import {COLOR} from "./color";

export const COLOR_THEME = {

    theme1: {
        bar: {
            selected: [
                {stop: 0, color: COLOR.common["white"]},
                {stop: 0.2, color: COLOR.bar["grey"]},
                {stop: 0.4, color: COLOR.common["white"]},
                {stop: 0.6, color: COLOR.bar["grey"]},
                {stop: 0.8, color: COLOR.common["white"]},
                {stop: 1, color: COLOR.bar["grey"]}
            ],
            noSelected: [
                {stop: 0, color: COLOR.bar["darkWhite"]},
                {stop: 0.2, color: COLOR.bar["darkGrey"]},
                {stop: 0.4, color: COLOR.bar["darkWhite"]},
                {stop: 0.6, color: COLOR.bar["darkGrey"]},
                {stop: 0.8, color: COLOR.bar["darkWhite"]},
                {stop: 1, color: COLOR.bar["darkGrey"]}
            ]
        },
        mix: {
            benchmarkLine: COLOR.mix["blue"],
            benchmarkBackground: COLOR.mix["white_0.2"],
            returnLine: COLOR.common["white"]
        },
        gridLine: COLOR.gridLine["grey_0.5"]
    },
    theme2: {

    }
};