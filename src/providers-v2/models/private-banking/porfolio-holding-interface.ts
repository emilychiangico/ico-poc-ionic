import { BaseResponseResult } from '../common-interface';

export namespace ProfoiloHoldingInterface {

    export interface baseInfo {
        totalAmount: number,
        aumProportion: number,
        holdings: number
    }

    export interface SavingAndCurrentInfo {
        accountType: string,
        ccy: string,
        principal: number,
        principalInHKD: number
    }

    export interface TimeDepositInfo {
        accountType: string,
        referNo: string,
        ccy: string,
        principal: number,
        principalInHKD: number,
        effectiveDate: string,
        dueDate: string,
        interestRate: number
    }

    export interface LinkDepositInfo {
        accountType: string,
        referNo: string,
        settlementDate: string,
        maturityDate: string,
        couponRate: number,
        referenceValue: number,
        depositAmount: number,
        depositAmountInHKD: number
    }

    export interface StockInfo {
        companyId: string,
        companyName: string,
        ccy: string,
        marketValue: number,
        marketValueInHKD: number,
        shares: number,
        marketPrice: number,
        avgUnitCost: any
    }

    export namespace ProfoiloHolding {

        export interface request {
        }

        export interface ResponseData {
        }

        export interface Response {
            data?: ResponseData,
            result?: BaseResponseResult
        }
    }

    export namespace AssetHistory {

        export interface request {
        }

        export interface ResponseData {
        }

        export interface Response {
            data?: ResponseData,
            result?: BaseResponseResult
        }
    }
}