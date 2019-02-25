import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class IPortfolioApiService {

    constructor() { }

    getAssetAllocationHistory() {
        let result = {
            "data": {
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
                ]
            }
        };

        return result;
    }

    getNavHistory() {
        let result = {
            "data": {
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

}