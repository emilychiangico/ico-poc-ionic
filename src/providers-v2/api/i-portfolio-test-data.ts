export const AccountType = {
    savingAndCurrent: "savings_n_current",
    timeDeposit: "time_deposit",
    structuredProduct: "structured_products",
    stock: "stock",
    bondNoteCertDeposit: "bond",
    unitTrust: "unit_trust",
    linkedDeposit: "linked_deposit",
    optionAndDerivativesContract: "option_n_derivatives_contract",
    loan: "loan",
    forwardForeignExchange: "forward_foreign_exchange"
};

export const myPortolioData = {
    savingAndCurrent: {
        "accountType": AccountType.savingAndCurrent,
        "totalAmount": 11770124.00, "aumProportion": 25.34, "holding": 12,
        "headerList": [
            "account_type", "ccy", "principal_in_market", "principal_in_base_market"
        ],
        "contentList": [
            ["HKD Current Account", "HKD", 820.5, 820.5],
            ["Statement Savings Account", "AUD", 216643.33, 1288255.43],
            ["Statement Savings Account", "CNY", 31098.4, 38118.38]
        ],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 6 * 1000000 },
            { "month": 5, "year": 2018, "amount": 13.2 * 1000000 },
            { "month": 4, "year": 2018, "amount": 10.8 * 1000000 },
            { "month": 3, "year": 2018, "amount": 6 * 1000000 },
            { "month": 2, "year": 2018, "amount": 12 * 1000000 },
            { "month": 1, "year": 2018, "amount": 12 * 1000000 }
        ]
    },
    timeDeposit: {
        "accountType": AccountType.timeDeposit,
        "totalAmount": 91770124.00,
        "aumProportion": 5.34,
        "holding": 120,
        "headerList": [
            "account_type", "effective_date", "due_date", "deposit_no", "interest_rate", "ccy", "principal_in_market", "principal_in_base_market"
        ],
        "contentList": [
            ["Time Deposit Account", "2018-06-07", "2018-06-07", "#00125", "1.8750", "HKD", 394500, 394500]
        ],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 6 * 1000000 },
            { "month": 5, "year": 2018, "amount": 6.4 * 1000000 },
            { "month": 4, "year": 2018, "amount": 5 * 1000000 },
            { "month": 3, "year": 2018, "amount": 4 * 1000000 },
            { "month": 2, "year": 2018, "amount": 4.2 * 1000000 },
            { "month": 1, "year": 2018, "amount": 4.6 * 1000000 }
        ]
    },
    linkedDeposit: {
        "accountType": AccountType.linkedDeposit,
        "totalAmount": 11774.00,
        "aumProportion": 75.30,
        "holding": 9,
        "headerList": [
            "linked_type", "reference_no", "deposit_underlying_ccy", "settlement_date", "maturity_date", "reference_value", "coupon_rate", "deposit_amount_in_market", "deposit_amount_in_base_market"
        ],
        "contentList": [
            ["Currency Link Deposit", "CYD00278759", "AUD", "2018-06-07", "2018-06-07", "1.1678", "2.0600", 3000000, 2354265]
        ],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 4 * 1000000 },
            { "month": 5, "year": 2018, "amount": 3 * 1000000 },
            { "month": 4, "year": 2018, "amount": 2 * 1000000 },
            { "month": 3, "year": 2018, "amount": 7 * 1000000 },
            { "month": 2, "year": 2018, "amount": 6 * 1000000 },
            { "month": 1, "year": 2018, "amount": 5 * 1000000 }
        ]
    },
    stock: {
        "accountType": AccountType.stock,
        "totalAmount": 11345124.00,
        "aumProportion": 75.34,
        "holding": 2,
        "headerList": [
            "securities_name", "stock_code", "shares", "market_price", "avg_unit_cost", "ccy", "market_value_in_market", "market_value_in_base_market"
        ],
        "contentList": [
            ["BOC Hong Kong Holdings Ltd", "02388", 10000, 3000000, "--", "HKD", 394500, 394500]
        ],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 4 * 1000000 },
            { "month": 5, "year": 2018, "amount": 5 * 1000000 },
            { "month": 4, "year": 2018, "amount": 4.5 * 1000000 },
            { "month": 3, "year": 2018, "amount": 2 * 1000000 },
            { "month": 2, "year": 2018, "amount": 8 * 1000000 },
            { "month": 1, "year": 2018, "amount": 4 * 1000000 }
        ]
    },
    structuredProduct: {
        "accountType": AccountType.structuredProduct,
        "totalAmount": 144.00, "aumProportion": 29.34, "holding": 1,
        "headerList": [], "contentList": [],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 8.6 * 1000000 },
            { "month": 5, "year": 2018, "amount": 8.6 * 1000000 },
            { "month": 4, "year": 2018, "amount": 9.5 * 1000000 },
            { "month": 3, "year": 2018, "amount": 7 * 1000000 },
            { "month": 2, "year": 2018, "amount": 7.5 * 1000000 },
            { "month": 1, "year": 2018, "amount": 7.5 * 1000000 }
        ]
    },
    bondNoteCertDeposit: {
        "accountType": AccountType.bondNoteCertDeposit,
        "totalAmount": 1177.00, "aumProportion": 29.45, "holding": 5,
        "headerList": [], "contentList": [],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 8.2 * 1000000 },
            { "month": 5, "year": 2018, "amount": 8 * 1000000 },
            { "month": 4, "year": 2018, "amount": 9 * 1000000 },
            { "month": 3, "year": 2018, "amount": 10 * 1000000 },
            { "month": 2, "year": 2018, "amount": 9 * 1000000 },
            { "month": 1, "year": 2018, "amount": 9 * 1000000 }
        ]
    },
    unitTrust: {
        "accountType": AccountType.unitTrust,
        "totalAmount": 11870124.00, "aumProportion": 21.94, "holding": 92,
        "headerList": [], "contentList": [],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 4.8 * 1000000 },
            { "month": 5, "year": 2018, "amount": 4.5 * 1000000 },
            { "month": 4, "year": 2018, "amount": 5 * 1000000 },
            { "month": 3, "year": 2018, "amount": 7.5 * 1000000 },
            { "month": 2, "year": 2018, "amount": 7 * 1000000 },
            { "month": 1, "year": 2018, "amount": 6 * 1000000 }
        ]
    },
    optionAndDerivativesContract: {
        "accountType": AccountType.optionAndDerivativesContract,
        "totalAmount": 13770124.00, "aumProportion": 65.34, "holding": 14,
        "headerList": [], "contentList": [],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 1 * 1000000 },
            { "month": 5, "year": 2018, "amount": 2 * 1000000 },
            { "month": 4, "year": 2018, "amount": 3 * 1000000 },
            { "month": 3, "year": 2018, "amount": 4 * 1000000 },
            { "month": 2, "year": 2018, "amount": 5 * 1000000 },
            { "month": 1, "year": 2018, "amount": 6 * 1000000 }
        ]
    },
    loan: {
        "accountType": AccountType.loan,
        "totalAmount": 117704.00, "aumProportion": 14.53, "holding": 45,
        "headerList": [], "contentList": [],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 7.8 * 1000000 },
            { "month": 5, "year": 2018, "amount": 4 * 1000000 },
            { "month": 4, "year": 2018, "amount": 5 * 1000000 },
            { "month": 3, "year": 2018, "amount": 6 * 1000000 },
            { "month": 2, "year": 2018, "amount": 7 * 1000000 },
            { "month": 1, "year": 2018, "amount": 9 * 1000000 }
        ]
    },
    forwardForeignExchange: {
        "accountType": AccountType.forwardForeignExchange,
        "totalAmount": 1770124.00, "aumProportion": 23.77, "holding": 87,
        "headerList": [], "contentList": [],
        "historyList": [
            { "month": 6, "year": 2018, "amount": 5 * 1000000 },
            { "month": 5, "year": 2018, "amount": 2 * 1000000 },
            { "month": 4, "year": 2018, "amount": 4 * 1000000 },
            { "month": 3, "year": 2018, "amount": 5 * 1000000 },
            { "month": 2, "year": 2018, "amount": 7 * 1000000 },
            { "month": 1, "year": 2018, "amount": 7 * 1000000 }
        ]
    },
}

export class TestData {

    static getMyPortolioData(type: string) {
        switch (type) {
            case AccountType.savingAndCurrent:
                return myPortolioData.savingAndCurrent;
            case AccountType.timeDeposit:
                return myPortolioData.timeDeposit;
            case AccountType.structuredProduct:
                return myPortolioData.structuredProduct;
            case AccountType.stock:
                return myPortolioData.stock;
            case AccountType.bondNoteCertDeposit:
                return myPortolioData.bondNoteCertDeposit;
            case AccountType.unitTrust:
                return myPortolioData.unitTrust;
            case AccountType.linkedDeposit:
                return myPortolioData.linkedDeposit;
            case AccountType.optionAndDerivativesContract:
                return myPortolioData.optionAndDerivativesContract;
            case AccountType.loan:
                return myPortolioData.loan
            case AccountType.forwardForeignExchange:
                return myPortolioData.forwardForeignExchange;
            default:
                return myPortolioData.savingAndCurrent;
        }
    }
}