export const COLOR = {

    common: {
        "white": "rgb(225, 225, 225)"
    },

    bar: {
        "grey": {
            type: "linear",
            colorStops: [
                { stop: 0, color: "rgb(225, 225, 225)" },
                { stop: 0.2, color: "rgb(132, 139, 137)" },
                { stop: 0.4, color: "rgb(225, 225, 225)" },
                { stop: 0.6, color: "rgb(132, 139, 137)" },
                { stop: 0.8, color: "rgb(225, 225, 225)" },
                { stop: 1, color: "rgb(132, 139, 137)" }
            ]
        },
        "darkGrey": {
            type: "linear",
            colorStops: [
                { stop: 0, color: "rgb(109, 108, 117)" },
                { stop: 0.2, color: "rgb(77, 79, 93)" },
                { stop: 0.4, color: "rgb(109, 108, 117)" },
                { stop: 0.6, color: "rgb(77, 79, 93)" },
                { stop: 0.8, color: "rgb(109, 108, 117)" },
                { stop: 1, color: "rgb(77, 79, 93)" }
            ]
        }
    },

    mix: {
        "blue": "rgb(50, 95, 186)",
        "white_0.2": "rgb(255, 255, 255, 0.2)",
    },

    gridLine: {
        "grey_0.5": "rgb(192, 187, 191, 0.5)"
    },

    doughnut: {
        "gery": "#EFEFEF"
    },

    gradientColors: {
        "grey": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.1, color: "rgb(119, 134, 156)" },
                    { stop: 0.5, color: "rgb(255, 255, 255)" },
                    { stop: 0.9, color: "rgb(119, 134, 156)" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.3, color: "rgb(119, 134, 156)" },
                    { stop: 0.5, color: "rgb(255, 255, 255)" },
                    { stop: 0.7, color: "rgb(119, 134, 156)" }
                ]
            }
        },
        "dark_cyan": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.1, color: "rgb(0, 78, 110)" },
                    { stop: 0.5, color: "rgb(110, 246, 255)" },
                    { stop: 0.9, color: "rgb(0, 78, 110)" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.3, color: "rgb(0, 78, 110)" },
                    { stop: 0.5, color: "rgb(110, 246, 255)" },
                    { stop: 0.7, color: "rgb(0, 78, 110)" }
                ]
            }
        },
        "ligth_purple": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.1, color: "rgb(61, 110, 225)" },
                    { stop: 0.5, color: "rgb(254, 254, 254)" },
                    { stop: 0.9, color: "rgb(61, 110, 225)" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.3, color: "rgb(61, 110, 225)" },
                    { stop: 0.5, color: "rgb(254, 254, 254)" },
                    { stop: 0.7, color: "rgb(61, 110, 225)" }
                ]
            }
        },
        "purple": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.1, color: "rgb(127, 75, 232)" },
                    { stop: 0.5, color: "rgb(219, 139, 229)" },
                    { stop: 0.9, color: "rgb(127, 75, 232)" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.3, color: "rgb(127, 75, 232)" },
                    { stop: 0.5, color: "rgb(219, 139, 229)" },
                    { stop: 0.7, color: "rgb(127, 75, 232)" }
                ]
            }
        },
        "light_cyan": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.1, color: "rgb(0, 68, 115)" },
                    { stop: 0.5, color: "rgb(163, 229, 255)" },
                    { stop: 0.9, color: "rgb(0, 68, 115)" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.3, color: "rgb(0, 68, 115)" },
                    { stop: 0.5, color: "rgb(163, 229, 255)" },
                    { stop: 0.7, color: "rgb(0, 68, 115)" }
                ]
            }
        },
        "blue": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.1, color: "rgb(23, 50, 83)" },
                    { stop: 0.5, color: "rgb(0, 107, 248)" },
                    { stop: 0.9, color: "rgb(23, 50, 83)" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.3, color: "rgb(23, 50, 83)" },
                    { stop: 0.5, color: "rgb(0, 107, 248)" },
                    { stop: 0.7, color: "rgb(23, 50, 83)" }
                ]
            }
        },
        "hotpink": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "hotpink" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "hotpink" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "hotpink" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "hotpink" }
                ]
            }
        },
        "cyan": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "cyan" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "cyan" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "cyan" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "cyan" }
                ]
            }
        },
        "gold": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "gold" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "gold" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "gold" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "gold" }
                ]
            }
        },
        "brown": {
            area: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "brown" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "brown" }
                ]
            },
            doughnut: {
                type: "linear",
                colorStops: [
                    { stop: 0.4, color: "brown" },
                    { stop: 0.5, color: "#FAFAFA" },
                    { stop: 0.6, color: "brown" }
                ]
            }
        }

    }

};
