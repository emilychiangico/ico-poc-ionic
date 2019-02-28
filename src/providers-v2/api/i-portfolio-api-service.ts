import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class IPortfolioApiService {

    constructor() { }

    getAssetAllocationHistory() {
        let result = {
            "data": {
                "portfolioCurrency": "HKD",
                "totalAUM": 1635667494.00,
                "lastUpdateDate": "31-05-2018",
                "assetAllocationHistoryList": [
                    {
                        "month": 6,
                        "year": 2018,
                        "totalAsset": 41673251.76,
                        "detailsList": [
                            {
                                "assetClassID": "savings_n_current",
                                "amount": 12000000,
                                "percentage": 30
                            },
                            {
                                "assetClassID": "time_deposit",
                                "amount": 4600000,
                                "percentage": 12.6
                            },
                            {
                                "assetClassID": "bond",
                                "amount": 8200000,
                                "percentage": 24
                            },
                            {
                                "assetClassID": "stock",
                                "amount": 4000000,
                                "percentage": 10
                            },
                            {
                                "assetClassID": "structured_products",
                                "amount": 7500000,
                                "percentage": 20
                            },
                            {
                                "assetClassID": "unit_trust",
                                "amount": 4800000,
                                "percentage": 15
                            },
                            {
                                "assetClassID": "linked_deposit",
                                "amount": 0,
                                "percentage": 0
                            }
                        ]
                    },
                    {
                        "month": 5,
                        "year": 2018,
                        "totalAsset": 41673251.76,
                        "detailsList": [
                            {
                                "assetClassID": "savings_n_current",
                                "amount": 12000000,
                                "percentage": 30
                            },
                            {
                                "assetClassID": "time_deposit",
                                "amount": 4200000,
                                "percentage": 10
                            },
                            {
                                "assetClassID": "bond",
                                "amount": 8000000,
                                "percentage": 24
                            },
                            {
                                "assetClassID": "stock",
                                "amount": 8000000,
                                "percentage": 24
                            },
                            {
                                "assetClassID": "structured_products",
                                "amount": 7500000,
                                "percentage": 23
                            },
                            {
                                "assetClassID": "unit_trust",
                                "amount": 4500000,
                                "percentage": 15
                            },
                            {
                                "assetClassID": "linked_deposit",
                                "amount": 0,
                                "percentage": 0
                            }
                        ]
                    },
                    {
                        "month": 4,
                        "year": 2018,
                        "totalAsset": 41673251.76,
                        "detailsList": [
                            {
                                "assetClassID": "savings_n_current",
                                "amount": 6000000,
                                "percentage": 30
                            },
                            {
                                "assetClassID": "time_deposit",
                                "amount": 4000000,
                                "percentage": 15
                            },
                            {
                                "assetClassID": "bond",
                                "amount": 9000000,
                                "percentage": 40
                            },
                            {
                                "assetClassID": "stock",
                                "amount": 2000000,
                                "percentage": 10
                            },
                            {
                                "assetClassID": "structured_products",
                                "amount": 7000000,
                                "percentage": 35
                            },
                            {
                                "assetClassID": "unit_trust",
                                "amount": 5000000,
                                "percentage": 20
                            },
                            {
                                "assetClassID": "linked_deposit",
                                "amount": 0,
                                "percentage": 0
                            }
                        ]
                    },
                    {
                        "month": 3,
                        "year": 2018,
                        "totalAsset": 41673251.76,
                        "detailsList": [
                            {
                                "assetClassID": "savings_n_current",
                                "amount": 10800000,
                                "percentage": 40
                            },
                            {
                                "assetClassID": "time_deposit",
                                "amount": 5000000,
                                "percentage": 20
                            },
                            {
                                "assetClassID": "bond",
                                "amount": 10000000,
                                "percentage": 39.5
                            },
                            {
                                "assetClassID": "stock",
                                "amount": 4500000,
                                "percentage": 17.5
                            },
                            {
                                "assetClassID": "structured_products",
                                "amount": 9500000,
                                "percentage": 35.5
                            },
                            {
                                "assetClassID": "unit_trust",
                                "amount": 7000000,
                                "percentage": 30.5
                            },
                            {
                                "assetClassID": "linked_deposit",
                                "amount": 0,
                                "percentage": 0
                            }
                        ]
                    },
                    {
                        "month": 2,
                        "year": 2018,
                        "totalAsset": 41673251.76,
                        "detailsList": [
                            {
                                "assetClassID": "savings_n_current",
                                "amount": 13200000,
                                "percentage": 45
                            },
                            {
                                "assetClassID": "time_deposit",
                                "amount": 6400000,
                                "percentage": 26
                            },
                            {
                                "assetClassID": "bond",
                                "amount": 9000000,
                                "percentage": 39.5
                            },
                            {
                                "assetClassID": "stock",
                                "amount": 5000000,
                                "percentage": 17.5
                            },
                            {
                                "assetClassID": "structured_products",
                                "amount": 8600000,
                                "percentage": 40.5
                            },
                            {
                                "assetClassID": "unit_trust",
                                "amount": 7000000,
                                "percentage": 30.5
                            },
                            {
                                "assetClassID": "linked_deposit",
                                "amount": 0,
                                "percentage": 0
                            }
                        ]
                    },
                    {
                        "month": 1,
                        "year": 2018,
                        "totalAsset": 41673251.76,
                        "detailsList": [
                            {
                                "assetClassID": "savings_n_current",
                                "amount": 6000000,
                                "percentage": 25.5
                            },
                            {
                                "assetClassID": "time_deposit",
                                "amount": 6000000,
                                "percentage": 25.5
                            },
                            {
                                "assetClassID": "bond",
                                "amount": 9000000,
                                "percentage": 40.5
                            },
                            {
                                "assetClassID": "stock",
                                "amount": 4000000,
                                "percentage": 20
                            },
                            {
                                "assetClassID": "structured_products",
                                "amount": 8600000,
                                "percentage": 37.5
                            },
                            {
                                "assetClassID": "unit_trust",
                                "amount": 6000000,
                                "percentage": 25.5
                            },
                            {
                                "assetClassID": "linked_deposit",
                                "amount": 0,
                                "percentage": 0
                            }
                        ]
                    }
                ],
                "netAssetValueHistoryList": [
                    {
                        "month": 6,
                        "year": 2018,
                        "detailsList": [
                            {
                                "category": "cash_n_deposit",
                                "amount": 588863.25
                            },
                            {
                                "category": "investment",
                                "amount": 91584388.51
                            },
                            {
                                "category": "loans",
                                "amount": 12248568.18
                            },
                            {
                                "category": "net_asset_values",
                                "amount": 79424683.58
                            }
                        ]
                    },
                    {
                        "month": 5,
                        "year": 2018,
                        "detailsList": [
                            {
                                "category": "cash_n_deposit",
                                "amount": 3863.25
                            },
                            {
                                "category": "investment",
                                "amount": 884388.51
                            },
                            {
                                "category": "loans",
                                "amount": 148568.18
                            },
                            {
                                "category": "net_asset_values",
                                "amount": 10424683.58
                            }
                        ]
                    },
                    {
                        "month": 4,
                        "year": 2018,
                        "detailsList": [
                            {
                                "category": "cash_n_deposit",
                                "amount": 77763.25
                            },
                            {
                                "category": "investment",
                                "amount": 21584388.51
                            },
                            {
                                "category": "loans",
                                "amount": 19248568.18
                            },
                            {
                                "category": "net_asset_values",
                                "amount": 45424683.58
                            }
                        ]
                    },
                    {
                        "month": 3,
                        "year": 2018,
                        "detailsList": [
                            {
                                "category": "cash_n_deposit",
                                "amount": 188863.25
                            },
                            {
                                "category": "investment",
                                "amount": 81584388.51
                            },
                            {
                                "category": "loans",
                                "amount": 33248568.18
                            },
                            {
                                "category": "net_asset_values",
                                "amount": 59424683.58
                            }
                        ]
                    },
                    {
                        "month": 2,
                        "year": 2018,
                        "detailsList": [
                            {
                                "category": "cash_n_deposit",
                                "amount": 88763.25
                            },
                            {
                                "category": "investment",
                                "amount": 41584388.51
                            },
                            {
                                "category": "loans",
                                "amount": 14248568.18
                            },
                            {
                                "category": "net_asset_values",
                                "amount": 9424683.58
                            }
                        ]
                    },
                    {
                        "month": 1,
                        "year": 2018,
                        "detailsList": [
                            {
                                "category": "cash_n_deposit",
                                "amount": 88863.25
                            },
                            {
                                "category": "investment",
                                "amount": 41584388.51
                            },
                            {
                                "category": "loans",
                                "amount": 12248568.18
                            },
                            {
                                "category": "net_asset_values",
                                "amount": 19424683.58
                            }
                        ]
                    }
                ]
            }
        };

        return result;
    }


    getCcyDistribution() {
        let result = {
            "data": {
                "portfolioCurrency": "HKD",
                "totalAUM": 1635667494.00,
                "lastUpdateDate": "31-05-2018",
                "currencyDistributionList": [
                    {
                        "currency": "AUD",
                        "amount": 20125389.15
                    },
                    {
                        "currency": "EUR",
                        "amount": -8707856.12
                    },
                    {
                        "currency": "GBP",
                        "amount": -30219342.15
                    },
                    {
                        "currency": "HKD",
                        "amount": 50472020.48
                    },
                    {
                        "currency": "JPY",
                        "amount": 8107849.96
                    },
                    {
                        "currency": "OTH",
                        "amount": 44915056.4
                    },
                    {
                        "currency": "USD",
                        "amount": 70787658.18
                    }
                ]
            }
        }
        return result;
    }

    getPerformanceAnalysis() {
        let result = {
            "data": {
                "portfolioCurrency": "HKD",
                "totalAUM": 1635667494.00,
                "lastUpdateDate": "31-05-2018",
                "netCapitalInOutValueFromYrBegin": 8587338.53,
                "netCapitalInOutValueFromLastSixMonth": 8587338.53,
                "yearBeginDate": "2016-01-01",
                "lastSixMonthBeginDate": "2015-12-01",
                "detailsList": [
                    {
                        "year": 2016,
                        "month": 5,
                        "fromDate": "2016-05-01",
                        "toDate": "2016-05-31",
                        "fromAUM": 41673251.76,
                        "toAUM": 41673251.76,
                        "netCapitalInOutValue": 1901294.48,
                        "weightedNetCapitalInOutValue": 944072.64,
                        "netChangeInPortfolioValue": -1901294.48,
                        "monthlyReturnPercent": -1,
                        "yearReturnPercent": -4,
                        "yearToLastSixMonthReturnPercent": -4,
                        "benchmarkList": [
                            {
                                "id": "dow_jones_industrial_average_index",
                                "value": 18012.55,
                                "percentage": -0.4
                            },
                            {
                                "id": "hang_seng_index",
                                "value": 20600,
                                "percentage": -0.95
                            },
                            {
                                "id": "msci_world_index",
                                "value": 9756,
                                "percentage": -1.46
                            },
                            {
                                "id": "sp_500_index",
                                "value": 2259.89,
                                "percentage": 0.75
                            }
                        ]
                    }, {
                        "year": 2016,
                        "month": 4,
                        "fromDate": "2016-04-01",
                        "toDate": "2016-04-30",
                        "fromAUM": 41673251.76,
                        "toAUM": 41673251.76,
                        "netCapitalInOutValue": 1901294.48,
                        "weightedNetCapitalInOutValue": 944072.64,
                        "netChangeInPortfolioValue": -1901294.48,
                        "monthlyReturnPercent": 2,
                        "yearReturnPercent": -2,
                        "yearToLastSixMonthReturnPercent": -3,
                        "benchmarkList": [
                            {
                                "id": "dow_jones_industrial_average_index",
                                "value": 18085,
                                "percentage": -0.11
                            },
                            {
                                "id": "hang_seng_index",
                                "value": 20800,
                                "percentage": -0.95
                            },
                            {
                                "id": "msci_world_index",
                                "value": 9900.33,
                                "percentage": 2.65
                            },
                            {
                                "id": "sp_500_index",
                                "value": 2243,
                                "percentage": 1.9
                            }
                        ]
                    }, {
                        "year": 2016,
                        "month": 3,
                        "fromDate": "2016-03-01",
                        "toDate": "2016-03-31",
                        "fromAUM": 38247427.13,
                        "toAUM": 41673251.76,
                        "netCapitalInOutValue": 1901294.48,
                        "weightedNetCapitalInOutValue": 944072.64,
                        "netChangeInPortfolioValue": 1524530.15,
                        "monthlyReturnPercent": 3.89,
                        "yearReturnPercent": -3.91,
                        "yearToLastSixMonthReturnPercent": -3.91,
                        "benchmarkList": [
                            {
                                "id": "dow_jones_industrial_average_index",
                                "value": 18104.39,
                                "percentage": -0.65
                            },
                            {
                                "id": "hang_seng_index",
                                "value": 21000,
                                "percentage": 3.96
                            },
                            {
                                "id": "msci_world_index",
                                "value": 9645.12,
                                "percentage": -1.96
                            },
                            {
                                "id": "sp_500_index",
                                "value": 2201.12,
                                "percentage": 2.31
                            }
                        ]
                    }, {
                        "year": 2016,
                        "month": 2,
                        "fromDate": "2016-02-01",
                        "toDate": "2016-02-29",
                        "fromAUM": 38398591.67,
                        "toAUM": 38247427.13,
                        "netCapitalInOutValue": 771479.62,
                        "weightedNetCapitalInOutValue": 505582.02,
                        "netChangeInPortfolioValue": -922644.16,
                        "monthlyReturnPercent": 5,
                        "yearReturnPercent": -2,
                        "yearToLastSixMonthReturnPercent": -3,
                        "benchmarkList": [
                            {
                                "id": "dow_jones_industrial_average_index",
                                "value": 18223.03,
                                "percentage": 0.55
                            },
                            {
                                "id": "hang_seng_index",
                                "value": 20200,
                                "percentage": 1
                            },
                            {
                                "id": "msci_world_index",
                                "value": 9837.7,
                                "percentage": 1.03
                            },
                            {
                                "id": "sp_500_index",
                                "value": 2151.33,
                                "percentage": 0.14
                            }
                        ]
                    }, {
                        "year": 2016,
                        "month": 1,
                        "fromDate": "2016-01-01",
                        "toDate": "2016-01-31",
                        "fromAUM": 38398591.67,
                        "toAUM": 38398591.67,
                        "netCapitalInOutValue": 2111975.47,
                        "weightedNetCapitalInOutValue": 1774391,
                        "netChangeInPortfolioValue": -2111975.47,
                        "monthlyReturnPercent": 5,
                        "yearReturnPercent": 2,
                        "yearToLastSixMonthReturnPercent": -1,
                        "benchmarkList": [
                            {
                                "id": "dow_jones_industrial_average_index",
                                "value": 18123,
                                "percentage": -0.55
                            },
                            {
                                "id": "hang_seng_index",
                                "value": 20000,
                                "percentage": 0.76
                            },
                            {
                                "id": "msci_world_index",
                                "value": 9737.7,
                                "percentage": 3.18
                            },
                            {
                                "id": "sp_500_index",
                                "value": 2148.25,
                                "percentage": -4
                            }
                        ]
                    },
                    {
                        "year": 2015,
                        "month": 12,
                        "fromDate": "2015-12-01",
                        "toDate": "2015-12-31",
                        "fromAUM": 38398591.67,
                        "toAUM": 38398591.67,
                        "netCapitalInOutValue": 0,
                        "weightedNetCapitalInOutValue": 0,
                        "netChangeInPortfolioValue": 0,
                        "monthlyReturnPercent": 0,
                        "yearReturnPercent": 0,
                        "yearToLastSixMonthReturnPercent": 0,
                        "benchmarkList": [
                            {
                                "id": "dow_jones_industrial_average_index",
                                "value": 18223,
                                "percentage": 0.01
                            },
                            {
                                "id": "hang_seng_index",
                                "value": 19850,
                                "percentage": 2.86
                            },
                            {
                                "id": "msci_world_index",
                                "value": 9437.7,
                                "percentage": 1.83
                            },
                            {
                                "id": "sp_500_index",
                                "value": 2248.15,
                                "percentage": -0.56
                            }
                        ]
                    }
                ]
            }
        };
        return result;
    }

}