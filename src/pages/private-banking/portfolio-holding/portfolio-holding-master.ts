import { Injector } from '@angular/core';
import { BasePage } from '../../base-page';

import { IPortfolioApiService } from "../../../providers-v2/api/i-portfolio-api-service";
import { AccountType, IPortfolioUtil } from "../../../providers-v2/util/i-portfolio-util";

export class ProfolioHoldingMaster extends BasePage {

    protected iPortfolioApiService: IPortfolioApiService;

    selectedAccountType: string = null;
    accountTypeList: any[] = [];

    totalAmountInfo = {
        totalAmount: null,
        aumProportion: null,
        holding: null
    }

    holdingInfo = {
        selectedAccountType: null,
        header: [],
        data: []
    }

    assetAllocationDataInfo = {
        selectedAccountType: null,
        holdingTypeList: [],
        chartData: {
            label: [],
            amount: []
        }
    };

    constructor(injector: Injector) {
        super(injector)
        this.iPortfolioApiService = injector.get(IPortfolioApiService);
    }

    loadData() {
        this.clearData();
        let data = this.iPortfolioApiService.getPortfolioHolding(this.selectedAccountType).data;

        let detail = data.detail;

        this.setAccountTypeList(data.accountTypeList);

        this.totalAmountInfo = {
            totalAmount: detail.totalAmount,
            aumProportion: detail.aumProportion,
            holding: detail.holding
        };

        this.selectedAccountType = detail.accountType;
        this.assetAllocationDataInfo.selectedAccountType = detail.accountType;
        this.holdingInfo.selectedAccountType = detail.accountType;

        // Handling Holding Data
        let headerMap = this.setHeaderMap(detail.headerList);
        this.setHoldingData(detail.accountType, headerMap, detail.contentList);

        // Handling Asset History Data
        this.assetAllocationDataInfo.holdingTypeList.push(this.selectedAccountType);
        let amountList = [];
        IPortfolioUtil.sortList(detail.historyList).forEach((item, index) => {
            this.assetAllocationDataInfo.chartData.label.push([item.month, item.year]);
            amountList.push(item.amount);

            if (index == detail.historyList.length - 1) {
                this.assetAllocationDataInfo.chartData.label.push([item.month, item.year]);
                amountList.push(item.amount);
            }
        });
        this.assetAllocationDataInfo.chartData.amount.push(amountList);

        console.log(this.holdingInfo);
        console.log(this.assetAllocationDataInfo);
    }

    setAccountTypeList(accountList) {
        accountList.forEach((item) => {
            this.accountTypeList.push({
                id: item,
                name: IPortfolioUtil.getTitle(item)
            });
        });
    }

    setHeaderMap(headerList) {
        let result = new Map();
        headerList.forEach((header, index) => {
            result.set(header, index);
        })

        return result;
    }

    setHoldingData(accountType, headerMap, dataList) {
        let headerNameList = PortfolioHolding[accountType];
        console.log(headerMap);
        dataList.forEach((record) => {
            console.log(record);
            switch (accountType) {
                case AccountType.savingAndCurrent:
                    this.holdingInfo.data.push({
                        accountType: record[headerMap.get(headerNameList.account_type)],
                        ccy: record[headerMap.get(headerNameList.ccy)],
                        principal: record[headerMap.get(headerNameList.principal_in_market)],
                        principalInHKD: record[headerMap.get(headerNameList.principal_in_base_market)]
                    });
                    break;
                case AccountType.timeDeposit:
                    this.holdingInfo.data.push({
                        accountType: record[headerMap.get(headerNameList.account_type)],
                        referNo: record[headerMap.get(headerNameList.deposit_no)],
                        ccy: record[headerMap.get(headerNameList.ccy)],
                        principal: record[headerMap.get(headerNameList.principal_in_market)],
                        principalInHKD: record[headerMap.get(headerNameList.principal_in_base_market)],
                        effectiveDate: record[headerMap.get(headerNameList.effective_date)],
                        dueDate: record[headerMap.get(headerNameList.due_date)],
                        interestRate: record[headerMap.get(headerNameList.interest_rate)]
                    });
                    break;
                case AccountType.structuredProduct:
                    //TODO
                    break;
                case AccountType.stock:
                    this.holdingInfo.data.push({
                        companyCode: record[headerMap.get(headerNameList.stock_code)],
                        companyName: record[headerMap.get(headerNameList.securities_name)],
                        ccy: record[headerMap.get(headerNameList.ccy)],
                        marketValue: record[headerMap.get(headerNameList.market_value_in_market)],
                        marketValueInHKD: record[headerMap.get(headerNameList.market_value_in_base_market)],
                        shares: record[headerMap.get(headerNameList.shares)],
                        marketPrice: record[headerMap.get(headerNameList.market_price)],
                        avgUnitCost: record[headerMap.get(headerNameList.avg_unit_cost)]
                    });
                    break;
                case AccountType.bondNoteCertDeposit:
                    //TODO
                    break;
                case AccountType.unitTrust:
                    //TODO
                    break;
                case AccountType.linkedDeposit:
                    this.holdingInfo.data.push({
                        accountType: record[headerMap.get(headerNameList.linked_type)],
                        referNo: record[headerMap.get(headerNameList.reference_no)],
                        settlementDate: record[headerMap.get(headerNameList.settlement_date)],
                        maturityDate: record[headerMap.get(headerNameList.maturity_date)],
                        couponRate: record[headerMap.get(headerNameList.coupon_rate)],
                        referValue: record[headerMap.get(headerNameList.reference_value)],
                        amount: record[headerMap.get(headerNameList.deposit_amount_in_market)],
                        amountInHKD: record[headerMap.get(headerNameList.deposit_amount_in_base_market)]
                    });
                    break;
                case AccountType.optionAndDerivativesContract:
                    //TODO
                    break;
                case AccountType.loan:
                    //TODO
                    break;
                case AccountType.forwardForeignExchange:
                    //TODO
                    break;
            }
        });
    }

    clearData() {
        this.accountTypeList = [];
        this.holdingInfo = {
            selectedAccountType: null,
            header: [],
            data: []
        }
        this.assetAllocationDataInfo = {
            selectedAccountType: null,
            holdingTypeList: [],
            chartData: {
                label: [],
                amount: []
            }
        };
    }
}

export const PortfolioHolding = {
    savings_n_current: {
        account_type: "account_type",
        ccy: "ccy",
        principal_in_market: "principal_in_market",
        principal_in_base_market: "principal_in_base_market"
    },
    time_deposit: {
        account_type: "account_type",
        effective_date: "effective_date",
        due_date: "due_date",
        deposit_no: "deposit_no",
        interest_rate: "interest_rate",
        ccy: "ccy",
        principal_in_market: "principal_in_market",
        principal_in_base_market: "principal_in_base_market"
    },
    linked_deposit: {
        linked_type: "linked_type",
        reference_no: "reference_no",
        deposit_underlying_ccy: "deposit_underlying_ccy",
        settlement_date: "settlement_date",
        maturity_date: "maturity_date",
        reference_value: "reference_value",
        coupon_rate: "coupon_rate",
        deposit_amount_in_market: "deposit_amount_in_market",
        deposit_amount_in_base_market: "deposit_amount_in_base_market"
    },
    stock: {
        securities_name: "securities_name",
        stock_code: "stock_code",
        shares: "shares",
        market_price: "market_price",
        avg_unit_cost: "avg_unit_cost",
        ccy: "ccy",
        market_value_in_market: "market_value_in_market",
        market_value_in_base_market: "market_value_in_base_market"
    },
    unit_trust: {
        securities_name: "securities_name",
        unit: "unit",
        market_price: "market_price",
        avg_unit_cost: "avg_unit_cost",
        ccy: "ccy",
        market_value_in_market: "market_value_in_market",
        market_value_in_base_market: "market_value_in_base_market"
    },
    bond: {
        securities_name: "securities_name",
        nominal_value: "nominal_value",
        market_price: "market_price",
        avg_unit_cost: "avg_unit_cost",
        ccy: "ccy",
        market_value_in_market: "market_value_in_market",
        market_value_in_base_market: "market_value_in_base_market"
    },
    structured_products: {
        securities_name: "securities_name",
        nominal_value: "nominal_value",
        market_price: "market_price",
        avg_unit_cost: "avg_unit_cost",
        ccy: "ccy",
        market_value_in_market: "market_value_in_market",
        market_value_in_base_market: "market_value_in_base_market"
    },
    loans: {
        loan_type: "loan_type",
        effective_date: "effective_date",
        due_date: "due_date",
        loan_no: "loan_no",
        interest_rate: "interest_rate",
        ccy: "ccy",
        principal_in_market: "principal_in_market",
        principal_in_base_market: "principal_in_base_market"
    },
    option_derivatives_contract: {
        trade_date: "trade_date",
        reference_no: "reference_no",
        underlying: "underlying",
        option_type: "option_type",
        strike_price: "strike_price",
        knock_out_price: "knock_out_price",
        shares_notional_per_fixing: "shares_notional_per_fixing",
        remaining_notional_amount: "remaining_notional_amount"
    },
    forward_foreign_exchange: {
        trade_date: "trade_date",
        value_date: "value_date",
        reference_no: "reference_no",
        buy_ccy: "buy_ccy",
        buy_amount: "buy_amount",
        sell_ccy: "sell_ccy",
        sell_amount: "sell_amount",
        forward_rate: "forward_rate"
    },
    pending_settlement: {
        trade_date: "trade_date",
        settlement_date: "settlement_date",
        reference_no: "reference_no",
        description: "description",
        transaction_type: "transaction_type",
        ccy: "ccy",
        pending_settlement_value: "pending_settlement_value",
        pending_settlement_amount: "pending_settlement_amount"
    }
}